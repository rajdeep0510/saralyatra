"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PanoramaViewerModal from "@/components/discovery/PanoramaViewerModal";
import HeritageDetailsView from "@/views/HeritageDetailsView";
import { useTravel } from "@/context/TravelContext";

export default function ClientLayoutShell({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    currentLang,
    setCurrentLang,
    selected360Monument,
    setSelected360Monument,
    selectedDetailMonument,
    setSelectedDetailMonument,
    savedTripToast,
    setSavedTripToast
  } = useTravel();

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f5] text-stone-900 font-sans">
      {/* Top Editorial Navbar with User Profile & Saved Trips Popover */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-16">
        {children}
      </main>

      {/* 360-Degree Virtual Preview Modal */}
      {selected360Monument && (
        <PanoramaViewerModal
          isOpen={Boolean(selected360Monument)}
          monument={selected360Monument}
          currentLang={currentLang}
          onClose={() => setSelected360Monument(null)}
        />
      )}

      {/* Full Editorial Heritage Story Modal with Vernacular Audio Narration */}
      {selectedDetailMonument && (
        <HeritageDetailsView
          monument={selectedDetailMonument}
          onClose={() => setSelectedDetailMonument(null)}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          onOpen360={(m) => setSelected360Monument(m)}
        />
      )}

      {/* Global Saved Trip Toast Notification */}
      {savedTripToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-stone-900 text-white p-4 rounded-3xl shadow-2xl border border-emerald-500/60 flex items-start gap-3.5 animate-in slide-in-from-bottom duration-300">
          <div className="h-9 w-9 rounded-2xl bg-emerald-500 text-stone-950 flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
            ✓
          </div>
          <div className="flex-1 space-y-1">
            <h5 className="text-xs font-bold text-white">{savedTripToast.title}</h5>
            <p className="text-[11px] text-stone-300 leading-relaxed">{savedTripToast.message}</p>
          </div>
          <button
            onClick={() => setSavedTripToast(null)}
            className="text-stone-400 hover:text-white p-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Modern Global Footer */}
      <Footer />
    </div>
  );
}
