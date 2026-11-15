import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IAvailability {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  night: boolean;
}

export interface IUserProfile extends Document {
  user: Types.ObjectId;
  profilePhoto?: string;
  bio?: string;
  dateOfBirth?: Date;
  occupation?: string;
  city: string;
  locality: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  interests: string[];
  hobbies: string[];
  skills: string[];
  languages: string[];
  availability: IAvailability;
  preferredCategories: string[];
  isDiscoverable: boolean;
  profileVisibility: 'public' | 'connections' | 'private';
  onboardingCompleted: boolean;
  onboardingStep: number;
  connectionsCount: number;
  activitiesCreated: number;
  activitiesJoined: number;
  reputation: number;
  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    profilePhoto: { type: String },
    bio: { type: String, maxlength: [300, 'Bio cannot exceed 300 characters'] },
    dateOfBirth: { type: Date },
    occupation: { type: String, trim: true, maxlength: 100 },
    city: { type: String, required: true, trim: true },
    locality: { type: String, required: false, trim: true, default: '' },
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
    interests: { type: [String], default: [] },
    hobbies: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    availability: {
      monday: { type: Boolean, default: false },
      tuesday: { type: Boolean, default: false },
      wednesday: { type: Boolean, default: false },
      thursday: { type: Boolean, default: false },
      friday: { type: Boolean, default: false },
      saturday: { type: Boolean, default: true },
      sunday: { type: Boolean, default: true },
      morning: { type: Boolean, default: false },
      afternoon: { type: Boolean, default: false },
      evening: { type: Boolean, default: true },
      night: { type: Boolean, default: false },
    },
    preferredCategories: { type: [String], default: [] },
    isDiscoverable: { type: Boolean, default: true },
    profileVisibility: {
      type: String,
      enum: ['public', 'connections', 'private'],
      default: 'public',
    },
    onboardingCompleted: { type: Boolean, default: false },
    onboardingStep: { type: Number, default: 1 },
    connectionsCount: { type: Number, default: 0 },
    activitiesCreated: { type: Number, default: 0 },
    activitiesJoined: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userProfileSchema.index({ location: '2dsphere' });
userProfileSchema.index({ user: 1 });
userProfileSchema.index({ city: 1, isDiscoverable: 1 });
userProfileSchema.index({ interests: 1 });

const UserProfile = mongoose.model<IUserProfile>('UserProfile', userProfileSchema);
export default UserProfile;
