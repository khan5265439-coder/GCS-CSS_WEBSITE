const Admin = require("../models/Admin");
const Membership = require("../models/Membership");
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");

/**
 * @helper Generate Standardized JWT
 */
const generateToken = (id) => {
  // Uses the standard JWT_SECRET we defined in Phase 1
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3h" });
};

/**
 * @desc    Unified Login Logic (Dual-Collection)
 * @route   POST /api/admin/login
 */
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Priority Scan: Admin Collection
    let user = await Admin.findOne({ email });
    let isMembershipAccount = false;

    // 2. Secondary Scan: Membership Collection
    if (!user) {
      user = await Membership.findOne({ gmail: email, approved: true });
      isMembershipAccount = true;
    }

    // 3. Validation & Password Match
    if (user && (await user.matchPassword(password))) {
      
      // Permission Guard: Membership accounts must have isAdmin set to true
      if (isMembershipAccount && !user.permissions?.isAdmin) {
        return res.status(403).json({ 
          success: false, 
          message: "Access Denied: Administrative Clearance Required." 
        });
      }

      // 4. Clean Payload Response
      res.json({
        success: true,
        user: {
          id: user._id,
          fullName: user.fullName || "Master Admin",
          email: user.email || user.gmail, // Normalizes email/gmail for frontend
          permissions: user.permissions || { isAdmin: true } // Master admin gets full bypass
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials or account restricted." });
    }
  } catch (error) {
    console.error("LOGIN_ERROR:", error.message);
    res.status(500).json({ success: false, message: "Server-side authentication failure." });
  }
};

/**
 * @desc    Public: Submit contact message (Uplink from Contact.jsx)
 * @route   POST /api/admin/messages/public
 */
exports.submitPublicMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: "Transmission received and logged." });
  } catch (error) {
    res.status(400).json({ success: false, message: "Transmission failed. Data corrupted." });
  }
};

/**
 * @desc    Member Password Activation
 * @route   POST /api/admin/setup-password
 */
exports.setupMemberPassword = async (req, res) => {
  const { rollNo, gmail, password } = req.body;
  try {
    const member = await Membership.findOne({ rollNo, gmail, approved: true });

    if (!member) {
      return res.status(404).json({ success: false, message: "No approved profile found matching these records." });
    }

    member.password = password; 
    await member.save();

    res.json({ success: true, message: "Node activated. You may now access the Command Center." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Activation logic failure." });
  }
};

/**
 * @desc    Admin: Retrieve Inquiries
 * @route   GET /api/admin/messages
 */
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ success: false, message: "Inquiry retrieval failed." });
  }
};

/**
 * @desc    Admin: Mark Inquiry as Read
 * @route   PATCH /api/admin/messages/:id
 */
exports.markMessageRead = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true, message: "Status updated to READ." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update operation failed." });
  }
};

/**
 * @desc    Admin: Update Member Approval and Permissions Matrix
 * @route   PATCH /api/memberships/permissions/:id
 */
exports.updateMemberPermissions = async (req, res) => {
  try {
    const { approved, permissions } = req.body;

    // We use findByIdAndUpdate to ensure the 'approved' status 
    // and 'permissions' object are both saved to the database.
    const member = await Membership.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          approved: approved, 
          permissions: permissions 
        } 
      },
      { new: true } // Returns the newly updated document
    );

    if (!member) {
      return res.status(404).json({ success: false, message: "Member identity not found." });
    }

    res.json({ 
      success: true, 
      message: "Permissions and Authority synced successfully.", 
      member 
    });
  } catch (error) {
    console.error("SYNC_ERROR:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error during authority sync." });
  }
};