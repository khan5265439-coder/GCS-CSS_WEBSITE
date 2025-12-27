const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// 1. Core Connection
connectDB();

// 2. Global Middleware
app.use(cors({
  origin: ["https://your-vercel-project.vercel.app", "http://localhost:5173"], // Add your Vercel URL here later
  credentials: true
}));

app.use(express.json());

/**
 * --- UNIFIED ROUTE ARCHITECTURE ---
 * Every route here follows a strict "Feature-First" naming convention.
 */

// ZONE A: IDENTITY & AUTH (Login, Password Setup, Contact Inbox)
app.use("/api/admin", require("./routes/adminRoutes")); 

// ZONE B: CONTENT MANAGEMENT (Events, Announcements, Executive Board)
app.use("/api/events", require("./routes/eventRoutes")); 
app.use("/api/announcements", require("./routes/announcementRoutes")); 
app.use("/api/team", require("./routes/teamRoutes"));

// ZONE C: FORMS & APPLICATIONS (Event Regs, Membership Apps)
app.use("/api/memberships", require("./routes/membershipRoutes")); 
app.use("/api/register", require("./routes/registrationRoutes"));

// 3. 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API Route not found" });
});

// 4. Global Error Boundary (Prevents Server Crashes)
app.use((err, req, res, next) => {
  console.error("RED ALERT - SERVER ERROR:", err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Critical Infrastructure Error. Check Backend Console." 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
  🚀 SYSTEM ONLINE
  ====================================
  Port: ${PORT}
  Mode: Development/Refinement
  Uplink: MongoDB Connected
  ====================================
  `);
});

module.exports = app;