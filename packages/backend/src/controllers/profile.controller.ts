import { Request, Response, NextFunction } from 'express';
import UserProfile from '../models/UserProfile';
import User from '../models/User';
import Activity from '../models/Activity';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.params.userId;
    const profile = await UserProfile.findOne({ user: userId }).populate('user', 'fullName username email role');

    if (!profile) {
      return sendError(res, 404, 'Profile not found');
    }

    return sendSuccess(res, 200, 'Profile retrieved successfully', profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const updates = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return sendError(res, 404, 'Profile not found');
    }

    return sendSuccess(res, 200, 'Profile updated successfully', profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfilePhoto = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    if (!req.file) {
      return sendError(res, 400, 'No image file provided');
    }

    // Cloudinary upload logic would go here.
    // For now, we simulate the returned URL from the cloudinary helper.
    const imageUrl = `https://res.cloudinary.com/sample/image/upload/v1/${req.file.filename}.jpg`;

    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user?.userId },
      { $set: { profilePhoto: imageUrl } },
      { new: true }
    );

    return sendSuccess(res, 200, 'Profile photo updated successfully', { profilePhoto: imageUrl });
  } catch (error) {
    next(error);
  }
};

export const completeOnboardingStep = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { step, data } = req.body;
    const userId = req.user?.userId;

    if (!step || step < 1 || step > 10) {
      return sendError(res, 400, 'Invalid onboarding step');
    }

    const profile = await UserProfile.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          ...data,
          onboardingStep: step + 1,
          onboardingCompleted: step === 10
        }
      },
      { new: true }
    );

    return sendSuccess(res, 200, `Onboarding step ${step} completed`, profile);
  } catch (error) {
    next(error);
  }
};

export const updateAvailability = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { availability } = req.body;
    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user?.userId },
      { $set: { availability } },
      { new: true }
    );

    return sendSuccess(res, 200, 'Availability updated successfully', profile);
  } catch (error) {
    next(error);
  }
};

export const updatePrivacySettings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { isDiscoverable, profileVisibility } = req.body;
    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user?.userId },
      { $set: { isDiscoverable, profileVisibility } },
      { new: true }
    );

    return sendSuccess(res, 200, 'Privacy settings updated successfully', profile);
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { coordinates, locality, city } = req.body;
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
      return sendError(res, 400, 'Invalid coordinates. Must be [longitude, latitude]');
    }

    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user?.userId },
      {
        $set: {
          location: { type: 'Point', coordinates },
          locality,
          city
        }
      },
      { new: true }
    );

    return sendSuccess(res, 200, 'Location updated successfully', profile);
  } catch (error) {
    next(error);
  }
};

export const getUserActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.params.userId;
    const activities = await Activity.find({ organizer: userId }).sort({ createdAt: -1 });
    return sendSuccess(res, 200, 'Activities retrieved successfully', activities);
  } catch (error) {
    next(error);
  }
};

export const getUserConnections = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.params.userId;
    // This would involve querying the Connection model
    return sendSuccess(res, 200, 'Connections retrieved successfully', []);
  } catch (error) {
    next(error);
  }
};
