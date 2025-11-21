import React from "react";

import { motion } from "framer-motion";

export default function TeamCard({ name, role, photo, description }) {
  return (
    <motion.div
      className="group relative flex flex-col items-center text-center h-full w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* --- CARD BACKGROUND (Glass) --- */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]" />

      {/* Content Container */}

      <div className="relative z-10 p-8 flex flex-col items-center h-full">
        {/* --- AVATAR SECTION --- */}

        <div className="relative mb-6">
          {/*Pulsing Glow behind image */}

          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-600 via-transparent to-[#FFD700] opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500" />

          {/* Image Container */}

          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 group-hover:border-slate-700 transition-colors duration-300 shadow-xl">
            <img
              src={photo}
              alt={`Photo of ${name}`}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/150?text=User"; // Fallback
              }}
            />
          </div>

          {/*icon badge */}

          <div className="absolute bottom-1 right-1 bg-slate-900 border border-slate-700 text-[#FFD700] p-1.5 rounded-full shadow-lg">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* --- TEXT INFO --- */}

        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
          {name}
        </h3>

        <div className="mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20">
            {role}
          </span>
        </div>

        {/* Gradient Separator Line */}

        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-5 group-hover:via-blue-500 transition-all duration-500" />

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-4 mb-6">
          {description}
        </p>

        {/* --- SOCIAL ICONS  --- */}

        <div className="mt-auto flex gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          {["linkedin", "twitter", "mail"].map((icon, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition-all text-slate-400"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
