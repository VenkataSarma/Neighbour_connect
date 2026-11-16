# Neighbourhood Connect - Development Guide

## Project Status: Backend Complete ✅

The complete backend for Neighbourhood Connect has been implemented with all features working.

---

## Backend Architecture

### ✅ Completed Components

#### **Models (Database Schemas)**
All MongoDB models with proper indexes and validation:
- ✅ User (authentication, roles, verification)
- ✅ UserProfile (profile data, geospatial location, onboarding)
- ✅ Activity (events with geospatial queries)
- ✅ ActivityParticipant (join requests, participation management)
- ✅ Category (activity categories with subcategories)
- ✅ Connection (user connections, friend requests)
- ✅ Conversation (direct and group messaging)
- ✅ Message (chat messages with read receipts)
- ✅ Notification (in-app notifications with TTL)
- ✅ Report (user and activity reports)
- ✅ UserBlock (blocking functionality)

#### **Controllers**
All business logic implemented:
- ✅ Authentication (register, login, password reset, email verification)
- ✅ Profile Management (onboarding, privacy, location updates)
- ✅ Activity Management (CRUD, nearby search, today's activities)
- ✅ Participation (join, leave, approve, reject with atomic operations)
- ✅ Category Management (with seeding functionality)
- ✅ Connections (send, accept, reject connection requests)
- ✅ Messaging (conversations, send messages, real-time)
- ✅ Notifications (CRUD operations, unread counts)
- ✅ People Discovery (geospatial search, filters)
- ✅ Reports (user and activity reporting)

#### **Routes**
All API endpoints configured:
- ✅ `/api/v1/auth` - Authentication endpoints
- ✅ `/api/v1/profile` - Profile management
- ✅ `/api/v1/activities` - Activity CRUD and participation
- ✅ `/api/v1/categories` - Category management
- ✅ `/api/v1/connections` - User connections
- ✅ `/api/v1/messages` - Messaging system
- ✅ `/api/v1/notifications` - Notifications
- ✅ `/api/v1/people` - People discovery and blocking
- ✅ `/api/v1/reports` - Reporting system

#### **Middleware**
- ✅ Authentication (JWT token verification)
- ✅ Authorization (role-based access control)
- ✅ Validation (express-validator)
- ✅ File Upload (Multer with image filters)
- ✅ Error Handling (centralized error handler)
- ✅ Rate Limiting (API and auth rate limiters)

#### **Utilities**
- ✅ JWT Token Management (generate, verify)
- ✅ API Response Helpers (success, error responses)
- ✅ Pagination Utilities
- ✅ Email Service (verification, password reset)
- ✅ Category Seeding

#### **Real-time Features**
- ✅ Socket.IO Setup (with JWT authentication)
- ✅ Real-time Messaging
- ✅ Typing Indicators
- ✅ Read Receipts
- ✅ Conversation Management

---

## Environment Variables Required

Create a `.env` file in `packages/backend/` with these values:

```env
# Server
NODE_ENV=development
PORT=5000

# Database - YOU NEED TO PROVIDE THIS
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/neighbourhood_connect?retryWrites=true&w=majority

# JWT Secrets - CHANGE THESE IN PRODUCTION
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_change_this
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Cloudinary (Optional - for image uploads) - YOU NEED TO PROVIDE THIS
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Firebase (Optional - for push notifications) - YOU NEED TO PROVIDE THIS
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key_here
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# Email (Optional - for email notifications) - YOU NEED TO PROVIDE THIS
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=Neighbourhood Connect <noreply@neighbourhoodconnect.app>

# Client URLs
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

---

## Where to Get External Service Credentials

### 1. **MongoDB Atlas** (REQUIRED)
**What it's for:** Database storage

**How to get it:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account (M0 Sandbox cluster - FREE)
3. Create a new cluster
4. Go to Database Access → Add Database User (create username and password)
5. Go to Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Go to Database → Connect → Connect your application
7. Copy the connection string and replace:
   - `<username>` with your database username
   - `<password>` with your database password
   - `<dbname>` with `neighbourhood_connect`

**Paste in:** `MONGODB_URI` in `.env`

### 2. **Cloudinary** (Optional - for images)
**What it's for:** Profile photos and activity images

**How to get it:**
1. Go to https://cloudinary.com/users/register/free
2. Create a free account (25 GB storage FREE)
3. Go to Dashboard
4. Copy: Cloud Name, API Key, API Secret

**Paste in:** `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in `.env`

**Note:** If you don't configure this, image uploads will log a warning but the app will still work. Profile photos will not be stored.

### 3. **Firebase** (Optional - for push notifications)
**What it's for:** Mobile push notifications

**How to get it:**
1. Go to https://console.firebase.google.com/
2. Create a new project
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Download the JSON file
6. Extract: `project_id`, `private_key`, `client_email`

**Paste in:** `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL` in `.env`

**Note:** If you don't configure this, push notifications won't work but the app will still function.

### 4. **Email Service** (Optional - for emails)
**What it's for:** Email verification, password reset emails

**How to get it (Gmail):**
1. Use your Gmail account
2. Enable 2-Factor Authentication
3. Go to https://myaccount.google.com/apppasswords
4. Generate an App Password
5. Use your Gmail address and the generated password

**Paste in:** `EMAIL_USER` and `EMAIL_PASS` in `.env`

**Note:** If you don't configure this, email functionality won't work but registration and login will still function.

---

## Installation & Running

### Backend Setup

```bash
# Navigate to backend
cd packages/backend

# Install dependencies
npm install

# Create .env file and add your credentials (see above)
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

The backend will:
- ✅ Connect to MongoDB
- ✅ Seed initial categories automatically
- ✅ Start on http://localhost:5000
- ✅ Initialize Socket.IO for real-time features

### Test Backend

```bash
# Health check
curl http://localhost:5000/health

# Get categories (should work immediately after seeding)
curl http://localhost:5000/api/v1/categories
```

---

## API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "username": "johndoe",
  "phone": "+1234567890",
  "city": "Hyderabad",
  "locality": "Banjara Hills"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Activity Endpoints

#### Get All Activities
```http
GET /api/v1/activities?page=1&limit=20
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### Create Activity
```http
POST /api/v1/activities
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "title": "Morning Run in Jubilee Hills",
  "description": "Looking for running partners for a 5km morning run",
  "category": "CATEGORY_ID_FROM_CATEGORIES_ENDPOINT",
  "date": "2026-11-07",
  "startTime": "06:00",
  "endTime": "07:00",
  "city": "Hyderabad",
  "locality": "Jubilee Hills",
  "maxParticipants": 5,
  "participationType": "open",
  "visibility": "public"
}
```

#### Join Activity
```http
POST /api/v1/activities/ACTIVITY_ID/join
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "message": "I'd love to join this run!"
}
```

### More Endpoints

See full API documentation at `/docs/API_DOCUMENTATION.md` (to be created)

---

## Next Steps

### ✅ Backend: COMPLETE
All backend functionality is implemented and ready to use.

### 🚧 Frontend: In Progress
Next, I'll implement:
1. **Web Application** (React + Vite + TypeScript)
2. **Mobile Application** (React Native + Expo)
3. **Admin Dashboard** (React + Vite)

---

## Notes

- The backend uses **MongoDB geospatial queries** for nearby activity discovery
- **Atomic operations** prevent race conditions in activity participation
- **JWT tokens** handle authentication with refresh token support
- **Socket.IO** provides real-time messaging and notifications
- **Rate limiting** protects against abuse
- **Input validation** on all endpoints
- **Error handling** with proper HTTP status codes
- **CORS** configured for web and admin frontends

---

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection string is valid
4. Check that MongoDB Atlas allows connections from your IP

---

**Built with:** Node.js, Express, TypeScript, MongoDB, Socket.IO
**Status:** Backend Production Ready ✅
**Next:** Building Frontend Applications 🚧
