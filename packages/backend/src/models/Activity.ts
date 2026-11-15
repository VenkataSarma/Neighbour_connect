import mongoose, { Document, Schema, Types } from 'mongoose';

export type ActivityStatus = 'draft' | 'open' | 'full' | 'cancelled' | 'completed' | 'expired';
export type ParticipationType = 'open' | 'approval' | 'invite';

export interface IActivity extends Document {
  title: string;
  description: string;
  category: Types.ObjectId;
  categoryName: string;
  subcategory?: string;
  image?: string;
  organizer: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime?: string;
  city: string;
  locality: string;
  venue?: string;
  meetingPoint?: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  maxParticipants: number;
  currentParticipants: number;
  participationType: ParticipationType;
  visibility: 'public' | 'restricted';
  additionalInfo?: string;
  status: ActivityStatus;
  cancelReason?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    title: {
      type: String,
      required: [true, 'Activity title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    categoryName: { type: String, required: true },
    subcategory: { type: String, trim: true },
    image: { type: String },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Organizer is required'],
    },
    date: {
      type: Date,
      required: [true, 'Activity date is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
    },
    endTime: {
      type: String,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
    },
    city: { type: String, required: true, trim: true },
    locality: { type: String, required: true, trim: true },
    venue: { type: String, trim: true, maxlength: 200 },
    meetingPoint: { type: String, trim: true, maxlength: 200 },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [78.4867, 17.3850],
      },
    },
    maxParticipants: {
      type: Number,
      required: [true, 'Maximum participants is required'],
      min: [2, 'Must allow at least 2 participants'],
      max: [1000, 'Maximum participants cannot exceed 1000'],
    },
    currentParticipants: { type: Number, default: 0, min: 0 },
    participationType: {
      type: String,
      enum: ['open', 'approval', 'invite'],
      default: 'open',
    },
    visibility: {
      type: String,
      enum: ['public', 'restricted'],
      default: 'public',
    },
    additionalInfo: { type: String, maxlength: 500 },
    status: {
      type: String,
      enum: ['draft', 'open', 'full', 'cancelled', 'completed', 'expired'],
      default: 'open',
    },
    cancelReason: { type: String, maxlength: 500 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

activitySchema.index({ location: '2dsphere' });
activitySchema.index({ status: 1, date: 1 });
activitySchema.index({ organizer: 1 });
activitySchema.index({ category: 1, status: 1 });
activitySchema.index({ city: 1, status: 1 });
activitySchema.index({ title: 'text', description: 'text', tags: 'text' });

const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export default Activity;
