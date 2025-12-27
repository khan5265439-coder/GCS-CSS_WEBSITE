const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * @description Admin Model with Role-Based Access Control (RBAC)
 */
const adminSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  // Permissions block - strictly managed by the Super Admin
  permissions: {
    isAdmin: { type: Boolean, default: true },
    canManageEvents: { type: Boolean, default: true },
    canManageAnnouncements: { type: Boolean, default: true },
    canViewRegistrations: { type: Boolean, default: true },
    canManageTeams: { type: Boolean, default: true } // Added for Board management
  }
}, { timestamps: true });

// Password Hashing Middleware
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Decryption Method for Login
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);