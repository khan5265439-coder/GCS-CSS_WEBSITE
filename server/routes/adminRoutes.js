const express = require("express");
const router = express.Router();
const { adminLogin, createAdmin } = require("../controllers/adminController");

router.post("/login", adminLogin);
router.post("/create", createAdmin); // Use this to create your first account

module.exports = router;