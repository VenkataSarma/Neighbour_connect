import { Response, NextFunction } from 'express';
import Notification from '../models/Notification';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { getPagination, getPaginationMeta } from '../utils/pagination';

export const getNotifications = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const { page, limit, skip } = getPagination(req.query);
    const { isRead } = req.query;

    const filter: any = { recipient: userId };
    if (isRead !== undefined) {
      filter.isRead = isRead === 'true';
    }

    const total = await Notification.countDocuments(filter);
    const notifications = await Notification.find(filter)
      .populate('sender', 'fullName username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const meta = getPaginationMeta(total, page, limit);

    return sendSuccess(res, 200, 'Notifications retrieved successfully', notifications, meta);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const notificationId = req.params.id;

    const notification = await Notification.findOne({
      _id: notificationId,
      recipient: userId,
    });

    if (!notification) {
      return sendError(res, 404, 'Notification not found');
    }

    notification.isRead = true;
    await notification.save();

    return sendSuccess(res, 200, 'Notification marked as read', notification);
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;

    await Notification.updateMany(
      { recipient: userId, isRead: false },
      { $set: { isRead: true } }
    );

    return sendSuccess(res, 200, 'All notifications marked as read');
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const notificationId = req.params.id;

    const notification = await Notification.findOne({
      _id: notificationId,
      recipient: userId,
    });

    if (!notification) {
      return sendError(res, 404, 'Notification not found');
    }

    await notification.deleteOne();

    return sendSuccess(res, 200, 'Notification deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const getUnreadCount = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;

    const count = await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });

    return sendSuccess(res, 200, 'Unread count retrieved successfully', { count });
  } catch (error) {
    next(error);
  }
};
