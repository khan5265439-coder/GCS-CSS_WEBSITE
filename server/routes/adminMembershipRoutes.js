const express = require("express");
const router = express.Router();
const Membership = require("../models/Membership");
const { protect } = require("../middleware/Authmiddleware");

// Get all applications
router.get("/", protect, async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ message: "Error fetching memberships." });
  }
});

// Delete application
router.delete("/:id", protect, async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);
    if (!membership) return res.status(404).json({ message: "Not found." });
    res.status(200).json({ message: "Deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting membership." });
  }
});

// Approve application
router.patch("/:id", protect, async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id, 
      { approved: true }, 
      { new: true }
    );
    res.status(200).json({ message: "Approved successfully", membership });
  } catch (error) {
    res.status(500).json({ message: "Error approving membership." });
  }
});

module.exports = router;