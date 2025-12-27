import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../App"; // Unified Bridge URL

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userPermissions, setUserPermissions] = useState(null);
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    date: "",
    type: "",
    description: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const fetchAnnouncements = async () => {
    try {
      const savedUserData = JSON.parse(localStorage.getItem("adminUser"));
      setUserPermissions(savedUserData?.permissions);

      const response = await fetch(`${API_URL}/announcements/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      const newsList = Array.isArray(data) ? data : (data.success ? data.data || [] : []);
      setAnnouncements(newsList);

      if (response.status === 401) navigate("/admin");
    } catch (error) {
      toast.error("Frequency Sync Failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (!token) navigate("/admin");
    fetchAnnouncements(); 
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadToast = toast.loading("Broadcasting to Feed...");
    
    try {
      const response = await fetch(`${API_URL}/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAnnouncement),
      });

      if (!response.ok) throw new Error();

      toast.success("Transmission Deployed.", { id: loadToast });
      setNewAnnouncement({ title: "", date: "", type: "", description: "" });
      fetchAnnouncements(); 
    } catch (error) {
      toast.error("Broadcast Interrupted.", { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleArchive = async (id) => {
    try {
      const response = await fetch(`${API_URL}/announcements/archive/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success("Status Updated.");
        fetchAnnouncements();
      }
    } catch (error) {
      toast.error("Update Failed.");
    }
  };

  const deleteAnnouncement = async (id) => {
    if(!window.confirm("PERMANENT WIPE? This removes the news from history.")) return;
    try {
      const response = await fetch(`${API_URL}/announcements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success("Record Purged.");
        setAnnouncements(announcements.filter((a) => a._id !== id));
      }
    } catch (error) {
      toast.error("Wipe Operation Failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70005_1px,transparent_1px),linear-gradient(to_bottom,#FFD70005_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 px-6 pt-32 pb-24 max-w-7xl mx-auto">
        
        {/* HEADER & NAVIGATION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
          <div>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-5xl font-black tracking-tighter uppercase">
              News <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Broadcaster</span>
            </motion.h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Institutional Alerts & Feed Management</p>
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

        <div className="grid lg:grid-cols-12 gap-12">
          {/* FORM COLUMN */}
          <div className="lg:col-span-4">
            {userPermissions?.canManageAnnouncements ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl sticky top-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600/50" />
                <h2 className="text-lg font-black text-white mb-8 uppercase tracking-tight">Draft Transmission</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Headline</label>
                    <input name="title" value={newAnnouncement.title} onChange={handleChange} placeholder="MAJOR UPDATE TITLE" className="w-full px-5 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold uppercase tracking-widest focus:border-blue-500/50 outline-none transition-all" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Classification</label>
                      <select name="type" value={newAnnouncement.type} onChange={handleChange} className="w-full px-4 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-bold uppercase tracking-widest focus:border-blue-500/50 outline-none cursor-pointer" required>
                        <option value="">CATEGORY</option>
                        <option value="Notice">Notice</option>
                        <option value="Update">Update</option>
                        <option value="Opportunity">Opportunity</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Schedule Date</label>
                      <input type="date" name="date" value={newAnnouncement.date} onChange={handleChange} className="w-full px-4 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-bold outline-none focus:border-blue-500/50" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Message Content</label>
                    <textarea name="description" value={newAnnouncement.description} onChange={handleChange} placeholder="PAYLOAD DESCRIPTION..." rows="4" className="w-full px-5 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold focus:border-blue-500/50 outline-none resize-none" required />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-500 hover:-translate-y-0.5 transition-all disabled:opacity-50">
                    {isSubmitting ? "Transmitting..." : "Initialize Broadcast"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <div className="bg-slate-900/20 border border-dashed border-slate-800 p-10 rounded-[2.5rem] text-center">
                <p className="italic text-slate-600 text-xs font-bold uppercase tracking-widest">Access Denied: Request News Credentials</p>
              </div>
            )}
          </div>

          {/* LIST COLUMN */}
          <div className="lg:col-span-8 space-y-6">
             <div className="flex items-center justify-between px-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Live Frequency History</h2>
                <div className="text-[9px] font-black px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-blue-400">SYNCED RECORDS: {announcements.length}</div>
             </div>

             {loading ? (
                <div className="flex flex-col items-center justify-center p-20 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                   <div className="w-8 h-8 border-2 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                   Scanning Frequency...
                </div>
             ) : (
                <div className="space-y-4">
                <AnimatePresence>
                  {announcements.map((item, index) => (
                    <motion.div key={item._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                      className={`group bg-slate-900/40 backdrop-blur-2xl border border-slate-800 p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#FFD700]/20 transition-all ${item.isArchived ? 'opacity-50 grayscale' : ''}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-[#FFD700] text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-slate-950 border border-[#FFD700]/20 rounded-full">{item.type}</span>
                          <span className="text-slate-600 text-[10px] font-mono tracking-tighter">{new Date(item.date).toDateString()}</span>
                          {item.isArchived && <span className="text-[8px] text-amber-500 font-black uppercase tracking-widest">[Archived]</span>}
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{item.title}</h3>
                        <p className="text-slate-500 text-sm mt-2 line-clamp-2 font-medium">{item.description}</p>
                      </div>

                      {userPermissions?.canManageAnnouncements && (
                        <div className="flex md:flex-col gap-2">
                          <button onClick={() => toggleArchive(item._id)} className="p-3 rounded-2xl bg-slate-800 text-slate-400 hover:text-[#FFD700] transition-all" title="Archive/Restore">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                          </button>
                          <button onClick={() => deleteAnnouncement(item._id)} className="p-3 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white transition-all" title="Wipe">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}