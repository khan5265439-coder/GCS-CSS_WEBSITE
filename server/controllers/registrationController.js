const Registration = require("../models/Registration");

// Public: Create new registration
exports.createRegistration = async (req, res) => {
  try {
    const { name, rollNo, email, department, semester, event } = req.body;

    // Basic validation
    if (!name || !rollNo || !email || !event) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields" });
    }

    const registration = new Registration(req.body);
    await registration.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Get all registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};