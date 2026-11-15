import mongoose, { Document, Schema } from 'mongoose';

export interface IConversation extends Document {
  type: 'direct' | 'activity_group';
  participants: mongoose.Types.ObjectId[];
  activity?: mongoose.Types.ObjectId;
  lastMessage?: mongoose.Types.ObjectId;
  lastMessageAt?: Date;
  unreadCounts: Map<string, number>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    type: {
      type: String,
      enum: ['direct', 'activity_group'],
      required: [true, 'Conversation type is required'],
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({ participants: 1 });
conversationSchema.index({ type: 1, isActive: 1 });
conversationSchema.index({ activity: 1 });
conversationSchema.index({ lastMessageAt: -1 });

const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);
export default Conversation;
