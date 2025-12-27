import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../App"; // Unified import

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${API_URL}/announcements`);
        const data = await response.json();
        
        // Safety: Filter for public display
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
      case "notice": return "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]";
      case "opportunity": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
      case "result": return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]";
      case "update": return "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
      default: return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- RESTORED: Golden Grid with High Visibility --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70015_1px,transparent_1px),linear-gradient(to_bottom,#FFD70015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
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
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            Society <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Updates</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Stay synchronized with the latest departmental notices and 
            technological breakthroughs within the GCU ecosystem.
          </p>
        </motion.div>

        {error && (
          <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-6 rounded-[2.5rem] text-center mb-12 backdrop-blur-xl">
            <span className="font-black uppercase text-[10px] tracking-widest">System Alert: {error}</span>
          </div>
        )}

        <div className="space-y-8">
          {loading ? (
            <div className="text-center py-24 flex flex-col items-center">
               <div className="w-10 h-10 border-2 border-t-[#FFD700] border-slate-800 rounded-full animate-spin mb-6"></div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Syncing Frequencies...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-24 bg-slate-900/20 rounded-[3rem] border border-slate-800 border-dashed backdrop-blur-sm">
              <p className="text-slate-600 font-bold uppercase tracking-widest text-xs italic">The broadcast frequency is currently silent.</p>
            </div>
          ) : (
            <AnimatePresence>
              {announcements.map((item, index) => (
                <motion.article
                  key={item._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-slate-800 p-8 sm:p-10 transition-all duration-500 hover:border-[#FFD700]/30 hover:shadow-2xl overflow-hidden cursor-default"
                >
                  {/* Subtle Light Scan Effect on Hover */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 blur-[120px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                  
                  <div className="flex flex-col md:flex-row justify-between gap-8 items-start relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border transition-all duration-500 group-hover:scale-105 ${getBadgeStyle(item.type)}`}>
                          {item.type || "Update"}
                        </span>
                        <div className="flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-[#FFD700] transition-colors" />
                           <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                             {formatDate(item.createdAt || item.date)}
                           </span>
                        </div>
                      </div>

                      <h3 className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors mb-4 uppercase tracking-tighter leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed font-medium text-base group-hover:text-slate-300 transition-colors">
                        {item.description}
                      </p>
                    </div>
                    
                    {item.link && (
                      <motion.a 
                        whileHover={{ x: 5 }}
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-black uppercase tracking-widest text-[9px] hover:border-[#FFD700] hover:text-[#FFD700] transition-all shrink-0 shadow-xl"
                      >
                        Launch Protocol →
                      </motion.a>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* --- PREMIUM CALL TO ACTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          className="mt-32 p-12 md:p-16 rounded-[3.5rem] border border-slate-800 bg-slate-900/30 backdrop-blur-2xl text-center relative overflow-hidden group transition-all duration-500 hover:border-blue-500/20"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter leading-none">Stay In the Loop</h3>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto font-medium">Synchronize with our community to receive direct alerts on results, hackathons, and board updates.</p>
          
          <button className="px-12 py-5 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFA500] text-black font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] hover:scale-105 hover:brightness-110 transition-all duration-500 active:scale-95">
  Connect to Community
</button>
        </motion.div>

      </div>
    </div>
  );
}