import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 1. Protect Route
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin");
  }, [navigate]);

  // 2. Fetch Data
  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:3001/api/register/all", {
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setRegistrations(data);
    } catch (error) {
      setError("Failed to load registrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRegistrations(); }, []);

  // 3. EXPORT TO CSV FUNCTION 
  const downloadCSV = () => {
    if (registrations.length === 0) return alert("No data to export");
    
    const headers = ["Name,Roll No,Department,Semester,Event,Email,Phone"];
    const rows = registrations.map(r => 
      `${r.name},${r.rollNo},${r.department},${r.semester},${r.event},${r.email},${r.phoneNumber || "N/A"}`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "event_registrations.csv");
    document.body.appendChild(link);
    link.click();
  };

  // 4. Filter Logic (Search)
  const filteredData = registrations.filter(reg => 
    reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.event?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* Background */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              Event <span className="text-[#FFD700]">Registrations</span>
            </h1>
            <p className="text-slate-400 mt-2">Total Records: {filteredData.length}</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search student..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-blue-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-4 h-4 absolute left-3 top-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            {/* Export Button */}
            <button 
              onClick={downloadCSV}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-green-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          {loading ? (
             <div className="text-center py-20 text-slate-500">
               <div className="inline-block w-8 h-8 border-2 border-t-[#FFD700] border-slate-700 rounded-full animate-spin mb-2"></div>
               <p>Loading data...</p>
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-950/50 text-xs uppercase font-bold text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-5 pl-8">Student Name</th>
                    <th className="p-5">Roll No</th>
                    <th className="p-5">Event</th>
                    <th className="p-5 text-center">Semester</th>
                    <th className="p-5 text-right pr-8">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredData.length > 0 ? filteredData.map((reg, index) => (
                    <motion.tr 
                      key={reg._id || index}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="p-5 pl-8">
                        <div className="font-bold text-white">{reg.name}</div>
                        <div className="text-xs">{reg.department}</div>
                      </td>
                      <td className="p-5 font-mono text-xs text-[#FFD700]">{reg.rollNo}</td>
                      <td className="p-5">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
                          {reg.event}
                        </span>
                      </td>
                      <td className="p-5 text-center">{reg.semester}</td>
                      <td className="p-5 text-right pr-8">
                         <a href={`mailto:${reg.email}`} className="text-slate-400 hover:text-white transition-colors text-xs underline">
                           Email
                         </a>
                      </td>
                    </motion.tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="p-10 text-center text-slate-500">
                        No records found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}