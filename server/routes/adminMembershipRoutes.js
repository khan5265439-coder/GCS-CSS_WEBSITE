// const express = require("express");
// const router = express.Router();
// const Membership = require("../models/Membership");
// const { protect } = require("../middleware/Authmiddleware");

// /**
//  * @route   GET /api/admin/memberships
//  * @desc    Fetch all membership applications (pending and approved)
//  */
// router.get("/", protect, async (req, res) => {
//   try {
//     const memberships = await Membership.find().sort({ createdAt: -1 });
//     res.status(200).json(memberships);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching memberships." });
//   }
// });

// /**
//  * @route   DELETE /api/admin/memberships/:id
//  * @desc    Reject and permanently remove an application
//  */
// router.delete("/:id", protect, async (req, res) => {
//   try {
//     const membership = await Membership.findByIdAndDelete(req.params.id);
//     if (!membership) return res.status(404).json({ message: "Record not found." });
//     res.status(200).json({ message: "Deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting record." });
//   }
// });

// /**
//  * @route   PATCH /api/admin/memberships/:id
//  * @desc    Approve a student to become a regular member
//  */
// router.patch("/:id", protect, async (req, res) => {
//   try {
//     const membership = await Membership.findByIdAndUpdate(
//       req.params.id, 
//       { approved: true }, 
//       { new: true }
//     );
//     res.status(200).json({ message: "Approved successfully", membership });
//   } catch (error) {
//     res.status(500).json({ message: "Error approving record." });
//   }
// });

// /**
//  * @route   PATCH /api/admin/memberships/permissions/:id
//  * @desc    Toggle specific functional permissions (Powers) for a member
//  */
// router.patch("/permissions/:id", protect, async (req, res) => {
//   try {
//     const updateData = req.body; // Expects something like { "canManageEvents": true }
    
//     // We use $set with dot notation to update specific fields within the permissions sub-object
//     const membership = await Membership.findById(req.params.id);
//     if (!membership) return res.status(404).json({ message: "Member not found." });

//     // Update the permissions object
//     membership.permissions = { ...membership.permissions, ...updateData };
    
//     await membership.save();
//     res.status(200).json({ message: "Permissions updated successfully", membership });
//   } catch (error) {
//     console.error("Permission Update Error:", error);
//     res.status(500).json({ message: "Error updating permissions." });
//   }
// });

// module.exports = router;