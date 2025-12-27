const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const { protect, authorize } = require("../middleware/Authmiddleware");

/**
 * @route   GET /api/team
 * @desc    Public: Display Executive Board
 */
router.get("/", async (req, res) => {
  try {
    const team = await Team.find().sort({ hierarchy: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ success: false, message: "Board synchronization failed." });
  }
});

/**
 * @route   POST /api/team
 * @desc    Admin: Add Board Member
 */
router.post("/", protect, authorize("canManageTeams"), async (req, res) => {
  try {
    const member = new Team(req.body);
    await member.save();
    res.status(201).json({ success: true, message: "Member added to Board.", member });
  } catch (error) {
    res.status(400).json({ success: false, message: "Board entry failure." });
  }
});

/**
 * @route   DELETE /api/team/:id
 * @desc    Admin: Remove Board Member
 */
router.delete("/:id", protect, authorize("canManageTeams"), async (req, res) => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Member node not found." });
    res.json({ success: true, message: "Node removed from executive board." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Operation failed." });
  }
});

module.exports = router;