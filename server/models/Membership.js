const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  rollNo: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  gmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  applyingRole: { type: String, required: true },
  approved: { type: Boolean, default: false }, 
}, { timestamps: true });

module.exports = mongoose.model("Membership", membershipSchema);