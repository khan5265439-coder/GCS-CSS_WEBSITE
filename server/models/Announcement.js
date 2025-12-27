const mongoose = require("mongoose");

/**
 * @description Announcement Model for the Society News Feed
 */
const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  type: { 
    type: String, 
    enum: ['Update', 'Notice', 'Opportunity'], // Matches frontend Select options
    required: true,
    default: 'Update' 
  },
  isArchived: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.experimental ? 
  mongoose.model("Announcement") : 
  mongoose.model("Announcement", announcementSchema);