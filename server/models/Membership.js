const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * @description Membership Model - Handles applications and promoted staff accounts.
 */
const membershipSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  rollNo: { type: String, required: true, unique: true, uppercase: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  gmail: { type: String, required: true, unique: true, lowercase: true },
  phoneNumber: { type: String, required: true },
  applyingRole: { type: String, required: true }, 
  role: { type: String }, // Official title assigned after approval
  approved: { type: Boolean, default: false }, 
  
  // Password for dashboard access (set during /activate)
  password: { type: String },

  // RBAC Permissions - Matches Admin model exactly for consistency
  permissions: {
    isAdmin: { type: Boolean, default: false },
    canManageEvents: { type: Boolean, default: false },
    canManageAnnouncements: { type: Boolean, default: false },
    canViewRegistrations: { type: Boolean, default: false },
    canManageTeams: { type: Boolean, default: false },
  }
}, { timestamps: true });

// Encryption Middleware
membershipSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Logic Bridge: Allows login controller to verify password
membershipSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Membership", membershipSchema);