import nodemailer from 'nodemailer';

const EMAIL_HOST = process.env.SMTP_HOST || process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || '587', 10);
const EMAIL_USER = process.env.SMTP_USER || process.env.EMAIL_USER;
const EMAIL_PASS = process.env.SMTP_PASS || process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || 'Neighbourhood Connect <noreply@neighbourhoodconnect.app>';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

let transporter: nodemailer.Transporter | null = null;

const createTransporter = (): nodemailer.Transporter => {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('⚠️  Email credentials not configured. Email functionality will be disabled.');
    return null as any;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_PORT === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  return transporter;
};

export const sendVerificationEmail = async (
  to: string,
  name: string,
  token: string
): Promise<void> => {
  const transport = createTransporter();
  if (!transport) return;

  const verificationUrl = `${CLIENT_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: EMAIL_FROM,
    to,
    subject: 'Verify Your Email - Neighbourhood Connect',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #167D5A;">Welcome to Neighbourhood Connect!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up! Please verify your email address to get started.</p>
        <div style="margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #167D5A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="color: #666; font-size: 14px;">${verificationUrl}</p>
        <p style="color: #999; font-size: 12px; margin-top: 40px;">
          If you didn't create an account, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
  }
};

export const sendPasswordResetEmail = async (
  to: string,
  name: string,
  token: string
): Promise<void> => {
  const transport = createTransporter();
  if (!transport) return;

  const resetUrl = `${CLIENT_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: EMAIL_FROM,
    to,
    subject: 'Password Reset Request - Neighbourhood Connect',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #167D5A;">Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #167D5A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="color: #666; font-size: 14px;">${resetUrl}</p>
        <p style="color: #999; font-size: 12px; margin-top: 40px;">
          This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
  }
};

export const sendActivityNotificationEmail = async (
  to: string,
  name: string,
  activityTitle: string,
  message: string
): Promise<void> => {
  const transport = createTransporter();
  if (!transport) return;

  const mailOptions = {
    from: EMAIL_FROM,
    to,
    subject: `Activity Update: ${activityTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #167D5A;">Activity Update</h2>
        <p>Hi ${name},</p>
        <p>${message}</p>
        <p><strong>Activity:</strong> ${activityTitle}</p>
        <div style="margin: 30px 0;">
          <a href="${CLIENT_URL}/activities" style="background-color: #167D5A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View Activities
          </a>
        </div>
      </div>
    `,
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error('❌ Error sending activity notification email:', error);
  }
};
