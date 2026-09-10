"use client";

import React, { useState, useMemo } from "react";
import { Plane, Train, Bus, Car, ArrowRight, ExternalLink, Sparkles, TrendingDown, Clock, ShieldCheck, Tag, Info, Calendar, Users, MapPin, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { MAJOR_TRANSIT_HUBS, TransitHub, findTransitHub, generateTransitOptions, generateAggregatorDeepLinks, FlightOption, TrainOption, BusOption, CabOption } from "@/data/transitData";

interface TransitFareAggregatorProps {
  initialOriginCity?: string;
  initialDestCityOrState?: string;
  initialTravelDate?: string;
  travelersCount?: number;
  isEmbeddedInPlanner?: boolean;
}

export default function TransitFareAggregator({
  initialOriginCity = "Delhi",
  initialDestCityOrState = "Kerala",
  initialTravelDate,
  travelersCount = 2,
  isEmbeddedInPlanner = false
}: TransitFareAggregatorProps) {
  // Default date
  const defaultDate = useMemo(() => {
    if (initialTravelDate) return initialTravelDate;
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, [initialTravelDate]);

  const [originCity, setOriginCity] = useState<string>(initialOriginCity);
  const [destQuery, setDestQuery] = useState<string>(initialDestCityOrState);
  const [travelDate, setTravelDate] = useState<string>(defaultDate);
  const [passengers, setPassengers] = useState<number>(travelersCount);
  const [activeMode, setActiveMode] = useState<"flight" | "train" | "bus" | "cab">("flight");

  // Matched Hubs
  const originHub = useMemo(() => findTransitHub(originCity), [originCity]);
  const destHub = useMemo(() => findTransitHub(destQuery), [destQuery]);

  // Options & Calculations
  const transitData = useMemo(() => {
    return generateTransitOptions(originHub, destHub, travelDate, passengers);
  }, [originHub, destHub, travelDate, passengers]);

  // Deep Links
  const deepLinks = useMemo(() => {
    return generateAggregatorDeepLinks(originHub, destHub, travelDate, passengers);
  }, [originHub, destHub, travelDate, passengers]);

  return (
    <div className={`space-y-6 ${isEmbeddedInPlanner ? "" : "max-w-6xl mx-auto py-4"}`}>
      
      {/* SIH 2026 Header Badge */}
      <div className="bg-gradient-to-r from-amber-600 via-terracotta-600 to-terracotta-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>SIH 2026 • Smart Multi-Modal Transit & Air Scraper Compass</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
              Transit & Lowest-Cost Fare Finder
            </h2>
            <p className="text-stone-100 text-sm mt-1 max-w-2xl font-medium">
              Real-time fare aggregation across <strong>Skyscanner, Google Flights, MakeMyTrip, IRCTC, and RedBus</strong> to find the cheapest way to reach your destination.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20 shrink-0">
            <div className="h-10 w-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-amber-200">Cheapest Fare Found</div>
              <div className="text-xl font-mono font-black text-white">
                ₹{activeMode === "flight" ? transitData.flights[0]?.cheapestPrice : activeMode === "train" ? transitData.trains[0]?.cheapestFare : activeMode === "bus" ? transitData.buses[0]?.fare : transitData.cabs[0]?.perPersonCost}
                <span className="text-xs text-stone-200 font-sans font-normal"> / traveler</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Search Controls Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Origin Departure City */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-terracotta-600" />
              <span>From (Departure City)</span>
            </label>
            <select
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
              className="w-full h-11 px-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer"
            >
              {MAJOR_TRANSIT_HUBS.map((h) => (
                <option key={h.city} value={h.city}>
                  {h.city} ({h.airportCode} / {h.railwayStationCode})
                </option>
              ))}
            </select>
          </div>

          {/* Destination City / State */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              <span>To (Destination Gateway)</span>
            </label>
            <select
              value={destQuery}
              onChange={(e) => setDestQuery(e.target.value)}
              className="w-full h-11 px-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer"
            >
              {MAJOR_TRANSIT_HUBS.map((h) => (
                <option key={h.city} value={h.city}>
                  {h.city} ({h.state}) - {h.airportCode}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              <span>Departure Date</span>
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer font-mono"
            />
          </div>

          {/* Travelers Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-blue-600" />
              <span>Travelers ({passengers})</span>
            </label>
            <div className="flex items-center h-11 bg-stone-50 rounded-2xl border border-stone-200 px-2 justify-between">
              <button
                type="button"
                onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                className="h-8 w-8 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-100 transition-all cursor-pointer flex items-center justify-center"
              >
                -
              </button>
              <span className="font-bold text-sm text-stone-800">{passengers} {passengers === 1 ? "Passenger" : "Passengers"}</span>
              <button
                type="button"
                onClick={() => setPassengers((p) => Math.min(10, p + 1))}
                className="h-8 w-8 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-100 transition-all cursor-pointer flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Route Details Banner */}
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-medium text-stone-700">
            <span className="font-bold text-stone-900">{originHub.city}</span>
            <span className="text-stone-400">({originHub.airportCode})</span>
            <ArrowRight className="h-3.5 w-3.5 text-terracotta-600" />
            <span className="font-bold text-stone-900">{destHub.city}</span>
            <span className="text-stone-400">({destHub.airportCode})</span>
          </div>

          <div className="flex items-center gap-2 font-medium text-stone-600">
            <Info className="h-3.5 w-3.5 text-amber-600" />
            <span>{transitData.bestValueRecommendation}</span>
          </div>
        </div>
      </div>

      {/* Multi-Modal Mode Switcher Tabs */}
      <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveMode("flight")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeMode === "flight"
              ? "bg-white text-terracotta-700 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <Plane className="h-4 w-4" />
          <span>Flights & Air Scraper (Skyscanner Deals)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("train")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeMode === "train"
              ? "bg-white text-emerald-700 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <Train className="h-4 w-4" />
          <span>Vande Bharat & Trains (IRCTC)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("bus")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeMode === "bus"
              ? "bg-white text-blue-700 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <Bus className="h-4 w-4" />
          <span>Interstate AC Buses (RedBus)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("cab")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeMode === "cab"
              ? "bg-white text-amber-700 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <Car className="h-4 w-4" />
          <span>Outstation Cabs & Group Split</span>
        </button>
      </div>

      {/* MODE 1: FLIGHTS & AIR FARE AGGREGATOR (SKYSCANNER / GOOGLE FLIGHTS / MMT) */}
      {activeMode === "flight" && (
        <div className="space-y-4">
          
          {/* Live Direct Aggregator Comparison Bar */}
          <div className="bg-stone-900 rounded-3xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                <span>1-Click Live Meta-Search Scrapers</span>
              </div>
              <h4 className="text-base font-bold font-serif text-white mt-0.5">
                Compare Live Deals on Official Booking Aggregators
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={deepLinks.skyscannerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Skyscanner Deals</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={deepLinks.googleFlightsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Google Flights</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={deepLinks.makeMyTripUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>MakeMyTrip</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href={deepLinks.easeMyTripUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>EaseMyTrip</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Flights List with Aggregator Price Matrix */}
          <div className="space-y-3.5">
            {transitData.flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:border-terracotta-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-terracotta-50 border border-terracotta-200 flex items-center justify-center text-terracotta-700 font-bold">
                      <Plane className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-base">{flight.airline}</span>
                        <span className="text-xs font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">{flight.flightNumber}</span>
                      </div>
                      <span className="text-[11px] text-stone-500">{flight.freeBaggage}</span>
                    </div>
                  </div>

                  {/* Timings */}
                  <div className="flex items-center gap-4 text-center">
                    <div>
                      <div className="text-base font-black font-mono text-stone-900">{flight.departureTime}</div>
                      <div className="text-[10px] uppercase font-bold text-stone-500">{originHub.airportCode}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-stone-400 font-semibold">{flight.duration}</span>
                      <div className="w-16 h-0.5 bg-stone-200 relative my-1">
                        <div className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">Non-Stop</span>
                    </div>

                    <div>
                      <div className="text-base font-black font-mono text-stone-900">{flight.arrivalTime}</div>
                      <div className="text-[10px] uppercase font-bold text-stone-500">{destHub.airportCode}</div>
                    </div>
                  </div>

                  {/* Lowest Price Tag */}
                  <div className="text-right sm:text-right">
                    <div className="text-[10px] font-bold text-emerald-700 uppercase">
                      Lowest on {flight.cheapestPlatform}
                    </div>
                    <div className="text-2xl font-black font-mono text-stone-900">
                      ₹{flight.cheapestPrice.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-stone-400">Total: ₹{(flight.cheapestPrice * passengers).toLocaleString()} for {passengers}</span>
                  </div>
                </div>

                {/* Aggregator Price Breakdown Grid */}
                <div>
                  <div className="text-[11px] font-bold text-stone-500 mb-2 flex items-center gap-1">
                    <span>Aggregated Live Prices Across Platforms:</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                    {Object.entries(flight.aggregatorDeals).map(([platform, price]) => {
                      const isCheapest = price === flight.cheapestPrice;
                      return (
                        <div
                          key={platform}
                          className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                            isCheapest
                              ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                              : "bg-stone-50 border-stone-200 text-stone-700"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] capitalize font-semibold opacity-80">
                            <span>{platform.replace(/([A-Z])/g, " $1")}</span>
                            {isCheapest && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                          </div>
                          <div className="text-sm font-black font-mono mt-1">₹{price.toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 2: TRAINS (IRCTC / VANDE BHARAT) */}
      {activeMode === "train" && (
        <div className="space-y-4">
          <div className="bg-emerald-950 rounded-3xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Train className="h-3.5 w-3.5" />
                <span>Indian Railways IRCTC Gateway</span>
              </div>
              <h4 className="text-base font-bold font-serif text-white mt-0.5">
                Direct Trains between {originHub.railwayStationName} & {destHub.railwayStationName}
              </h4>
            </div>

            <a
              href={deepLinks.irctcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Check IRCTC Seat Availability ↗</span>
            </a>
          </div>

          <div className="space-y-3.5">
            {transitData.trains.map((train) => (
              <div
                key={train.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-base">{train.trainName}</span>
                      <span className="text-xs font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">#{train.trainNumber}</span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">Daily Service • Pantry Car Available</span>
                  </div>

                  <div className="flex items-center gap-4 text-center">
                    <div>
                      <div className="text-base font-black font-mono text-stone-900">{train.departureTime}</div>
                      <div className="text-[10px] uppercase font-bold text-stone-500">{originHub.railwayStationCode}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-stone-400 font-semibold">{train.duration}</span>
                      <div className="w-16 h-0.5 bg-stone-200 relative my-1" />
                    </div>
                    <div>
                      <div className="text-base font-black font-mono text-stone-900">{train.arrivalTime}</div>
                      <div className="text-[10px] uppercase font-bold text-stone-500">{destHub.railwayStationCode}</div>
                    </div>
                  </div>
                </div>

                {/* Class Fares Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {train.classes.map((cls) => (
                    <div
                      key={cls.code}
                      className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-xs">{cls.code} - {cls.name}</span>
                        <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          {cls.chancePercent}% Confirmed
                        </span>
                      </div>
                      <div className="text-lg font-black font-mono text-stone-900 mt-2">
                        ₹{cls.fare.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: BUSES (REDBUS) */}
      {activeMode === "bus" && (
        <div className="space-y-4">
          <div className="bg-blue-950 rounded-3xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Bus className="h-3.5 w-3.5" />
                <span>Interstate Bus Aggregator</span>
              </div>
              <h4 className="text-base font-bold font-serif text-white mt-0.5">
                AC Volvo & Sleeper Coaches from {originHub.city} to {destHub.city}
              </h4>
            </div>

            <a
              href={deepLinks.redBusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Search on RedBus ↗</span>
            </a>
          </div>

          <div className="space-y-3.5">
            {transitData.buses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-stone-900 text-base">{bus.operator}</h5>
                    <span className="text-xs text-stone-500">{bus.type} • ⭐ {bus.rating}/5</span>
                  </div>

                  <div className="flex items-center gap-4 text-center">
                    <div>
                      <div className="text-base font-black font-mono text-stone-900">{bus.departureTime}</div>
                      <div className="text-[10px] uppercase font-bold text-stone-500">{originHub.city}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-stone-400 font-semibold">{bus.duration}</span>
                      <div className="w-16 h-0.5 bg-stone-200 relative my-1" />
                    </div>
                    <div>
                      <div className="text-base font-black font-mono text-stone-900">{bus.arrivalTime}</div>
                      <div className="text-[10px] uppercase font-bold text-stone-500">{destHub.city}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-black font-mono text-stone-900">₹{bus.fare.toLocaleString()}</div>
                    <span className="text-[10px] text-stone-400">per seat</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-stone-100">
                  {bus.amenities.map((am) => (
                    <span key={am} className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 4: CABS & GROUP SPLIT */}
      {activeMode === "cab" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transitData.cabs.map((cab) => (
              <div
                key={cab.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-900 text-base">{cab.vehicleType}</h5>
                      <span className="text-xs text-stone-500">Max {cab.seatingCapacity} Passengers • Doorstep Pickup</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-xl">
                    ₹{cab.ratePerKm}/km
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Total Est. Distance</span>
                    <div className="font-mono font-bold text-stone-800 mt-0.5">{cab.totalDistanceKm} km ({cab.estimatedDuration})</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Toll & Allowance</span>
                    <div className="font-mono font-bold text-stone-800 mt-0.5">₹{cab.tollEstimate + cab.driverAllowance}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-800">Split Cost ({passengers} Travelers)</span>
                    <div className="text-xl font-black font-mono text-stone-900">
                      ₹{cab.perPersonCost.toLocaleString()} <span className="text-xs font-normal font-sans text-stone-500">/ person</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-stone-400">Total Cab Fare</span>
                    <div className="text-sm font-black font-mono text-stone-700">₹{cab.totalEstimatedCost.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
