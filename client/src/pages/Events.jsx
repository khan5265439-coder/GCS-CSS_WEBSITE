import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventCard from "../components/EventCard";
import Skeleton from "../components/Skelton";

// --- 1. STATIC DATA: (History) ---
const pastEvents = [
  {
    title: "Tech Takra",
    date: "11 Nov 2025",
    description: "Build amazing projects with peers in 2 hours of coding frenzy!",
    photo: "/assets/images/techtakra.jpg", 
  },
  {
    title: "Pure Logics Tour",
    date: "02 Nov 2025",
    description: "Explore. Learn . Create with Pure Logics' expert-led sessions.",
    photo: "/assets/images/purelogics.png", 
  },
  {
    title: "Annual CSS Tour",
    date: "30 Oct 2025",
    description: "The tour of celebration, fun and memories with CSS members.",
    photo: "/assets/images/annualtour.jpg", 
  },
  {
    title: "Tech Talk Series",
    date: "12 July 2025",
    description: "Insights and discussions on the latest in technology.",
    photo: "/assets/images/techtalk.jpg", 
  },
  {
    title: "Annual Dinner",
    date: "5 Aug 2025",
    description: "Celebrating achievements and camaraderie with a grand feast.",
    photo: "/assets/images/annualdinner.jpeg",
  },
];

export default function Events() {
  // --- 2. DYNAMIC DATA: Live Events from Admin Panel ---
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events");
        const data = await response.json();
        setUpcomingEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 px-6 py-24 max-w-6xl mx-auto">

        {/* --- SECTION 1: PAST EVENTS (STATIC) --- */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wide"
          >
            📅 Our Journey
          </motion.div>
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Past Events
          </motion.h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            A look back at the workshops and competitions that defined our year.
          </p>
        </div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, staggerChildren: 0.15 }}
        >
          {pastEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <EventCard
                title={event.title}
                date={event.date}
                description={event.description}
                photo={event.photo}
                isPast={true}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* --- DIVIDER --- */}
        <div className="my-24 relative flex items-center justify-center">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          <div className="relative px-6 bg-[#020617] border border-slate-800 rounded-full py-2 shadow-xl z-10">
            <span className="text-[#FFD700] font-bold tracking-wide uppercase text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></span>
              Upcoming Events
            </span>
          </div>
        </div>

        {/* --- SECTION 2: UPCOMING EVENTS (DYNAMIC) --- */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 mb-24">
          {loading ? (
            // Loading State (3 Skeletons)
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : upcomingEvents.length > 0 ? (
            // Real Data from DB
            upcomingEvents.map((event, index) => (
              <motion.div
                key={event._id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="h-full"
              >
                <EventCard
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  photo={event.image || event.photo || "/assets/images/placeholder.jpg"}
                  isPast={false}
                />
              </motion.div>
            ))
          ) : (
            // Empty State
            <div className="col-span-full text-center py-16 border border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
              <p className="text-slate-500 text-lg">No new events scheduled yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* --- NEWSLETTER CTA --- */}
        <motion.div
          className="mt-16 relative rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-900/40 backdrop-blur-md text-center shadow-2xl max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50"></div>
            
            <div className="relative p-10 sm:p-14">
                <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">
                Don't Miss the Next Big Thing!
                </h3>
                <p className="text-slate-400 mb-8 text-lg max-w-lg mx-auto">
                Join the CS Society today to get instant notifications about upcoming workshops, guest speakers, and competitions.
                </p>
                <a
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-[#020617] bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105 transition-all duration-300"
                >
                Subscribe Now
                </a>
            </div>
        </motion.div>

      </div>
    </div>
  );
}