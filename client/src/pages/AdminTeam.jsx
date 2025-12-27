import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../App"; // Unified Bridge URL

export default function AdminTeam() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    hierarchy: 10,
    linkedin: "",
    instagram: "",
    description: ""
  });

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/team`, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      // Logic: Sort by hierarchy so Advisor/President stay at the top of the list
      setTeam(data.sort((a, b) => a.hierarchy - b.hierarchy));
    } catch (error) {
      toast.error("Team Sync Failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (!token) navigate("/admin");
    fetchTeam(); 
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadToast = toast.loading("Processing Appointment...");

    try {
      const res = await fetch(`${API_URL}/team`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success("Board Member Appointed! 🎖️", { id: loadToast });
        setFormData({ name: "", role: "", image: "", hierarchy: 10, linkedin: "", instagram: "", description: "" });
        fetchTeam(); 
      } else {
        toast.error("Operation Denied.", { id: loadToast });
      }
    } catch (error) {
      toast.error("Connection Interrupted.", { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("PERMANENT REMOVAL: Strip this member of their Executive status?")) return;
    
    try {
      const res = await fetch(`${API_URL}/team/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        toast.success("Member Removed.");
        setTeam(prev => prev.filter(m => m._id !== id));
      } else {
        toast.error("Unauthorized Action.");
      }
    } catch (error) {
      toast.error("Network Error.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Architecture */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#FFD70010_1px,transparent_1px),linear-gradient(to_bottom,#FFD70010_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto mt-24 relative z-10">
        
        {/* HEADER & NAVIGATION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase">Board <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Command</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Executive Hierarchy Management</p>
          </div>

          <button 
            onClick={() => navigate("/admin-dashboard")} 
            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-blue-500/50 hover:bg-slate-800 transition-all"
          >
            <svg className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Command
          </button>
        </div>
        
        {/* APPOINTMENT FORM */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 p-8 md:p-10 rounded-[2.5rem] mb-16 shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600/50" />
          <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Appoint Executive Member
          </h2>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Identity Name</label>
                  <input className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-blue-500/50 outline-none transition-all" placeholder="Dr. John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Official Designation</label>
                  <input className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-blue-500/50 outline-none transition-all" placeholder="Society President" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Photo Resource Link</label>
                  <input className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-blue-500/50 outline-none transition-all" placeholder="https://path-to-photo.jpg" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Hierarchy Index (1 = Highest)</label>
                  <input className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-blue-500/50 outline-none transition-all" type="number" value={formData.hierarchy} onChange={e => setFormData({...formData, hierarchy: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">LinkedIn Profile</label>
                  <input className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-blue-500/50 outline-none transition-all" placeholder="Full URL" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Instagram Handle</label>
                  <input className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-blue-500/50 outline-none transition-all" placeholder="Full URL" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
                </div>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="flex-grow space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Executive Summary</label>
                  <textarea className="w-full h-[calc(100%-30px)] bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm focus:border-blue-500/50 outline-none resize-none" placeholder="Professional bio..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
                <button disabled={isSubmitting} className="w-full bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl py-5 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 disabled:opacity-50">
                  {isSubmitting ? "Deploying Data..." : "Confirm Appointment"}
                </button>
            </div>
          </form>
        </motion.div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loading ? (
             <div className="col-span-full text-center py-20 flex flex-col items-center">
                <div className="w-10 h-10 border-2 border-slate-800 border-t-[#FFD700] rounded-full animate-spin mb-4"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Accessing Records...</p>
             </div>
          ) : (
            <AnimatePresence>
              {team.map(m => (
                <motion.div layout key={m._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-slate-900/40 backdrop-blur-2xl p-6 rounded-[2rem] border border-slate-800 hover:border-blue-500/30 transition-all text-center relative"
                >
                  <div className="absolute top-3 right-3 text-[8px] bg-slate-950 border border-slate-800 px-2 py-1 rounded-full text-slate-400 font-black uppercase tracking-widest">
                    Rank {m.hierarchy}
                  </div>
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                    <img 
                      src={m.image || "/assets/images/placeholder-user.jpg"} 
                      className="relative w-full h-full rounded-full object-cover border-4 border-slate-800 group-hover:border-blue-500 transition-all grayscale group-hover:grayscale-0" 
                      onError={(e) => e.target.src = "https://via.placeholder.com/150?text=Executive"}
                    />
                  </div>
                  <h3 className="font-black text-sm uppercase tracking-tight text-white truncate">{m.name}</h3>
                  <p className="text-[9px] text-blue-500 uppercase font-black tracking-[0.2em] mb-6 mt-1">{m.role}</p>
                  
                  <button 
                    onClick={() => deleteMember(m._id)} 
                    className="text-[9px] uppercase font-black text-slate-600 hover:text-red-500 transition-colors pt-4 border-t border-slate-800/50 w-full tracking-widest"
                  >
                    Terminate
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}