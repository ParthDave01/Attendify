const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Add options to prevent hanging connections
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Fail after 10 seconds if no server is found[citation:2]
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log('MongoDB Connected: ' + conn.connection.host);
  } catch (error) {
    console.error('Error: ' + error.message);
    process.exit(1); // Exit the process if the database fails to connect
  }
};

module.exports = connectDB;
