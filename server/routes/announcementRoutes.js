const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");
const { protect, authorize } = require("../middleware/Authmiddleware");

/**
 * @route   GET /api/announcements
 * @desc    Public: Get active news feed
 */
router.get("/", async (req, res) => {
  try {
    const news = await Announcement.find({ isArchived: false }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching public news feed." });
  }
});

/**
 * @route   GET /api/announcements/admin/all
 * @desc    Admin: Get all records including archived (Requires News Power)
 */
router.get("/admin/all", protect, authorize("canManageAnnouncements"), async (req, res) => {
  try {
    const allNews = await Announcement.find().sort({ createdAt: -1 });
    res.json(allNews);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching administrative news ledger." });
  }
});

/**
 * @route   POST /api/announcements
 * @desc    Admin: Deploy New Announcement
 */
router.post("/", protect, authorize("canManageAnnouncements"), async (req, res) => {
  try {
    const news = await Announcement.create(req.body);
    res.status(201).json({ success: true, news });
  } catch (error) {
    res.status(400).json({ success: false, message: "Validation failure: Check news data format." });
  }
});

/**
 * @route   PATCH /api/announcements/archive/:id
 * @desc    Admin: Toggle Archive Status
 */
router.patch("/archive/:id", protect, authorize("canManageAnnouncements"), async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Record not found." });

    // Toggles status: If archived, it restores it. If active, it archives it.
    announcement.isArchived = !announcement.isArchived;
    await announcement.save();
    
    res.json({ success: true, message: "Announcement status updated.", announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: "Archival process failed." });
  }
});

/**
 * @route   DELETE /api/announcements/:id
 * @desc    Admin: Wipe record from database
 */
router.delete("/:id", protect, authorize("canManageAnnouncements"), async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Record purged from database." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Wipe operation failed." });
  }
});

module.exports = router;