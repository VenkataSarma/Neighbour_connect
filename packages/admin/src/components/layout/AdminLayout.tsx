import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Activity,
  Category,
  AlertCircle,
  Settings,
  LogOut
} from 'lucide-react';
import { Outlet, useNavigate, Link } from 'react-router-dom';

export const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: Activity, label: 'Activity Moderation', path: '/admin/activities' },
    { icon: Category, label: 'Categories', path: '/admin/categories' },
    { icon: AlertCircle, label: 'Reports', path: '/admin/reports' },
    { icon: Settings, label: 'System Settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <div className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && <span className="text-xl font-bold text-slate-900 dark:text-white">NC Admin</span>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <Settings size={20} className="text-slate-500" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 p-3 w-full rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Admin Control Panel</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-slate-900 dark:text-white">Super Admin</div>
              <div className="text-xs text-slate-500">admin@neighbourhood.com</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">SA</div>
          </div>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
