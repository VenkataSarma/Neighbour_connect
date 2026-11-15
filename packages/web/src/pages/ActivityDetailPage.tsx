import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';

export const ActivityDetailPage = () => {
  const { id: _id } = useParams();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Activity Image */}
      <div className="aspect-video bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="success">Open</Badge>
            <Badge variant="info">Sports & Fitness</Badge>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text)]">Morning Run in Jubilee Hills</h1>
        </div>
        <Button>Join Activity</Button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="md">
          <div className="flex items-center gap-3">
            <Calendar className="text-[var(--accent)]" size={20} />
            <div>
              <div className="text-sm text-[var(--text-secondary)]">Date & Time</div>
              <div className="font-medium text-[var(--text)]">Tomorrow, 6:00 AM</div>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <MapPin className="text-[var(--accent)]" size={20} />
            <div>
              <div className="text-sm text-[var(--text-secondary)]">Location</div>
              <div className="font-medium text-[var(--text)]">Jubilee Hills Park</div>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <Users className="text-[var(--accent)]" size={20} />
            <div>
              <div className="text-sm text-[var(--text-secondary)]">Participants</div>
              <div className="font-medium text-[var(--text)]">3 / 5 joined</div>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <Clock className="text-[var(--accent)]" size={20} />
            <div>
              <div className="text-sm text-[var(--text-secondary)]">Duration</div>
              <div className="font-medium text-[var(--text)]">1 hour</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Description */}
      <Card padding="lg">
        <h2 className="text-xl font-semibold text-[var(--text)] mb-4">About This Activity</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Join us for a refreshing morning run through the beautiful streets of Jubilee Hills. This is a beginner-friendly run covering approximately 5 kilometers. We'll maintain a comfortable pace and take breaks as needed. Perfect for anyone looking to start their day with some exercise and meet like-minded people!
        </p>
      </Card>

      {/* Organizer */}
      <Card padding="lg">
        <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Organized By</h2>
        <div className="flex items-center gap-4">
          <Avatar size="lg" fallback="John Doe" />
          <div className="flex-1">
            <div className="font-semibold text-[var(--text)]">John Doe</div>
            <div className="text-sm text-[var(--text-secondary)]">Running enthusiast • 15 activities organized</div>
          </div>
          <Button variant="outline" size="sm">View Profile</Button>
        </div>
      </Card>

      {/* Participants */}
      <Card padding="lg">
        <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Participants (3)</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Avatar size="md" fallback={`User ${i}`} />
              <div className="flex-1">
                <div className="font-medium text-[var(--text)]">User {i}</div>
                <div className="text-sm text-[var(--text-secondary)]">Joined 2 days ago</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button fullWidth>Join This Activity</Button>
        <Button variant="outline">Share</Button>
      </div>
    </div>
  );
};
