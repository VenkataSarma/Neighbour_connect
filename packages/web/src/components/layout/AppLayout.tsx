import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { useTheme } from '../../store/themeStore';
import { Bell, MessageCircle, Menu, Moon, Sun, User, LogOut, Settings, Calendar, Users, Home } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useState } from 'react';

export const AppLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <span className="text-white font-bold">NC</span>
              </div>
              <span className="font-semibold text-lg hidden sm:block">Neighbourhood Connect</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link to="/activities" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                <Calendar size={20} />
                <span>Activities</span>
              </Link>
              <Link to="/people" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                <Users size={20} />
                <span>People</span>
              </Link>
              <Link to="/messages" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors relative flex items-center gap-2">
                <MessageCircle size={20} />
                <span>Messages</span>
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-[var(--accent-light)] text-[var(--text)] transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link to="/notifications" className="p-2 rounded-lg hover:bg-[var(--accent-light)] text-[var(--text)] transition-colors relative">
                <Bell size={20} />
              </Link>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2"
                >
                  <Avatar src={user?.profile?.profilePhoto} fallback={user?.fullName} size="sm" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg py-1">
                    <Link
                      to={`/profile/${user?._id}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--accent-light)] text-[var(--text)]"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--accent-light)] text-[var(--text)]"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--accent-light)] text-[var(--text)] w-full"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-[var(--accent-light)] text-[var(--text)]"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-[var(--border)] py-2">
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-[var(--accent-light)] text-[var(--text)]">
              Home
            </Link>
            <Link to="/activities" className="block px-4 py-2 hover:bg-[var(--accent-light)] text-[var(--text)]">
              Activities
            </Link>
            <Link to="/people" className="block px-4 py-2 hover:bg-[var(--accent-light)] text-[var(--text)]">
              People
            </Link>
            <Link to="/messages" className="block px-4 py-2 hover:bg-[var(--accent-light)] text-[var(--text)]">
              Messages
            </Link>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
