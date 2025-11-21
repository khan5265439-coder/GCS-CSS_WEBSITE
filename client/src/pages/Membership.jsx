import React, { useState } from "react";
import { motion } from "framer-motion";

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

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/memberships", {
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
        setError(data.message || "Something went wrong!");
      }
    } catch (error) {
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND DESIGN START --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        animate={{ x: [-50, 50, -50], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* --- BACKGROUND DESIGN END --- */}

      <div className="relative z-10 px-4 md:px-6 py-28 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4"
          >
            Apply for <span className="text-[#FFD700]">Membership</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Join the elite community of tech enthusiasts at GCU. Be part of the team that drives innovation.
          </motion.p>
        </div>

        {/* Success Message */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-center flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="font-bold text-lg">Application Submitted!</h3>
            <p className="text-sm text-green-400/80">We will review your application and get back to you soon.</p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-slate-900/50 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-300 ml-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g., Muhammad Ali"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Roll No */}
          <div className="space-y-2">
            <label htmlFor="rollNo" className="text-sm font-medium text-slate-300 ml-1">
              Roll No
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="e.g., 00-BS-SP-CS-24"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label htmlFor="department" className="text-sm font-medium text-slate-300 ml-1">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., CS"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Semester */}
          <div className="space-y-2">
            <label htmlFor="semester" className="text-sm font-medium text-slate-300 ml-1">
              Semester
            </label>
            <input
              type="text"
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              placeholder="e.g., 4th"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Gmail */}
          <div className="space-y-2">
            <label htmlFor="gmail" className="text-sm font-medium text-slate-300 ml-1">
              Gmail Address
            </label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              placeholder="khan@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium text-slate-300 ml-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="0300 1234567"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Applying Role (Full Width) */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="applyingRole" className="text-sm font-medium text-slate-300 ml-1">
              Applying Role
            </label>
            <input
              type="text"
              id="applyingRole"
              name="applyingRole"
              value={formData.applyingRole}
              onChange={handleChange}
              placeholder="e.g., Executive Member, Media Team, Graphics Designer"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-lg shadow-lg hover:shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}