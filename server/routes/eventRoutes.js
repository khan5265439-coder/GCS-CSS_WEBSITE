const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { protect } = require("../middleware/Authmiddleware");

// @desc    Get all events (Public - For Home & Events Page)
// @route   GET /api/events
router.get("/", async (req, res) => {
  try {
    // Sort by newest first
    const events = await Event.find().sort({ date: 1 }); // Sorted by event date
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching events" });
  }
});

// @desc    Create an event (Admin Protected)
// @route   POST /api/events
router.post("/", protect, async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

// @desc    Delete an event (Admin Protected)
// @route   DELETE /api/events/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event removed" });
  } catch (error) {
    res.status(404).json({ message: "Event not found" });
  }
});

module.exports = router;
// @desc    Update an event (Admin Protected)
// @route   PUT /api/events/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated object
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});