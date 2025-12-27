const jwt = require("jsonwebtoken");
const Membership = require("../models/Membership");
const Admin = require("../models/Admin");

/**
 * @description Master Protection Middleware
 * Checks for Bearer token, verifies against JWT_SECRET, 
 * and searches both Admin and Membership collections.
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // 1. Extract Token
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify Token (using the standardized secret from .env)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Search Collections
      let user = await Admin.findById(decoded.id).select("-password");
      
      if (!user) {
        user = await Membership.findById(decoded.id).select("-password");
      }

      if (!user) {
        return res.status(401).json({ success: false, message: "Security Breach: User no longer exists." });
      }

      // 4. Prop-Normalization
      // We ensure the 'email' property exists regardless of the model schema (email vs gmail)
      const userObj = user.toObject();
      userObj.email = userObj.email || userObj.gmail;
      
      req.user = userObj;
      next();
    } catch (error) {
      console.error("AUTH ERROR:", error.message);
      return res.status(401).json({ success: false, message: "Session expired or corrupted token." });
    }
  } else {
    return res.status(401).json({ success: false, message: "Access Denied: No token provided." });
  }
};

/**
 * @description Permission-Based Authorization
 * @param {string} permissionKey - The specific power required (e.g., 'canManageEvents')
 */
const authorize = (permissionKey) => {
  return (req, res, next) => {
    // Master Admin bypass (css@gmail.com is the root)
    const isMaster = req.user?.email === "css@gmail.com";

    if (isMaster) {
      return next();
    }

    // Role Check
    const hasAdminAccess = req.user?.permissions?.isAdmin;
    const hasSpecificPower = req.user?.permissions?.[permissionKey];

    if (hasAdminAccess && hasSpecificPower) {
      return next();
    }

    res.status(403).json({ 
      success: false, 
      message: `Restricted Access: Requires [${permissionKey}] clearance.` 
    });
  };
};

module.exports = { protect, authorize };