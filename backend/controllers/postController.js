/**
 * Post Controller
 * 
 * Handles CRUD operations for posts with role-based permissions:
 * - Admin: Full access to all posts
 * - Editor: Can create posts and edit their own
 * - Viewer: Read-only access
 */

const Post = require('../models/Post');

/**
 * @route   GET /api/posts
 * @desc    Get all posts
 * @access  Private (All roles)
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/posts/:id
 * @desc    Get single post by ID
 * @access  Private (All roles)
 */
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'name email role'
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private (Admin, Editor)
 */
const createPost = async (req, res) => {
  try {
    const { title, content, status } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and content',
      });
    }

    // Create post with current user as author
    const post = await Post.create({
      title,
      content,
      status: status || 'draft',
      author: req.user.id,
    });

    // Populate author details
    await post.populate('author', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message,
    });
  }
};

/**
 * @route   PUT /api/posts/:id
 * @desc    Update a post
 * @access  Private (Admin can edit all, Editor can edit own)
 */
const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check permissions: Admin can edit all, Editor can only edit their own
    if (req.user.role !== 'admin' && post.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own posts',
      });
    }

    // Update post
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('author', 'name email role');

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating post',
      error: error.message,
    });
  }
};

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post
 * @access  Private (Admin can delete all, Editor can delete own)
 */
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check permissions: Admin can delete all, Editor can only delete their own
    if (req.user.role !== 'admin' && post.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own posts',
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/posts/my/posts
 * @desc    Get current user's posts
 * @access  Private (All roles)
 */
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .populate('author', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error('Get my posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching your posts',
      error: error.message,
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
};

