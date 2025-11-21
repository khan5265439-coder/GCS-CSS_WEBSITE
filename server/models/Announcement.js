const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Notice, Event, Update
  description: { type: String, required: true },
  icon: { type: String }, // e.g., "📣"
}, { timestamps: true });

module.exports = mongoose.model("Announcement", announcementSchema);