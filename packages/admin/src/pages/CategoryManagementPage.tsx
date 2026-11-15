import React from 'react';

const AdminCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

export const CategoryManagementPage = () => {
  const categories = [
    { name: 'Sports & Fitness', count: 120, icon: '⚽' },
    { name: 'Travel & Exploration', count: 85, icon: '✈️' },
    { name: 'Learning & Education', count: 45, icon: '📚' },
    { name: 'Gaming & Entertainment', count: 210, icon: '🎮' },
    { name: 'Social & Community', count: 180, icon: '🤝' },
    { name: 'Hobbies & Creativity', count: 95, icon: '🎨' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Categories</h1>
        <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium">Add Category</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <AdminCard key={cat.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">{cat.name}</div>
                <div className="text-xs text-slate-500">{cat.count} activities</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-sky-500 transition-colors">Edit</button>
              <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">Delete</button>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
};
