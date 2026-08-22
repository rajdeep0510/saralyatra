"use client";

import React from "react";
import { Clock, Eye, Car, Trash2, Headphones, Sparkles, Navigation } from "lucide-react";
import { translations } from "@/data/mockData";
import { ItineraryStop, LanguageCode } from "@/types";

interface ActivitySlotProps {
  stop: ItineraryStop;
  isActive: boolean;
  onSelect?: (id: string) => void;
  onOpenDetails?: (monumentId: string) => void;
  onRemove?: (id: string) => void;
  currentLang: LanguageCode;
}

export default function ActivitySlot({
  stop,
  isActive,
  onSelect,
  onOpenDetails,
  onRemove,
  currentLang
}: ActivitySlotProps) {
  const t = translations[currentLang] || translations.en;

  // If it's a transit stop, render as a connector pill
  if (stop.type === "transit") {
    return (
      <div className="flex items-center justify-between gap-2.5 ml-6 my-3 py-1.5 px-3 bg-stone-100 border border-stone-200 rounded-full w-fit max-w-full">
        <div className="flex items-center gap-2">
          <Car className="h-3.5 w-3.5 text-terracotta-600 shrink-0" />
          <span className="text-[11px] font-semibold text-stone-600 truncate">
            {stop.title} — {stop.duration}
          </span>
        </div>
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(stop.id);
            }}
            className="text-stone-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
            title="Remove stop"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }

  const stopBorderColor = isActive 
    ? "border-terracotta-400 bg-white shadow-md ring-2 ring-terracotta-300/40" 
    : "border-stone-200/90 bg-white hover:border-amber-400 hover:shadow-sm";

  let indicatorColor = "bg-stone-900 ring-stone-200";
  if (stop.type === "lunch") indicatorColor = "bg-amber-600 ring-amber-200";
  if (stop.type === "hotel") indicatorColor = "bg-emerald-600 ring-emerald-200";
  if (stop.type === "nature") indicatorColor = "bg-emerald-700 ring-emerald-200";
  if (stop.type === "spiritual") indicatorColor = "bg-amber-700 ring-amber-200";
  if (stop.type === "adventure") indicatorColor = "bg-teal-700 ring-teal-200";

  const getStopTypeLabel = () => {
    switch (stop.type) {
      case "nature":
        return t.natureLabel || "Scenic Stop";
      case "spiritual":
        return t.spiritualLabel || "Sacred Shrine";
      case "adventure":
        return t.adventureLabel || "Wilderness";
      case "lunch":
        return t.lunchLabel || "Regional Dining";
      case "hotel":
        return t.hotelLabel || "Overnight Stay";
      default:
        return t.monumentLabel || "Heritage Landmark";
    }
  };

  const isAttraction = stop.type !== "lunch" && stop.type !== "hotel" && stop.type !== "transit";

  return (
    <div 
      onClick={() => onSelect && onSelect(stop.id)}
      className="relative flex items-start gap-4 pl-6 pb-6 cursor-pointer group transition-all"
    >
      {/* Vertical connector line */}
      <div className="absolute left-[9px] top-6 bottom-0 w-[2px] bg-stone-200 group-last:bg-transparent" />

      {/* Node Bullet */}
      <div className={`absolute left-0 top-1.5 h-[20px] w-[20px] rounded-full border-4 border-white ring-2 ${indicatorColor} flex items-center justify-center transition-all ${
        isActive ? "scale-125 ring-4 ring-terracotta-300" : "group-hover:scale-110"
      }`} />

      {/* Content Card */}
      <div className={`flex-1 rounded-2xl border p-4.5 transition-all duration-300 ${stopBorderColor}`}>
        <div className="flex items-center justify-between gap-3 flex-wrap mb-1.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] font-bold text-stone-700 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded shadow-2xs">
              <Clock className="h-3 w-3 text-terracotta-600" />
              <span>{stop.time}</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 px-2 py-0.5 rounded border border-terracotta-200/60">
              {getStopTypeLabel()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {stop.duration && (
              <span className="text-[10px] text-stone-400 font-medium">
                {stop.duration}
              </span>
            )}
            {onRemove && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(stop.id);
                }}
                className="opacity-60 group-hover:opacity-100 text-stone-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-all cursor-pointer"
                title="Remove destination from itinerary"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <h4 className="text-sm font-serif font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors leading-snug">
          {stop.title}
        </h4>
        <p className="text-xs text-stone-600 leading-relaxed font-normal mt-1">
          {stop.desc}
        </p>

        {/* Prominent Unfolding Story & 360° Preview Button */}
        {isAttraction && onOpenDetails && (
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(stop.monumentId || stop.title);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-terracotta-600 hover:text-white text-terracotta-800 text-[11px] font-bold border border-amber-200/80 hover:border-terracotta-600 transition-all shadow-2xs group/btn cursor-pointer"
              title="Click to unfold full story, audio lore and 360 virtual tour"
            >
              <Headphones className="h-3.5 w-3.5 text-terracotta-700 group-hover/btn:text-white transition-colors" />
              <span>Listen Oral Lore & 360° Preview</span>
              <Sparkles className="h-3 w-3 text-amber-500 group-hover/btn:text-amber-200 fill-current ml-0.5" />
            </button>

            <span className="text-[10px] text-stone-400 font-medium hidden sm:inline">
              Unfolds full interactive card
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
