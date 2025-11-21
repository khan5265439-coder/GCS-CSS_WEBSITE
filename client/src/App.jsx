import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from "framer-motion";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import Team from "./pages/Team";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Announcements from "./pages/Announcements";
import Register from "./pages/Register";
import Membership from "./pages/Membership";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminMemberships from "./pages/AdminMemberships";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import Registrations from "./pages/Registrations";

// Helper: Reset scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Helper: Protect Admin Routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

// Separate component for AnimatePresence to work with Router
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/register" element={<Register />} />
        <Route path="/membership" element={<Membership />} />

        {/* Admin Public */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
        <Route path="/admin/memberships" element={<ProtectedRoute><AdminMemberships /></ProtectedRoute>} />
        <Route path="/admin/announcements" element={<ProtectedRoute><AdminAnnouncements /></ProtectedRoute>} />
        <Route path="/all-registrations" element={<ProtectedRoute><Registrations /></ProtectedRoute>} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;