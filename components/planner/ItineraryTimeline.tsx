"use client";

import React, { useState } from "react";
import { Compass, PlusCircle } from "lucide-react";
import { translations } from "@/data/mockData";
import { LanguageCode, PreloadedTrip } from "@/types";
import ActivitySlot from "./ActivitySlot";

interface ItineraryTimelineProps {
  itinerary: PreloadedTrip | null;
  currentLang: LanguageCode;
  activeStopId: string;
  onSelectStop: (id: string) => void;
  onOpenDetails?: (monumentId: string) => void;
  onRemoveStop?: (dayNumber: number, stopId: string) => void;
  onAddStopClick?: (dayNumber: number) => void;
}

export default function ItineraryTimeline({
  itinerary,
  currentLang,
  activeStopId,
  onSelectStop,
  onOpenDetails,
  onRemoveStop,
  onAddStopClick
}: ItineraryTimelineProps) {
  const t = translations[currentLang] || translations.en;
  const [activeDay, setActiveDay] = useState<number>(1);

  if (!itinerary) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-stone-200 border-dashed">
        <Compass className="h-10 w-10 text-stone-400 animate-pulse mb-3" />
        <p className="text-xs text-stone-500 max-w-xs leading-relaxed font-normal">
          {t.noTripAlert}
        </p>
      </div>
    );
  }

  const { title, stats, itinerary: days } = itinerary;
  const currentDayObj = days.find((d) => d.day === activeDay) || days[0];

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col">
      {/* Itinerary Header */}
      <div className="p-6 bg-stone-50/70 border-b border-stone-200">
        <span className="text-[10px] text-terracotta-800 font-bold uppercase tracking-wider bg-terracotta-50 border border-terracotta-200 px-2.5 py-1 rounded-full">
          {t.activeTrip}
        </span>
        <h3 className="text-lg font-serif font-bold text-stone-900 mt-2.5">
          {title}
        </h3>

        {/* Stats summary panel */}
        {stats && (
          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-stone-200/80 text-center">
            <div className="bg-white p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-0.5">
                {t.totalDistance}
              </span>
              <span className="text-xs font-bold text-stone-900">{stats.totalDistance}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-0.5">
                {t.travelTime}
              </span>
              <span className="text-xs font-bold text-stone-900">{stats.travelTime}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-0.5">
                {t.monuments}
              </span>
              <span className="text-xs font-bold text-terracotta-700">{stats.monumentsCount} Stops</span>
            </div>
          </div>
        )}
      </div>

      {/* Day Tabs Navigation */}
      <div className="flex border-b border-stone-200 bg-stone-100/60 p-2 gap-1 overflow-x-auto no-scrollbar">
        {days.map((dayGroup) => (
          <button
            key={dayGroup.day}
            onClick={() => setActiveDay(dayGroup.day)}
            className={`flex-1 min-w-[70px] text-center py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeDay === dayGroup.day
                ? "bg-white text-stone-900 shadow-sm border border-stone-200 font-bold"
                : "text-stone-500 hover:text-stone-800 hover:bg-white/50"
            }`}
          >
            Day {dayGroup.day}
            {dayGroup.date && dayGroup.date !== `Day ${dayGroup.day}` && (
              <span className="block text-[9px] font-normal text-stone-400 truncate">{dayGroup.date}</span>
            )}
          </button>
        ))}
      </div>

      {/* Timeline Scroll Area */}
      <div className="p-6 overflow-y-auto max-h-[480px] bg-white space-y-1">
        {currentDayObj && currentDayObj.stops.map((stop, idx) => (
          <ActivitySlot
            key={stop.id || idx}
            stop={stop}
            isActive={activeStopId === stop.id}
            onSelect={onSelectStop}
            onOpenDetails={onOpenDetails}
            onRemove={onRemoveStop ? (id) => onRemoveStop(currentDayObj.day, id) : undefined}
            currentLang={currentLang}
          />
        ))}

        {/* Add Destination Button for current day */}
        {onAddStopClick && (
          <div className="pt-2 pl-6">
            <button
              onClick={() => onAddStopClick(currentDayObj?.day || activeDay)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-stone-300 hover:border-terracotta-500 hover:bg-terracotta-50/50 text-stone-600 hover:text-terracotta-700 text-xs font-bold transition-all cursor-pointer group"
            >
              <PlusCircle className="h-4 w-4 text-stone-400 group-hover:text-terracotta-600 transition-colors" />
              <span>+ Add Destination to Day {currentDayObj?.day || activeDay}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
