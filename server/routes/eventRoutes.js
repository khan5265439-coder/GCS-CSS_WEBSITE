const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { protect, authorize } = require("../middleware/Authmiddleware");

/**
 * @helper Syncs Event status based on current system time
 */
const syncEventStatus = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  await Event.updateMany(
    { date: { $lt: today }, status: "upcoming" },
    { $set: { status: "completed" } }
  );
};

// --- ZONE A: PUBLIC ACCESS ---

router.get("/upcoming", async (req, res) => {
  try {
    await syncEventStatus();
    const events = await Event.find({ status: "upcoming", isArchived: false }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ success: false, message: "Uplink to events failed." });
  }
});

router.get("/past", async (req, res) => {
  try {
    await syncEventStatus();
    const events = await Event.find({ status: "completed", isArchived: false }).sort({ date: -1 }).limit(5);
    res.json(events);
  } catch (error) {
    res.status(500).json({ success: false, message: "History retrieval failed." });
  }
});

// --- ZONE B: ADMINISTRATIVE CONTROL ---

// Master Ledger (Includes Archived)
router.get("/admin/all", protect, async (req, res) => {
  try {
    await syncEventStatus();
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ success: false, message: "Master record fetch failed." });
  }
});

router.post("/", protect, authorize("canManageEvents"), async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ success: true, message: "Event Broadcast Deployed.", newEvent });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid payload: Check event data." });
  }
});

router.patch("/archive/:id", protect, authorize("canManageEvents"), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Node ID not found." });
    
    event.isArchived = !event.isArchived; // Toggle
    await event.save();
    res.json({ success: true, message: "Archival status toggled.", event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Archival protocol failed." });
  }
});

router.put("/:id", protect, authorize("canManageEvents"), async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Record updated.", updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Patch failed." });
  }
});

router.delete("/:id", protect, authorize("canManageEvents"), async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Record purged from database." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Wipe operation failed." });
  }
});

module.exports = router;