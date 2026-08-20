import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-stone-100/90 border-t border-stone-200/80 px-6 py-8 text-xs text-stone-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Affiliation banner */}
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
          <p className="text-stone-600 font-medium">
            Ministry of Tourism Mock Affiliation • Wonders of India Pilot • Smart India Hackathon
          </p>
        </div>

        {/* Credits */}
        <div className="flex items-center gap-6 font-medium">
          <a href="#" className="hover:text-stone-900 transition-colors">Curatorial Guidelines</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Bhashini API Docs</a>
          <p className="text-stone-900 font-serif font-bold tracking-wider text-sm">
            SARAL YATRA
          </p>
        </div>
      </div>
    </footer>
  );
}
