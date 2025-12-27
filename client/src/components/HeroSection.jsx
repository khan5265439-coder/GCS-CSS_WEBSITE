import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      
      {/* --- BACKGROUND DESIGN LAYER --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70010_1px,transparent_1px),linear-gradient(to_bottom,#FFD70010_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Animated Glows */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        animate={{ x: [0, 30, 0], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute z-0 w-full h-full bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617]" />

      {/* --- CONTENT SECTION --- */}
      {/* Added pt-20 to ensure content starts AFTER the fixed navbar height */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20" 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="inline-block mb-8 px-5 py-2 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 text-[#FFD700] text-[10px] font-black tracking-[0.3em] uppercase"
        >
          🚀 Empowering the Next Gen of Tech
        </motion.div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
          Computer{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFA500] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            Science
          </span>{" "}
          Society
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12 font-medium">
          The hub of innovation, collaboration, and high-impact technology events at{" "}
          <span className="text-white border-b-2 border-blue-600 pb-1">GCU Lahore</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          <Link
            to="/events"
            className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-[#FFD700]/20 hover:-translate-y-1 transition-all duration-300"
          >
            Explore Events
          </Link>

          <Link
            to="/team"
            className="px-10 py-4 rounded-full border border-slate-700 bg-slate-900/40 text-slate-200 font-black text-sm uppercase tracking-widest hover:bg-slate-800 hover:border-slate-500 hover:text-white transition-all duration-300 backdrop-blur-md"
          >
            Meet The Board
          </Link>
        </div>
      </motion.div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Scroll to Initiate</span>
        <div className="relative w-px h-16 bg-gradient-to-b from-blue-600 via-slate-800 to-transparent">
            <motion.div 
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 left-[-1.5px] w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]"
            />
        </div>
      </motion.div>
    </div>
  );
}