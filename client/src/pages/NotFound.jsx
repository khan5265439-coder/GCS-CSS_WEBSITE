import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden text-center px-6">
      
      {/* Background Stars */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70010_1px,transparent_1px),linear-gradient(to_bottom,#FFD70010_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-purple-600 drop-shadow-2xl">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white">
          Lost in the Void?
        </h2>
        <p className="text-slate-400 mt-4 max-w-md mx-auto">
          The page you are looking for has drifted into deep space. Let's get you back to Mission Control.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold shadow-lg hover:shadow-orange-500/20 hover:scale-105 transition-all"
          >
            Return to Base
          </Link>
        </div>
      </motion.div>

      {/* Planet Effect */}
      <motion.div
        className="absolute bottom-20 right-10 md:right-32 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}