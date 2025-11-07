/**
 * Post Model
 * 
 * Defines the Post schema for content management.
 * Links posts to their authors (User model).
 */

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Index for faster queries
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);

