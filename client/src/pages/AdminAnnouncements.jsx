import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    date: "",
    type: "",
    description: "",
    icon: "", 
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch("http://localhost:3001/api/admin/announcements", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch announcements");

        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        setError(error.message || "Error fetching announcements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:3001/api/admin/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAnnouncement),
      });

      if (!response.ok) throw new Error("Error creating announcement.");

      const data = await response.json();
      
      setAnnouncements([...announcements, { ...newAnnouncement, _id: Date.now() }]); 
      
      setNewAnnouncement({
        title: "",
        date: "",
        type: "",
        description: "",
        icon: "",
      });
      alert("Announcement Posted Successfully");
    } catch (error) {
      setError(error.message || "Error creating announcement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAnnouncement = async (id) => {
    if(!window.confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api"/admin/announcements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error deleting announcement.");

      setAnnouncements(announcements.filter((a) => a._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* --- BACKGROUND DESIGN START --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70020_1px,transparent_1px),linear-gradient(to_bottom,#FFD70020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"
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
            Manage <span className="text-[#FFD700]">Announcements</span>
          </motion.h1>
          <p className="text-slate-400">Create, update, or remove alerts for the society.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center mb-8">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl sticky top-24"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#FFD700] rounded-full"></span>
                New Post
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-400 ml-1 mb-1 block">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newAnnouncement.title}
                    onChange={handleChange}
                    placeholder="e.g. Annual Dinner"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-400 ml-1 mb-1 block">Type</label>
                    <select
                      name="type"
                      value={newAnnouncement.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white focus:border-blue-500 outline-none text-sm appearance-none"
                      required
                    >
                      <option value="" className="bg-slate-900">Select Type</option>
                      <option value="Notice" className="bg-slate-900">Notice</option>
                      <option value="Event" className="bg-slate-900">Event</option>
                      <option value="Update" className="bg-slate-900">Update</option>
                    </select>
                  </div>
                  <div>
                     <label className="text-xs font-medium text-slate-400 ml-1 mb-1 block">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newAnnouncement.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 ml-1 mb-1 block">Icon (Optional)</label>
                   <input
                    type="text"
                    name="icon"
                    value={newAnnouncement.icon}
                    onChange={handleChange}
                    placeholder="e.g. 📣"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-600 focus:border-blue-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 ml-1 mb-1 block">Description</label>
                  <textarea
                    name="description"
                    value={newAnnouncement.description}
                    onChange={handleChange}
                    placeholder="Write details here..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-600 focus:border-blue-500 outline-none text-sm resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-sm shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02] transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Posting..." : "Publish Announcement"}
                </button>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-4">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Recent Posts</h2>
                <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  Total: {announcements.length}
                </span>
             </div>

             {loading ? (
               <div className="text-center py-10 text-slate-500">Loading announcements...</div>
             ) : announcements.length === 0 ? (
               <div className="text-center py-12 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
                 <p className="text-slate-500">No announcements found.</p>
               </div>
             ) : (
               announcements.map((item, index) => (
                 <motion.div
                   key={item._id || index}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.05 }}
                   className="group bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                 >
                   <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                       <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                         item.type === 'Notice' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                         item.type === 'Event' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                         'bg-blue-500/10 text-blue-400 border-blue-500/20'
                       }`}>
                         {item.type}
                       </span>
                       <span className="text-slate-500 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {item.date}
                       </span>
                     </div>
                     <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                     <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
                   </div>

                   <button
                     onClick={() => deleteAnnouncement(item._id)}
                     className="self-end sm:self-center p-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20 transition-colors"
                     title="Delete"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   </button>
                 </motion.div>
               ))
             )}
          </div>

        </div>
      </div>
    </div>
  );
}