"use client";

import React from "react";
import { Headphones, Eye, Gem, Trees, Flame, Landmark, Mountain, Sparkles } from "lucide-react";
import { translations } from "@/data/mockData";
import { LanguageCode, Monument } from "@/types";

interface HeritageCardProps {
  monument: Monument;
  currentLang: LanguageCode;
  onOpen360: (monument: Monument) => void;
  onOpenDetails: (monument: Monument) => void;
}

export default function HeritageCard({
  monument,
  currentLang,
  onOpen360,
  onOpenDetails
}: HeritageCardProps) {
  const t = translations[currentLang] || translations.en;
  const { name, state, era, isOffbeat, category, subCategory, imageUrl, folklore, languagesAvailable } = monument;

  const getFolkloreText = () => {
    if (folklore[currentLang]) {
      return folklore[currentLang]!;
    }
    return folklore.en || folklore.hi || "";
  };

  const textToDisplay = getFolkloreText();
  const truncatedStory = textToDisplay.length > 135
    ? textToDisplay.slice(0, 135) + "..."
    : textToDisplay;

  const getCategoryBadge = () => {
    switch (category) {
      case "nature":
        return {
          label: t.natureTheme || "Nature & Scenic",
          icon: Trees,
          color: "bg-emerald-800/90 text-emerald-100 border-emerald-500/30"
        };
      case "spiritual":
        return {
          label: t.spiritualTheme || "Spiritual & Sacred",
          icon: Flame,
          color: "bg-amber-800/90 text-amber-100 border-amber-500/30"
        };
      case "adventure":
        return {
          label: t.adventureTheme || "Adventure & Wildlife",
          icon: Mountain,
          color: "bg-teal-800/90 text-teal-100 border-teal-500/30"
        };
      default:
        return {
          label: t.heritageTheme || "Heritage & History",
          icon: Landmark,
          color: "bg-stone-900/85 text-stone-100 border-stone-700/30"
        };
    }
  };

  const badgeInfo = getCategoryBadge();
  const CategoryIcon = badgeInfo.icon;

  return (
    <div 
      onClick={() => onOpenDetails(monument)}
      className="group relative bg-white rounded-3xl border border-stone-200/90 overflow-hidden flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_22px_40px_-10px_rgba(217,119,6,0.22),0_12px_24px_-6px_rgba(28,25,23,0.08)] hover:border-amber-400 hover:ring-4 hover:ring-amber-400/15 cursor-pointer"
    >
      
      {/* Subtle Golden/Terracotta Accent Glow Bar on Top */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-terracotta-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      <div>
        {/* Unobstructed Image Frame with Zoom & Vignette */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          
          {/* Subtle Ambient Hover Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/15 to-transparent group-hover:from-amber-950/80 transition-colors duration-300" />

          {/* Category & Highlight Tag Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-md border ${badgeInfo.color}`}>
              <CategoryIcon className="h-3 w-3" />
              <span>{badgeInfo.label}</span>
            </span>

            {isOffbeat && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-600/95 text-white text-[10px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-md">
                <Gem className="h-2.5 w-2.5" />
                <span>{t.hiddenGem || "Hidden Gem"}</span>
              </span>
            )}
          </div>

          {/* Quick Hover Badge */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <span className="flex items-center gap-1 text-[10px] font-extrabold bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full shadow-md">
              <Sparkles className="h-3 w-3 fill-current" />
              <span>{t.viewDetails || "Explore"}</span>
            </span>
          </div>

          {/* Location Chip on Image Bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold z-10">
            <span className="bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-white/20">
              {state}
            </span>
            <span className="text-[10px] text-stone-300 font-medium truncate max-w-[140px]">
              {subCategory || era}
            </span>
          </div>
        </div>

        {/* Structured Editorial Content Below Image */}
        <div className="p-5 space-y-2.5">
          
          {/* Title */}
          <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors leading-snug">
            {name}
          </h4>

          {/* Folklore snippet */}
          <p className="text-xs text-stone-600 leading-relaxed font-normal">
            {truncatedStory}
          </p>

          {/* Language translation availability chips */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
              {t.languages || "Languages"}:
            </span>
            <div className="flex flex-wrap gap-1">
              {languagesAvailable.map((lang) => (
                <span
                  key={lang}
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                    currentLang === lang
                      ? "bg-amber-400 text-stone-950 border-amber-400 font-black shadow-2xs"
                      : "bg-stone-50 text-stone-500 border-stone-200"
                  }`}
                >
                  {lang.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="px-5 pb-5 pt-2 flex items-center gap-2 border-t border-stone-100 mt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(monument);
          }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 group-hover:bg-terracotta-600 text-white text-xs font-bold transition-all shadow-sm group-hover:shadow-md cursor-pointer"
        >
          <Headphones className="h-3.5 w-3.5 text-sand-300 group-hover:text-amber-200 transition-colors" />
          <span>{t.listenStory || "Listen Story"}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen360(monument);
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all border border-stone-200/80 cursor-pointer"
          title="360° Virtual Preview"
        >
          <Eye className="h-3.5 w-3.5 text-terracotta-600" />
          <span className="hidden sm:inline">360°</span>
        </button>
      </div>

    </div>
  );
}
