const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const { protect } = require("../middleware/Authmiddleware");

// GET all registrations (Admin Dashboard View)
router.get("/", protect, async (req, res) => {
  try {
    const events = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events." });
  }
});

// DELETE a registration
router.delete("/:id", protect, async (req, res) => {
  try {
    const event = await Registration.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found." });
    res.status(200).json({ message: "Registration deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event." });
  }
});

module.exports = router;