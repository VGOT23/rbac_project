/**
 * Post Routes
 * 
 * Defines routes for post CRUD operations with role-based access control.
 * 
 * Access levels:
 * - GET (all posts, single post): All authenticated users
 * - POST (create): Admin and Editor
 * - PUT (update): Admin (all posts), Editor (own posts)
 * - DELETE: Admin (all posts), Editor (own posts)
 */

const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');

// All routes require authentication
router.use(protect);

// Get all posts (all roles can view)
router.get('/', getAllPosts);

// Get my posts (all roles)
router.get('/my/posts', getMyPosts);

// Get single post (all roles can view)
router.get('/:id', getPostById);

// Create post (admin and editor only)
router.post('/', checkRole(['admin', 'editor']), createPost);

// Update post (admin and editor - ownership checked in controller)
router.put('/:id', checkRole(['admin', 'editor']), updatePost);

// Delete post (admin and editor - ownership checked in controller)
router.delete('/:id', checkRole(['admin', 'editor']), deletePost);

module.exports = router;

