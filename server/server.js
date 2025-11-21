const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// --- PUBLIC ROUTES ---
app.use("/api/register", require("./routes/registrationRoutes"));
app.use("/api/membership", require("./routes/membershipRoutes")); 
app.use("/api/announcements", require("./routes/announcementRoutes")); // Public News
app.use("/api/events", require("./routes/eventRoutes")); 

// --- ADMIN ROUTES ---
app.use("/api/admin", require("./routes/adminRoutes")); 
app.use("/api/admin/memberships", require("./routes/adminMembershipRoutes"));

app.use("/api/admin/announcements", require("./routes/announcementRoutes")); 

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Req for vercel
module.exports = app;