import React from 'react';

const AdminCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

export const UserManagementPage = () => {
  const users = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
        <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium">Add User</button>
      </div>

      <AdminCard>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-800">
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((i) => (
              <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">U{i}</div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">User {i}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-slate-500">user{i}@example.com</td>
                <td className="py-4 text-sm text-slate-500">User</td>
                <td className="py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Active</span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-xs text-sky-500 hover:underline mr-3">Edit</button>
                  <button className="text-xs text-red-500 hover:underline">Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
};
