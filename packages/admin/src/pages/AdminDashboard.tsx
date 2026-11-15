import React from 'react';
import { Card } from '../../web/src/components/ui/Card'; // Reusing from web if possible, but better to define locally for admin
import { Users, Activity, AlertCircle, CheckCircle } from 'lucide-react';

// Local Card for Admin to avoid complex relative imports
const AdminCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

export const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Active Activities', value: '432', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { label: 'Pending Reports', value: '12', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
    { label: 'Resolved Reports', value: '156', icon: CheckCircle, color: 'text-sky-600', bg: 'bg-sky-100 dark:bg-sky-900/30' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <AdminCard key={stat.label} className="flex items-center gap-4">
            <div className={`${stat.bg} p-3 rounded-lg ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            </div>
          </AdminCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminCard>
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Recent User Registrations</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">U{i}</div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">User {i}</div>
                    <div className="text-xs text-slate-500">user{i}@example.com</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">2 hours ago</div>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">System Health</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">CPU Usage</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[24%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Memory Usage</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full w-[42%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">DB Connections</span>
                <span className="font-medium">15/100</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[15%]" />
              </div>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
};
