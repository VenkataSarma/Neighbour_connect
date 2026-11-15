import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { sendError } from '../utils/apiResponse';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'No token provided. Please login to access this resource.');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyAccessToken(token);

    // Check if user still exists
    const user = await User.findById(decoded.userId);

    if (!user) {
      return sendError(res, 401, 'User no longer exists.');
    }

    // Check if user is active
    if (!user.isActive) {
      return sendError(res, 403, 'Your account has been deactivated.');
    }

    // Check if user is suspended
    if (user.isSuspended) {
      return sendError(res, 403, `Your account has been suspended. Reason: ${user.suspendedReason || 'Policy violation'}`);
    }

    // Update last seen
    user.lastSeen = new Date();
    await user.save();

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error: any) {
    if (error.message.includes('expired')) {
      return sendError(res, 401, 'Your session has expired. Please login again.');
    }
    return sendError(res, 401, 'Invalid authentication token.');
  }
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyAccessToken(token);

      const user = await User.findById(decoded.userId);
      if (user && user.isActive && !user.isSuspended) {
        req.user = {
          userId: decoded.userId,
          role: decoded.role,
        };
      }
    }
  } catch (error) {
    // Silently fail for optional auth
  }

  next();
};

export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
    if (!req.user) {
      return sendError(res, 401, 'You are not authenticated.');
    }

    if (!roles.includes(req.user.role)) {
      return sendError(res, 403, 'You do not have permission to perform this action.');
    }

    next();
  };
};
