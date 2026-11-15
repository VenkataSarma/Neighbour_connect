import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let firebaseInitialized = false;

const initializeFirebase = () => {
  if (admin.apps.length) {
    firebaseInitialized = true;
    return;
  }

  // Local development: service account JSON file (gitignored, never committed)
  const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');

  const {
    FIREBASE_SERVICE_ACCOUNT_JSON,
    FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
  } = process.env;

  try {
    if (FIREBASE_SERVICE_ACCOUNT_JSON) {
      // Production (Render): the entire service account JSON in one env var
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(FIREBASE_SERVICE_ACCOUNT_JSON)),
      });
      console.log('Firebase Admin initialized successfully using FIREBASE_SERVICE_ACCOUNT_JSON.');
    } else if (FIREBASE_PROJECT_ID && FIREBASE_PRIVATE_KEY && FIREBASE_CLIENT_EMAIL) {
      // Production (Render): individual env vars
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: FIREBASE_PROJECT_ID,
          privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: FIREBASE_CLIENT_EMAIL,
        }),
      });
      console.log('Firebase Admin initialized successfully using env variables.');
    } else if (fs.existsSync(serviceAccountPath)) {
      // Local development: load the JSON file from disk
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
      });
      console.log('Firebase Admin initialized successfully using service account JSON.');
    } else {
      console.warn('Firebase credentials not set. Push notifications will not work.');
      return;
    }

    firebaseInitialized = true;
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
  }
};

initializeFirebase();

export const sendPushNotification = async (
  tokens: string[],
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> => {
  if (!firebaseInitialized || tokens.length === 0) return;

  try {
    const message: admin.messaging.MulticastMessage = {
      tokens,
      notification: { title, body },
      data: data || {},
      android: {
        priority: 'high',
        notification: { sound: 'default', clickAction: 'FLUTTER_NOTIFICATION_CLICK' },
      },
      apns: {
        payload: {
          aps: { sound: 'default', badge: 1 },
        },
      },
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    if (response.failureCount > 0) {
      const failedTokens = response.responses
        .map((r, i) => (!r.success ? tokens[i] : null))
        .filter(Boolean);
      console.warn('Failed to send push notifications to tokens:', failedTokens);
    }
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

export const isFirebaseInitialized = () => firebaseInitialized;

export default admin;
