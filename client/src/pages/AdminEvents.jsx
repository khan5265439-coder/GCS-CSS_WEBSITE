import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../App"; // Unified Bridge URL

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState(null); 
  const [formData, setFormData] = useState({ title: "", date: "", description: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("ledger"); 
  const [userPermissions, setUserPermissions] = useState(null);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const fetchEvents = async () => {
    try {
      const savedUserData = JSON.parse(localStorage.getItem("adminUser"));
      setUserPermissions(savedUserData?.permissions);

      const res = await fetch(`${API_URL}/events/admin/all`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      const data = await res.json();
      const eventList = Array.isArray(data) ? data : (data.success ? data.data || [] : []);
      setEvents(eventList);
      
      if (res.status === 401) navigate("/admin");
    } catch (error) {
      toast.error("Sub-system sync failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (!token) navigate("/admin");
    fetchEvents(); 
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId ? `${API_URL}/events/${editId}` : `${API_URL}/events`;
    const method = editId ? "PUT" : "POST";
    const loadToast = toast.loading(editId ? "Updating Record..." : "Publishing Broadcast...");

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData) 
      });

      if (res.ok) {
        toast.success(editId ? "Entry Modified." : "Event Broadcast Deployed.", { id: loadToast });
        resetForm();
        fetchEvents(); 
      } else {
        toast.error("Operation failed.", { id: loadToast });
      }
    } catch (error) {
      toast.error("Bridge Connection Lost.", { id: loadToast });
    }
  };

  const handleArchive = async (id) => {
    const res = await fetch(`${API_URL}/events/archive/${id}`, {
      method: "PATCH",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if(res.ok) {
      toast.success("Record Status Toggled.");
      fetchEvents();
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("PERMANENT WIPE? This cannot be undone.")) return;
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if(res.ok) {
      toast.success("Record Purged.");
      fetchEvents();
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    const formattedDate = new Date(event.date).toISOString().split('T')[0];
    setFormData({
      title: event.title,
      date: formattedDate,
      description: event.description,
      image: event.image || "" 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ title: "", date: "", description: "", image: "" });
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#FFD70010_1px,transparent_1px),linear-gradient(to_bottom,#FFD70010_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto mt-24 relative z-10">
        
        {/* TOP BAR / NAVIGATION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase">Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Ledger</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Administrative Distribution Hub</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* BACK TO COMMAND BUTTON */}
            <button 
              onClick={() => navigate("/admin-dashboard")} 
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-blue-500/50 hover:bg-slate-800 transition-all"
            >
              <svg className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Command
            </button>

            <input 
              type="text"
              placeholder="Filter Ledger..."
              className="flex-grow lg:w-64 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-xs focus:border-[#FFD700]/40 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <button onClick={() => setViewMode(viewMode === "grid" ? "ledger" : "grid")} className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-[#FFD700]/30 transition-all">
              {viewMode === "grid" ? "Master Ledger" : "Grid Layout"}
            </button>
          </div>
        </div>

        {/* FORM SECTION */}
        {userPermissions?.canManageEvents && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 p-8 rounded-[2.5rem] mb-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600/50" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                {editId ? "Modify Entry" : "Create Broadcast"}
              </h2>
              {editId && <button onClick={resetForm} className="text-[9px] font-black uppercase text-red-500 hover:underline tracking-widest">Cancel Update</button>}
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Event Title</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all" placeholder="Enter title..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Event Date</label>
                <input type="date" className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Banner Image URL</label>
                <input className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all" placeholder="https://path-to-image.jpg" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Content / Details</label>
                <textarea className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all resize-none" placeholder="Describe the event..." rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>
              <button className={`md:col-span-2 py-4 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl ${editId ? "bg-[#FFD700] text-black" : "bg-blue-600 text-white shadow-blue-900/20"}`}>
                {editId ? "Commit Changes" : "Deploy Broadcast"}
              </button>
            </form>
          </motion.div>
        )}

        {/* DATA DISPLAY */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          {viewMode === "ledger" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/40 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                    <th className="p-8">Timestamp</th>
                    <th className="p-8">Event Title</th>
                    <th className="p-8">Status</th>
                    <th className="p-8 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <AnimatePresence>
                    {filteredEvents.map(event => (
                      <motion.tr key={event._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-slate-800/50 hover:bg-white/5 transition-all group">
                        <td className="p-8 text-slate-400 font-mono tracking-tighter">{new Date(event.date).toLocaleDateString('en-GB')}</td>
                        <td className="p-8">
                           <div className="font-black text-slate-200 uppercase tracking-tight group-hover:text-white transition-colors">{event.title}</div>
                           <div className="text-[10px] text-slate-600 truncate max-w-xs">{event.description}</div>
                        </td>
                        <td className="p-8">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] ${event.status === 'upcoming' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-500'}`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="p-8 text-right flex justify-end gap-5">
                          {userPermissions?.canManageEvents && (
                            <>
                              <button onClick={() => handleEdit(event)} className="text-blue-500 hover:text-white transition-all uppercase font-black text-[9px] tracking-widest">Edit</button>
                              <button onClick={() => handleArchive(event._id)} className="text-amber-600 hover:text-white transition-all uppercase font-black text-[9px] tracking-widest">{event.isArchived ? "Restore" : "Archive"}</button>
                              <button onClick={() => handleDelete(event._id)} className="text-red-600 hover:text-white transition-all uppercase font-black text-[9px] tracking-widest">Wipe</button>
                            </>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
              {filteredEvents.map(event => (
                <motion.div layout key={event._id} className={`bg-slate-950/50 p-6 rounded-[2rem] border transition-all ${editId === event._id ? "border-[#FFD700]" : "border-slate-800"}`}>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">{event.status}</span>
                    {event.isArchived && <span className="text-[8px] text-amber-500 font-black uppercase tracking-widest animate-pulse">Archived</span>}
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 leading-none">{event.title}</h3>
                  <p className="text-[9px] text-slate-500 font-mono mb-6">{new Date(event.date).toDateString()}</p>
                  {userPermissions?.canManageEvents && (
                    <div className="flex gap-3 mt-auto">
                      <button onClick={() => handleEdit(event)} className="flex-1 bg-blue-600/10 text-blue-400 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Modify</button>
                      <button onClick={() => handleDelete(event._id)} className="flex-1 bg-red-600/10 text-red-400 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Delete</button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}