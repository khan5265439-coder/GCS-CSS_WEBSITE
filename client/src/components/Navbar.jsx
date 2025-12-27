import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Unified Auth Check
  const token = localStorage.getItem("adminToken");
  const user = JSON.parse(localStorage.getItem("adminUser"));
  const isLoggedIn = !!(token && user);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Uplink Terminated. Logged out.");
    navigate("/");
    // State is naturally updated by the redirect to Home
  };

  // Close mobile menu when route changes
  useEffect(() => { setMobileOpen(false); }, [location]);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: "Home", link: "/" },
    { title: "Events", link: "/events" },
    { title: "Team", link: "/team" },
    { title: "Announcements", link: "/announcements" },
    { title: "Contact", link: "/contact" },
    { title: "About", link: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-[#020617]/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* --- LOGO Sec --- */}
        <Link to="/" className="flex items-center gap-3 group relative z-50">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#FFD700]/50 transition-colors duration-300 shadow-xl">
              <img
                src="/logo.jpg"
                alt="CS Society Logo"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/50?text=CSS"; }}
              />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-lg tracking-tight group-hover:text-[#FFD700] transition-colors duration-300">
              CS Society
            </span>
            <span className="text-[#FFD700] text-[10px] font-bold tracking-widest uppercase">
              GCU Lahore
            </span>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-1 bg-slate-950/40 border border-slate-800 p-1.5 rounded-full backdrop-blur-md">
          {navItems.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) =>
                `relative px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex items-center gap-4 relative z-50">
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
               <Link
                to="/admin-dashboard"
                className="px-5 py-2 rounded-full text-xs font-bold bg-slate-800 text-white border border-slate-700 hover:border-[#FFD700]/50 transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all group"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              to="/admin"
              className="hidden md:block px-6 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:scale-105 transition-all duration-300"
            >
              Admin Portal
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-current rounded-full" />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-full h-0.5 bg-current rounded-full" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-current rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#020617] border-b border-slate-800"
          >
            <div className="px-6 py-8 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.link}
                  to={item.link}
                  className={({ isActive }) =>
                    `block text-lg font-medium py-3 px-4 rounded-xl ${
                      isActive ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" : "text-slate-400"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              <div className="h-px bg-slate-800 my-4" />
              {isLoggedIn ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/admin-dashboard" className="py-3.5 rounded-xl bg-slate-800 text-white font-bold text-center">Dashboard</Link>
                  <button onClick={handleLogout} className="py-3.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-bold">Logout</button>
                </div>
              ) : (
                <Link to="/admin" className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold">Admin Portal</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}