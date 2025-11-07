/**
 * Database Configuration
 * 
 * Establishes connection to MongoDB using Mongoose.
 * Handles connection success and error cases.
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * @returns {Promise} - Mongoose connection promise
 */
const connectDB = async () => {
  try {
    // Connect without deprecated options (Mongoose 6+ doesn't need them)
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;

