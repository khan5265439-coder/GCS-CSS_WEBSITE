import React from "react";

/**
 * @description Unified Skeleton Loader
 * @param {string} variant - 'card' for Events/Team, 'list' for Admin Tables
 */
export default function Skeleton({ variant = "card" }) {
  if (variant === "list") {
    return (
      <div className="w-full bg-slate-900/40 border border-slate-800/50 p-4 rounded-xl flex items-center gap-4 animate-pulse mb-3">
        <div className="w-12 h-12 bg-slate-800 rounded-full shrink-0"></div>
        <div className="flex-grow space-y-2">
          <div className="h-4 bg-slate-800 rounded-full w-1/4"></div>
          <div className="h-3 bg-slate-800 rounded-full w-1/2 opacity-50"></div>
        </div>
        <div className="h-8 bg-slate-800 rounded-lg w-20"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] shadow-xl animate-pulse h-full">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-slate-800/80 rounded-2xl mb-6"></div>
      
      {/* Title Placeholder */}
      <div className="h-7 bg-slate-800 rounded-full w-2/3 mb-4"></div>
      
      {/* Content Placeholders */}
      <div className="space-y-3 mb-8">
        <div className="h-3 bg-slate-800 rounded-full w-full opacity-60"></div>
        <div className="h-3 bg-slate-800 rounded-full w-full opacity-60"></div>
        <div className="h-3 bg-slate-800 rounded-full w-4/5 opacity-60"></div>
      </div>

      {/* Footer Placeholder */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800/50">
        <div className="h-4 bg-slate-800 rounded-full w-1/4"></div>
        <div className="h-10 bg-slate-800 rounded-full w-1/3"></div>
      </div>
    </div>
  );
}