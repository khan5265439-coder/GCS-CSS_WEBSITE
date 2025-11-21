const express = require("express");
const router = express.Router();
const { createRegistration, getAllRegistrations } = require("../controllers/registrationController");
const { protect } = require("../middleware/Authmiddleware");

// Public Route
router.post("/", createRegistration);

// Protected Admin Route
router.get("/all", protect, getAllRegistrations);

module.exports = router;