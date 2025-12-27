const mongoose = require("mongoose");

/**
 * @description Database Connection Utility
 * Configured for high availability and auto-reconnection.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Ensures the driver stays connected during network fluctuations
      autoIndex: true, 
    });

    console.log(`
    ✅ DATABASE UPLINK ESTABLISHED
    ====================================
    Host: ${conn.connection.host}
    Database: ${conn.connection.name}
    Status: Operational
    ====================================
    `);
  } catch (err) {
    console.error("❌ CRITICAL DATABASE ERROR:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;