import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from "framer-motion";

// Layout
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
import ActivateAccount from "./pages/ActivateAccount"; 
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminMemberships from "./pages/AdminMemberships";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminMessages from "./pages/AdminMessages"; 
import Registrations from "./pages/Registrations";
import AdminTeam from "./pages/AdminTeam";

// Helper: Standardized API URL for the entire app
export const API_URL = "https://css-backend-7q2c.onrender.com/api" || "http://localhost:3001/api";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/**
 * @section AUTHENTICATION GUARD
 * Prevents unauthorized access and handles session corruption.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const user = localStorage.getItem("adminUser");

  if (!token || !user) {
    localStorage.clear(); // Wipe everything if session is incomplete
    return <Navigate to="/admin" replace />;
  }

  return children;
};

/**
 * @section THE BRIDGE
 * Wraps routes with public/admin layout logic.
 */
function AppContent() {
  const location = useLocation();
  // Check if current path starts with /admin (but isn't the login page)
  const isAdminPage = location.pathname.startsWith("/admin") || location.pathname === "/all-registrations" || location.pathname === "/admin-dashboard";
  const isLoginPage = location.pathname === "/admin";

  return (
    <>
      {/* Hide Navbar/Footer only on actual Admin Dashboard pages */}
      {!(isAdminPage && !isLoginPage) && <Navbar />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/register" element={<Register />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/activate" element={<ActivateAccount />} />

          {/* --- Admin Auth --- */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* --- Protected Admin Hub --- */}
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
         <Route 
  path="/admin/memberships" 
  element={
    <ProtectedRoute requireSuperAdmin={true}>
      <AdminMemberships />
    </ProtectedRoute>
  } 
/>
          <Route path="/admin/announcements" element={<ProtectedRoute><AdminAnnouncements /></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute><AdminTeam /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
          <Route path="/all-registrations" element={<ProtectedRoute><Registrations /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      {!(isAdminPage && !isLoginPage) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 3000,
          style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' }
        }} 
      />
      <AppContent />
    </Router>
  );
}

export default App;