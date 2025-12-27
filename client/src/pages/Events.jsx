import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventCard from "../components/EventCard";
import Skeleton from "../components/Skelton";
import { API_URL } from "../utils/config";

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          fetch(`${API_URL}/events/upcoming`),
          fetch(`${API_URL}/events/past`)
        ]);
        const upcomingData = await upcomingRes.json();
        const pastData = await pastRes.json();
        setUpcomingEvents(upcomingData);
        setPastEvents(pastData);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 px-6 py-24 max-w-6xl mx-auto">

        {/* --- SECTION 1: UPCOMING EVENTS (TOP PRIORITY) --- */}
        <div className="text-center mb-16">
          
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
            Upcoming <span className="text-[#FFD700]">Events</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Don't miss out! Register for our Upcoming workshops and competitions.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 mb-24">
          {loading ? (
            <> <Skeleton /> <Skeleton /> </>
          ) : upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <motion.div
                key={event._id || index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="h-full"
              >
                <EventCard
                  title={event.title}
                  date={formatDate(event.date)}
                  description={event.description}
                  photo={event.image || event.photo || "/assets/images/placeholder.jpg"}
                  isPast={false}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 border border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
              <p className="text-slate-500 text-lg">No new events scheduled yet. Stay tuned!</p>
            </div>
          )}
        </div>

        {/* --- DIVIDER --- */}
        <div className="my-24 relative flex items-center justify-center">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          <div className="relative px-6 bg-[#020617] border border-slate-800 rounded-full py-2 shadow-xl z-10">
            <span className="text-blue-400 font-bold tracking-wide uppercase text-xs flex items-center gap-2">
              📅 Past Highlights
            </span>
          </div>
        </div>

        {/* --- SECTION 2: PAST EVENTS (LOWER SECTION) --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Our Journey</h2>
          <p className="text-slate-500 mt-2">Highlights of our most recent successful events.</p>
        </div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {loading ? (
             Array(3).fill(0).map((_, i) => <Skeleton key={i} />)
          ) : pastEvents.map((event, index) => (
            <motion.div
              key={event._id || index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
            >
              <EventCard
                title={event.title}
                date={formatDate(event.date)}
                description={event.description}
                photo={event.image || event.photo || "/assets/images/placeholder.jpg"}
                isPast={true}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}