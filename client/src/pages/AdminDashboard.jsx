import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// 1. Import Chart Components
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ events: 0, memberships: 0, announcements: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [eventsRes, membersRes, announceRes] = await Promise.all([
          fetch("http://localhost:3001/api/events"),
          fetch("http://localhost:3001/api/admin/memberships", { headers }),
          fetch("http://localhost:3001/api/admin/announcements", { headers }),
        ]);

        if (!membersRes.ok || !announceRes.ok) throw new Error("Auth Failed");

        const eventsData = await eventsRes.json();
        const membersData = await membersRes.json();
        const announceData = await announceRes.json();

        setStats({
          events: Array.isArray(eventsData) ? eventsData.length : 0,
          memberships: Array.isArray(membersData) ? membersData.length : 0,
          announcements: Array.isArray(announceData) ? announceData.length : 0,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
        setError("Backend connection failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  // 2. Data for Chart
  const chartData = [
    { name: 'Events', count: stats.events, fill: '#3b82f6' }, 
    { name: 'Members', count: stats.memberships, fill: '#a855f7' }, 
    { name: 'News', count: stats.announcements, fill: '#f59e0b' },
  ];

  const dashboardItems = [
    { title: "View Registrations", count: "View All", link: "/all-registrations", icon: "📝", color: "from-blue-500/20 to-blue-600/5", borderColor: "border-blue-500/30", textColor: "text-blue-400" },
    { title: "Manage Events", count: stats.events, link: "/admin/events", icon: "📅", color: "from-teal-500/20 to-teal-600/5", borderColor: "border-teal-500/30", textColor: "text-teal-400" },
    { title: "Memberships", count: stats.memberships, link: "/admin/memberships", icon: "👥", color: "from-purple-500/20 to-purple-600/5", borderColor: "border-purple-500/30", textColor: "text-purple-400" },
    { title: "Announcements", count: stats.announcements, link: "/admin/announcements", icon: "📢", color: "from-amber-500/20 to-amber-600/5", borderColor: "border-amber-500/30", textColor: "text-amber-400" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30 flex flex-col">
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 flex-grow min-h-[60vh]">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Admin <span className="text-[#FFD700]">Dashboard</span>
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Welcome back, Administrator.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 ${error ? "bg-red-500/20 border-red-500 text-red-300" : "bg-green-500/20 border-green-500 text-green-300"}`}>
              <span className={`w-2 h-2 rounded-full ${error ? "bg-red-500" : "bg-green-500 animate-pulse"}`}></span>
              {error ? "System Error" : "System Online"}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-t-[#FFD700] border-slate-800 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Fetching dashboard data...</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
            
            <div className="lg:col-span-2 grid gap-6 md:grid-cols-2">
              {dashboardItems.map((item, index) => (
                <Link to={item.link} key={index} className="block group h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.color} border ${item.borderColor} backdrop-blur-xl p-8 h-full shadow-lg transition-all duration-300 group-hover:shadow-2xl cursor-pointer`}
                  >
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <div className="text-3xl mb-4">{item.icon}</div>
                        <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-[#FFD700] transition-colors">
                          {item.title}
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="block text-4xl font-extrabold text-white tracking-tight">
                          {item.count}
                        </span>
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col"
            >
              <h3 className="text-xl font-bold text-white mb-6 pl-2 border-l-4 border-[#FFD700]">Analytics</h3>
              <div className="flex-grow min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
}