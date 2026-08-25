"use client";

import React, { useEffect } from "react";
import { X, Printer, Sparkles, MapPin, Clock, Route, ShieldCheck, Utensils, PhoneCall, Compass, CheckCircle2 } from "lucide-react";
import { PreloadedTrip, FilterPreferences } from "@/types";

interface TravelGuideBookletModalProps {
  trip: PreloadedTrip;
  preferences?: FilterPreferences | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TravelGuideBookletModal({
  trip,
  preferences,
  isOpen,
  onClose
}: TravelGuideBookletModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stateName = trip.region || trip.title.split(" ")[0] || "Bharat";
  const daysCount = trip.itinerary.length || 3;
  const travelers = preferences?.travelers || 2;
  const dietary = preferences?.dietary || trip.culturalFilter?.dietary || "pureVeg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200 print:p-0 print:bg-white print:static print:overflow-visible">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Screen Header (Hidden on Print) */}
        <div className="bg-stone-900 text-white px-6 py-4 border-b border-stone-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-lg">
              📖
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase block">
                Official Illustrated Travel Booklet
              </span>
              <h3 className="font-serif font-black text-lg text-white">
                {trip.title} — Printable Guide
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <Printer className="h-4 w-4" />
              <span>Print A4 Booklet / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Booklet Scrollable Body / Printable Page */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1 bg-amber-50/20 print:p-0 print:bg-white print:overflow-visible text-stone-900 font-sans">
          
          {/* Cover & Title Section with Indian Decorative Motifs */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white border-2 border-amber-500/30 relative overflow-hidden shadow-md print:bg-stone-900 print:text-white print:rounded-2xl">
            {/* Traditional Warli Pattern Border */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-terracotta-600" />
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-terracotta-600 via-orange-500 to-amber-400" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                  <Sparkles className="h-4 w-4" />
                  <span>Saral Yatra • Official Cultural Circuit Guide</span>
                </div>
                <span className="text-xs font-bold bg-white/10 text-amber-200 border border-white/20 px-3 py-1 rounded-full">
                  🇮🇳 State: {stateName}
                </span>
              </div>

              <h1 className="font-serif font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                {trip.title}
              </h1>
              <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
                Handcrafted multi-day cultural itinerary exploring heritage monuments, scenic natural wonders, and local spiritual sanctums across {stateName}.
              </p>

              {/* Trip Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15 text-xs">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-stone-400 font-mono block">TOTAL DURATION</span>
                  <span className="font-serif font-bold text-base text-amber-300">{daysCount} Days & {daysCount - 1} Nights</span>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-stone-400 font-mono block">CIRCUIT DISTANCE</span>
                  <span className="font-serif font-bold text-base text-white">{trip.stats?.totalDistance || "180 km"}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-stone-400 font-mono block">TRAVEL GROUP</span>
                  <span className="font-serif font-bold text-base text-white">{travelers} Explorer{travelers > 1 ? "s" : ""}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-stone-400 font-mono block">DIETARY PROFILING</span>
                  <span className="font-serif font-bold text-base text-emerald-400">
                    {dietary === "pureVeg" ? "Pure Veg Verified" : dietary === "jain" ? "Jain Kitchen" : "Standard Cuisine"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Schedule Itinerary Chapters */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 font-mono">
                Daily Circuit Itinerary & Timelines
              </span>
            </div>

            <div className="space-y-6">
              {trip.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-4 break-inside-avoid print:border-stone-300"
                >
                  {/* Day Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        D{day.day}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base text-stone-900">
                          Day {day.day} {day.date ? `• ${day.date}` : ""}
                        </h3>
                        <span className="text-xs text-stone-500 font-medium">
                          {day.stops.length} Planned Checkpoint{day.stops.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      Full Day Flow
                    </span>
                  </div>

                  {/* Day Stops Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {day.stops.map((stop, idx) => (
                      <div
                        key={stop.id}
                        className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-1.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-terracotta-700 uppercase">
                              Stop #{idx + 1}
                            </span>
                            <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {stop.time}
                            </span>
                          </div>

                          <h4 className="font-serif font-bold text-xs text-stone-900">
                            {stop.title}
                          </h4>

                          <p className="text-[11px] text-stone-500 leading-snug">
                            {stop.desc}
                          </p>
                        </div>

                        {stop.duration && (
                          <div className="text-[10px] text-amber-900 bg-amber-50/90 border border-amber-200/80 p-2 rounded-xl mt-2 leading-tight">
                            ⏱️ <strong>Duration:</strong> {stop.duration}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Cuisine & Pure-Veg Recommendations */}
          <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 space-y-3 break-inside-avoid">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-emerald-600 text-white">
                <Utensils className="h-3.5 w-3.5" />
              </span>
              <h4 className="font-serif font-bold text-sm text-emerald-950">
                Authentic {stateName} Regional Dining & Specialties
              </h4>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              When exploring {stateName}, look for authentic regional thalis, temple prasadam, and certified vegetarian kitchens serving traditional local recipes prepared with pure cold-pressed oils and organic indigenous spices.
            </p>
          </div>

          {/* 24/7 State Emergency & Tourist Assistance Directory */}
          <div className="p-6 rounded-3xl bg-stone-900 text-white space-y-3 break-inside-avoid">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono flex items-center gap-1.5">
                <PhoneCall className="h-3.5 w-3.5" />
                <span>24/7 Emergency & Safety Directory</span>
              </span>
              <span className="text-[10px] text-stone-400">Toll-Free Nationwide</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-stone-400 block">TOURIST HELPLINE</span>
                <span className="font-mono font-bold text-white">📞 1363</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-stone-400 block">ALL EMERGENCY</span>
                <span className="font-mono font-bold text-white">📞 112</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-stone-400 block">AMBULANCE</span>
                <span className="font-mono font-bold text-white">📞 108</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-stone-400 block">HIGHWAY PATROL</span>
                <span className="font-mono font-bold text-white">📞 1033</span>
              </div>
            </div>
          </div>

          {/* Booklet Footer */}
          <div className="text-center pt-4 border-t border-stone-200 text-stone-400 text-[11px] space-y-1">
            <p>Generated by <strong>Saral Yatra</strong> • Cultural Tourism & Heritage Discovery Platform</p>
            <p className="font-mono text-[10px]">Printed on {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
