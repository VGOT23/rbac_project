/**
 * Navigation Bar Component
 * 
 * Displays navigation links based on user role and authentication status.
 * Shows user info and logout button when authenticated.
 */

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinkClass = (path) => {
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-primary-700 text-white'
        : 'text-gray-300 hover:bg-primary-600 hover:text-white'
    }`;
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'editor':
        return 'bg-blue-500';
      case 'viewer':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <nav className="bg-primary-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold">🔐 RBAC System</span>
            </Link>

            {/* Navigation links */}
            {isAuthenticated && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                  Dashboard
                </Link>

                {user?.role === 'admin' && (
                  <Link to="/admin" className={navLinkClass('/admin')}>
                    Admin Panel
                  </Link>
                )}

                {(user?.role === 'admin' || user?.role === 'editor') && (
                  <Link to="/editor" className={navLinkClass('/editor')}>
                    Editor Panel
                  </Link>
                )}

                <Link to="/viewer" className={navLinkClass('/viewer')}>
                  View Posts
                </Link>
              </div>
            )}
          </div>

          {/* User info and logout */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User info */}
                <div className="text-white text-sm">
                  <div className="font-medium">{user?.name}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-300">{user?.email}</span>
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full ${getRoleBadgeColor(
                        user?.role
                      )}`}
                    >
                      {user?.role}
                    </span>
                  </div>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="bg-white text-primary-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

