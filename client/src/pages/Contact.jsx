import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- BACKGROUND DESIGN START --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <motion.div
        className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"
        animate={{ x: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* --- BACKGROUND DESIGN END --- */}

      <div className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
            Get In <span className="text-[#FFD700]">Touch</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Have questions about the society, events, or collaborations? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Left Side: Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-xl hover:border-blue-500/30 transition-colors duration-300 h-full">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-[#FFD700] rounded-full block"></span>
                Contact Info
              </h2>
              
              <div className="space-y-6 text-slate-300">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Visit Us</h3>
                    <p className="text-sm mt-1">Computer Science Department,<br/>GCU Lahore, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email Us</h3>
                    <p className="text-sm mt-1">cs-society@gcu.edu.pk</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Call Us</h3>
                    <p className="text-sm mt-1">+92 345 9867386</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Follow our Socials</p>
                <div className="flex flex-wrap gap-3">
                  {[ 
                    { name: "Facebook", link: "https://web.facebook.com/CSSGCU", bg: "hover:bg-blue-600" }, 
                    { name: "LinkedIn", link: "https://www.linkedin.com/in/css-gcu-lahore?miniProfileUrn=urn%3Ali%3Afsd_profile%3AACoAADkMxLIBEAdDYKKrYiJGjCl5V0sNO_xK8Qw", bg: "hover:bg-blue-700" }, 
                    { name: "Instagram", link: "https://www.instagram.com/css.gcu?igsh=MW9pdHNlNTlub2R6Mg==", bg: "hover:bg-pink-600" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium transition-all duration-300 hover:text-white hover:border-transparent hover:shadow-lg hover:-translate-y-1 ${social.bg}`}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col gap-5 h-full"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
              
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Message sent successfully!
                </motion.div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="khan"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="khan@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
