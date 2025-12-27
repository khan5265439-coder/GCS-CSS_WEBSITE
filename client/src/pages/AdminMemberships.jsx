import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../App"; 

export default function AdminMemberships() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const fetchMemberships = async () => {
    try {
      const response = await fetch(`${API_URL}/memberships/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const list = Array.isArray(data) ? data : (data.success ? data.data || [] : []);
      setMemberships(list);
    } catch (error) {
      toast.error("Database Link Failure.");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const token = localStorage.getItem("adminToken");
  const savedUserData = JSON.parse(localStorage.getItem("adminUser"));

  if (!token || !savedUserData) {
    navigate("/admin");
    return;
  }

  // SECURITY TRIPWIRE: 
  // Students have a rollNo. Master Admins do not.
  const isStudentAdmin = !!savedUserData.rollNo; 

  if (isStudentAdmin) {
    toast.error("ACCESS DENIED: Administrative Clearance Level 0 Required.");
    navigate("/admin-dashboard"); // Force redirect away from Authority Manager
    return;
  }

  fetchMemberships();
}, [token, navigate]);

  const updateMemberStatus = async (id, isApproved, updatedPermissions) => {
    const loadToast = toast.loading("Syncing Authority...");
    try {
      const response = await fetch(`${API_URL}/memberships/permissions/${id}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          approved: isApproved, 
          status: isApproved ? "approved" : "pending",
          permissions: updatedPermissions 
        })
      });

      if (response.ok) {
        setMemberships(prev => prev.map((m) =>
          m._id === id ? { ...m, approved: isApproved, permissions: updatedPermissions } : m
        ));
        toast.success("Authority Synced.", { id: loadToast });
      } else {
        const result = await response.json();
        throw new Error(result.message || "Server rejected update");
      }
    } catch (error) {
      toast.error("Sync Failed: " + error.message, { id: loadToast });
    }
  };

 // In the togglePermission function, ensure isAdmin is always true for approved members:
const togglePermission = (member, field) => {
  const newPermissions = { 
    ...member.permissions, 
    [field]: !member.permissions?.[field],
    isAdmin: true // Always true so they can reach the dashboard
  };
  updateMemberStatus(member._id, true, newPermissions);
};
  const deleteMembership = async (id) => {
    if(!window.confirm("PERMANENT PURGE? This will erase all record of this member.")) return;
    try {
      const response = await fetch(`${API_URL}/memberships/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success("Record Purged.");
        setMemberships(memberships.filter((m) => m._id !== id));
      }
    } catch (error) {
      toast.error("Purge Failed.");
    }
  };

// Change your permissionMeta array in AdminMemberships.jsx to this:
const permissionMeta = [
  { key: 'canManageEvents', label: 'Event Ledger', desc: 'Ops Control' },
  { key: 'canManageAnnouncements', label: 'News Feed', desc: 'Broadcast' },
  { key: 'canViewRegistrations', label: 'Registry', desc: 'Data Access' }
];



  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30 font-sans">
      
      {/* --- ENHANCED GOLDEN GRID --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70015_1px,transparent_1px),linear-gradient(to_bottom,#FFD70015_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="relative z-10 px-6 pt-32 pb-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-8">
          <div>
            <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">
              Authority <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Manager</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] mt-4 flex items-center gap-2">
              <span className="w-8 h-px bg-slate-800"></span> RBAC Deployment Module
            </p>
          </div>
          <button onClick={() => navigate("/admin-dashboard")} className="px-8 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-[#FFD700]/40 transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]">
            Back to Command
          </button>
        </div>

        {loading ? (
            <div className="flex justify-center py-20 text-[10px] font-black uppercase tracking-widest text-slate-600 animate-pulse">Synchronizing Ledger...</div>
        ) : (
          <div className="space-y-6">
            <div className="hidden lg:grid grid-cols-12 gap-6 px-10 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] border-b border-slate-900">
              <div className="col-span-4">Candidate Identity</div>
              <div className="col-span-6 text-center">Permission Matrix // Access Levels</div>
              <div className="col-span-2 text-right">Operations</div>
            </div>

            <AnimatePresence>
            {memberships.map((m) => (
              <motion.div key={m._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900/30 backdrop-blur-3xl border border-slate-800/60 p-8 rounded-[2.5rem] hover:border-[#FFD700]/30 transition-all duration-500 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* IDENTITY SECTION */}
                  {/* IDENTITY SECTION - Now with prominent Email display */}
<div className="lg:col-span-4 flex items-center gap-6">
  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center font-black border-2 shrink-0 transition-all duration-700 ${m.approved ? 'bg-blue-600/10 border-blue-500/40 text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.15)]' : 'bg-slate-950 border-slate-800 text-slate-700'}`}>
    {m.fullName?.charAt(0)}
  </div>
  <div className="overflow-hidden">
    <h3 className="text-xl font-black text-white uppercase tracking-tight truncate group-hover:text-[#FFD700] transition-colors">
      {m.fullName}
    </h3>
    <div className="flex flex-col gap-1 mt-1">
       {/* High Visibility Roll No and Email for Activation */}
       <span className="text-[11px] text-blue-500 font-mono font-black tracking-tighter">
         {m.rollNo}
       </span>
       <div className="flex items-center gap-2">
         <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse"></span>
         <span className="text-[11px] text-[#FFD700] font-bold tracking-wide select-all cursor-copy" title="Click to copy for activation">
           {m.gmail}
         </span>
       </div>
       <span className="text-[9px] text-slate-600 uppercase font-bold tracking-wider mt-1 italic">
         {m.semester} Semester // {m.department}
       </span>
    </div>
  </div>
</div>

                  {/* ENHANCED PERMISSION MATRIX */}
                  <div className="lg:col-span-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {permissionMeta.map((perm) => (
                           <button key={perm.key} onClick={() => togglePermission(m, perm.key)}
                             className={`p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center gap-1 ${
                               m.permissions?.[perm.key] 
                               ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                               : 'bg-slate-950 border-slate-800/50 opacity-40 hover:opacity-100'
                             }`}
                           >
                             <span className={`text-[9px] font-black uppercase tracking-tighter ${m.permissions?.[perm.key] ? 'text-blue-400' : 'text-slate-500'}`}>
                               {perm.label}
                             </span>
                             <span className={`text-[7px] font-bold uppercase tracking-[0.2em] ${m.permissions?.[perm.key] ? 'text-blue-500/60' : 'text-slate-700'}`}>
                               {m.permissions?.[perm.key] ? 'Access Granted' : 'Restricted'}
                             </span>
                           </button>
                        ))}
                    </div>
                  </div>

                  {/* OPERATIONS */}
                  <div className="lg:col-span-2 flex justify-end items-center gap-4">
                    {!m.approved ? (
                      <button onClick={() => updateMemberStatus(m._id, true, m.permissions)}
                        className="flex-grow py-4 rounded-2xl bg-gradient-to-r from-[#FFD700] to-yellow-600 text-black text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl active:scale-95"
                      >
                        Approve
                      </button>
                    ) : (
                      <div className="flex-grow text-center py-4 border border-blue-500/20 rounded-2xl bg-blue-500/5">
                         <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Active Node</span>
                      </div>
                    )}
                    <button onClick={() => deleteMembership(m._id)} className="p-4 rounded-2xl bg-red-500/5 text-red-500/50 border border-red-500/10 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group-hover:opacity-100 lg:opacity-30">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}