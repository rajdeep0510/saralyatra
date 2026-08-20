import React, { useState } from "react";
import { Compass } from "lucide-react";
import { translations } from "../../data/mockData";
import ActivitySlot from "./ActivitySlot";

export default function ItineraryTimeline({
  itinerary,
  currentLang,
  activeStopId,
  onSelectStop,
  onOpenDetails
}) {
  const t = translations[currentLang];
  const [activeDay, setActiveDay] = useState(1);

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
      <div className="flex border-b border-stone-200 bg-stone-100/60 p-2 gap-1">
        {days.map((dayGroup) => (
          <button
            key={dayGroup.day}
            onClick={() => setActiveDay(dayGroup.day)}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
              activeDay === dayGroup.day
                ? "bg-white text-stone-900 shadow-sm border border-stone-200 font-bold"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Day {dayGroup.day}
          </button>
        ))}
      </div>

      {/* Timeline Scroll Area */}
      <div className="p-6 overflow-y-auto max-h-[440px] bg-white">
        {currentDayObj && currentDayObj.stops.map((stop, idx) => (
          <ActivitySlot
            key={stop.id || idx}
            stop={stop}
            isActive={activeStopId === stop.id}
            onSelect={onSelectStop}
            onOpenDetails={onOpenDetails}
            currentLang={currentLang}
          />
        ))}
      </div>
    </div>
  );
}
