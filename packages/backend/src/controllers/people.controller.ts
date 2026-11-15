import { Response, NextFunction } from 'express';
import UserProfile from '../models/UserProfile';
import UserBlock from '../models/UserBlock';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { getPagination, getPaginationMeta } from '../utils/pagination';

export const discoverPeople = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const { page, limit, skip } = getPagination(req.query);
    const { interests, skills, city, locality, longitude, latitude, radius = 10000, query } = req.query;

    // Get blocked users
    const blockedUsers = await UserBlock.find({
      $or: [{ blocker: userId }, { blocked: userId }],
    });
    const blockedUserIds = [
      ...blockedUsers.map((b) => b.blocked.toString()),
      ...blockedUsers.map((b) => b.blocker.toString()),
    ];

    const filter: any = {
      user: { $ne: userId, $nin: blockedUserIds },
      isDiscoverable: true,
    };

    // Search query - search across bio, occupation, interests, hobbies, skills
    if (query) {
      const searchRegex = new RegExp(query as string, 'i');
      filter.$or = [
        { bio: searchRegex },
        { occupation: searchRegex },
        { interests: { $in: [searchRegex] } },
        { hobbies: { $in: [searchRegex] } },
        { skills: { $in: [searchRegex] } },
      ];
    }

    // Filter by interests
    if (interests) {
      const interestArray = Array.isArray(interests) ? interests : [interests];
      filter.interests = { $in: interestArray };
    }

    // Filter by skills
    if (skills) {
      const skillArray = Array.isArray(skills) ? skills : [skills];
      filter.skills = { $in: skillArray };
    }

    // Filter by location
    if (city) filter.city = city;
    if (locality) filter.locality = locality;

    // Geospatial query if coordinates provided
    if (longitude && latitude) {
      filter.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude as string), parseFloat(latitude as string)],
          },
          $maxDistance: parseInt(radius as string, 10),
        },
      };
    }

    const total = await UserProfile.countDocuments(filter);
    const profiles = await UserProfile.find(filter)
      .populate('user', 'fullName username')
      .skip(skip)
      .limit(limit);

    const meta = getPaginationMeta(total, page, limit);

    return sendSuccess(res, 200, 'People discovered successfully', profiles, meta);
  } catch (error) {
    next(error);
  }
};

export const searchPeople = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const { query } = req.query;

    if (!query) {
      return sendError(res, 400, 'Search query is required');
    }

    // Get blocked users
    const blockedUsers = await UserBlock.find({
      $or: [{ blocker: userId }, { blocked: userId }],
    });
    const blockedUserIds = [
      ...blockedUsers.map((b) => b.blocked.toString()),
      ...blockedUsers.map((b) => b.blocker.toString()),
    ];

    const profiles = await UserProfile.find({
      user: { $ne: userId, $nin: blockedUserIds },
      isDiscoverable: true,
      $or: [
        { occupation: { $regex: query, $options: 'i' } },
        { interests: { $in: [new RegExp(query as string, 'i')] } },
        { hobbies: { $in: [new RegExp(query as string, 'i')] } },
        { skills: { $in: [new RegExp(query as string, 'i')] } },
      ],
    })
      .populate('user', 'fullName username')
      .limit(20);

    return sendSuccess(res, 200, 'Search results retrieved successfully', profiles);
  } catch (error) {
    next(error);
  }
};

export const blockUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const blockerId = req.user?.userId;
    const blockedId = req.params.userId;

    if (blockerId === blockedId) {
      return sendError(res, 400, 'Cannot block yourself');
    }

    // Check if already blocked
    const existingBlock = await UserBlock.findOne({
      blocker: blockerId,
      blocked: blockedId,
    });

    if (existingBlock) {
      return sendError(res, 400, 'User is already blocked');
    }

    const block = await UserBlock.create({
      blocker: blockerId,
      blocked: blockedId,
    });

    return sendSuccess(res, 201, 'User blocked successfully', block);
  } catch (error) {
    next(error);
  }
};

export const unblockUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const blockerId = req.user?.userId;
    const blockedId = req.params.userId;

    const block = await UserBlock.findOneAndDelete({
      blocker: blockerId,
      blocked: blockedId,
    });

    if (!block) {
      return sendError(res, 404, 'Block not found');
    }

    return sendSuccess(res, 200, 'User unblocked successfully');
  } catch (error) {
    next(error);
  }
};

export const getBlockedUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;

    const blocks = await UserBlock.find({ blocker: userId })
      .populate({
        path: 'blocked',
        select: 'fullName username',
      })
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Blocked users retrieved successfully', blocks);
  } catch (error) {
    next(error);
  }
};
