import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

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
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FETCH EVENTS FOR DROPDOWN
  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then((res) => res.json())
      .then((data) => setEventsList(data))
      .catch((err) => console.error("Error fetching events list:", err));
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.rollNo.trim()) tempErrors.rollNo = "Roll No is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    if (!formData.department.trim()) tempErrors.department = "Department is required";
    if (!formData.semester.trim()) tempErrors.semester = "Semester is required";
    if (!formData.event.trim()) tempErrors.event = "Please select an event";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Registration Successful! 🚀");
        setSubmitted(true);
        setFormData({
          name: "", rollNo: "", email: "", department: "", semester: "", event: "", message: "",
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(data.message);;
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* --- BACKGROUND DESIGN END --- */}

      <div className="relative z-10 px-4 md:px-6 py-28 max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4"
          >
            Event <span className="text-[#FFD700]">Registration</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Secure your spot for upcoming Computer Science Society events. 
          </motion.p>
        </div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-center flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="font-bold text-lg">Registration Successful!</h3>
            <p className="text-sm text-green-400/80">We look forward to seeing you there.</p>
          </motion.div>
        )}

        {errors.submit && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center"
          >
            {errors.submit}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="bg-slate-900/50 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="khan"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border ${errors.name ? "border-red-500/50" : "border-slate-700"} text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Roll Number</label>
            <input
              type="text"
              name="rollNo"
              placeholder="e.g., 00-BS-SP-CS-24"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border ${errors.rollNo ? "border-red-500/50" : "border-slate-700"} text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all`}
              value={formData.rollNo}
              onChange={handleChange}
            />
            {errors.rollNo && <p className="text-red-400 text-xs ml-1">{errors.rollNo}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="khan@gcu.edu.pk"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border ${errors.email ? "border-red-500/50" : "border-slate-700"} text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Department</label>
            <input
              type="text"
              name="department"
              placeholder="Computer Science"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border ${errors.department ? "border-red-500/50" : "border-slate-700"} text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all`}
              value={formData.department}
              onChange={handleChange}
            />
            {errors.department && <p className="text-red-400 text-xs ml-1">{errors.department}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Semester</label>
            <input
              type="text"
              name="semester"
              placeholder="e.g., 4th"
              className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border ${errors.semester ? "border-red-500/50" : "border-slate-700"} text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all`}
              value={formData.semester}
              onChange={handleChange}
            />
            {errors.semester && <p className="text-red-400 text-xs ml-1">{errors.semester}</p>}
          </div>

          <div className="space-y-2"> 
            <label className="text-sm font-medium text-slate-300 ml-1">Select Event</label>
            <div className="relative">

              {/* DYNAMIC DROPDOWN */}
              <select
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border ${
                  errors.event ? "border-red-500/50" : "border-slate-700"
                } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none`}
                name="event"
                value={formData.event}
                onChange={handleChange}
              >
                <option value="" className="bg-slate-900">-- Choose an event --</option>

                {eventsList.map((ev) => (
                  <option key={ev._id} value={ev.title} className="bg-slate-900 text-white">
                    {ev.title}
                  </option>
                ))}
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.event && <p className="text-red-400 text-xs ml-1">{errors.event}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Message (Optional)</label>
            <textarea
              rows="4"
              name="message"
              placeholder="Any specific queries or requirements..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-lg shadow-lg hover:shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Registration"
              )}
            </button>
          </div>

        </motion.form>
      </div>
    </div>
  );
}