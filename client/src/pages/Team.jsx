import React, { useState, useEffect } from "react";
import TeamCard from "../components/TeamCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/config";

/**
 * @description Dynamic Team page that fetches the Executive Board from the database.
 * Orders members by hierarchy (1 = Highest Rank).
 */
export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_URL}/team`); 
        const data = await response.json();
        
        // --- LOGIC BINDING ---
        // Ensure data is an array and sort by hierarchy (1, 2, 3...)
        if (Array.isArray(data)) {
            const sortedData = data.sort((a, b) => a.hierarchy - b.hierarchy);
            setTeamMembers(sortedData);
        } else {
            setTeamMembers([]);
        }
      } catch (error) {
        console.error("Transmission Error:", error);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- BACKGROUND INFRASTRUCTURE --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70010_1px,transparent_1px),linear-gradient(to_bottom,#FFD70010_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        animate={{ y: [-20, 20, -20], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-6 uppercase">
            Society <span className="text-[#FFD700]">Architects</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] max-w-2xl mx-auto italic">
            "Connecting intelligence to build a digital future."
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
             <div className="w-10 h-10 border-2 border-t-[#FFD700] border-slate-800 rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-slate-600 font-black uppercase tracking-widest text-[9px]">Syncing Personnel Records...</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-[3rem]">
            <p className="text-slate-500 uppercase font-black text-xs tracking-widest">No board members logged in database.</p>
          </div>
        ) : (
          <motion.div
            className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member._id}
                whileHover={{ y: -10 }}
                className="group relative bg-slate-900/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-slate-800 hover:border-[#FFD700]/40 transition-all duration-500 shadow-2xl"
              >
                {/* Internal Glow Effect */}
                <div className="absolute top-0 right-10 w-20 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <TeamCard
                    name={member.name}
                    role={member.role}
                    photo={member.image || "/assets/images/placeholder-user.jpg"}
                    description={member.description || "Leading the Computer Science Society towards innovation and excellence."}
                  />
                  
                  {/* Digital Links */}
                  <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-center gap-6">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-all">LinkedIn</a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-pink-500 transition-all">Instagram</a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* JOIN THE TEAM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 relative overflow-hidden rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-3xl px-8 py-20 text-center shadow-3xl max-w-4xl mx-auto"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />

          <h3 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter uppercase">
            Initialize <span className="text-[#FFD700]">Your Legacy</span>
          </h3>
          
          <p className="text-slate-400 mb-10 max-w-xl mx-auto text-sm font-medium">
            Join the leadership of GCU Lahore's most active tech society. Influence the campus tech culture.
          </p>

          <Link
            to="/membership"
            className="inline-block px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-[#FFD700] hover:scale-105 transition-all duration-300"
          >
            Apply for Membership
          </Link>
        </motion.div>

      </div>
    </div>
  );
}