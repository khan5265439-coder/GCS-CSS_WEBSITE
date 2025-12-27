import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../App"; 

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const authToast = toast.loading("Verifying Identity...");

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.clear();
        localStorage.setItem("adminToken", result.token);
        
        const adminData = {
          id: result.user?.id,
          name: result.user?.fullName || "Admin User",
          email: result.user?.email || email,
          permissions: result.user?.permissions || { isAdmin: true }
        };
        
        localStorage.setItem("adminUser", JSON.stringify(adminData));
        toast.success("Identity Verified.", { id: authToast });
        navigate("/admin-dashboard"); 
      } else {
        toast.error(result.message || "Unauthorized.", { id: authToast });
      }
    } catch (error) {
      toast.error("Bridge Offline.", { id: authToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-y-auto relative flex items-center justify-center font-sans">
      
      {/* --- HIGH-INTENSITY GOLDEN GRID --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#FFD700_1px,transparent_1px),linear-gradient(to_bottom,#FFD700_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        {/* Radial fade to prevent the grid from being too harsh at the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#020617_90%)]" />
      </div>

      {/* Main Container with bottom padding for space */}
      <div className="relative z-10 w-full max-w-lg px-6 pt-10 pb-32 flex flex-col items-center">
        
        {/* LOGO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-block relative p-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-6">
            <img src="/logo.jpg" alt="GCU CSS" className="w-20 h-20 rounded-xl object-cover" />
          </div>

          <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Portal</span>
          </h1>
          <p className="text-slate-500 mt-2 text-[10px] font-black tracking-[0.4em] uppercase opacity-70">
             Security Clearance Required
          </p>
        </motion.div>

        {/* LOGIN BOX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-slate-900/60 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Uplink Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gcu.edu.pk"
                className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-medium text-white placeholder-slate-800 focus:outline-none focus:border-[#FFD700]/40 transition-all shadow-inner"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-medium text-white placeholder-slate-800 focus:outline-none focus:border-[#FFD700]/40 transition-all shadow-inner"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full relative py-4 mt-4 rounded-2xl bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFA500] text-black font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:shadow-[#FFD700]/10 hover:brightness-110 active:scale-[0.97] transition-all ${isSubmitting ? "opacity-50" : ""}`}
            >
              {isSubmitting ? "Authenticating..." : "Establish Connection"}
            </button>
          </form>
        </motion.div>
        
        {/* Invisible Spacer to prevent screen-edge sticking */}
        <div className="h-10 w-full"></div>
      </div>
    </div>
  );
}