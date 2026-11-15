export interface User {
  _id: string
  email: string
  fullName: string
  username: string
  role: 'user' | 'admin'
  isEmailVerified: boolean
  profile?: UserProfile
}

export interface UserProfile {
  _id: string
  user: string
  profilePhoto?: string
  bio?: string
  occupation?: string
  city: string
  locality: string
  interests: string[]
  hobbies: string[]
  skills: string[]
  languages: string[]
  availability: Record<string, boolean>
  preferredCategories: string[]
  isDiscoverable: boolean
  onboardingCompleted: boolean
  onboardingStep: number
  connectionsCount: number
  activitiesCreated: number
  activitiesJoined: number
  reputation: number
}

export interface Activity {
  _id: string
  title: string
  description: string
  category: Category | string
  categoryName: string
  subcategory?: string
  image?: string
  organizer: User
  date: string
  startTime: string
  endTime?: string
  city: string
  locality: string
  venue?: string
  meetingPoint?: string
  maxParticipants: number
  currentParticipants: number
  participationType: 'open' | 'approval' | 'invite'
  visibility: 'public' | 'restricted'
  status: 'draft' | 'open' | 'full' | 'cancelled' | 'completed' | 'expired'
  tags: string[]
  distance?: number
  userParticipationStatus?: ParticipantStatus | null
  createdAt: string
  updatedAt: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  icon: string
  subcategories: { name: string; slug: string; isActive: boolean }[]
  isActive: boolean
}

export type ParticipantStatus =
  | 'interested'
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'cancelled'
  | 'left'
  | 'completed'

export interface Participant {
  _id: string
  activity: string
  user: User
  status: ParticipantStatus
  message?: string
  createdAt: string
}

export interface Message {
  _id: string
  conversation: string
  sender: User
  content: string
  type: 'text' | 'image' | 'system'
  imageUrl?: string
  readBy: string[]
  isDeleted: boolean
  createdAt: string
}

export interface Conversation {
  _id: string
  type: 'direct' | 'activity_group'
  participants: User[]
  activity?: Activity
  lastMessage?: Message
  lastMessageAt: string
  unreadCount: number
}

export interface Notification {
  _id: string
  type: string
  title: string
  body: string
  data: {
    activityId?: string
    conversationId?: string
    userId?: string
  }
  isRead: boolean
  sender?: User
  createdAt: string
}

export interface Connection {
  _id: string
  requester: User
  recipient: User
  status: 'pending' | 'accepted' | 'rejected' | 'blocked'
  createdAt: string
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  meta?: PaginationMeta
}

export interface AuthUser extends User {
  accessToken: string
}

export interface ActivityFilters {
  category?: string
  subcategory?: string
  dateFrom?: string
  dateTo?: string
  status?: string
  participationType?: string
  search?: string
  sort?: string
  page?: number
  limit?: number
  lat?: number
  lng?: number
  radius?: number
}

export interface PeopleFilters {
  interests?: string[]
  city?: string
  locality?: string
  skills?: string[]
  search?: string
  page?: number
}
