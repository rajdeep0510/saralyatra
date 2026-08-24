"use client";

import React, { useEffect } from "react";
import { X, Globe, Eye, Landmark, Sparkles, ScrollText, MapPin } from "lucide-react";
import { translations } from "@/data/mockData";
import { LanguageCode, Monument } from "@/types";
import AudioNarrator from "@/components/discovery/AudioNarrator";

interface HeritageDetailsViewProps {
  monument: Monument | null;
  onClose: () => void;
  currentLang: LanguageCode;
  setCurrentLang: (lang: LanguageCode) => void;
  onOpen360: (monument: Monument) => void;
}

export default function HeritageDetailsView({
  monument,
  onClose,
  currentLang,
  setCurrentLang,
  onOpen360
}: HeritageDetailsViewProps) {
  // Keyboard shortcut listener to close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!monument) return null;

  const t = translations[currentLang] || translations.en;
  const { name, state, era, imageUrl, panoramaUrl, folklore } = monument;

  const textToRead = folklore[currentLang] || folklore.en || folklore.hi || "";

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-3 sm:p-6 perspective-[1600px] overflow-y-auto animate-in fade-in duration-200"
    >
      {/* 3D Paper Unfolding Animated Maximized Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-3xl bg-white border border-stone-300 shadow-[0_30px_60px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col lg:flex-row max-h-[92vh] animate-paper-unfold my-auto"
      >
        {/* Prominent High-Contrast Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full bg-white/95 p-3 text-stone-700 border border-stone-200 hover:text-stone-950 hover:bg-stone-100 transition-all shadow-md cursor-pointer hover:scale-108 active:scale-95"
          title="Close details view (Esc)"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Side: Single Primary Image Section */}
        <div className="relative w-full lg:w-1/2 h-72 sm:h-96 lg:h-auto min-h-[320px] bg-stone-950 shrink-0 animate-paper-fold-left overflow-hidden select-none group/gallery">
          
          {/* Primary High-Resolution Monument Photo */}
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-all duration-700 transform group-hover/gallery:scale-105"
          />
          
          {/* Dramatic Editorial Gradient & Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent pointer-events-none" />

          {/* Top Left Badge: Unfolded Lore */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950 px-2.5 py-1 rounded-full shadow-md">
              <ScrollText className="h-3.5 w-3.5" />
              <span>{t.unfoldedLore || "Unfolded Lore Parchment"}</span>
            </span>
          </div>

          {/* Location Title & Era Header Overlay */}
          <div className="absolute bottom-4 left-6 right-6 z-20 text-white space-y-1">
            <span className="text-[10px] text-amber-300 font-black uppercase tracking-widest block">
              {era || "Cultural Wonder"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black leading-tight drop-shadow-md">
              {name}
            </h3>
            <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold bg-white/20 border border-white/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
              <MapPin className="h-3 w-3 text-amber-300" />
              <span>{state}</span>
            </span>
          </div>
        </div>

        {/* Paper Folding Crease Line in the Center */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-stone-200 via-stone-300 to-stone-200 shadow-[0_0_8px_rgba(0,0,0,0.08)] z-20 shrink-0" />

        {/* Right Side: Translation, Audio Folklore & Virtual Tour panel */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto gap-6 bg-white animate-paper-fold-right">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 flex-wrap gap-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <Landmark className="h-4 w-4 text-terracotta-700" />
                <span>{t.readStory || "Oral Folklore & Traditions"}</span>
              </span>

              {/* Instant translation switcher inside modal */}
              <div className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-stone-400" />
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value as LanguageCode)}
                  className="bg-stone-100 border border-stone-200 rounded-full px-3 py-1 text-xs font-bold text-stone-800 focus:outline-none cursor-pointer hover:border-stone-400 transition-colors"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="gu">ગુજરાતી (Gujarati)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                </select>
              </div>
            </div>

            {/* Immersive Audio Player with Tambura Drone and Vernacular speech */}
            <AudioNarrator
              text={textToRead}
              currentLang={currentLang}
            />

            {/* Practical Visitor Info if available */}
            {(monument.openingTime || monument.facilities || monument.ticketPrices) && (
              <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {monument.openingTime && monument.closingTime && (
                    <span className="font-semibold text-stone-700">
                      🕒 Timings: <strong className="text-stone-900">{monument.openingTime} – {monument.closingTime}</strong>
                    </span>
                  )}
                  {monument.ticketPrices && (
                    <span className="font-semibold text-stone-700">
                      🎟️ Entry: <strong className="text-stone-900">{monument.ticketPrices.general === 0 ? "Free / Open" : `₹${monument.ticketPrices.general}`}</strong>
                    </span>
                  )}
                </div>
                {monument.facilities && (
                  <div className="flex flex-wrap gap-1.5 pt-1 border-t border-stone-200/50">
                    {monument.facilities.parking && <span className="bg-white border border-stone-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-stone-600">🅿️ Parking</span>}
                    {monument.facilities.wheelchairAccessible && <span className="bg-white border border-stone-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-700">♿ Accessible</span>}
                    {monument.facilities.restrooms && <span className="bg-white border border-stone-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-stone-600">🚻 Restrooms</span>}
                    {monument.facilities.lockerRoom && <span className="bg-white border border-stone-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-stone-600">🛅 Locker</span>}
                    {monument.facilities.shoeStand && <span className="bg-white border border-stone-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-stone-600">👞 Shoe Stand</span>}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action CTAs: Launch 360 virtual preview */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onOpen360(monument);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-stone-900 hover:bg-terracotta-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer group"
            >
              <Eye className="h-4 w-4 text-amber-400 group-hover:text-white transition-colors" />
              <span>{t.virtualTour || "Launch 360° Virtual Preview Tour"}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
