import { Response, NextFunction } from 'express';
import Activity from '../models/Activity';
import Category from '../models/Category';
import ActivityParticipant from '../models/ActivityParticipant';
import Conversation from '../models/Conversation';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { getPagination, getPaginationMeta } from '../utils/pagination';

export const createActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const activityData = {
      ...req.body,
      organizer: userId,
      status: 'open',
    };

    // Verify category exists
    const category = await Category.findById(activityData.category);
    if (!category) {
      return sendError(res, 404, 'Category not found');
    }

    activityData.categoryName = category.name;

    // Create activity
    const activity = await Activity.create(activityData);

    // Create activity group conversation
    await Conversation.create({
      type: 'activity_group',
      participants: [userId],
      activity: activity._id,
      isActive: true,
    });

    const populatedActivity = await Activity.findById(activity._id)
      .populate('organizer', 'fullName username')
      .populate('category', 'name slug icon');

    return sendSuccess(res, 201, 'Activity created successfully', populatedActivity);
  } catch (error) {
    next(error);
  }
};

export const getActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { category, status, search, city, locality } = req.query;

    const filter: any = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (city) filter.city = city;
    if (locality) filter.locality = locality;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Activity.countDocuments(filter);
    const activities = await Activity.find(filter)
      .populate('organizer', 'fullName username')
      .populate('category', 'name slug icon')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const meta = getPaginationMeta(total, page, limit);

    return sendSuccess(res, 200, 'Activities retrieved successfully', activities, meta);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('organizer', 'fullName username')
      .populate('category', 'name slug icon');

    if (!activity) {
      return sendError(res, 404, 'Activity not found');
    }

    return sendSuccess(res, 200, 'Activity retrieved successfully', activity);
  } catch (error) {
    next(error);
  }
};

export const updateActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return sendError(res, 404, 'Activity not found');
    }

    // Check if user is organizer
    if (activity.organizer.toString() !== req.user?.userId) {
      return sendError(res, 403, 'Only the organizer can update this activity');
    }

    // Prevent updating cancelled/completed activities
    if (['cancelled', 'completed'].includes(activity.status)) {
      return sendError(res, 400, `Cannot update ${activity.status} activity`);
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('organizer', 'fullName username').populate('category', 'name slug icon');

    return sendSuccess(res, 200, 'Activity updated successfully', updatedActivity);
  } catch (error) {
    next(error);
  }
};

export const cancelActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { cancelReason } = req.body;
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return sendError(res, 404, 'Activity not found');
    }

    if (activity.organizer.toString() !== req.user?.userId) {
      return sendError(res, 403, 'Only the organizer can cancel this activity');
    }

    if (activity.status === 'cancelled') {
      return sendError(res, 400, 'Activity is already cancelled');
    }

    activity.status = 'cancelled';
    activity.cancelReason = cancelReason;
    await activity.save();

    // Notify all participants (would trigger notification service)

    return sendSuccess(res, 200, 'Activity cancelled successfully', activity);
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return sendError(res, 404, 'Activity not found');
    }

    if (activity.organizer.toString() !== req.user?.userId) {
      return sendError(res, 403, 'Only the organizer can delete this activity');
    }

    // Check if there are accepted participants
    const acceptedCount = await ActivityParticipant.countDocuments({
      activity: activity._id,
      status: 'accepted',
    });

    if (acceptedCount > 0) {
      return sendError(res, 400, 'Cannot delete activity with accepted participants. Cancel it instead.');
    }

    await Activity.findByIdAndDelete(req.params.id);
    await ActivityParticipant.deleteMany({ activity: req.params.id });

    return sendSuccess(res, 200, 'Activity deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const getNearbyActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { longitude, latitude, radius = 10000 } = req.query;

    if (!longitude || !latitude) {
      return sendError(res, 400, 'Longitude and latitude are required');
    }

    const activities = await Activity.find({
      status: 'open',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude as string), parseFloat(latitude as string)],
          },
          $maxDistance: parseInt(radius as string, 10),
        },
      },
    })
      .populate('organizer', 'fullName username')
      .populate('category', 'name slug icon')
      .limit(20);

    return sendSuccess(res, 200, 'Nearby activities retrieved successfully', activities);
  } catch (error) {
    next(error);
  }
};

export const getTodayActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const activities = await Activity.find({
      status: 'open',
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate('organizer', 'fullName username')
      .populate('category', 'name slug icon')
      .sort({ date: 1, startTime: 1 });

    return sendSuccess(res, 200, 'Today\'s activities retrieved successfully', activities);
  } catch (error) {
    next(error);
  }
};

export const getMyActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activities = await Activity.find({ organizer: req.user?.userId })
      .populate('category', 'name slug icon')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Your activities retrieved successfully', activities);
  } catch (error) {
    next(error);
  }
};

export const getMyParticipations = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const participations = await ActivityParticipant.find({
      user: req.user?.userId,
      status: { $in: ['accepted', 'pending'] },
    }).populate({
      path: 'activity',
      populate: [
        { path: 'organizer', select: 'fullName username' },
        { path: 'category', select: 'name slug icon' },
      ],
    });

    const activities = participations.map((p) => p.activity);

    return sendSuccess(res, 200, 'Your participations retrieved successfully', activities);
  } catch (error) {
    next(error);
  }
};

export const searchActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { query } = req.query;

    if (!query) {
      return sendError(res, 400, 'Search query is required');
    }

    const activities = await Activity.find({
      status: 'open',
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query as string, 'i')] } },
      ],
    })
      .populate('organizer', 'fullName username')
      .populate('category', 'name slug icon')
      .limit(20);

    return sendSuccess(res, 200, 'Search results retrieved successfully', activities);
  } catch (error) {
    next(error);
  }
};
