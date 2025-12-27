const mongoose = require("mongoose");

/**
 * @description Event Schema with automated time-based status logic.
 */
const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  date: { 
    type: Date, 
    required: true 
  }, 
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String,
    default: "/assets/images/placeholder.jpg"
  }, 
  location: {
    type: String,
    default: "GCU Lahore"
  },
  // status is now managed by a pre-save hook or manual override
  status: { 
    type: String, 
    enum: ['upcoming', 'completed', 'cancelled'], 
    default: 'upcoming' 
  },
  isArchived: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

// Pre-save middleware to auto-update status based on date
eventSchema.pre('save', function(next) {
  const now = new Date();
  if (this.date < now) {
    this.status = 'completed';
  }
  next();
});

module.exports = mongoose.model("Event", eventSchema);