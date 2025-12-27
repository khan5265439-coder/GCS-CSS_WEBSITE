import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { API_URL } from "../App"; 

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadToast = toast.loading("Initializing Transmission...");
    
    try {
      const response = await fetch(`${API_URL}/admin/messages/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Transmission Received. Node Updated.", { id: loadToast });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Protocol Error.", { id: loadToast });
      }
    } catch (error) {
      toast.error("Bridge Connection Lost.", { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- GOLDEN GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70015_1px,transparent_1px),linear-gradient(to_bottom,#FFD70015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="relative z-10 px-6 pt-32 pb-24 max-w-6xl mx-auto">
        
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Touch</span>
          </h1>
          <p className="text-slate-500 text-[10px] mt-4 font-black uppercase tracking-[0.5em] opacity-60">"Connecting Visionaries with Technology"</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          
          {/* LEFT SIDE: CONTACT NODE */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
            <div className="bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-slate-800 shadow-3xl h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600/30" />
              
              <h2 className="text-3xl font-black text-white mb-12 uppercase tracking-tight flex items-center gap-4">
                Contact <span className="text-blue-500">Node</span>
              </h2>
              
              <div className="space-y-12">
                {/* HEADQUARTERS - Individual Ignite */}
                <div className="flex items-start gap-6 group">
                  <a href="https://maps.google.com/?q=GCU+Lahore+Computer+Science+Department" target="_blank" rel="noreferrer" className="shrink-0">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-600 transition-all duration-500 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:border-blue-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                  </a>
                  <div>
                    <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Headquarters</h3>
                    <p className="text-base text-slate-500 font-medium italic">Computer Science Dept, GCU Lahore</p>
                  </div>
                </div>

                {/* DIGITAL MAIL - Individual Ignite */}
                <div className="flex items-start gap-6 group">
                  <a href="mailto:css@gcu.edu.pk" className="shrink-0">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-600 transition-all duration-500 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:border-blue-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                  </a>
                  <div>
                    <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Digital Mail</h3>
                    <p className="text-base text-slate-500 font-medium italic">css@gcu.edu.pk</p>
                  </div>
                </div>
              </div>

              {/* SOCIAL CHANNELS WITH ENHANCED EFFECTS */}
              <div className="mt-20 border-t border-slate-800/50 pt-10">
                <p className="text-[9px] font-black text-slate-700 mb-6 uppercase tracking-[0.4em]">Society Channels</p>
                <div className="flex flex-wrap gap-4">
                  {/* FACEBOOK */}
                  <a href="https://web.facebook.com/CSSGCU" target="_blank" rel="noreferrer" 
                    className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] hover:-translate-y-1.5 transition-all duration-300">
                    Facebook
                  </a>

                  {/* LINKEDIN */}
                  <a href="https://www.linkedin.com/in/css-gcu-lahore" target="_blank" rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] hover:shadow-[0_0_20px_rgba(0,119,181,0.4)] hover:-translate-y-1.5 transition-all duration-300">
                    LinkedIn
                  </a>

                  {/* INSTAGRAM */}
                  <a href="https://www.instagram.com/css.gcu" target="_blank" rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(238,42,123,0.4)] hover:-translate-y-1.5 transition-all duration-300">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: INQUIRY FORM */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-slate-800 shadow-3xl h-full relative overflow-hidden transition-all duration-500 hover:border-[#FFD700]/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-40" />
              
              <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tight leading-none">Initialize <span className="text-[#FFD700]">Inquiry</span></h2>
              
              <div className="space-y-5">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="IDENTIFIER NAME" className="w-full px-5 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 focus:border-[#FFD700]/30 outline-none transition-all text-[10px] font-black tracking-widest uppercase" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="UPLINK GMAIL" className="w-full px-5 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 focus:border-[#FFD700]/30 outline-none transition-all text-[10px] font-black tracking-widest uppercase" required />
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="SUBJECT DECRYPTION" className="w-full px-5 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 focus:border-[#FFD700]/30 outline-none transition-all text-[10px] font-black tracking-widest uppercase" required />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="MESSAGE PAYLOAD..." rows="4" className="w-full px-5 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 focus:border-[#FFD700]/30 outline-none transition-all resize-none text-[10px] font-black tracking-widest uppercase" required></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="mt-8 w-full py-5 rounded-2xl bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFA500] text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all duration-300">
                {isSubmitting ? "TRANSMITTING..." : "SEND TRANSMISSION"}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}