import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserManagementPage } from './pages/UserManagementPage';
import { CategoryManagementPage } from './pages/CategoryManagementPage';
import { ReportsPage } from './pages/ReportsPage';

export const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="categories" element={<CategoryManagementPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="activities" element={<div>Activity Moderation Page (Coming Soon)</div>} />
          <Route path="settings" element={<div>System Settings Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
