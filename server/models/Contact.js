const mongoose = require("mongoose");

/**
 * @description Contact Model for public inquiries and site messages.
 */
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  // Allows for future expansion (e.g., flagging important messages)
  priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);