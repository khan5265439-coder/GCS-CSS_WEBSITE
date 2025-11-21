import React from "react";

export default function Skeleton() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-slate-800 rounded-xl mb-4"></div>
      
      {/* Title Placeholder */}
      <div className="h-8 bg-slate-800 rounded-full w-3/4 mb-3"></div>
      
      {/* Text Placeholders */}
      <div className="space-y-2">
        <div className="h-4 bg-slate-800 rounded-full w-full"></div>
        <div className="h-4 bg-slate-800 rounded-full w-5/6"></div>
      </div>

      {/* Button Placeholder */}
      <div className="mt-6 h-10 bg-slate-800 rounded-xl w-1/3"></div>
    </div>
  );
}