// const express = require("express");
// const router = express.Router();
// const Registration = require("../models/Registration");
// const { protect } = require("../middleware/Authmiddleware");

// /**
//  * @desc    Get all registrations (Admin Dashboard View)
//  * @route   GET /api/admin/registrations
//  * @access  Private (Admin Only)
//  */
// router.get("/", protect, async (req, res) => {
//   try {
//     // Fetches all student registrations, sorted by the most recent submission
//     const registrations = await Registration.find().sort({ createdAt: -1 });
    
//     // Send 200 OK with the registrations array
//     res.status(200).json(registrations);
//   } catch (error) {
//     res.status(500).json({ 
//       message: "Error fetching registration records from the database.",
//       error: error.message 
//     });
//   }
// });

// /**
//  * @desc    Delete a registration record permanently
//  * @route   DELETE /api/admin/registrations/:id
//  * @access  Private (Admin Only)
//  */
// router.delete("/:id", protect, async (req, res) => {
//   try {
//     const deletedRecord = await Registration.findByIdAndDelete(req.params.id);
    
//     if (!deletedRecord) {
//       return res.status(404).json({ message: "Registration record not found." });
//     }
    
//     res.status(200).json({ message: "Registration deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ 
//       message: "Error processing deletion request.",
//       error: error.message 
//     });
//   }
// });

// module.exports = router;