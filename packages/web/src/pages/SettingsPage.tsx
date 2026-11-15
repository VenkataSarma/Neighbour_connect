import { User, Lock, Bell, Shield, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';

export const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)]">Settings</h1>
        <p className="text-[var(--text-secondary)] mt-2">Manage your account preferences and profile</p>
      </div>

      {/* Profile Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-[var(--text)]">
          <User size={20} />
          <h2>Public Profile</h2>
        </div>
        <Card padding="lg">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-4">
              <Avatar size="xl" />
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" placeholder="John Doe" />
              <Input label="Username" placeholder="@johndoe" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Bio</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                  rows={3}
                  placeholder="Tell people about yourself..."
                />
              </div>
              <Input label="City" placeholder="Hyderabad" />
              <Input label="Locality" placeholder="Banjara Hills" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--text)] mb-1.5">Interests (comma separated)</label>
                <Input placeholder="Running, Hiking, Travel, Photography" />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button>Save Profile Changes</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Account Security Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-[var(--text)]">
          <Lock size={20} />
          <h2>Account Security</h2>
        </div>
        <Card padding="lg" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-[var(--text)]">Change Password</h3>
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
              <Button variant="outline" size="sm">Update Password</Button>
            </div>
            <div className="space-y-4 p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
              <h3 className="font-medium text-[var(--text)]">Two-Factor Authentication</h3>
              <p className="text-sm text-[var(--text-secondary)]">Add an extra layer of security to your account by enabling 2FA.</p>
              <Button variant="outline" size="sm">Enable 2FA</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Preferences Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-[var(--text)]">
          <Bell size={20} />
          <h2>Preferences</h2>
        </div>
        <Card padding="lg" className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-[var(--bg)] rounded-lg transition-colors">
            <div>
              <div className="font-medium text-[var(--text)]">Push Notifications</div>
              <div className="text-sm text-[var(--text-secondary)]">Receive alerts about new activities and messages</div>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-[var(--accent)]" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-3 hover:bg-[var(--bg)] rounded-lg transition-colors">
            <div>
              <div className="font-medium text-[var(--text)]">Email Digests</div>
              <div className="text-sm text-[var(--text-secondary)]">Weekly summary of neighbourhood activities</div>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-[var(--accent)]" />
          </div>
          <div className="flex items-center justify-between p-3 hover:bg-[var(--bg)] rounded-lg transition-colors">
            <div>
              <div className="font-medium text-[var(--text)]">Private Profile</div>
              <div className="text-sm text-[var(--text-secondary)]">Only connected people can see your full profile</div>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-[var(--accent)]" />
          </div>
        </Card>
      </section>

      {/* Danger Zone */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-[var(--error)]">
          <Shield size={20} />
          <h2>Danger Zone</h2>
        </div>
        <Card padding="lg" className="border-red-200 dark:border-red-900">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-[var(--text)]">Delete Account</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Permanently remove your account and all your data. This action cannot be undone.
              </p>
            </div>
            <Button variant="danger" leftIcon={<Trash2 size={16} />}>
              Delete Account
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};
