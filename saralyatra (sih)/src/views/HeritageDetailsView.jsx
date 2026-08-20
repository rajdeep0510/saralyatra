import React from "react";
import { X, Globe, Eye, Landmark } from "lucide-react";
import { translations } from "../data/mockData";
import AudioNarrator from "../components/discovery/AudioNarrator";

export default function HeritageDetailsView({
  monument,
  onClose,
  currentLang,
  setCurrentLang,
  onOpen360
}) {
  if (!monument) return null;

  const t = translations[currentLang];
  const { name, state, era, imageUrl, folklore, languagesAvailable } = monument;

  const textToRead = folklore[currentLang] || folklore.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 sm:p-6">
      {/* Detail Card Overlay */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full bg-white/90 p-2.5 text-stone-600 border border-stone-200 hover:text-stone-900 hover:bg-white transition-colors shadow-sm cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Side: Editorial Image & Meta */}
        <div className="relative w-full md:w-5/12 h-64 md:h-auto min-h-[260px] bg-stone-100 shrink-0">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent md:bg-gradient-to-t md:from-stone-900/90 md:via-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1">
            <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-widest block">
              {era}
            </span>
            <h3 className="text-2xl font-serif font-black">
              {name}
            </h3>
            <span className="inline-block mt-1 text-xs font-semibold bg-white/20 border border-white/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
              {state}
            </span>
          </div>
        </div>

        {/* Right Side: Translation and Narration panel */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto gap-6 bg-white">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
                <Landmark className="h-4 w-4 text-terracotta-700" />
                <span>{t.readStory || "Oral History & Folklore"}</span>
              </span>

              {/* Instant translation switcher inside modal */}
              <div className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-stone-400" />
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value)}
                  className="bg-stone-100 border border-stone-200 rounded-full px-3 py-1 text-xs font-bold text-stone-800 focus:outline-none cursor-pointer"
                >
                  {languagesAvailable.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.toUpperCase() === "EN" ? "English" : lang.toUpperCase() === "HI" ? "हिन्दी (Hindi)" : lang.toUpperCase() === "GU" ? "ગુજરાતી (Gujarati)" : "தமிழ் (Tamil)"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Immersive Audio Player */}
            <AudioNarrator
              text={textToRead}
              currentLang={currentLang}
            />
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
            <button
              onClick={() => {
                onOpen360(monument);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              <span>Launch 360° Virtual Preview</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
