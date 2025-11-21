const express = require("express");
const router = express.Router();
const Membership = require("../models/Membership");

router.post("/", async (req, res) => {
  try {
    const newMembership = new Membership(req.body);
    await newMembership.save();
    res.status(201).json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error submitting application." });
  }
});

module.exports = router;