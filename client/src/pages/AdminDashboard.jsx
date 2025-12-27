import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { API_URL } from "../utils/config";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ 
    events: 0, 
    memberships: 0, 
    announcements: 0, 
    team: 0, 
    messages: 0 // New: Contact messages count
  });
  const [userPermissions, setUserPermissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const savedUserData = JSON.parse(localStorage.getItem("adminUser"));

        if (!token || !savedUserData) {
          navigate("/admin");
          return;
        }

        // Lock the door: check if they have any business being here
        if (!savedUserData.permissions?.isAdmin) {
          setError("Access Denied: You do not have dashboard privileges.");
          setLoading(false);
          return;
        }

        setUserPermissions(savedUserData.permissions);
        const headers = { Authorization: `Bearer ${token}` };

        /**
         * Optimized Parallel Fetching with Error Catching per request
         * This prevents a "Blue Screen" if one route fails or is empty.
         */
        const fetcher = async (url) => {
          try {
            const res = await fetch(url, { headers });
            if (!res.ok) return []; 
            return await res.json();
          } catch (e) {
            return [];
          }
        };

        const [events, members, announce, team, messages] = await Promise.all([
          fetcher(`${API_URL}/events/admin/all`),
          fetcher(`${API_URL}/memberships/admin/all`),
          fetcher(`${API_URL}/announcements`),
          fetcher(`${API_URL}/team`),
          fetcher(`${API_URL}/admin/messages`) // New endpoint for Contact Messages
        ]);

        setStats({
          events: events.length || 0,
          memberships: members.length || 0,
          announcements: announce.length || 0,
          team: team.length || 0,
          messages: messages.length || 0
        });

      } catch (err) {
        console.error("Dashboard Load Error:", err);
        setError("Database synchronization failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin");
  };

  const chartData = [
    { name: 'Events', count: stats.events, fill: '#3b82f6' }, 
    { name: 'Members', count: stats.memberships, fill: '#a855f7' }, 
    { name: 'Board', count: stats.team, fill: '#FFD700' },
    { name: 'Inbox', count: stats.messages, fill: '#10b981' }, // Added to chart
  ];

  /**
   * Permissions-to-Link Mapping
   * The dashboard only generates links the user is allowed to use.
   */
  const dashboardItems = [
    { title: "Event Ledger", count: stats.events, link: "/admin/events", icon: "📅", color: "from-blue-500/20 to-blue-600/5", borderColor: "border-blue-500/30", perm: "canManageEvents" },
    { title: "News & Alerts", count: stats.announcements, link: "/admin/announcements", icon: "📢", color: "from-amber-500/20 to-amber-600/5", borderColor: "border-amber-500/30", perm: "canManageAnnouncements" },
    { title: "Inquiry Inbox", count: stats.messages, link: "/admin/messages", icon: "📩", color: "from-emerald-500/20 to-emerald-600/5", borderColor: "border-emerald-500/30", perm: "isAdmin" },
    { title: "Registrations", count: "Log", link: "/all-registrations", icon: "📝", color: "from-teal-500/20 to-teal-600/5", borderColor: "border-teal-500/30", perm: "canViewRegistrations" },
    { title: "Memberships", count: stats.memberships, link: "/admin/memberships", icon: "👥", color: "from-purple-500/20 to-purple-600/5", borderColor: "border-purple-500/30", perm: "isAdmin" },
    { title: "Executive Board", count: stats.team, link: "/admin/team", icon: "🎖️", color: "from-[#FFD700]/10 to-yellow-600/5", borderColor: "border-[#FFD700]/30", perm: "canManageTeams" },
  ];

  if (error && !loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-red-500/10 border border-red-500/20 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Command Error</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button onClick={() => navigate("/admin")} className="text-white bg-slate-800 px-6 py-2 rounded-full hover:bg-slate-700 transition-all">Retry Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative flex flex-col font-sans">
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70010_1px,transparent_1px),linear-gradient(to_bottom,#FFD70010_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 flex-grow">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Command <span className="text-[#FFD700]">Center</span></h1>
            <p className="text-slate-400 mt-2 text-lg">System-wide Society Operations</p>
          </motion.div>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors mr-4">Live Site</button>
            <button 
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl"
            >
              Terminate Session
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-t-[#FFD700] border-slate-800 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Verifying Permissions & Syncing Core...</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dashboardItems
                .filter(item => userPermissions?.[item.perm] || (item.perm === "isAdmin" && userPermissions?.isAdmin))
                .map((item, index) => (
                <Link to={item.link} key={index} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className={`h-full relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.color} border ${item.borderColor} backdrop-blur-xl p-6 shadow-lg transition-all`}
                  >
                    <div className="flex justify-between items-start h-full">
                      <div className="flex flex-col h-full justify-between">
                        <div className="text-4xl mb-6">{item.icon}</div>
                        <h2 className="text-lg font-black text-white group-hover:text-[#FFD700] transition-colors uppercase tracking-tight leading-tight">{item.title}</h2>
                      </div>
                      <div className="text-right">
                        <span className="block text-4xl font-black text-white">{item.count}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Active</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl h-full flex flex-col">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Database Distribution</h3>
              <div className="flex-grow min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ borderRadius: '16px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '10px' }} />
                    <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-slate-500 mt-4 text-center italic">Live System Health</p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}