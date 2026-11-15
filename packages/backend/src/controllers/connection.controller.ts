import { Response, NextFunction } from 'express';
import Connection from '../models/Connection';
import UserProfile from '../models/UserProfile';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const sendConnectionRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const requesterId = req.user?.userId;
    const recipientId = req.params.userId;
    const { message } = req.body;

    if (requesterId === recipientId) {
      return sendError(res, 400, 'Cannot send connection request to yourself');
    }

    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { requester: requesterId, recipient: recipientId },
        { requester: recipientId, recipient: requesterId },
      ],
    });

    if (existingConnection) {
      return sendError(res, 400, 'Connection request already exists');
    }

    const connection = await Connection.create({
      requester: requesterId,
      recipient: recipientId,
      status: 'pending',
      message,
    });

    const populatedConnection = await Connection.findById(connection._id)
      .populate('requester', 'fullName username')
      .populate('recipient', 'fullName username');

    return sendSuccess(res, 201, 'Connection request sent successfully', populatedConnection);
  } catch (error) {
    next(error);
  }
};

export const acceptConnection = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const connectionId = req.params.id;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return sendError(res, 404, 'Connection request not found');
    }

    // Verify user is the recipient
    if (connection.recipient.toString() !== userId) {
      return sendError(res, 403, 'You can only accept requests sent to you');
    }

    if (connection.status !== 'pending') {
      return sendError(res, 400, 'Connection request is not pending');
    }

    connection.status = 'accepted';
    await connection.save();

    // Update connection counts
    await UserProfile.findOneAndUpdate(
      { user: connection.requester },
      { $inc: { connectionsCount: 1 } }
    );
    await UserProfile.findOneAndUpdate(
      { user: connection.recipient },
      { $inc: { connectionsCount: 1 } }
    );

    return sendSuccess(res, 200, 'Connection accepted successfully', connection);
  } catch (error) {
    next(error);
  }
};

export const rejectConnection = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const connectionId = req.params.id;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return sendError(res, 404, 'Connection request not found');
    }

    if (connection.recipient.toString() !== userId) {
      return sendError(res, 403, 'You can only reject requests sent to you');
    }

    if (connection.status !== 'pending') {
      return sendError(res, 400, 'Connection request is not pending');
    }

    connection.status = 'rejected';
    await connection.save();

    return sendSuccess(res, 200, 'Connection rejected successfully');
  } catch (error) {
    next(error);
  }
};

export const removeConnection = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const connectionId = req.params.id;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return sendError(res, 404, 'Connection not found');
    }

    const isRequester = connection.requester.toString() === userId;
    const isRecipient = connection.recipient.toString() === userId;

    if (!isRequester && !isRecipient) {
      return sendError(res, 403, 'You can only remove your own connections');
    }

    if (connection.status === 'accepted') {
      // Decrement connection counts
      await UserProfile.findOneAndUpdate(
        { user: connection.requester },
        { $inc: { connectionsCount: -1 } }
      );
      await UserProfile.findOneAndUpdate(
        { user: connection.recipient },
        { $inc: { connectionsCount: -1 } }
      );
    }

    await connection.deleteOne();

    return sendSuccess(res, 200, 'Connection removed successfully');
  } catch (error) {
    next(error);
  }
};

export const getConnections = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;

    const connections = await Connection.find({
      $or: [{ requester: userId }, { recipient: userId }],
      status: 'accepted',
    })
      .populate('requester', 'fullName username')
      .populate('recipient', 'fullName username')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Connections retrieved successfully', connections);
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
    const userId = req.user?.userId;

    const requests = await Connection.find({
      recipient: userId,
      status: 'pending',
    })
      .populate('requester', 'fullName username')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Pending requests retrieved successfully', requests);
  } catch (error) {
    next(error);
  }
};

export const getSentRequests = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;

    const requests = await Connection.find({
      requester: userId,
      status: 'pending',
    })
      .populate('recipient', 'fullName username')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Sent requests retrieved successfully', requests);
  } catch (error) {
    next(error);
  }
};

export const checkConnectionStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const targetUserId = req.params.userId;

    const connection = await Connection.findOne({
      $or: [
        { requester: userId, recipient: targetUserId },
        { requester: targetUserId, recipient: userId },
      ],
    });

    if (!connection) {
      return sendSuccess(res, 200, 'Connection status retrieved', { status: 'none' });
    }

    return sendSuccess(res, 200, 'Connection status retrieved', {
      status: connection.status,
      isRequester: connection.requester.toString() === userId,
    });
  } catch (error) {
    next(error);
  }
};
