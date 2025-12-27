import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../App"; // Unified Bridge URL

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      // Handle unified {success, data} or raw array
      const msgList = Array.isArray(data) ? data : (data.success ? data.data || [] : []);
      setMessages(msgList);
    } catch (error) {
      toast.error("Communication Uplink Failed.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (!token) navigate("/admin");
    fetchMessages(); 
  }, [token]);

  const markAsRead = async (id) => {
    try {
      await fetch(`${API_URL}/admin/messages/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const deleteMessage = async (id) => {
    if(!window.confirm("PERMANENT WIPE? This inquiry will be purged from the logs.")) return;
    try {
      const res = await fetch(`${API_URL}/admin/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Transmission Purged.");
        setMessages(messages.filter(m => m._id !== id));
        if (selectedMsg?._id === id) setSelectedMsg(null);
      }
    } catch (error) {
      toast.error("Wipe Failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#FFD70010_1px,transparent_1px),linear-gradient(to_bottom,#FFD70010_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto mt-24 relative z-10">
        
        {/* HEADER & NAVIGATION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase">Inquiry <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Inbox</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">External Communications Terminal</p>
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

        <div className="grid lg:grid-cols-12 gap-8 h-[calc(100vh-280px)] min-h-[500px]">
          
          {/* TRANSMISSION LIST */}
          <div className="lg:col-span-4 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full py-10 opacity-50">
                 <div className="w-8 h-8 border-2 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                 <p className="text-[10px] font-black uppercase tracking-widest">Scanning Frequencies...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full border-2 border-dashed border-slate-800 rounded-[2rem] flex items-center justify-center p-10 text-center">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 italic">No incoming signals detected.</p>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => { setSelectedMsg(msg); markAsRead(msg._id); }}
                    className={`group p-6 rounded-[1.5rem] border cursor-pointer transition-all relative overflow-hidden ${
                      selectedMsg?._id === msg._id 
                      ? "bg-blue-600/10 border-blue-500 shadow-xl shadow-blue-900/10" 
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {!msg.isRead && (
                      <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500 blur-2xl opacity-20" />
                    )}

                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border ${msg.isRead ? "bg-slate-950 border-slate-800 text-slate-600" : "bg-[#FFD700] border-[#FFD700]/30 text-black shadow-lg shadow-[#FFD700]/10"}`}>
                        {msg.isRead ? "Logged" : "Direct Hit"}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono font-bold">
                        {new Date(msg.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <h3 className={`font-black text-sm uppercase tracking-tight truncate ${selectedMsg?._id === msg._id ? "text-blue-400" : "text-white"}`}>{msg.subject}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter truncate mt-1">{msg.name}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* PAYLOAD VIEWER */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedMsg ? (
                <motion.div
                  key={selectedMsg._id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2.5rem] p-10 h-full shadow-2xl relative flex flex-col"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  
                  {/* METADATA HEADER */}
                  <div className="mb-10 border-b border-slate-800/50 pb-8 flex flex-col md:flex-row justify-between items-start gap-6">
                    <div>
                      <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter leading-none">{selectedMsg.subject}</h2>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500">Origin:</span> <span className="text-slate-300">{selectedMsg.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500">Protocol:</span> <span className="text-slate-300">{selectedMsg.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => deleteMessage(selectedMsg._id)}
                      className="p-3 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                      title="Purge Transmission"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>

                  {/* MESSAGE BODY */}
                  <div className="flex-grow text-slate-400 leading-relaxed font-medium whitespace-pre-wrap text-sm">
                    {selectedMsg.message}
                  </div>

                  {/* ACTION BAR */}
                  <div className="mt-12 pt-8 border-t border-slate-800/50">
                    <a 
                      href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
                      className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FFD700] to-yellow-500 text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-[#FFD700]/10"
                    >
                      Initialize Response Link
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full border-2 border-dashed border-slate-800/50 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-700 p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 text-2xl">📡</div>
                  <p className="uppercase font-black text-xs tracking-[0.4em]">Standby: Monitoring Inbound Frequencies</p>
                  <p className="text-[10px] mt-4 font-bold text-slate-800 uppercase">Select a transmission record to decrypt payload</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}