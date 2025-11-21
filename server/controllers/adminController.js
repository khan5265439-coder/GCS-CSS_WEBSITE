const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// Helper: Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ADMIN_TOKEN_SECRET, { expiresIn: "1d" });
};

// @desc    Auth admin & get token
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if admin exists in DB
    const admin = await Admin.findOne({ email });

    // 2. Check password using the method in your Admin model
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/admin/create
exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ email, password });
    
    res.status(201).json({ 
      success: true, 
      message: "Admin created successfully", 
      token: generateToken(admin._id) 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};