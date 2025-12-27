const mongoose = require("mongoose");

/**
 * @description Registration Model - Tracks student sign-ups for specific events.
 */
const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNo: { type: String, required: true, uppercase: true },
  email: { type: String, required: true, lowercase: true },
  phoneNumber: { type: String }, // Added for organizer-attendee communication
  department: { type: String, required: true },
  semester: { type: String, required: true },
  event: { type: String, required: true }, // Should match the Event 'title'
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Registration", RegistrationSchema);