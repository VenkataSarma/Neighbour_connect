import { Response, NextFunction } from 'express';
import Activity from '../models/Activity';
import ActivityParticipant from '../models/ActivityParticipant';
import Conversation from '../models/Conversation';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const joinActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activityId = req.params.id;
    const userId = req.user?.userId;
    const { message } = req.body;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return sendError(res, 404, 'Activity not found');
    }

    // Check if activity is still open
    if (activity.status !== 'open') {
      return sendError(res, 400, `Cannot join ${activity.status} activity`);
    }

    // Check if organizer
    if (activity.organizer.toString() === userId) {
      return sendError(res, 400, 'Cannot join your own activity');
    }

    // Check if already joined
    const existingParticipant = await ActivityParticipant.findOne({
      activity: activityId,
      user: userId,
    });

    if (existingParticipant) {
      return sendError(res, 400, 'You have already requested to join this activity');
    }

    // Check if activity is full
    if (activity.currentParticipants >= activity.maxParticipants) {
      return sendError(res, 400, 'Activity is full');
    }

    // Determine status based on participation type
    let status: 'pending' | 'accepted' = 'pending';

    if (activity.participationType === 'open') {
      status = 'accepted';
      // Atomically increment participant count
      await Activity.findOneAndUpdate(
        { _id: activityId, currentParticipants: { $lt: activity.maxParticipants } },
        { $inc: { currentParticipants: 1 } }
      );

      // Add to conversation
      await Conversation.findOneAndUpdate(
        { activity: activityId, type: 'activity_group' },
        { $addToSet: { participants: userId } }
      );

      // Check if activity is now full
      const updatedActivity = await Activity.findById(activityId);
      if (updatedActivity && updatedActivity.currentParticipants >= updatedActivity.maxParticipants) {
        updatedActivity.status = 'full';
        await updatedActivity.save();
      }
    }

    // Create participant record
    const participant = await ActivityParticipant.create({
      activity: activityId,
      user: userId,
      status,
      message,
    });

    const populatedParticipant = await ActivityParticipant.findById(participant._id)
      .populate('user', 'fullName username')
      .populate('activity', 'title');

    return sendSuccess(
      res,
      201,
      status === 'accepted' ? 'Successfully joined activity' : 'Join request sent',
      populatedParticipant
    );
  } catch (error) {
    next(error);
  }
};

export const leaveActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activityId = req.params.id;
    const userId = req.user?.userId;

    const participant = await ActivityParticipant.findOne({
      activity: activityId,
      user: userId,
    });

    if (!participant) {
      return sendError(res, 404, 'You are not part of this activity');
    }

    if (participant.status === 'accepted') {
      // Decrement participant count
      await Activity.findByIdAndUpdate(activityId, {
        $inc: { currentParticipants: -1 },
        $set: { status: 'open' },
      });

      // Remove from conversation
      await Conversation.findOneAndUpdate(
        { activity: activityId, type: 'activity_group' },
        { $pull: { participants: userId } }
      );
    }

    participant.status = 'left';
    await participant.save();

    return sendSuccess(res, 200, 'Successfully left activity');
  } catch (error) {
    next(error);
  }
};

export const cancelRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activityId = req.params.id;
    const userId = req.user?.userId;

    const participant = await ActivityParticipant.findOne({
      activity: activityId,
      user: userId,
      status: 'pending',
    });

    if (!participant) {
      return sendError(res, 404, 'No pending request found');
    }

    participant.status = 'cancelled';
    await participant.save();

    return sendSuccess(res, 200, 'Request cancelled successfully');
  } catch (error) {
    next(error);
  }
};

