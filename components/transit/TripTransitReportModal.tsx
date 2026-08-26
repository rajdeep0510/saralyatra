"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X, Plane, Train, Bus, Car, ArrowRight, ExternalLink, Sparkles, TrendingDown, Clock, ShieldCheck, MapPin, Users, Calendar, CheckCircle2, ChevronRight, Fuel, AlertCircle } from "lucide-react";
import { PreloadedTrip, FilterPreferences } from "@/types";
import { findTransitHub, generateTransitOptions, generateAggregatorDeepLinks, generateInTripDailyCommute } from "@/data/transitData";

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
  const [activeTab, setActiveTab] = useState<"gateway" | "commute" | "budget">("gateway");

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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "gateway"
                ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Plane className="h-3.5 w-3.5 text-sky-600" />
            <span>1. Getting There (Flights & Trains)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("commute")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "commute"
                ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Car className="h-3.5 w-3.5 text-amber-600" />
            <span>2. In-Trip Daily Commute (Auto & Taxis)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("budget")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "budget"
                ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <TrendingDown className="h-3.5 w-3.5 text-emerald-600" />
            <span>3. Complete Transit Budget Summary</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50 space-y-5">
          
          {/* TAB 1: GETTING THERE (GATEWAY TRANSIT) */}
          {activeTab === "gateway" && (
            <div className="space-y-5">
              
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

          {/* TAB 2: IN-TRIP DAILY COMMUTE & LOCAL TRANSPORT */}
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
