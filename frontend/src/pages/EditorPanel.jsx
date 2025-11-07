/**
 * Editor Panel Page
 * 
 * Page for editors and admins to create and manage posts.
 * Editors can only edit/delete their own posts, admins can manage all posts.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/client';

const EditorPanel = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/posts', formData);
      setSuccessMessage('Post created successfully!');
      setShowCreateForm(false);
      setFormData({ title: '', content: '', status: 'draft' });
      fetchPosts();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/posts/${editingPost._id}`, formData);
      setSuccessMessage('Post updated successfully!');
      setEditingPost(null);
      setFormData({ title: '', content: '', status: 'draft' });
      fetchPosts();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      status: post.status,
    });
    setShowCreateForm(false);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await apiClient.delete(`/posts/${postId}`);
      setSuccessMessage('Post deleted successfully!');
      fetchPosts();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
      setTimeout(() => setError(''), 3000);
    }
  };

  const canEdit = (post) => {
    return user?.role === 'admin' || post.author._id === user?.id;
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setShowCreateForm(false);
    setFormData({ title: '', content: '', status: 'draft' });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ✍️ Editor Panel
            </h1>
            <p className="text-gray-600">
              Create and manage your posts
            </p>
          </div>
          {!showCreateForm && !editingPost && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary"
            >
              ➕ Create New Post
            </button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-fade-in">
            ✅ {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
            ❌ {error}
          </div>
        )}

        {/* Create/Edit Form */}
        {(showCreateForm || editingPost) && (
          <div className="card mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingPost ? '✏️ Edit Post' : '➕ Create New Post'}
            </h2>
            <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="input"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="8"
                    className="input"
                    placeholder="Write your post content here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary">
                    {editingPost ? '💾 Update Post' : '✨ Create Post'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="btn-secondary"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">All Posts</h2>
          
          {posts.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 text-lg">No posts yet. Create your first post!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👤 {post.author.name}</span>
                      <span>📧 {post.author.email}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status}
                      </span>
                      <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {canEdit(post) && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(post)}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;

