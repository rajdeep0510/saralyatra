"use client";

import React, { useState } from "react";
import { CloudRain, Sun, Wind, Users, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, RefreshCw, Thermometer } from "lucide-react";
import { DayWeatherForecast, getDayWeatherAndCrowd, applySmartWeatherCrowdReschedule } from "@/data/weatherCrowdData";
import { PreloadedTrip } from "@/types";

interface WeatherCrowdWidgetProps {
  trip: PreloadedTrip;
  currentDayNumber: number;
  onTripUpdated?: (updatedTrip: PreloadedTrip, message: string) => void;
  onOpenFullModal?: () => void;
}

export default function WeatherCrowdWidget({
  trip,
  currentDayNumber,
  onTripUpdated,
  onOpenFullModal
}: WeatherCrowdWidgetProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [rescheduledSuccess, setRescheduledSuccess] = useState(false);

  const forecast: DayWeatherForecast = getDayWeatherAndCrowd(
    trip.region || "kerala",
    currentDayNumber
  );

  const handleApplyReschedule = () => {
    setIsApplying(true);
    setTimeout(() => {
      const { updatedTrip, appliedChangesDescription } = applySmartWeatherCrowdReschedule(
        trip,
        currentDayNumber
      );
      setIsApplying(false);
      setRescheduledSuccess(true);
      if (onTripUpdated) {
        onTripUpdated(updatedTrip, appliedChangesDescription);
      }
      setTimeout(() => {
        setRescheduledSuccess(false);
      }, 4000);
    }, 600);
  };

  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
      forecast.isAdverse
        ? "bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-rose-50/60 border-amber-300 shadow-xs"
        : "bg-stone-50/90 border-stone-200/90"
    }`}>
      
      {/* Top Header: Location, Forecast & Live AQI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-stone-200/70">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base">{forecast.iconEmoji}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-stone-900">
                {forecast.temperatureC}°C {forecast.condition}
              </span>
              <span className="text-[10px] text-stone-500 font-medium">
                (Feels {forecast.feelsLikeC}°C)
              </span>
            </div>
            <span className="text-[10px] text-stone-500 block">
              📍 {forecast.cityName} • Day {currentDayNumber} Forecast
            </span>
          </div>
        </div>

        {/* Sensor Badges: Rain % & AQI */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {forecast.rainProbability > 0 && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
              forecast.rainProbability > 50
                ? "bg-blue-100 text-blue-900 border-blue-300 animate-pulse font-black"
                : "bg-stone-100 text-stone-700 border-stone-200"
            }`}>
              <CloudRain className="h-3 w-3 text-blue-600" />
              <span>{forecast.rainProbability}% Rain</span>
            </span>
          )}

          {/* AQI Indicator */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
            forecast.aqi <= 50
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : forecast.aqi <= 100
              ? "bg-amber-50 text-amber-800 border-amber-300"
              : "bg-rose-50 text-rose-800 border-rose-300"
          }`}>
            <Wind className="h-3 w-3 text-stone-500" />
            <span>AQI {forecast.aqi} ({forecast.aqiLevel})</span>
          </span>

          {/* Live Crowd Level */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
            forecast.crowdDensity.level.includes("Low")
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : forecast.crowdDensity.level.includes("Surge")
              ? "bg-rose-100 text-rose-900 border-rose-300 font-black animate-pulse"
              : "bg-amber-50 text-amber-900 border-amber-200"
          }`}>
            <Users className="h-3 w-3" />
            <span>Crowd: {forecast.crowdDensity.level}</span>
          </span>
        </div>
      </div>

      {/* Advisory & Golden Hour Window */}
      <div className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>Best Visiting Window: <strong className="text-stone-950">{forecast.bestVisitingWindow}</strong></span>
          </div>
          <span className="text-[10px] text-stone-500 block">
            ⏳ Peak rush hour: {forecast.crowdDensity.peakRushHour} (Avg wait: {forecast.crowdDensity.avgWaitTimeMinutes} mins)
          </span>
        </div>

        {/* Action Button: Smart Reschedule Trigger */}
        {forecast.isAdverse && !rescheduledSuccess && (
          <button
            type="button"
            onClick={handleApplyReschedule}
            disabled={isApplying}
            className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-terracotta-600 hover:from-amber-700 hover:to-terracotta-700 text-white font-black text-xs transition-all cursor-pointer shadow-xs hover:scale-105 shrink-0 disabled:opacity-50"
            title="1-Click Smart Reschedule: Swaps outdoor rain/heat risks for covered museums & early golden hours"
          >
            {isApplying ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Optimizing Day {currentDayNumber}...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-amber-200" />
                <span>⚡ 1-Click Smart Reschedule</span>
              </>
            )}
          </button>
        )}

        {rescheduledSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold shrink-0 animate-in zoom-in duration-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
            <span>Itinerary Auto-Optimized!</span>
          </div>
        )}
      </div>

      {/* If Adverse Conditions exist, show the intelligent swap rationale */}
      {forecast.isAdverse && forecast.smartSwapSuggestion && (
        <div className="mt-2.5 p-2.5 rounded-xl bg-white/90 border border-amber-200/90 text-xs space-y-1 text-amber-950">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>Weather/Crowd Risk: {forecast.adverseReason}</span>
          </div>
          <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
            💡 <strong>AI Smart Suggestion:</strong> {forecast.smartSwapSuggestion.reason} &rarr; <span className="font-bold text-stone-900">{forecast.smartSwapSuggestion.suggestedAlternative}</span> ({forecast.smartSwapSuggestion.impact})
          </p>
        </div>
      )}

    </div>
  );
}
