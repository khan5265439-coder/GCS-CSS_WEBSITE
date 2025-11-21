import React from "react";
import TeamCard from "../components/TeamCard";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Tauseef Iftikhar",
    role: "Advisor",
    photo: "assets/images/team1.png",
    description: "Providing leadership, wisdom, and strategic insight."
  },
  {
    name: "Maryam Gondal",
    role: "President",
    photo: "assets/images/team2.png",
    description: "Leading the society with vision and purpose."
  },
  {
    name: "Zain Amir",
    role: "Vice President",
    photo: "assets/images/team3.png",
    description: "Empowering teams and ensuring smooth execution."
  },
  {
    name: "Rabail Ali",
    role: "General Secretary",
    photo: "assets/images/team4.png",
    description: "Managing communication, structure, and coordination"
  },
  {
    name: "Jibran Akhtar",
    role: "General Manager",
    photo: "assets/images/team5.png",
    description: "Overseeing operations and driving success."
  },
  {
    name: "Maryam Mohib",
    role: "Media Head",
    photo: "assets/images/team6.png",
    description: "Crafting our story and amplifying our reach."
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND DESIGN START --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"
        animate={{ y: [-20, 20, -20], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* --- BACKGROUND DESIGN END --- */}

      <div className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-6">
            Meet the <span className="text-[#FFD700]">Visionaries</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            The dedicated minds working behind the scenes to drive innovation 
            and foster a community of tech enthusiasts at GCU.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.15 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative bg-slate-900/50 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl transition-all duration-300 hover:border-blue-500/30 hover:shadow-blue-500/10"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <TeamCard
                  name={member.name}
                  role={member.role}
                  photo={member.photo}
                  description={member.description}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/80 backdrop-blur-2xl px-8 py-16 text-center shadow-2xl max-w-4xl mx-auto"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70 blur-sm" />

          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-wide">
            Want to be part of the <span className="text-[#FFD700]">Core Team?</span>
          </h3>
          
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
            Join the CS Society leadership to organize events, mentor peers, and shape the future of tech at GCU Lahore.
          </p>

          <a
            href="/membership"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300"
          >
            Apply for Membership
          </a>
        </motion.div>

      </div>
    </div>
  );
}