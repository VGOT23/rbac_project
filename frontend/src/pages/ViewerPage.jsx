/**
 * Viewer Page
 * 
 * Read-only page accessible to all authenticated users.
 * Displays all published posts with filtering options.
 */

import { useState, useEffect } from 'react';
import apiClient from '../api/client';

const ViewerPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, filterStatus]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/posts');
      setPosts(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((post) => post.status === filterStatus);
    }

    setFilteredPosts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md text-center">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📚 Browse Posts
          </h1>
          <p className="text-gray-600">
            Explore all published content
          </p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, content, or author..."
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔖 Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Total Posts</div>
            <div className="text-3xl font-bold text-gray-900">{posts.length}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Published</div>
            <div className="text-3xl font-bold text-green-600">
              {posts.filter((p) => p.status === 'published').length}
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Showing</div>
            <div className="text-3xl font-bold text-primary-600">
              {filteredPosts.length}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Posts Found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No posts have been created yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="card hover:shadow-xl transition-shadow cursor-pointer group"
              >
                {/* Post Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Post Footer */}
                <div className="border-t pt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <span className="text-lg mr-1">👤</span>
                      {post.author.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        post.author.role === 'admin'
                          ? 'bg-red-100 text-red-800'
                          : post.author.role === 'editor'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {post.author.role}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <span className="text-lg mr-1">📅</span>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Full Content Toggle (Optional Enhancement) */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium">
                    Read more →
                  </summary>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-500">
                        📧 Author Email: {post.author.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        ⏰ Last Updated: {new Date(post.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 card bg-blue-50 border border-blue-200">
          <div className="flex items-start">
            <div className="text-3xl mr-4">👀</div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Viewer Access
              </h3>
              <p className="text-gray-700">
                You have read-only access to all posts. To create or edit posts,
                you need Editor or Admin privileges. Contact your administrator
                to request a role change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;

