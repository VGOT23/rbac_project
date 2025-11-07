/**
 * MongoDB Connection Test Script
 * 
 * This script tests if your MongoDB connection is working.
 * Run this before starting the server to verify your .env configuration.
 * 
 * Usage: node test-connection.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

console.log('\n🧪 Testing MongoDB Connection...\n');
console.log('═══════════════════════════════════════════════');

// Check if .env variables are loaded
console.log('📋 Configuration Check:');
console.log(`   PORT: ${process.env.PORT || '❌ Not found'}`);
console.log(`   MONGO_URI: ${process.env.MONGO_URI ? '✅ Found' : '❌ Not found'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Found' : '❌ Not found'}`);
console.log('═══════════════════════════════════════════════\n');

if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI not found in .env file!\n');
  console.log('Solution:');
  console.log('1. Create a .env file in the backend folder');
  console.log('2. Add: MONGO_URI=your_mongodb_connection_string\n');
  console.log('See MONGODB_ATLAS_SETUP.md for detailed instructions.\n');
  process.exit(1);
}

console.log('🔄 Attempting to connect to MongoDB...\n');

// Set timeout for connection attempt
const timeout = setTimeout(() => {
  console.error('❌ Connection timeout after 10 seconds');
  console.log('\nPossible issues:');
  console.log('  - MongoDB service not running (if local)');
  console.log('  - Firewall blocking connection');
  console.log('  - Wrong connection string');
  console.log('  - IP not whitelisted (if using Atlas)\n');
  process.exit(1);
}, 10000);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    clearTimeout(timeout);
    console.log('✅ SUCCESS! MongoDB connected successfully!\n');
    console.log('═══════════════════════════════════════════════');
    console.log('📊 Connection Details:');
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Port: ${mongoose.connection.port}`);
    console.log('═══════════════════════════════════════════════\n');
    
    console.log('🎉 Your MongoDB connection is working!\n');
    console.log('Next steps:');
    console.log('  1. Run: npm run seed    (create demo users)');
    console.log('  2. Run: npm run dev     (start the server)\n');
    
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    clearTimeout(timeout);
    console.error('❌ FAILED! MongoDB connection error:\n');
    console.error(`   Error: ${error.message}\n`);
    
    // Provide specific solutions based on error type
    if (error.message.includes('Authentication failed')) {
      console.log('💡 Solution:');
      console.log('   - Check username and password in MONGO_URI');
      console.log('   - Verify user exists in MongoDB Atlas → Database Access\n');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 Solution:');
      console.log('   - Start MongoDB service: net start MongoDB');
      console.log('   - Or run: mongod');
      console.log('   - Check if MongoDB is installed\n');
    } else if (error.message.includes('querySrv ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('💡 Solution:');
      console.log('   - Check internet connection');
      console.log('   - Verify connection string is correct');
      console.log('   - Try using MongoDB Atlas (see MONGODB_ATLAS_SETUP.md)\n');
    } else if (error.message.includes('ETIMEDOUT')) {
      console.log('💡 Solution:');
      console.log('   - Check internet connection');
      console.log('   - Whitelist IP in MongoDB Atlas → Network Access');
      console.log('   - Add 0.0.0.0/0 to allow all IPs (for testing)\n');
    } else {
      console.log('💡 For help, see:');
      console.log('   - MONGODB_ATLAS_SETUP.md (for cloud setup)');
      console.log('   - TEST_MONGODB_CONNECTION.md (for troubleshooting)\n');
    }
    
    process.exit(1);
  });






