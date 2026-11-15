import mongoose, { Document, Schema } from 'mongoose';

export interface IActivityParticipant extends Document {
  activity: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  status: 'interested' | 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'left' | 'completed';
  message?: string;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activityParticipantSchema = new Schema<IActivityParticipant>(
  {
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: [true, 'Activity is required'],
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true,
    },
    status: {
      type: String,
      enum: ['interested', 'pending', 'accepted', 'rejected', 'cancelled', 'left', 'completed'],
      default: 'pending',
      required: true,
    },
    message: {
      type: String,
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    respondedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user can't join the same activity twice
activityParticipantSchema.index({ activity: 1, user: 1 }, { unique: true });
activityParticipantSchema.index({ user: 1, status: 1 });
activityParticipantSchema.index({ activity: 1, status: 1 });

const ActivityParticipant = mongoose.model<IActivityParticipant>('ActivityParticipant', activityParticipantSchema);
export default ActivityParticipant;
