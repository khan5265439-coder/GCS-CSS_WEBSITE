import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EventCard({
  title,
  date,
  description,
  photo, 
  isPast = false,
}) {
  
  const imageSrc = photo && photo.trim() !== "" ? photo : "/assets/images/placeholder.jpg";

  return (
    <motion.article
      className={`group relative flex flex-col h-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 ${
        isPast
          ? "opacity-80"
          : "hover:shadow-blue-500/10 hover:border-blue-500/30"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: isPast ? 0 : -5 }}
    >
      {/* --- IMAGE SECTION --- */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-800">
        <img
          src={imageSrc} 
          alt={title}
          className={`w-full h-full object-cover transform transition-transform duration-700 ${
            isPast ? "grayscale-[0.6]" : "group-hover:scale-110"
          }`}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/400x200?text=No+Image"; 
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />

        {/* Date Badge */}
        {date && (
          <div
            className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-xl ${
              isPast
                ? "bg-slate-800/90 border-slate-600 text-slate-400"
                : "bg-slate-950/60 border-white/10 text-white"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider">
              {date}
            </span>
          </div>
        )}
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="flex flex-col flex-grow p-6 pt-4">
        <h3
          className={`text-xl font-bold mb-2 leading-tight transition-colors duration-300 ${
            isPast ? "text-slate-300" : "text-white group-hover:text-blue-400"
          }`}
        >
          {title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {description}
        </p>

        {/* --- FOOTER ACTIONS --- */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
          <button className="text-sm font-medium text-slate-500 hover:text-white transition-colors">
            View Details
          </button>

          {isPast ? (
            <button
              disabled
              className="px-5 py-2 rounded-full bg-slate-800 text-slate-500 text-sm font-bold border border-slate-700 cursor-not-allowed select-none"
            >
              Completed
            </button>
          ) : (
            <Link
              to="/register"
              className="relative overflow-hidden px-5 py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-sm font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:scale-105 transition-all duration-300"
            >
              Register Now
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}