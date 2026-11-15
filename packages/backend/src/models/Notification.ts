import mongoose, { Document, Schema } from 'mongoose';

export type NotificationType =
  | 'join_request'
  | 'request_approved'
  | 'request_rejected'
  | 'activity_joined'
  | 'new_message'
  | 'activity_updated'
  | 'activity_cancelled'
  | 'activity_reminder'
  | 'connection_request'
  | 'connection_accepted'
  | 'mention';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  sender?: mongoose.Types.ObjectId;
  type: NotificationType;
  title: string;
  body: string;
  data: {
    activityId?: string;
    conversationId?: string;
    userId?: string;
    [key: string]: any;
  };
  isRead: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient is required'],
      index: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: [
        'join_request',
        'request_approved',
        'request_rejected',
        'activity_joined',
        'new_message',
        'activity_updated',
        'activity_cancelled',
        'activity_reminder',
        'connection_request',
        'connection_accepted',
        'mention'
      ],
      required: [true, 'Notification type is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    body: {
      type: String,
      required: [true, 'Body is required'],
      maxlength: [500, 'Body cannot exceed 500 characters'],
    },
    data: {
      type: Schema.Types.Mixed,
      default: {},
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, createdAt: -1 });

// TTL index - delete notifications after 90 days
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

const Notification = mongoose.model<INotification>('Notification', notificationSchema);
export default Notification;
