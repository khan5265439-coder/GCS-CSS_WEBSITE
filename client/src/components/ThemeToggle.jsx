import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * @description Handles Dark/Light mode state and persists preference to localStorage.
 */
export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || 
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-slate-800/50 border border-slate-700 hover:border-[#FFD700]/50 transition-all duration-300"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0 }}
        className="text-lg flex items-center justify-center"
      >
        {darkMode ? "☀️" : "🌙"}
      </motion.div>
    </button>
  );
}