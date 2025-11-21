import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/announcements");
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        setError("Unable to load announcements at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const getBadgeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case "notice": return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      case "event": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "update": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      default: return "bg-slate-700/30 text-slate-300 border-slate-600/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND DESIGN START --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <motion.div
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none"
        animate={{ x: [0, 30, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* --- BACKGROUND DESIGN END --- */}

      <div className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
            Society <span className="text-[#FFD700]">Updates</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Stay informed about upcoming workshops, hackathons, and important notices from the CS department.
          </p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center mb-8"
          >
            {error}
          </motion.div>
        )}

        {loading && (
          <div className="text-center text-slate-500 py-20">
             <div className="inline-block w-8 h-8 border-2 border-t-blue-500 border-slate-700 rounded-full animate-spin mb-4"></div>
             <p>Loading updates...</p>
          </div>
        )}

        <div className="space-y-6">
          {!loading && !error && announcements.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
              <p className="text-slate-500 text-lg">No new announcements at the moment.</p>
            </div>
          ) : (
            announcements.map((announcement, index) => (
              <motion.div
                key={announcement._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-lg hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getBadgeStyle(announcement.type)}`}>
                        {announcement.type || "Update"}
                      </span>
                      <span className="text-slate-500 text-sm font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {announcement.date}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {announcement.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-medium border border-slate-700 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-200">
                      View
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-red-500/10 text-red-400 font-medium border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-200">
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-md text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Don't miss a beat</h3>
          <p className="text-slate-400 mb-6">Subscribe to our newsletter to get these updates directly in your inbox.</p>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold shadow-lg hover:shadow-orange-500/20 hover:scale-105 transition-all">
            Subscribe Now
          </button>
        </motion.div>

      </div>
    </div>
  );
}