import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null); 
  const [formData, setFormData] = useState({ title: "", date: "", description: "", image: "" });
  const [loading, setLoading] = useState(true);

  // 1. Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/events");
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events");
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  // 2. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    
    const url = editId 
      ? `http://localhost:3001/api"/events/${editId}`
      : "http://localhost:3001/api/events";
    
    const method = editId ? "PUT" : "POST";

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
        alert(editId ? "Event Updated Successfully! ✅" : "Event Created Successfully! 🚀");
        resetForm();
        fetchEvents(); 
      } else {
        alert("Operation failed.");
      }
    } catch (error) {
      alert("Error connecting to server");
    }
  };

  // 3. Delete Event
  const handleDelete = async (id) => {
    if(!window.confirm("Delete this event?")) return;
    const token = localStorage.getItem("adminToken");

    await fetch(`http://localhost:3001/api"/events/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchEvents(); 
  };

  // 4. Enter Edit Mode
  const handleEdit = (event) => {
    setEditId(event._id);
    setFormData({
      title: event.title,
      date: event.date,
      description: event.description,
      image: event.image || event.photo || "" 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. Reset Form
  const resetForm = () => {
    setEditId(null);
    setFormData({ title: "", date: "", description: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Manage <span className="text-[#FFD700]">Events</span></h1>

        {/* --- FORM SECTION --- */}
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl mb-12 shadow-xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className={`w-2 h-6 rounded-full ${editId ? "bg-yellow-500" : "bg-blue-500"}`}></span> 
              {editId ? "Edit Event" : "Create New Event"}
            </h2>
            {editId && (
              <button onClick={resetForm} className="text-xs text-slate-400 hover:text-white underline">
                Cancel Editing
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input 
              className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
              placeholder="Event Title (e.g. Tech Takra)" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
            <input 
              className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
              placeholder="Date (e.g. 12 Nov 2025)" 
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              required
            />
            
            <input 
              className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none md:col-span-2"
              placeholder="Image URL (e.g., /assets/images/test.jpg)" 
              value={formData.image} 
              onChange={e => setFormData({...formData, image: e.target.value})}
            />
            
            <textarea 
              className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none md:col-span-2"
              placeholder="Description..." 
              rows="3"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            />
            
            <button className={`md:col-span-2 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform ${editId ? "bg-yellow-500 text-black" : "bg-gradient-to-r from-blue-600 to-blue-500 text-white"}`}>
              {editId ? "Update Event" : "+ Publish Event"}
            </button>
          </form>
        </div>

        {/* --- EVENTS LIST --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <motion.div 
              key={event._id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-slate-900/50 border p-6 rounded-2xl flex flex-col justify-between transition-colors ${editId === event._id ? "border-yellow-500/50 shadow-[0_0_20px_rgba(255,215,0,0.1)]" : "border-slate-800"}`}
            >
              <div>
                <h3 className="text-xl font-bold text-[#FFD700]">{event.title}</h3>
                <p className="text-xs text-slate-400 mb-2">{event.date}</p>
                <p className="text-sm text-slate-300 line-clamp-3 mb-4">{event.description}</p>
                
                {/* FIX 4: Preview using 'image' or 'photo' */}
                {(event.image || event.photo) && (
                  <img 
                    src={event.image || event.photo} 
                    alt="preview" 
                    className="w-full h-32 object-cover rounded-lg mb-4 opacity-70"
                    onError={(e) => e.target.style.display = 'none'} 
                  />
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(event)}
                  className="flex-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(event._id)}
                  className="flex-1 bg-red-500/10 text-red-400 border border-red-500/20 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}