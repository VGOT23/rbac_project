/**
 * Dashboard Page
 * 
 * Main dashboard accessible to all authenticated users.
 * Displays different content based on user role.
 */

import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const roleFeatures = {
    admin: [
      { title: 'User Management', desc: 'Manage all users and roles', icon: '👥', link: '/admin' },
      { title: 'Full Post Control', desc: 'Create, edit, and delete all posts', icon: '📝', link: '/editor' },
      { title: 'View Content', desc: 'Read all published posts', icon: '📖', link: '/viewer' },
    ],
    editor: [
      { title: 'Create Posts', desc: 'Write and publish new content', icon: '✍️', link: '/editor' },
      { title: 'Edit Own Posts', desc: 'Modify your published posts', icon: '📝', link: '/editor' },
      { title: 'View Content', desc: 'Read all published posts', icon: '📖', link: '/viewer' },
    ],
    viewer: [
      { title: 'View Content', desc: 'Read all published posts', icon: '📖', link: '/viewer' },
      { title: 'Browse Posts', desc: 'Explore available content', icon: '🔍', link: '/viewer' },
    ],
  };

  const features = roleFeatures[user?.role] || [];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'from-red-500 to-red-600';
      case 'editor':
        return 'from-blue-500 to-blue-600';
      case 'viewer':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className={`bg-gradient-to-r ${getRoleColor(user?.role)} rounded-lg shadow-xl p-8 mb-8 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-lg opacity-90">
                You're logged in as <span className="font-semibold uppercase">{user?.role}</span>
              </p>
            </div>
            <div className="text-6xl">
              {user?.role === 'admin' && '👑'}
              {user?.role === 'editor' && '✍️'}
              {user?.role === 'viewer' && '👀'}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="text-4xl mr-4">👤</div>
              <div>
                <p className="text-gray-500 text-sm">Your Role</p>
                <p className="text-2xl font-bold capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="text-4xl mr-4">📧</div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-lg font-semibold truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="text-4xl mr-4">🔐</div>
              <div>
                <p className="text-gray-500 text-sm">Access Level</p>
                <p className="text-lg font-semibold">
                  {user?.role === 'admin' && 'Full Access'}
                  {user?.role === 'editor' && 'Read + Write'}
                  {user?.role === 'viewer' && 'Read Only'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Permissions & Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="card hover:shadow-xl transition-shadow duration-200 cursor-pointer group"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick action for viewing posts */}
            <Link to="/viewer" className="card hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    📚 Browse All Posts
                  </h3>
                  <p className="text-gray-600 text-sm">
                    View all published content
                  </p>
                </div>
                <div className="text-primary-600 text-2xl">→</div>
              </div>
            </Link>

            {/* Quick action for editors and admins */}
            {(user?.role === 'admin' || user?.role === 'editor') && (
              <Link to="/editor" className="card hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      ✏️ Manage Posts
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Create and edit content
                    </p>
                  </div>
                  <div className="text-primary-600 text-2xl">→</div>
                </div>
              </Link>
            )}

            {/* Quick action for admins */}
            {user?.role === 'admin' && (
              <Link to="/admin" className="card hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      👑 Admin Panel
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Manage users and roles
                    </p>
                  </div>
                  <div className="text-primary-600 text-2xl">→</div>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 card bg-blue-50 border border-blue-200">
          <div className="flex items-start">
            <div className="text-3xl mr-4">💡</div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                About Role-Based Access Control
              </h3>
              <p className="text-gray-700">
                This system demonstrates how different user roles have different permissions.
                Your current role (<span className="font-semibold">{user?.role}</span>) determines
                what features and data you can access throughout the application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

