/**
 * Database Seeding Script
 * 
 * Creates default users with different roles for testing:
 * - Admin user
 * - Editor user
 * - Viewer user
 * 
 * Usage: npm run seed
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Post = require('../models/Post');

// Load environment variables
dotenv.config();

// Default users to seed
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Editor User',
    email: 'editor@example.com',
    password: 'editor123',
    role: 'editor',
  },
  {
    name: 'Viewer User',
    email: 'viewer@example.com',
    password: 'viewer123',
    role: 'viewer',
  },
];

/**
 * Seed database with default users
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data
    console.log('🗑️  Clearing existing users and posts...');
    await User.deleteMany();
    await Post.deleteMany();
    console.log('✅ Existing data cleared');

    // Create users
    console.log('👥 Creating default users...');
    const createdUsers = await User.create(users);
    console.log('✅ Users created successfully');

    // Display created users
    console.log('\n📋 Default Users:');
    console.log('═══════════════════════════════════════════════');
    createdUsers.forEach((user) => {
      console.log(`
Role:     ${user.role.toUpperCase()}
Name:     ${user.name}
Email:    ${user.email}
Password: ${users.find((u) => u.email === user.email).password}
      `);
    });
    console.log('═══════════════════════════════════════════════');

    // Create sample posts
    console.log('\n📝 Creating sample posts...');
    const adminUser = createdUsers.find((u) => u.role === 'admin');
    const editorUser = createdUsers.find((u) => u.role === 'editor');

    const posts = [
      {
        title: 'Welcome to RBAC System',
        content: 'This is a sample post created by the admin user. This demonstrates the role-based access control system.',
        author: adminUser._id,
        status: 'published',
      },
      {
        title: 'Getting Started with Roles',
        content: 'Learn about different user roles: Admin, Editor, and Viewer. Each role has specific permissions.',
        author: adminUser._id,
        status: 'published',
      },
      {
        title: 'My First Article',
        content: 'This is a sample article created by an editor. Editors can create and manage their own posts.',
        author: editorUser._id,
        status: 'published',
      },
      {
        title: 'Draft Post',
        content: 'This is a draft post that is not yet published.',
        author: editorUser._id,
        status: 'draft',
      },
    ];

    await Post.create(posts);
    console.log('✅ Sample posts created successfully');

    console.log('\n✅ Database seeded successfully!');
    console.log('🎉 You can now start the server and login with the above credentials');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();

