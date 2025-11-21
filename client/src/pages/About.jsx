import React from "react";
import { motion } from "framer-motion";

export default function About() {

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30">
      {/* --- BACKGROUND DESIGN START --- */}
      {/* UPDATED: Golden Grid */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        animate={{ x: [-20, 20, -20], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* --- BACKGROUND DESIGN END --- */}

      <div className="relative z-10 px-6 py-24 max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-6">
            About The <span className="text-[#FFD700]">Society</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            The Computer Science Society (CSS) at GCU Lahore is a vibrant student-led
            organization dedicated to promoting innovation, leadership, and technical
            excellence among computing students.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5 }}
            className="bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">
              To empower students with the knowledge, tools, and opportunities needed
              to excel in the ever-evolving fields of computer science and technology.
              We foster a culture of creativity, collaboration, and hands-on learning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5 }}
            className="bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:border-[#FFD700]/30 transition-all duration-300"
          >
             <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 text-[#FFD700]">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed">
              To create one of the most impactful and forward-thinking student societies
              in Pakistan — where every aspiring technologist finds guidance, exposure,
              and opportunities to grow.
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="relative z-10 mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Goals & Objectives</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Skill Development",
                text: "Conduct workshops and bootcamps to strengthen students’ practical understanding of AI, Web, Cyber Security, Cloud, and Data Science.",
                icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>)
              },
              {
                title: "Community Building",
                text: "Create an inclusive environment where students from all backgrounds collaborate, network, and learn from one another.",
                icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>)
              },
              {
                title: "Innovation & Leadership",
                text: "Encourage students to take initiative, lead events, develop projects, and participate in national-level competitions.",
                icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-slate-900/30 border border-slate-800/60 backdrop-blur-lg p-8 rounded-2xl hover:bg-slate-800/50 hover:border-blue-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-blue-400 group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="relative z-10 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 backdrop-blur-xl p-10 md:p-12 rounded-3xl shadow-2xl max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            A Brief <span className="text-[#FFD700]">History</span>
          </h2>

          <p className="text-slate-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            The Computer Science Society at GCU Lahore has played a pivotal role in
            supporting and uplifting young technologists across the university. From
            hosting Pakistan’s largest student-led tech competitions to facilitating
            skill-building workshops, CSS continues to evolve and adapt to emerging
            technologies — empowering students every step of the way.
          </p>
        </motion.div>

      </div>
    </div>
  );
}