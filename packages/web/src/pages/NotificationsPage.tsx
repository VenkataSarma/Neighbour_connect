import { Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';

export const NotificationsPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--text)]">Notifications</h1>
        <Button variant="ghost" size="sm" leftIcon={<Check size={16} />}>
          Mark All Read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {[
          {
            id: 1,
            type: 'activity_join',
            title: 'New participant joined',
            message: 'Sarah joined your activity "Morning Run in Jubilee Hills"',
            time: '5 minutes ago',
            unread: true,
          },
          {
            id: 2,
            type: 'connection_request',
            title: 'New connection request',
            message: 'Mike wants to connect with you',
            time: '1 hour ago',
            unread: true,
            actions: true,
          },
          {
            id: 3,
            type: 'message',
            title: 'New message',
            message: 'You have a new message from John',
            time: '3 hours ago',
            unread: false,
          },
          {
            id: 4,
            type: 'activity_reminder',
            title: 'Activity reminder',
            message: 'Your activity "Morning Run in Jubilee Hills" starts in 12 hours',
            time: '5 hours ago',
            unread: false,
          },
          {
            id: 5,
            type: 'activity_cancelled',
            title: 'Activity cancelled',
            message: 'The organizer cancelled "Weekend Hiking Trip"',
            time: '1 day ago',
            unread: false,
          },
        ].map((notification) => (
          <Card key={notification.id} padding="md" className={notification.unread ? 'border-l-4 border-l-[var(--accent)]' : ''}>
            <div className="flex items-start gap-4">
              <Avatar size="md" fallback="User" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-[var(--text)]">{notification.title}</h3>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">{notification.message}</p>
                <div className="text-xs text-[var(--text-secondary)]">{notification.time}</div>
                {notification.actions && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="primary">Accept</Button>
                    <Button size="sm" variant="outline">Decline</Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State (commented out, to show when no notifications) */}
      {/* <Card padding="lg" className="text-center">
        <Bell size={48} className="mx-auto text-[var(--text-secondary)] mb-4" />
        <h2 className="text-xl font-semibold text-[var(--text)] mb-2">No notifications</h2>
        <p className="text-[var(--text-secondary)]">
          When you get notifications, they'll show up here
        </p>
      </Card> */}
    </div>
  );
};
