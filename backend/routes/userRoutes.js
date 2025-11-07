/**
 * User Routes
 * 
 * Defines routes for user management (Admin only).
 * Allows admins to view all users, update roles, and delete users.
 */

const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');

// All routes require authentication and admin role
router.use(protect);
router.use(checkRole(['admin']));

// Get all users
router.get('/', getAllUsers);

// Get single user
router.get('/:id', getUserById);

// Update user role
router.patch('/:id/role', updateUserRole);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;

