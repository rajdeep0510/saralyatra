"use client";

import React, { useState, useEffect } from "react";
import { X, Globe, Eye, Landmark, ChevronLeft, ChevronRight, Sparkles, ScrollText, MapPin, Camera, Maximize2 } from "lucide-react";
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
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

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

  // Reset active image index when monument changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [monument]);

  if (!monument) return null;

  const t = translations[currentLang] || translations.en;
  const { name, state, era, imageUrl, panoramaUrl, images, folklore } = monument;

  // Build high quality multi-image gallery list with at least 3 curated photos
  const imageGallery: string[] =
    images && images.length >= 3
      ? images
      : [
          imageUrl,
          panoramaUrl || "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80",
          "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80",
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80"
        ];

  const currentImage = imageGallery[activeImageIndex % imageGallery.length] || imageUrl;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % imageGallery.length);
  };

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

        {/* Left Side: Multi-Photo Interactive Gallery Section */}
        <div className="relative w-full lg:w-1/2 h-72 sm:h-96 lg:h-auto min-h-[320px] bg-stone-950 shrink-0 animate-paper-fold-left overflow-hidden select-none group/gallery">
          
          {/* Active Gallery Image with Crossfade */}
          <img
            key={currentImage}
            src={currentImage}
            alt={`${name} - Photo ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500 transform group-hover/gallery:scale-103 animate-in fade-in zoom-in-95"
          />
          
          {/* Dramatic Editorial Gradient & Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent pointer-events-none" />

          {/* Top Left Badge: Unfolded Lore & Multi-photo counter */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950 px-2.5 py-1 rounded-full shadow-md">
              <ScrollText className="h-3.5 w-3.5" />
              <span>{t.unfoldedLore || "Unfolded Lore Parchment"}</span>
            </span>

            {/* Photo Counter Pill */}
            <span className="flex items-center gap-1 text-[10px] font-bold bg-black/60 text-white border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
              <Camera className="h-3 w-3 text-amber-300" />
              <span>
                {activeImageIndex + 1} / {imageGallery.length} Photos
              </span>
            </span>
          </div>

          {/* Carousel Previous / Next Arrow Controls */}
          {imageGallery.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/25 backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-lg"
                title="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/25 backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-lg"
                title="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Bottom Thumbnail Strip Dots */}
          <div className="absolute bottom-16 left-6 right-6 z-20 flex items-center justify-center gap-2">
            {imageGallery.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? "w-8 bg-amber-400 shadow-md"
                    : "w-2.5 bg-white/50 hover:bg-white/90"
                }`}
                title={`Switch to photo ${idx + 1}`}
              />
            ))}
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
