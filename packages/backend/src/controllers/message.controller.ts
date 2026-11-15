import { Response, NextFunction } from 'express';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { getPagination, getPaginationMeta } from '../utils/pagination';

export const getConversations = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;

    const conversations = await Conversation.find({
      participants: userId,
      isActive: true,
    })
      .populate('participants', 'fullName username')
      .populate('activity', 'title')
      .populate({
        path: 'lastMessage',
        populate: { path: 'sender', select: 'fullName username' },
      })
      .sort({ lastMessageAt: -1 });

    // Calculate unread count for each conversation
    const conversationsWithUnread = conversations.map((conv) => {
      const unreadCount = conv.unreadCounts.get(userId!) || 0;
      return {
        ...conv.toObject(),
        unreadCount,
      };
    });

    return sendSuccess(res, 200, 'Conversations retrieved successfully', conversationsWithUnread);
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const conversationId = req.params.id;
    const { page, limit, skip } = getPagination(req.query);

    const conversation = await Conversation.findById(conversationId)
      .populate('participants', 'fullName username')
      .populate('activity', 'title');

    if (!conversation) {
      return sendError(res, 404, 'Conversation not found');
    }

    // Verify user is a participant
    if (!conversation.participants.some((p: any) => p._id.toString() === userId)) {
      return sendError(res, 403, 'You are not a participant in this conversation');
    }

    // Get messages
    const total = await Message.countDocuments({ conversation: conversationId, isDeleted: false });
    const messages = await Message.find({ conversation: conversationId, isDeleted: false })
      .populate('sender', 'fullName username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const meta = getPaginationMeta(total, page, limit);

    return sendSuccess(res, 200, 'Conversation retrieved successfully', {
      conversation,
      messages,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const conversationId = req.params.id;
    const { content, type = 'text', imageUrl } = req.body;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return sendError(res, 404, 'Conversation not found');
    }

    // Verify user is a participant
    if (!conversation.participants.some((p) => p.toString() === userId)) {
      return sendError(res, 403, 'You are not a participant in this conversation');
    }

    // Create message
    const message = await Message.create({
      conversation: conversationId,
      sender: userId,
      content,
      type,
      imageUrl,
      readBy: [userId],
    });

    // Update conversation
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = new Date();

    // Increment unread counts for other participants
    conversation.participants.forEach((participantId) => {
      if (participantId.toString() !== userId) {
        const currentCount = conversation.unreadCounts.get(participantId.toString()) || 0;
        conversation.unreadCounts.set(participantId.toString(), currentCount + 1);
      }
    });

    await conversation.save();

    const populatedMessage = await Message.findById(message._id).populate('sender', 'fullName username');

    // Socket.IO emit would happen here in real implementation

    return sendSuccess(res, 201, 'Message sent successfully', populatedMessage);
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
    const conversationId = req.params.id;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return sendError(res, 404, 'Conversation not found');
    }

    // Verify user is a participant
    if (!conversation.participants.some((p) => p.toString() === userId)) {
      return sendError(res, 403, 'You are not a participant in this conversation');
    }

    // Mark all messages as read by this user
    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: userId },
        readBy: { $ne: userId },
      },
      { $addToSet: { readBy: userId } }
    );

    // Reset unread count
    conversation.unreadCounts.set(userId!, 0);
    await conversation.save();

    return sendSuccess(res, 200, 'Messages marked as read');
  } catch (error) {
    next(error);
  }
};

export const startDirectConversation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.user?.userId;
    const otherUserId = req.params.userId;

    if (userId === otherUserId) {
      return sendError(res, 400, 'Cannot start conversation with yourself');
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      type: 'direct',
      participants: { $all: [userId, otherUserId], $size: 2 },
    })
      .populate('participants', 'fullName username')
      .populate({
        path: 'lastMessage',
        populate: { path: 'sender', select: 'fullName username' },
      });

    if (!conversation) {
      // Create new conversation
      conversation = await Conversation.create({
        type: 'direct',
        participants: [userId, otherUserId],
        isActive: true,
      });

      conversation = await Conversation.findById(conversation._id)
        .populate('participants', 'fullName username');
    }

    return sendSuccess(res, 200, 'Conversation retrieved successfully', conversation);
  } catch (error) {
    next(error);
  }
};

export const getOrCreateActivityConversation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const activityId = req.params.activityId;

    let conversation = await Conversation.findOne({
      type: 'activity_group',
      activity: activityId,
    })
      .populate('participants', 'fullName username')
      .populate('activity', 'title');

    if (!conversation) {
      return sendError(res, 404, 'Activity conversation not found');
    }

    return sendSuccess(res, 200, 'Activity conversation retrieved successfully', conversation);
  } catch (error) {
    next(error);
  }
};
