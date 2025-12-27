const Registration = require("../models/Registration");

/**
 * @desc    Public: Initialize Event Registration
 * @route   POST /api/register
 */
exports.createRegistration = async (req, res) => {
  try {
    const { name, rollNo, email, department, semester, event } = req.body;

    // 1. Critical Field Validation
    if (!name || !rollNo || !email || !event) {
      return res.status(400).json({ 
        success: false, 
        message: "Registration Failed: Missing required identification fields." 
      });
    }

    // 2. Duplicate Prevention Logic
    // Prevents the same Roll No from registering for the same Event twice
    const existingRegistration = await Registration.findOne({ rollNo, event });
    if (existingRegistration) {
      return res.status(400).json({ 
        success: false, 
        message: "Transmission Conflict: This Roll Number is already registered for this event." 
      });
    }

    // 3. Persistence
    const registration = new Registration({
      name,
      rollNo: rollNo.toUpperCase(), // Standardize for the ledger
      email: email.toLowerCase(),
      department,
      semester,
      event,
      phoneNumber: req.body.phoneNumber || "Not Provided"
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: "Target Reached: Registration successful and logged in ledger.",
    });
  } catch (err) {
    console.error("REGISTRATION_ERROR:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Infrastructure Error: Failed to save registration data." 
    });
  }
};

/**
 * @desc    Admin: Retrieve Master Registration Ledger
 * @route   GET /api/register/all
 */
exports.getAllRegistrations = async (req, res) => {
  try {
    // Fetches all registrations, newest first
    const registrations = await Registration.find().sort({ createdAt: -1 });
    
    // We return the raw array here because the frontend Ledger page expects 
    // an array to perform .map() and .filter()
    res.json(registrations);
  } catch (err) {
    console.error("LEDGER_FETCH_ERROR:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Access Denied: Could not retrieve registration records." 
    });
  }
};