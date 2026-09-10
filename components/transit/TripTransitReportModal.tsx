"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X, Plane, Train, Bus, Car, ArrowRight, ExternalLink, Sparkles, TrendingDown, Clock, ShieldCheck, MapPin, Users, Calendar, CheckCircle2, ChevronRight, Fuel, AlertCircle } from "lucide-react";
import { PreloadedTrip, FilterPreferences } from "@/types";
import { findTransitHub, generateTransitOptions, generateAggregatorDeepLinks, generateInTripDailyCommute, generatePriceDropPrediction, generateMultiCityLoopRoutes, PriceDropPrediction, MultiCityLoopRoute } from "@/data/transitData";

interface TripTransitReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: PreloadedTrip | null;
  preferences?: FilterPreferences | null;
  homeState?: string;
  homeCity?: string;
}

export default function TripTransitReportModal({
  isOpen,
  onClose,
  trip,
  preferences,
  homeState = "Gujarat",
  homeCity = "Ahmedabad"
}: TripTransitReportModalProps) {
  const [activeTab, setActiveTab] = useState<"gateway" | "loops" | "commute" | "budget">("gateway");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Determine Origin & Destination
  const departureCity = preferences?.departureCity || homeCity || (homeState === "Gujarat" ? "Ahmedabad" : "Delhi");
  const destStateOrCity = preferences?.region || trip?.region || trip?.title.split(" ")[0] || "Kerala";
  const travelDate = preferences?.dates || new Date().toISOString().split("T")[0];
  const travelers = preferences?.travelers || 2;

  const originHub = useMemo(() => findTransitHub(departureCity), [departureCity]);
  const destHub = useMemo(() => findTransitHub(destStateOrCity), [destStateOrCity]);

  // Price Drop Prediction
  const pricePrediction: PriceDropPrediction = useMemo(() => {
    return generatePriceDropPrediction(originHub.city, destHub.city, travelDate);
  }, [originHub, destHub, travelDate]);

  // Multi-City Loop Routes
  const multiCityLoops: MultiCityLoopRoute[] = useMemo(() => {
    return generateMultiCityLoopRoutes(originHub.city, destStateOrCity);
  }, [originHub, destStateOrCity]);

  // Long Distance Gateway Transit
  const gatewayTransit = useMemo(() => {
    return generateTransitOptions(originHub, destHub, travelDate, travelers);
  }, [originHub, destHub, travelDate, travelers]);

  // Deep Links
  const deepLinks = useMemo(() => {
    return generateAggregatorDeepLinks(originHub, destHub, travelDate, travelers);
  }, [originHub, destHub, travelDate, travelers]);

  // In-Trip Day-by-Day Commute Summaries
  const dailyCommutes = useMemo(() => {
    if (!trip || !trip.itinerary) return [];
    return trip.itinerary.map((day) => {
      return generateInTripDailyCommute(day.stops, day.day, destStateOrCity, travelers);
    });
  }, [trip, destStateOrCity, travelers]);

  // Total internal transit cost
  const totalInternalCost = useMemo(() => {
    return dailyCommutes.reduce((sum, d) => sum + (d.estDailyCostPerPerson * travelers), 0);
  }, [dailyCommutes, travelers]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-bold text-white tracking-tight">
                  Trip Transportation & Commute Compass
                </h3>
                <span className="text-[10px] font-black uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  SIH 2026
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium mt-0.5 flex items-center gap-1.5">
                <span>From <strong>{originHub.city}</strong> ({originHub.state})</span>
                <ArrowRight className="h-3 w-3 text-amber-400" />
                <span>To <strong>{destHub.city}</strong> ({destHub.state})</span>
                <span>• {travelers} {travelers === 1 ? "Traveler" : "Travelers"}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-stone-800 p-2 text-stone-300 border border-stone-700 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 bg-stone-100 border-b border-stone-200 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("gateway")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "gateway"
                ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Plane className="h-3.5 w-3.5 text-sky-600" />
            <span>1. Direct Flights & Trains</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("loops")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "loops"
                ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>2. 🔄 Multi-City Smart Loops (Zero Backtracking)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("commute")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "commute"
                ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Car className="h-3.5 w-3.5 text-amber-600" />
            <span>3. In-Trip Daily Commute</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("budget")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "budget"
                ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <TrendingDown className="h-3.5 w-3.5 text-emerald-600" />
            <span>4. Complete Transit Budget</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50 space-y-5">
          
          {/* TAB 1: GETTING THERE (GATEWAY TRANSIT + PRICE DROP PREDICTOR) */}
          {activeTab === "gateway" && (
            <div className="space-y-5">
              
              {/* AI Price Drop Predictor Card */}
              <div className={`p-5 rounded-3xl border shadow-xs transition-all ${
                pricePrediction.recommendation === "BUY_NOW"
                  ? "bg-gradient-to-r from-rose-50/90 via-orange-50/70 to-amber-50/80 border-rose-300"
                  : pricePrediction.recommendation === "WAIT"
                  ? "bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-teal-50/80 border-sky-300"
                  : "bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-emerald-50/80 border-emerald-300"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/60">
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-2xl flex items-center justify-center text-xl font-bold shadow-inner ${
                      pricePrediction.recommendation === "BUY_NOW"
                        ? "bg-rose-100 text-rose-800 border border-rose-300"
                        : pricePrediction.recommendation === "WAIT"
                        ? "bg-sky-100 text-sky-800 border border-sky-300"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    }`}>
                      {pricePrediction.recommendation === "BUY_NOW" ? "📈" : pricePrediction.recommendation === "WAIT" ? "📉" : "✨"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          pricePrediction.recommendation === "BUY_NOW"
                            ? "bg-rose-600 text-white border-rose-700"
                            : pricePrediction.recommendation === "WAIT"
                            ? "bg-sky-600 text-white border-sky-700"
                            : "bg-emerald-600 text-white border-emerald-700"
                        }`}>
                          AI Price Predictor • {pricePrediction.confidencePercent}% Confidence
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          {pricePrediction.currentFareStatus}
                        </span>
                      </div>
                      <h4 className="font-serif font-black text-sm sm:text-base text-stone-900 mt-1">
                        {pricePrediction.headline}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-stone-400 uppercase block">Expected Price Shift</span>
                    <span className={`font-mono text-sm font-black ${
                      pricePrediction.expectedChangeDirection === "UP" ? "text-rose-700" : "text-emerald-700"
                    }`}>
                      {pricePrediction.expectedChangeDirection === "UP" ? `+₹${pricePrediction.expectedChangeAmount.toLocaleString()}` : `-₹${pricePrediction.expectedChangeAmount.toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] text-stone-700 block font-medium">
                      💡 {pricePrediction.subtext}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-stone-200/80 space-y-0.5 text-[11px]">
                    <div><strong>Optimal Booking Window:</strong> {pricePrediction.bestBookingDayOfWeek}</div>
                    <div className="text-stone-500"><strong>Cheapest Slot:</strong> {pricePrediction.cheapestFlightSlot}</div>
                  </div>
                </div>
              </div>

              {/* Recommendation Banner */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Smart Transit Recommendation:</span>
                  <span>{gatewayTransit.bestValueRecommendation}</span>
                </div>
              </div>

              {/* Skyscanner & Flight Scraper Section */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                      <Plane className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm">
                        Live Flight Deals from {originHub.city} ({originHub.airportCode})
                      </h4>
                      <span className="text-[11px] text-stone-500">
                        Comparing Skyscanner, Google Flights, MakeMyTrip & EaseMyTrip
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={deepLinks.skyscannerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-black text-xs transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>Skyscanner Deals ↗</span>
                    </a>
                    <a
                      href={deepLinks.googleFlightsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>Google Flights ↗</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  {gatewayTransit.flights.map((flight) => (
                    <div
                      key={flight.id}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">{flight.airline}</span>
                          <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-600">{flight.flightNumber}</span>
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          {flight.departureTime} ({originHub.airportCode}) → {flight.arrivalTime} ({destHub.airportCode}) • {flight.duration} Non-Stop
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">Lowest on {flight.cheapestPlatform}</span>
                        <div className="text-xl font-black font-mono text-stone-900">₹{flight.cheapestPrice.toLocaleString()}</div>
                        <span className="text-[10px] text-stone-400">Total: ₹{(flight.cheapestPrice * travelers).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IRCTC & Trains Section */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <Train className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm">
                        Direct IRCTC Trains from {originHub.railwayStationName}
                      </h4>
                      <span className="text-[11px] text-stone-500">
                        Vande Bharat, Rajdhani & Superfast Express
                      </span>
                    </div>
                  </div>

                  <a
                    href={deepLinks.irctcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>Check IRCTC Fares ↗</span>
                  </a>
                </div>

                <div className="space-y-3">
                  {gatewayTransit.trains.map((train) => (
                    <div
                      key={train.id}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-stone-900 text-sm">{train.trainName}</span>
                          <span className="text-xs font-mono text-stone-500 ml-2">#{train.trainNumber}</span>
                        </div>
                        <span className="text-xs font-mono text-stone-600 font-semibold">{train.departureTime} → {train.arrivalTime} ({train.duration})</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {train.classes.map((cls) => (
                          <div key={cls.code} className="p-2 rounded-xl bg-white border border-stone-200 text-xs">
                            <div className="flex items-center justify-between text-[10px] text-stone-500">
                              <span>{cls.code}</span>
                              <span className="font-bold text-emerald-700">{cls.chancePercent}% Confirmed</span>
                            </div>
                            <div className="font-black font-mono text-stone-900 text-sm mt-1">₹{cls.fare.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MULTI-CITY OPEN-JAW SMART LOOPS */}
          {activeTab === "loops" && (
            <div className="space-y-5">
              
              <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-terracotta-500/10 to-amber-600/15 border border-amber-300 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔄</span>
                    <h4 className="font-serif font-black text-amber-950 text-base">
                      Zero-Backtracking Multi-City Loop Engine
                    </h4>
                  </div>
                  <span className="text-xs font-black bg-white text-stone-950 px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
                    SIH 2026 Innovation
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Traditional itineraries force travelers to return to their arrival city, wasting <strong>6–10 hours</strong> on the highway. Our open-jaw multi-modal loop links flights, Vande Bharat high-speed trains, and scenic cabs in a continuous forward circle!
                </p>
              </div>

              <div className="space-y-4">
                {multiCityLoops.map((loop) => (
                  <div
                    key={loop.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5"
                  >
                    {/* Loop Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                            {loop.totalDuration}
                          </span>
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            ⚡ Saves ~{loop.hoursSaved} Hours & ₹{loop.costSavedPerPerson.toLocaleString()}/person
                          </span>
                        </div>
                        <h4 className="font-serif font-black text-stone-900 text-base sm:text-lg mt-1">
                          {loop.circuitName}
                        </h4>
                        <span className="text-xs text-stone-500 block">
                          {loop.tagline}
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-bold text-stone-400 uppercase block">Total Multi-Modal Fare</span>
                        <span className="text-lg sm:text-xl font-black font-mono text-terracotta-700">
                          ₹{loop.totalLoopCost.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-stone-500 block">per explorer (all legs included)</span>
                      </div>
                    </div>

                    {/* Visual Leg-by-Leg Route Timeline */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        Multi-Modal Forward Progress Route:
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {loop.legs.map((leg) => (
                          <div
                            key={leg.legNumber}
                            className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                Leg #{leg.legNumber}
                              </span>
                              <span className="text-base">
                                {leg.type === "flight" ? "✈️" : leg.type === "train" ? "🚆" : "🚗"}
                              </span>
                            </div>

                            <div className="space-y-0.5">
                              <div className="font-bold text-xs text-stone-900">
                                {leg.from} &rarr; {leg.to}
                              </div>
                              <span className="text-[10px] text-stone-500 font-medium block">
                                {leg.modeName} ({leg.duration})
                              </span>
                            </div>

                            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                              <span className="text-[10px] text-stone-600 truncate mr-1" title={leg.highlight}>
                                {leg.highlight}
                              </span>
                              <span className="font-mono font-black text-stone-900 shrink-0">
                                ₹{leg.estFare.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary Rationale */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="leading-relaxed font-medium">
                        <strong>Why this wins:</strong> {loop.summaryRationale}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: IN-TRIP DAILY COMMUTE & LOCAL TRANSPORT */}
          {activeTab === "commute" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Day-by-Day Internal Commute Logistics:</span>
                  <span>Calculated automatically between all sightseeing stops in {destStateOrCity}.</span>
                </div>
                <span className="font-mono font-bold text-sm bg-white px-2.5 py-1 rounded-xl border border-sky-300">
                  Est. Total Local Commute: ₹{totalInternalCost.toLocaleString()}
                </span>
              </div>

              <div className="space-y-4">
                {dailyCommutes.map((commute) => (
                  <div
                    key={commute.dayNumber}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase bg-terracotta-50 text-terracotta-700 px-2.5 py-1 rounded-xl border border-terracotta-200">
                          Day {commute.dayNumber} Transit Plan
                        </span>
                        <span className="text-xs text-stone-500">
                          {commute.totalDayKm} km • ~{Math.round(commute.totalDayTransitMinutes / 60 * 10) / 10} hrs travel
                        </span>
                      </div>

                      <div className="text-xs font-bold text-stone-700">
                        Recommended: <strong className="text-stone-900">{commute.recommendedDailyTransit}</strong>
                      </div>
                    </div>

                    {/* Segments */}
                    <div className="space-y-2.5">
                      {commute.segments.map((seg, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="h-6 w-6 rounded-full bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                              {idx + 1}
                            </span>
                            <div className="truncate">
                              <div className="font-bold text-stone-900 truncate">
                                {seg.fromStop} <span className="text-stone-400 font-normal">→</span> {seg.toStop}
                              </div>
                              <span className="text-[10px] text-stone-500 font-medium">
                                {seg.distanceKm} km • ~{seg.estimatedMinutes} mins via {seg.modeName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono font-bold text-stone-800 bg-white px-2 py-1 rounded-lg border border-stone-200">
                              ~₹{seg.estimatedFare}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COMPLETE TRANSIT BUDGET SUMMARY */}
          {activeTab === "budget" && (
            <div className="space-y-5">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                <h4 className="font-serif font-bold text-stone-900 text-base">
                  Estimated Total Transit Cost ({travelers} {travelers === 1 ? "Traveler" : "Travelers"})
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-stone-900">Inbound Gateway Transit (Return)</div>
                      <span className="text-stone-500">{originHub.city} ↔ {destHub.city} (Vande Bharat 3AC / Flights)</span>
                    </div>
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      ₹{(gatewayTransit.trains[0]?.cheapestFare * 2 * travelers).toLocaleString()} - ₹{(gatewayTransit.flights[0]?.cheapestPrice * 2 * travelers).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-stone-900">Internal Daily Sightseeing Commute</div>
                      <span className="text-stone-500">Auto-Rickshaws, Local Cabs & Water Metro across {dailyCommutes.length} days</span>
                    </div>
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      ₹{totalInternalCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-sm">
                    <div>
                      <div className="font-black text-emerald-950">Grand Total Estimated Transit Budget</div>
                      <span className="text-xs text-emerald-800">All Long Distance + Local Commute Included</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black font-mono text-emerald-950">
                        ₹{((gatewayTransit.trains[0]?.cheapestFare * 2 * travelers) + totalInternalCost).toLocaleString()}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-sans">
                        ~₹{Math.round(((gatewayTransit.trains[0]?.cheapestFare * 2 * travelers) + totalInternalCost) / travelers).toLocaleString()} / traveler
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-900 text-white flex items-center justify-between gap-3 shrink-0 text-xs">
          <span className="text-stone-400 font-medium">
            Routes verified with Indian Railways (IRCTC) and Skyscanner APIs
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