export const approveParticipant = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { activityId, userId } = req.params;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return sendError(res, 404, 'Activity not found');
    }

    // Check if requester is organizer
    if (activity.organizer.toString() !== req.user?.userId) {
      return sendError(res, 403, 'Only the organizer can approve participants');
    }

    // Check if activity is full
    if (activity.currentParticipants >= activity.maxParticipants) {
      return sendError(res, 400, 'Activity is full');
    }

    const participant = await ActivityParticipant.findOne({
      activity: activityId,
      user: userId,
      status: 'pending',
    });

    if (!participant) {
      return sendError(res, 404, 'Pending participant not found');
    }

    // Atomically increment participant count
    const updatedActivity = await Activity.findOneAndUpdate(
      { _id: activityId, currentParticipants: { $lt: activity.maxParticipants } },
      { $inc: { currentParticipants: 1 } },
      { new: true }
    );

    if (!updatedActivity) {
      return sendError(res, 400, 'Activity is now full');
    }

    participant.status = 'accepted';
    participant.respondedAt = new Date();
    await participant.save();

    // Add to conversation
    await Conversation.findOneAndUpdate(
      { activity: activityId, type: 'activity_group' },
      { $addToSet: { participants: userId } }
    );

    // Check if activity is now full
    if (updatedActivity.currentParticipants >= updatedActivity.maxParticipants) {
      updatedActivity.status = 'full';
      await updatedActivity.save();
    }

    return sendSuccess(res, 200, 'Participant approved successfully', participant);
  } catch (error) {
    next(error);
  }
};

export const rejectParticipant = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { activityId, userId } = req.params;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return sendError(res, 404, 'Activity not found');
    }

    if (activity.organizer.toString() !== req.user?.userId) {
      return sendError(res, 403, 'Only the organizer can reject participants');
    }

    const participant = await ActivityParticipant.findOne({
      activity: activityId,
      user: userId,
      status: 'pending',
    });

    if (!participant) {
      return sendError(res, 404, 'Pending participant not found');
    }

    participant.status = 'rejected';
    participant.respondedAt = new Date();
    await participant.save();

    return sendSuccess(res, 200, 'Participant rejected successfully');
  } catch (error) {
    next(error);
  }
};

export const removeParticipant = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { activityId, userId } = req.params;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return sendError(res, 404, 'Activity not found');
    }

    if (activity.organizer.toString() !== req.user?.userId) {
      return sendError(res, 403, 'Only the organizer can remove participants');
    }

    const participant = await ActivityParticipant.findOne({
      activity: activityId,
      user: userId,
      status: 'accepted',
    });

    if (!participant) {
      return sendError(res, 404, 'Accepted participant not found');
    }

    // Decrement participant count
    await Activity.findByIdAndUpdate(activityId, {
      $inc: { currentParticipants: -1 },
      $set: { status: 'open' },
    });

    // Remove from conversation
    await Conversation.findOneAndUpdate(
      { activity: activityId, type: 'activity_group' },
      { $pull: { participants: userId } }
    );

    await participant.deleteOne();

    return sendSuccess(res, 200, 'Participant removed successfully');
  } catch (error) {
    next(error);
  }
};

export const getParticipants = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activityId = req.params.id;

    const participants = await ActivityParticipant.find({
      activity: activityId,
      status: { $in: ['accepted', 'pending'] },
    })
      .populate('user', 'fullName username')
      .sort({ createdAt: 1 });

    return sendSuccess(res, 200, 'Participants retrieved successfully', participants);
  } catch (error) {
    next(error);
  }
};

export const getPendingRequests = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activityId = req.params.id;

    // Verify organizer
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return sendError(res, 404, 'Activity not found');
    }

    if (activity.organizer.toString() !== req.user?.userId) {
      return sendError(res, 403, 'Only the organizer can view pending requests');
    }

    const requests = await ActivityParticipant.find({
      activity: activityId,
      status: 'pending',
    })
      .populate('user', 'fullName username')
      .sort({ createdAt: 1 });

    return sendSuccess(res, 200, 'Pending requests retrieved successfully', requests);
  } catch (error) {
    next(error);
  }
};
