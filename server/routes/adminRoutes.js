const express = require("express");
const router = express.Router();
const { 
  adminLogin, 
  setupMemberPassword, 
  getMessages, 
  markMessageRead,
  submitPublicMessage 
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/Authmiddleware");

/**
 * @section AUTHENTICATION
 * Unified entry point for all administrative logins.
 */
router.post("/login", adminLogin);

/**
 * @section ACCOUNT ACTIVATION
 * Public route for promoted members to initialize security credentials.
 */
router.post("/setup-password", setupMemberPassword);

/**
 * @section INQUIRY (CONTACT) SYSTEM
 */

// PUBLIC: Uplink for the Contact Us form
router.post("/messages/public", submitPublicMessage);

// PROTECTED: View inbox (Requires basic Admin clearance)
router.get("/messages", protect, getMessages);

// PROTECTED: Update message status (Requires basic Admin clearance)
router.patch("/messages/:id", protect, markMessageRead);

module.exports = router;