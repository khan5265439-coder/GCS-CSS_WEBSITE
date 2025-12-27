import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { API_URL } from "../App"; // Unified Bridge URL

export default function ActivateAccount() {
  const [formData, setFormData] = useState({ rollNo: "", gmail: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passcodes do not match.");
    }
    if (formData.password.length < 6) {
      return toast.error("Security risk: Password too short.");
    }

    setLoading(true);
    const loadToast = toast.loading("Verifying Credentials...");

    try {
      const res = await fetch(`${API_URL}/admin/setup-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollNo: formData.rollNo,
          gmail: formData.gmail,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Node Activated. Access Granted.", { id: loadToast });
        // Give the user time to read the success message
        setTimeout(() => navigate("/admin"), 2000);
      } else {
        toast.error(data.message || "Activation failed. Are you approved?", { id: loadToast });
      }
    } catch (error) {
      toast.error("Bridge Connection Lost.", { id: loadToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#FFD70005_1px,transparent_1px),linear-gradient(to_bottom,#FFD70005_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-3xl border border-slate-800 p-10 rounded-[2.5rem] shadow-3xl"
      >
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 text-[#FFD700] text-[8px] font-black uppercase tracking-[0.3em] mb-4">
            Security Protocol 09
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Activate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Node</span></h1>
          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em] mt-3">Member Authentication Setup</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Assigned Roll No</label>
            <input 
              required
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-blue-500/50 outline-none transition-all placeholder-slate-700"
              placeholder="e.g. 1234-BSCS-22"
              value={formData.rollNo}
              onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Official Gmail</label>
            <input 
              required
              type="email"
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-blue-500/50 outline-none transition-all placeholder-slate-700"
              placeholder="ravian@gmail.com"
              value={formData.gmail}
              onChange={(e) => setFormData({...formData, gmail: e.target.value})}
            />
          </div>

          <div className="h-px bg-slate-800/50 my-6" />

          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Set Access Key</label>
              <input 
                required
                type="password"
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-[#FFD700]/30 outline-none transition-all placeholder-slate-700"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Confirm Access Key</label>
              <input 
                required
                type="password"
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-[#FFD700]/30 outline-none transition-all placeholder-slate-700"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FFD700] to-yellow-500 text-black font-black uppercase tracking-[0.2em] text-[10px] py-5 rounded-2xl mt-4 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#FFD700]/10 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Encrypting...
              </span>
            ) : "Finalize Activation"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-800/50 flex flex-col items-center gap-4">
            <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest text-center">
              Activation requires prior Executive Board approval.
            </p>
            <Link to="/admin" className="text-[9px] font-black uppercase text-blue-500 hover:text-blue-400 transition-colors tracking-[0.2em]">
              ← Return to Login
            </Link>
        </div>
      </motion.div>
    </div>
  );
}