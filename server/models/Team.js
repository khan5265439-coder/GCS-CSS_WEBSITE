const mongoose = require("mongoose");

/**
 * @description Executive Board Model - Represents the public "Visionaries"
 */
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true }, // e.g., "President", "Advisor"
  image: { 
    type: String, 
    default: "/assets/images/placeholder-user.jpg" 
  },
  description: { 
    type: String, 
    default: "Core member of the Computer Science Society Executive Board." 
  },
  instagram: { type: String, trim: true },
  linkedin: { type: String, trim: true },
  hierarchy: { 
    type: Number, 
    default: 10,
    index: true // Optimized for sorting (President = 1, Vice = 2)
  }
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);