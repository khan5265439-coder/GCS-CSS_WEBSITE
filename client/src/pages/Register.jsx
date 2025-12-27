import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from 'react-hot-toast';
import { API_URL } from "../App"; 

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    department: "",
    semester: "",
    event: "",
    message: "",
  });

  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FETCH LIVE EVENTS FROM DATABASE
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events/upcoming`);
        const data = await res.json();
        
        // --- DEBUGGER: Right-click page > Inspect > Console to see this ---
        console.log("Registry received events data:", data);

        // 1. Extract the array regardless of the structure
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data.data && Array.isArray(data.data)) {
          list = data.data;
        } else if (data.events && Array.isArray(data.events)) {
          list = data.events;
        }

        // 2. Remove the filter for now to force the events to show
        // Once we confirm they show up, we can re-add filtering
        setEventsList(list);

      } catch (err) {
        console.error("Link Failure:", err);
        toast.error("Could not sync with the event frequency.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.event) {
        return toast.error("Please select a target mission (event).");
    }

    setIsSubmitting(true);
    const loadToast = toast.loading("Initializing Enrollment...");

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Enrollment Successful! Welcome aboard.", { id: loadToast });
        setFormData({ name: "", rollNo: "", email: "", department: "", semester: "", event: "", message: "" });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(data.message || "Enrollment Denied.", { id: loadToast });
      }
    } catch (err) {
      toast.error("Connection Interrupted.", { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* --- GOLDEN GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[linear-gradient(to_right,#FFD70015_1px,transparent_1px),linear-gradient(to_bottom,#FFD70015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        animate={{ x: [-20, 20, -20], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 px-6 pt-32 pb-24 max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mb-6">
            Secure Enrollment Terminal
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-500">Registry</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">Initialize your presence in the upcoming technological missions.</p>
        </div>

        {/* REGISTRATION FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-slate-800 shadow-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-40" />

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* NAME */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="IDENTIFIER" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold focus:border-blue-500/50 outline-none transition-all" required />
            </div>

            {/* ROLL NO */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">University Roll No</label>
              <input name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="e.g. 0046-BSCS-22" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-black font-mono focus:border-blue-500/50 outline-none transition-all uppercase" required />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Communication Path (Email)</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ravian@gmail.com" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold focus:border-blue-500/50 outline-none transition-all" required />
            </div>

            {/* DEPARTMENT */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Department</label>
              <input name="department" value={formData.department} onChange={handleChange} placeholder="e.g. Computer Science" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold focus:border-blue-500/50 outline-none transition-all" required />
            </div>

            {/* SEMESTER */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Current Semester</label>
              <input name="semester" value={formData.semester} onChange={handleChange} placeholder="e.g. 4th" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold focus:border-blue-500/50 outline-none transition-all" required />
            </div>

            {/* EVENT DROPDOWN (Enhanced Logic) */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Target Mission (Event)</label>
              <div className="relative">
                <select 
                  name="event" 
                  value={formData.event} 
                  onChange={handleChange} 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:border-[#FFD700]/50 outline-none transition-all appearance-none cursor-pointer" 
                  required
                >
                  <option value="">-- Choose Mission --</option>
                  {loading ? (
                    <option disabled>Scanning Database...</option>
                  ) : eventsList.length > 0 ? (
                    eventsList.map((ev) => (
                      <option key={ev._id} value={ev.title} className="bg-slate-900 text-white">
                        {ev.title.toUpperCase()}
                      </option>
                    ))
                  ) : (
                    <option disabled>No Active Missions Found</option>
                  )}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* MESSAGE */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Additional Payload (Message)</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Any specific requirements or queries..." rows="3" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold focus:border-blue-500/50 outline-none transition-all resize-none" />
            </div>

            {/* STYLISH GOLDEN SUBMIT */}
            <div className="md:col-span-2 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFA500] text-black font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-yellow-500/10 hover:brightness-110 hover:scale-[1.01] active:scale-95 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Transmitting..." : "Initialize Enrollment"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}