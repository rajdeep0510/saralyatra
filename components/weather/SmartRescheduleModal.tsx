"use client";

import React, { useState } from "react";
import { CloudRain, Sun, Wind, Users, Sparkles, X, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, RefreshCw, Layers } from "lucide-react";
import { DayWeatherForecast, getDayWeatherAndCrowd, applySmartWeatherCrowdReschedule } from "@/data/weatherCrowdData";
import { PreloadedTrip } from "@/types";

interface SmartRescheduleModalProps {
  trip: PreloadedTrip;
  isOpen: boolean;
  onClose: () => void;
  onTripUpdated?: (updatedTrip: PreloadedTrip, message: string) => void;
}

export default function SmartRescheduleModal({
  trip,
  isOpen,
  onClose,
  onTripUpdated
}: SmartRescheduleModalProps) {
  const [activeDayTab, setActiveDayTab] = useState<number>(1);
  const [isApplying, setIsApplying] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalDays = trip.itinerary.length || 3;
  const currentForecast: DayWeatherForecast = getDayWeatherAndCrowd(
    trip.region || "kerala",
    activeDayTab
  );

  const handleApply1Click = (dayNum: number) => {
    setIsApplying(true);
    setTimeout(() => {
      const { updatedTrip, appliedChangesDescription } = applySmartWeatherCrowdReschedule(
        trip,
        dayNum
      );
      setIsApplying(false);
      setSuccessToast(`Day ${dayNum} Rescheduled: Sights successfully optimized for weather & crowds!`);
      if (onTripUpdated) {
        onTripUpdated(updatedTrip, appliedChangesDescription);
      }
      setTimeout(() => {
        setSuccessToast(null);
      }, 4000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl text-amber-300">
              🌦️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
                  Live Sensor Radar
                </span>
                <span className="text-xs text-stone-300 font-medium">
                  {trip.region || "Bharat"} Circuit
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                Smart Weather, AQI & Live Crowd Rescheduler
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="p-3 bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="h-4 w-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Day Selector Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 py-2 gap-2 overflow-x-auto no-scrollbar shrink-0">
          {Array.from({ length: totalDays }).map((_, idx) => {
            const dayNum = idx + 1;
            const f = getDayWeatherAndCrowd(trip.region || "kerala", dayNum);
            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => setActiveDayTab(dayNum)}
                className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  activeDayTab === dayNum
                    ? "bg-white text-stone-900 shadow-xs border-stone-300 scale-102"
                    : "bg-stone-100 text-stone-600 border-stone-200 hover:bg-white"
                }`}
              >
                <span>{f.iconEmoji}</span>
                <span>Day {dayNum}</span>
                {f.isAdverse && (
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Day Overview Banner */}
          <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            
            {/* Temperature */}
            <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Temperature
              </span>
              <span className="text-xl font-black text-stone-900 mt-1 block">
                {currentForecast.temperatureC}°C
              </span>
              <span className="text-[10px] text-stone-500 font-medium">
                Feels {currentForecast.feelsLikeC}°C
              </span>
            </div>

            {/* Precipitation / Rain */}
            <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Rain Probability
              </span>
              <span className={`text-xl font-black mt-1 block ${
                currentForecast.rainProbability > 50 ? "text-blue-600 animate-pulse" : "text-stone-900"
              }`}>
                {currentForecast.rainProbability}%
              </span>
              <span className="text-[10px] text-stone-500 font-medium">
                {currentForecast.condition}
              </span>
            </div>

            {/* AQI Sensor */}
            <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Air Quality (AQI)
              </span>
              <span className={`text-xl font-black mt-1 block ${
                currentForecast.aqi <= 50 ? "text-emerald-600" : currentForecast.aqi <= 100 ? "text-amber-600" : "text-rose-600"
              }`}>
                {currentForecast.aqi}
              </span>
              <span className="text-[10px] font-bold text-stone-600">
                {currentForecast.aqiLevel} Air
              </span>
            </div>

            {/* Live Crowd Surge */}
            <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Live Crowd Index
              </span>
              <span className={`text-xl font-black mt-1 block ${
                currentForecast.crowdDensity.level.includes("Surge") ? "text-rose-600" : "text-stone-900"
              }`}>
                {currentForecast.crowdDensity.percentage}%
              </span>
              <span className="text-[10px] font-bold text-stone-600">
                {currentForecast.crowdDensity.level}
              </span>
            </div>

          </div>

          {/* Crowd Heatmap & Optimal Hours Breakdown */}
          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-terracotta-600" />
              <span>Live Hourly Crowd & Heat Density Timeline</span>
            </h4>

            <div className="grid grid-cols-3 gap-3 text-xs">
              
              {/* Morning Golden Hour */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  🌟 Morning Golden Hour
                </span>
                <span className="font-bold text-stone-900 block">
                  {currentForecast.crowdDensity.goldenHour}
                </span>
                <p className="text-[11px] text-emerald-900">
                  Peaceful light, crisp air & minimal wait times (&lt;10 mins).
                </p>
              </div>

              {/* Midday Peak Heat & Rush */}
              <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-1">
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">
                  ⚠️ Peak Midday Rush
                </span>
                <span className="font-bold text-stone-900 block">
                  {currentForecast.crowdDensity.peakRushHour}
                </span>
                <p className="text-[11px] text-rose-900">
                  Intense sun/crowds with avg queue times of {currentForecast.crowdDensity.avgWaitTimeMinutes} mins.
                </p>
              </div>

              {/* Evening Sunset Slot */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  🌇 Evening Sunset Breeze
                </span>
                <span className="font-bold text-stone-900 block">
                  05:00 PM - 07:00 PM
                </span>
                <p className="text-[11px] text-amber-900">
                  Cooler temperatures & scenic dusk panoramic lighting.
                </p>
              </div>

            </div>
          </div>

          {/* AI Smart Reschedule Rationale & 1-Click Action */}
          {currentForecast.isAdverse && currentForecast.smartSwapSuggestion ? (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-terracotta-600/10 border border-amber-300 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  <h4 className="font-serif font-black text-amber-950 text-base">
                    AI Smart Reschedule Recommendation
                  </h4>
                </div>
                <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full uppercase">
                  Optimization Ready
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-700">
                  <span className="font-bold text-rose-700 shrink-0">⚠️ Detected Condition:</span>
                  <span>{currentForecast.adverseReason}</span>
                </div>
                <div className="flex items-start gap-2 text-stone-800">
                  <span className="font-bold text-emerald-800 shrink-0">✨ Recommended Smart Swap:</span>
                  <span>
                    Swap <strong>&apos;{currentForecast.smartSwapSuggestion.originalStopTitle}&apos;</strong> &rarr; <strong className="text-amber-950 underline">{currentForecast.smartSwapSuggestion.suggestedAlternative}</strong>
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 italic bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
                  &ldquo;{currentForecast.smartSwapSuggestion.reason} {currentForecast.smartSwapSuggestion.impact}&rdquo;
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleApply1Click(activeDayTab)}
                disabled={isApplying}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-terracotta-600 hover:from-amber-600 hover:to-terracotta-700 text-white font-black text-xs transition-all cursor-pointer shadow-md hover:scale-[1.01] disabled:opacity-50"
              >
                {isApplying ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Applying Smart Weather & Crowd Reschedule...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-amber-200" />
                    <span>⚡ Apply 1-Click Smart Reschedule to Day {activeDayTab}</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1 text-xs text-emerald-900 font-medium">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mx-auto" />
              <div className="font-bold">Day {activeDayTab} Schedule Is Weather & Crowd Optimal!</div>
              <p className="text-[11px] text-emerald-700">
                Conditions for Day {activeDayTab} in {currentForecast.cityName} are pleasant with no adverse weather alerts.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-stone-500 font-medium">
            📡 Synced with IMD India Weather & Archeological Survey Crowd Sensors
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 cursor-pointer shadow-2xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
