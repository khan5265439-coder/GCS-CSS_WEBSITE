const express = require("express");
const router = express.Router();
const Membership = require("../models/Membership");
const { protect, authorize } = require("../middleware/Authmiddleware");

/**
 * @section PUBLIC
 * Student applies for membership.
 */
router.post("/", async (req, res) => {
  try {
    const newApp = new Membership(req.body);
    await newApp.save();
    res.status(201).json({ success: true, message: "Application submitted." });
  } catch (error) {
    res.status(400).json({ success: false, message: "Application failed. Duplicate Roll No?" });
  }
});

/**
 * @section ADMIN PROTECTED
 */

// 1. Fetch all memberships (Requires valid token)
router.get("/admin/all", protect, async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch failed." });
  }
});

// 2. Approve Member (Individual Endpoint)
router.patch("/approve/:id", protect, async (req, res) => {
  try {
    const member = await Membership.findByIdAndUpdate(
      req.params.id, 
      { approved: true }, 
      { new: true }
    );
    res.status(200).json({ success: true, message: "Member Approved.", member });
  } catch (error) {
    res.status(500).json({ success: false, message: "Approval failed." });
  }
});

/**
 * @desc    UNIFIED PERMISSIONS & APPROVAL SYNC
 * This is the route your Frontend "Approve" button calls.
 */
router.patch("/permissions/:id", protect, async (req, res) => {
  try {
    const { permissions, approved } = req.body; 
    const member = await Membership.findById(req.params.id);
    
    if (!member) return res.status(404).json({ success: false, message: "Member not found." });

    // UPDATE PERMISSIONS
    if (permissions) {
      member.permissions = { ...member.permissions, ...permissions };
      
      // AUTO-GRANT: If any permission is toggled, ensure isAdmin is true so they can login
      member.permissions.isAdmin = true;
    }

    // UPDATE APPROVAL STATUS (The fix for your issue)
    if (approved !== undefined) {
      member.approved = approved;
    }
    
    // Save to Database
    await member.save();

    res.status(200).json({ 
      success: true, 
      message: "Permissions and Status synced to database.", 
      member 
    });
  } catch (error) {
    console.error("SYNC_ERROR:", error.message);
    res.status(500).json({ success: false, message: "Permission sync failed." });
  }
});

// 3. Delete/Reject Membership
router.delete("/:id", protect, async (req, res) => {
  try {
    await Membership.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Record removed." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Operation failed." });
  }
});

module.exports = router;