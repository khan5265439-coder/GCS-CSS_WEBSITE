import React from "react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30">

      {/*: Golden Grid */}

      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"
        animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute z-0 w-full h-full bg-gradient-to-b from-transparent via-[#020617]/60 to-[#020617]" />

      {/* --- BG DESIGN --- */}

      <motion.div
        className="absolute top-6 left-6 sm:top-10 sm:left-10 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500"></div>

          <img
            src="/logo.jpg"
            alt="CSS Logo"
            className="relative w-16 sm:w-20 md:w-24 rounded-full border-2 border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wide"
        >
          🚀 Empowering the Next Gen of Tech
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          Computer{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
            Science
          </span>{" "}
          Society
        </h1>

        <p className="text-slate-300 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10">
          Innovation, collaboration, and high-impact tech events at{" "}
          <span className="text-white font-semibold">GCU Lahore</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link
            to="/events"
            className="group relative px-8 py-4 rounded-full bg-blue-600 text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-blue-500/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Explore Events</span>

            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out" />
          </Link>

          <Link
            to="/team"
            className="px-8 py-4 rounded-full border border-slate-600 text-slate-200 font-medium hover:bg-slate-800/50 hover:border-slate-400 hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            Meet The Team
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span>Scroll to explore</span>

        <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </div>
  );
}
