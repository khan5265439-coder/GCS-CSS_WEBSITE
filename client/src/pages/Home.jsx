import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { Helmet } from 'react-helmet-async';
import { API_URL } from "../utils/config"; // <--- IMPORT THIS

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH REAL EVENTS FROM DATABASE
  useEffect(() => {
    fetch(`http://localhost:3001/api"/events`) 
      .then((res) => res.json())
      .then((data) => {
        setFeaturedEvents(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events", err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-[#020617] text-white overflow-hidden selection:bg-cyan-500/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Home | CS Society GCU</title>
        <meta name="description" content="Official website of Computer Science Society GCU Lahore." />
      </Helmet>
      
      {/* HERO SECTION */}
      <div className="relative w-full h-[92vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        
        {/* --- BACKGROUND DESIGN START --- */}
        <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"
          animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="absolute z-0 w-full h-full bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
        {/* --- BACKGROUND DESIGN END --- */}


        {/* LOGO */}
        <motion.div
          className="absolute z-20 top-20 left-1/5 -translate-x-1/2 sm:top-10 md:top-20 md:left-16 md:translate-x-0"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src="/logo.jpg"
            alt="CSS Logo"
            className="w-20 sm:w-24 md:w-32 lg:w-36 rounded-full border-4 border-[#FFD700]/30 shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:scale-[1.05] transition duration-300 ease-out"
          />
        </motion.div>

        {/* HERO TEXT */}
        <motion.div
          className="relative z-10 mt-40 md:mt-0 text-center max-w-4xl px-4"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl tracking-tight">
            Computer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">Science</span> Society
          </h1>

          <p className="mt-6 text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Inspiring and empowering tech enthusiasts at GCU Lahore — through
            workshops, competitions, seminars, bootcamps, and a thriving community culture.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/events"
              className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-blue-500/60 hover:-translate-y-1 transition-all duration-300"
            >
              Explore Events
            </Link>

            <Link
              to="/membership"
              className="px-8 py-3.5 rounded-full border border-[#FFD700]/50 text-[#FFD700] font-bold hover:bg-[#FFD700]/10 hover:border-[#FFD700] transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(255,215,0,0.1)]"
            >
              Become a Member
            </Link>
          </div>
        </motion.div>
      </div>

      {/* FEATURED EVENTS SECTION */}
      <div className="relative z-10 px-4 sm:px-6 py-24 max-w-6xl mx-auto">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-20 opacity-50"></div>

        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-14 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Featured Events
        </motion.h2>

        {loading ? (
          <div className="text-center text-slate-500 py-10">
             <div className="inline-block w-8 h-8 border-2 border-t-[#FFD700] border-slate-700 rounded-full animate-spin mb-2"></div>
             <p>Loading latest events...</p>
          </div>
        ) : (
          <motion.div
            className="grid gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.25 }}
          >
            {featuredEvents.length > 0 ? (
              featuredEvents.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <EventCard
                    title={item.title}
                    description={item.description} 
                    date={item.date}
                    photo={item.image || item.photo || "/assets/images/placeholder.jpg"} 
                  />
                </motion.div>
              ))
            ) : (
               <div className="col-span-3 text-center p-10 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                  <p className="text-slate-400">No events scheduled yet. Stay tuned!</p>
               </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}