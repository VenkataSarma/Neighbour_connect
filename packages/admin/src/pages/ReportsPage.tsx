import React from 'react';

const AdminCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

export const ReportsPage = () => {
  const reports = [
    { id: 'REP-001', user: 'User 1', target: 'Activity #45', reason: 'Inappropriate Content', status: 'Pending', date: '2026-11-05' },
    { id: 'REP-002', user: 'User 5', target: 'User 12', reason: 'Harassment', status: 'In Review', date: '2026-11-04' },
    { id: 'REP-003', user: 'User 2', target: 'Activity #12', reason: 'Spam', status: 'Resolved', date: '2026-11-03' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports Management</h1>

      <AdminCard>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-800">
              <th className="pb-3 font-medium">ID</th>
              <th className="pb-3 font-medium">Reporter</th>
              <th className="pb-3 font-medium">Target</th>
              <th className="pb-3 font-medium">Reason</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-4 text-sm font-mono text-slate-500">{report.id}</td>
                <td className="py-4 text-sm text-slate-900 dark:text-white">{report.user}</td>
                <td className="py-4 text-sm text-slate-500">{report.target}</td>
                <td className="py-4 text-sm text-slate-500">{report.reason}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    report.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                    report.status === 'In Review' ? 'bg-blue-100 text-blue-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-xs text-sky-500 hover:underline">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
};
