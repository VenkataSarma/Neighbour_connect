import { Response, NextFunction } from 'express';
import Report from '../models/Report';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const reportUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const reporterId = req.user?.userId;
    const { userId, reason, description } = req.body;

    if (reporterId === userId) {
      return sendError(res, 400, 'Cannot report yourself');
    }

    const report = await Report.create({
      reporter: reporterId,
      reportedUser: userId,
      reason,
      description,
      status: 'pending',
    });

    return sendSuccess(res, 201, 'User reported successfully', report);
  } catch (error) {
    next(error);
  }
};

export const reportActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const reporterId = req.user?.userId;
    const { activityId, reason, description } = req.body;

    const report = await Report.create({
      reporter: reporterId,
      reportedActivity: activityId,
      reason,
      description,
      status: 'pending',
    });

    return sendSuccess(res, 201, 'Activity reported successfully', report);
  } catch (error) {
    next(error);
  }
};

export const getReports = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { status, type } = req.query;

    const filter: any = {};
    if (status) filter.status = status;

    if (type === 'user') {
      filter.reportedUser = { $exists: true };
    } else if (type === 'activity') {
      filter.reportedActivity = { $exists: true };
    }

    const reports = await Report.find(filter)
      .populate('reporter', 'fullName username')
      .populate('reportedUser', 'fullName username')
      .populate('reportedActivity', 'title')
      .populate('resolvedBy', 'fullName username')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Reports retrieved successfully', reports);
  } catch (error) {
    next(error);
  }
};

export const resolveReport = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const reportId = req.params.id;
    const { status, resolution } = req.body;

    if (!['reviewed', 'resolved', 'dismissed'].includes(status)) {
      return sendError(res, 400, 'Invalid status');
    }

    const report = await Report.findByIdAndUpdate(
      reportId,
      {
        $set: {
          status,
          resolution,
          resolvedBy: req.user?.userId,
        },
      },
      { new: true }
    )
      .populate('reporter', 'fullName username')
      .populate('reportedUser', 'fullName username')
      .populate('reportedActivity', 'title');

    if (!report) {
      return sendError(res, 404, 'Report not found');
    }

    return sendSuccess(res, 200, 'Report resolved successfully', report);
  } catch (error) {
    next(error);
  }
};
