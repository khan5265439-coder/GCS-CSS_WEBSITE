const express = require("express");
const router = express.Router();
const { 
  createRegistration, 
  getAllRegistrations 
} = require("../controllers/registrationController");
const { protect, authorize } = require("../middleware/Authmiddleware");
const Registration = require("../models/Registration");

// PUBLIC: Student signs up for an event
router.post("/", createRegistration);

// ADMIN: Get all registrations (Requires 'canViewRegistrations' power)
router.get("/all", protect, authorize("canViewRegistrations"), getAllRegistrations);

// ADMIN: Delete a record (Requires 'canViewRegistrations' to manage the ledger)
router.delete("/:id", protect, authorize("canViewRegistrations"), async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Record not found." });
    res.status(200).json({ success: true, message: "Record purged from ledger." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Deletion failed." });
  }
});

module.exports = router;