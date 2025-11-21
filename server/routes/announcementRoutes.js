const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");
const { protect } = require("../middleware/Authmiddleware");

// Public: Get all
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements" });
  }
});

// Admin: Create
router.post("/", protect, async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    res.status(201).json({ success: true, message: "Announcement created." });
  } catch (error) {
    res.status(500).json({ message: "Error creating announcement" });
  }
});

// Admin: Delete
router.delete("/:id", protect, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting" });
  }
});

// Admin route mapping from frontend might point here too
// Ensure the main server.js points /api/admin/announcements here as well if needed
// Or simply reuse this logic.

module.exports = router;