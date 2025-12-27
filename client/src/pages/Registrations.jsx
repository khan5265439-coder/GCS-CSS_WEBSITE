import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../App"; // Unified Bridge URL

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEvent, setFilterEvent] = useState("All");
  const [loading, setLoading] = useState(true);
  const [userPermissions, setUserPermissions] = useState(null);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const fetchRegistrations = async () => {
    try {
      const savedUserData = JSON.parse(localStorage.getItem("adminUser"));
      setUserPermissions(savedUserData?.permissions);

      // Security Guard
      if (savedUserData && !savedUserData.permissions?.canViewRegistrations) {
        toast.error("Security Clearance Insufficient.");
        navigate("/admin-dashboard");
        return;
      }

      const res = await fetch(`${API_URL}/register/all`, {
        headers: { "Authorization": `Bearer ${token}` },
      });

      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.success ? data.data || [] : []);
      setRegistrations(list);

      if (res.status === 401) navigate("/admin");
    } catch (error) {
      toast.error("Database Sync Failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (!token) {
        navigate("/admin");
    } else {
        fetchRegistrations(); 
    }
  }, [token]);

  // CSV Export Logic
  const downloadCSV = () => {
    if (!filteredData || filteredData.length === 0) return toast.error("No data payload available.");
    
    const headers = ["Name,Roll No,Department,Semester,Event,Email,Phone"];
    const rows = filteredData.map(r => 
      `"${r.name}","${r.rollNo}","${r.department}","${r.semester}","${r.event}","${r.email}","${r.phoneNumber}"`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CSS_Regs_${filterEvent}_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Extraction Complete.");
  };

  const handlePrint = () => {
    toast.loading("Preparing Print Manifest...", { duration: 2000 });
    setTimeout(() => window.print(), 500);
  };

  // Dynamic Filter Logic
  const eventList = ["All", ...new Set(registrations.map(reg => reg.event))];

  const filteredData = registrations.filter(reg => {
    const matchesSearch = 
      reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.rollNo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = filterEvent === "All" || reg.event === filterEvent;
    return matchesSearch && matchesEvent;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70005_1px,transparent_1px),linear-gradient(to_bottom,#FFD70005_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 px-6 pt-32 pb-24 max-w-7xl mx-auto">
        
        {/* HEADER & NAVIGATION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6 no-print">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-black tracking-tighter uppercase">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Ledger</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Authenticated Registration Logs: {filteredData.length}</p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => navigate("/admin-dashboard")} 
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-blue-500/50 transition-all"
            >
              <svg className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Command
            </button>

            <button onClick={downloadCSV} className="px-6 py-3 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white font-black uppercase tracking-widest rounded-2xl text-[10px] transition-all">
              Extract CSV
            </button>
            <button onClick={handlePrint} className="px-6 py-3 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl text-[10px] shadow-lg hover:bg-blue-500 transition-all">
              Print Manifest
            </button>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 no-print">
            <div className="md:col-span-8 relative">
                <input 
                  type="text" 
                  placeholder="SEARCH ROLL NO / NAME / ID..." 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-blue-500/50 outline-none text-xs font-bold uppercase tracking-widest transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="md:col-span-4">
                <select 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-blue-500/50 outline-none text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer appearance-none"
                  value={filterEvent}
                  onChange={(e) => setFilterEvent(e.target.value)}
                >
                  {eventList.map(ev => <option key={ev} value={ev}>{ev === "All" ? "ALL MISSIONS" : ev.toUpperCase()}</option>)}
                </select>
            </div>
        </div>

        {/* LEDGER TABLE */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2.5rem] shadow-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          
          {loading ? (
              <div className="text-center py-24 flex flex-col items-center">
                <div className="w-10 h-10 border-2 border-slate-800 border-t-[#FFD700] rounded-full animate-spin mb-6"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Retrieving Encrypted Registry...</p>
              </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-950/50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  <tr>
                    <th className="p-8">Participant Identity</th>
                    <th className="p-8">Node / Roll No</th>
                    <th className="p-8">Target Event</th>
                    <th className="p-8">Communication</th>
                    <th className="p-8 text-right no-print">Ops</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  <AnimatePresence>
                  {filteredData.length > 0 ? filteredData.map((reg, index) => (
                    <motion.tr 
                      key={reg._id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-8">
                        <div className="font-black text-slate-200 uppercase tracking-tight group-hover:text-white transition-colors">{reg.name}</div>
                        <div className="text-[9px] text-slate-600 uppercase font-black tracking-widest mt-1">{reg.department} <span className="mx-1">•</span> SEM {reg.semester}</div>
                      </td>
                      <td className="p-8 font-mono text-blue-500 text-xs font-black tracking-tighter">{reg.rollNo}</td>
                      <td className="p-8">
                        <span className="px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-[#FFD700] text-[9px] font-black uppercase tracking-widest group-hover:border-[#FFD700]/30 transition-all">
                          {reg.event}
                        </span>
                      </td>
                      <td className="p-8">
                        <div className="text-[10px] font-black text-slate-400">{reg.email}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-1">{reg.phoneNumber}</div>
                      </td>
                      <td className="p-8 text-right no-print">
                         <a href={`mailto:${reg.email}?subject=Regarding ${reg.event} Registration`} className="px-5 py-2.5 bg-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-400 hover:bg-blue-600 hover:text-white transition-all border border-slate-700">Connect</a>
                      </td>
                    </motion.tr>
                  )) : (
                    <tr><td colSpan="5" className="p-32 text-center text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] italic">No synchronized records found.</td></tr>
                  )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/*  */}
      

      <style>{`
        @media print {
          .no-print, #tsparticles { display: none !important; }
          body { background: white !important; color: black !important; padding: 0 !important; }
          .max-w-7xl { margin: 0 !important; width: 100% !important; max-width: 100% !important; }
          .bg-slate-900, .bg-slate-950, .backdrop-blur-3xl, .shadow-3xl { background: none !important; border-radius: 0 !important; box-shadow: none !important; }
          table { width: 100% !important; border-collapse: collapse !important; border: 1px solid #000 !important; }
          th { background: #eee !important; color: black !important; border: 1px solid #000 !important; }
          td { border: 1px solid #000 !important; color: black !important; padding: 10px !important; }
          .text-white, .text-slate-500, .text-blue-500, .text-[#FFD700], .text-slate-600 { color: black !important; }
        }
      `}</style>
    </div>
  );
}