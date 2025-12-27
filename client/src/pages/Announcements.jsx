import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../App"; // Unified import from the Route Bridge

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${API_URL}/announcements`);
        const data = await response.json();
        
        // Safety: Filter for public display (No archived items)
        const list = Array.isArray(data) ? data : (data.success ? data.data || [] : []);
        setAnnouncements(list.filter(a => !a.isArchived));
      } catch (error) {
        setError("Uplink failed. Monitoring system suggests connection issues.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Format Date to "UK Standard" with fallback logic
  const formatDate = (dateString) => {
    if (!dateString) return "Active Now";
    return new Date(dateString).toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getBadgeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case "notice": return "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]";
      case "opportunity": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "result": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "update": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70005_1px,transparent_1px),linear-gradient(to_bottom,#FFD70005_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <motion.div
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* --- CONTENT START --- */}
      <div className="relative z-10 px-6 pt-32 pb-24 max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Real-time Feed
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Alerts</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Departmental notices, hackathon results, and exclusive career opportunities 
            synced directly from the GCU CS Board.
          </p>
        </motion.div>

        {error && (
          <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-6 rounded-[2rem] text-center mb-12 backdrop-blur-xl">
            <span className="font-black uppercase text-[10px] tracking-widest">System Alert: {error}</span>
          </div>
        )}

        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-24 flex flex-col items-center">
               <div className="w-10 h-10 border-2 border-t-[#FFD700] border-slate-800 rounded-full animate-spin mb-6"></div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Decrypting Feed...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-24 bg-slate-900/20 rounded-[3rem] border border-slate-800 border-dashed">
              <p className="text-slate-600 font-bold uppercase tracking-widest text-xs italic">The frequency is currently silent.</p>
            </div>
          ) : (
            <AnimatePresence>
              {announcements.map((item, index) => (
                <motion.article
                  key={item._id || index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] border border-slate-800 p-8 sm:p-10 hover:border-[#FFD700]/20 transition-all duration-500 shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity" />
                  
                  <div className="flex flex-col md:flex-row justify-between gap-8 items-start relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${getBadgeStyle(item.type)}`}>
                          {item.type || "Update"}
                        </span>
                        <div className="flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                           <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                             {formatDate(item.createdAt || item.date)}
                           </span>
                        </div>
                      </div>

                      <h3 className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors mb-4 uppercase tracking-tighter leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed font-medium text-base">
                        {item.description}
                      </p>
                    </div>
                    
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-6 py-3 rounded-xl bg-slate-800 text-white font-black uppercase tracking-widest text-[9px] border border-slate-700 hover:border-[#FFD700] hover:text-[#FFD700] transition-all shrink-0"
                      >
                        Access Protocol →
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* COMMUNITY CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-16 rounded-[3.5rem] border border-slate-800 bg-slate-900/20 backdrop-blur-2xl text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
          <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter leading-none">Stay Synchronized</h3>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto font-medium">Join 500+ students receiving direct alerts on results, notices, and hackathon schedules.</p>
          
          <button className="px-12 py-5 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFA500] text-black font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:scale-105 hover:brightness-110 transition-all duration-300 active:scale-95">
  Join the Frequency
</button>
        </motion.div>

      </div>
    </div>
  );
}