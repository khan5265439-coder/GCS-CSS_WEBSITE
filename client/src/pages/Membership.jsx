import React, { useState } from "react";
import { motion } from "framer-motion";
import { API_URL } from "../utils/config";

/**
 * @description Standardized Membership Application page. 
 * Linked to the Admin Control Center for review and promotion.
 */
export default function Membership() {
  const [formData, setFormData] = useState({
    fullName: "",
    rollNo: "",
    department: "",
    semester: "",
    gmail: "",
    phoneNumber: "",
    applyingRole: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/memberships`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          rollNo: "",
          department: "",
          semester: "",
          gmail: "",
          phoneNumber: "",
          applyingRole: "",
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(data.message || "An application with this Node ID (Roll No) already exists.");
      }
    } catch (error) {
      setError("Communication failure. Please check your uplink and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70010_1px,transparent_1px),linear-gradient(to_bottom,#FFD70010_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="relative z-10 px-4 md:px-6 py-28 max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4"
          >
            Enlist in <span className="text-[#FFD700]">The Society</span>
          </motion.h1>

          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] max-w-xl mx-auto leading-relaxed">
            Initialize your journey with the GCU Computer Science Society. 
          </p>
        </div>

        {/* Status Messages */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-8 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 text-blue-400 text-center flex flex-col items-center gap-4 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl">✓</div>
            <h3 className="font-black uppercase tracking-widest text-lg">Application Transmitted</h3>
            <p className="text-xs font-bold text-slate-400 max-w-sm uppercase">The Executive Board will review your credentials. Check your digital mail for confirmation.</p>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center text-xs font-black uppercase tracking-widest"
          >
            {error}
          </motion.div>
        )}

        {/* Application Form */}
        {!submitted && (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-slate-900/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute top-0 right-10 w-20 h-1 bg-[#FFD700]" />
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="IDENTIFIER" className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-700 focus:border-blue-500 transition-all outline-none font-bold text-sm" required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">University Roll No</label>
              <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="NODE ID" className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-700 focus:border-blue-500 transition-all outline-none font-bold text-sm" required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="SECTOR" className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-700 focus:border-blue-500 transition-all outline-none font-bold text-sm" required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Current Semester</label>
              <input type="text" name="semester" value={formData.semester} onChange={handleChange} placeholder="PHASE" className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-700 focus:border-blue-500 transition-all outline-none font-bold text-sm" required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Gmail Address</label>
              <input type="email" name="gmail" value={formData.gmail} onChange={handleChange} placeholder="COMM-LINK" className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-700 focus:border-blue-500 transition-all outline-none font-bold text-sm" required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">WhatsApp Contact</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="SIGNAL-LINE" className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-700 focus:border-blue-500 transition-all outline-none font-bold text-sm" required />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Desired Rank (Role)</label>
              <select 
                  name="applyingRole" 
                  value={formData.applyingRole} 
                  onChange={handleChange} 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-white focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer text-xs font-black uppercase tracking-widest"
                  required
              >
                  <option value="">-- SELECT ROLE --</option>
                  <option value="General Member">General Member</option>
                  <option value="Executive Council">Executive Council</option>
                  <option value="Media Team">Media & Communications</option>
                  <option value="Technical Team">Technical Operations</option>
              </select>
            </div>

            <div className="md:col-span-2 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] shadow-xl hover:bg-[#FFD700] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Syncing Credentials..." : "Initiate Membership"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}