import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminMemberships() {
  const [memberships, setMemberships] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch membership applications
  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch("http://localhost:3001/api/admin/memberships", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error fetching memberships.");

        const data = await response.json();
        setMemberships(data);
      } catch (error) {
        setError(error.message || "Error fetching memberships.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  const approveMembership = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api"/admin/memberships/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error approving membership.");

      const data = await response.json();
      // alert(data.message); 
      setMemberships(memberships.map((membership) =>
        membership._id === id ? { ...membership, approved: true } : membership
      ));
    } catch (error) {
      alert(error.message || "Error approving membership.");
    }
  };

  // Delete membership
  const deleteMembership = async (id) => {
    if(!window.confirm("Are you sure you want to reject and delete this application?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api"/admin/memberships/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error deleting membership.");

      const data = await response.json();
      // alert(data.message); // Optional
      setMemberships(memberships.filter((membership) => membership._id !== id));
    } catch (error) {
      alert(error.message || "Error deleting membership.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND DESIGN START --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        animate={{ x: [-50, 50, -50], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* --- BACKGROUND DESIGN END --- */}

      <div className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4"
          >
            Membership <span className="text-[#FFD700]">Applications</span>
          </motion.h1>
          <p className="text-slate-400">Review and manage incoming requests to join the society.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center mb-8">
            {error}
          </div>
        )}

        {loading ? (
           <div className="text-center py-20 text-slate-500">
             <div className="inline-block w-8 h-8 border-2 border-t-blue-500 border-slate-700 rounded-full animate-spin mb-4"></div>
             <p>Loading applications...</p>
           </div>
        ) : (
          <div className="space-y-4">
            {memberships.length === 0 ? (
               <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
                 <p className="text-slate-500 text-lg">No pending applications found.</p>
               </div>
            ) : (
              <div className="grid gap-4">
                 <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-4">Applicant</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-3">Contact</div>
                    <div className="col-span-2 text-right">Actions</div>
                 </div>

                 {memberships.map((membership, index) => (
                  <motion.div
                    key={membership._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-blue-500/30 p-5 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      
                      <div className="md:col-span-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {membership.fullName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-[#FFD700] transition-colors">
                            {membership.fullName}
                          </h3>
                          <div className="flex gap-2 text-xs text-slate-500">
                             <span>ID: {membership.rollNo || "N/A"}</span>
                             {membership.semester && <span>• {membership.semester}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Role */}
                      <div className="md:col-span-3">
                         <span className="inline-block px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium">
                           {membership.applyingRole || membership.role || "General Member"}
                         </span>
                         <p className="text-xs text-slate-500 mt-1">{membership.department}</p>
                      </div>

                      {/* Contact */}
                      <div className="md:col-span-3 text-sm text-slate-400">
                        <div className="flex items-center gap-2" title={membership.email}>
                           <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                           <span className="truncate max-w-[150px]">{membership.email}</span>
                        </div>
                        {membership.phoneNumber && (
                          <div className="flex items-center gap-2 mt-1">
                             <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                             <span>{membership.phoneNumber}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-2 flex justify-end gap-2">
                        {membership.approved ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => approveMembership(membership._id)}
                            className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white border border-green-500/20 transition-all"
                            title="Approve"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteMembership(membership._id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all"
                          title="Reject / Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                 ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}