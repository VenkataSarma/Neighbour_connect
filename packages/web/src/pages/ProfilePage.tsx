import { useParams } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import api from '../lib/api';

export const ProfilePage = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const isOwnProfile = userId === user?._id;

  const { data: profile } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data } = await api.get(`/profiles/${userId}`);
      return data.data;
    },
    enabled: !!userId,
  });

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card padding="lg" className="text-center">
          <p className="text-[var(--text-secondary)]">Loading profile...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card padding="lg">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar size="xl" fallback={profile.user?.fullName || 'User'} />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold text-[var(--text)]">{profile.user?.fullName || 'User'}</h1>
                <p className="text-[var(--text-secondary)]">@{profile.user?.username || 'user'}</p>
              </div>
              {isOwnProfile ? (
                <Button variant="outline" size="sm" leftIcon={<MessageCircle size={16} />}>
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" leftIcon={<MessageCircle size={16} />}>
                    Message
                  </Button>
                  <Button size="sm">Connect</Button>
                </div>
              )}
            </div>
            <p className="text-[var(--text-secondary)] mb-4">
              {profile.bio || 'No bio added yet'}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                <MapPin size={16} />
                <span>{profile.city || 'Hyderabad'}, {profile.locality || ''}</span>
              </div>
              <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                <Calendar size={16} />
                <span>Joined {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2026'}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card padding="md" className="text-center">
          <div className="text-2xl font-bold text-[var(--accent)]">{profile.activitiesCreated || 0}</div>
          <div className="text-sm text-[var(--text-secondary)]">Activities Created</div>
        </Card>
        <Card padding="md" className="text-center">
          <div className="text-2xl font-bold text-[var(--accent)]">{profile.activitiesJoined || 0}</div>
          <div className="text-sm text-[var(--text-secondary)]">Activities Joined</div>
        </Card>
        <Card padding="md" className="text-center">
          <div className="text-2xl font-bold text-[var(--accent)]">{profile.connectionsCount || 0}</div>
          <div className="text-sm text-[var(--text-secondary)]">Connections</div>
        </Card>
      </div>

      {/* Interests */}
      <Card padding="lg">
        <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {(profile.interests?.length ? profile.interests : ['No interests added']).map((interest: string) => (
            <Badge key={interest} variant="default">
              {interest}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card padding="lg">
        <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {profile.recentActivities?.length ? (
            profile.recentActivities.map((activity: any) => (
              <div key={activity._id} className="flex items-start gap-4 pb-4 border-b border-[var(--border)] last:border-0">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text)]">{activity.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{activity.date} • {activity.location}</p>
                  <div className="mt-2">
                    <Badge variant="success" size="sm">{activity.status}</Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[var(--text-secondary)] text-center py-4">No recent activities</p>
          )}
        </div>
      </Card>
    </div>
  );
};
