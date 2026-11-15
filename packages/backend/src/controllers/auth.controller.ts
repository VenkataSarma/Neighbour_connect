import { Response, NextFunction } from 'express';
import crypto from 'crypto';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';
import UserProfile from '../models/UserProfile';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { sendSuccess, sendError, AppError } from '../utils/apiResponse';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email';

export const register = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email, password, fullName, username, phone, city, locality, dateOfBirth } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return sendError(res, 400, 'Email already registered');
      }
      return sendError(res, 400, 'Username already taken');
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      fullName,
      username: username.toLowerCase(),
      phone,
      emailVerificationToken,
      emailVerificationExpires,
    });

    // Create user profile
    await UserProfile.create({
      user: user._id,
      city: city || 'Hyderabad',
      locality: locality || '',
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      location: {
        type: 'Point',
        coordinates: [78.4867, 17.3850], // Default Hyderabad coordinates
      },
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    // Store refresh token
    user.refreshTokens.push(refreshToken);
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, user.fullName, emailVerificationToken);

    // Return user data with tokens
    return sendSuccess(res, 201, 'Registration successful', {
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findByEmail(email);

    if (!user) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      return sendError(res, 403, 'Your account has been deactivated');
    }

    // Check if user is suspended
    if (user.isSuspended) {
      return sendError(res, 403, `Your account has been suspended. Reason: ${user.suspendedReason || 'Policy violation'}`);
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    // Store refresh token
    user.refreshTokens.push(refreshToken);
    user.lastSeen = new Date();
    await user.save();

    // Get user profile
    const profile = await UserProfile.findOne({ user: user._id });

    return sendSuccess(res, 200, 'Login successful', {
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profile,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendError(res, 400, 'Refresh token is required');
    }

    // Remove refresh token from user
    await User.findByIdAndUpdate(req.user?.userId, {
      $pull: { refreshTokens: refreshToken },
    });

    return sendSuccess(res, 200, 'Logout successful');
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return sendError(res, 400, 'Refresh token is required');
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(token);

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.userId);

    if (!user || !user.refreshTokens.includes(token)) {
      return sendError(res, 401, 'Invalid refresh token');
    }

    // Generate new access token
    const accessToken = generateAccessToken(user._id.toString(), user.role);

    return sendSuccess(res, 200, 'Token refreshed successfully', { accessToken });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if user exists or not
      return sendSuccess(res, 200, 'If the email exists, a password reset link has been sent');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;
    await user.save();

    // Send reset email
    await sendPasswordResetEmail(user.email, user.fullName, resetToken);

    return sendSuccess(res, 200, 'If the email exists, a password reset link has been sent');
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { token, password } = req.body;

    // Hash token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) {
      return sendError(res, 400, 'Invalid or expired reset token');
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens = []; // Invalidate all sessions
    await user.save();

    return sendSuccess(res, 200, 'Password reset successful');
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { token } = req.body;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    }).select('+emailVerificationToken +emailVerificationExpires');

    if (!user) {
      return sendError(res, 400, 'Invalid or expired verification token');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return sendSuccess(res, 200, 'Email verified successfully');
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user?.userId).select('+password');

    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return sendError(res, 401, 'Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    user.refreshTokens = []; // Invalidate all sessions
    await user.save();

    return sendSuccess(res, 200, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const user = await User.findById(req.user?.userId);

    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    const profile = await UserProfile.findOne({ user: user._id });

    return sendSuccess(res, 200, 'User retrieved successfully', {
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        createdAt: user.createdAt,
      },
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const user = await User.findById(req.user?.userId);

    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    // Soft delete
    user.isActive = false;
    user.refreshTokens = [];
    await user.save();

    return sendSuccess(res, 200, 'Account deleted successfully');
  } catch (error) {
    next(error);
  }
};
