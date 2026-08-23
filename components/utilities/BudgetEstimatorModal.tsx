"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, DollarSign, Users, Car, Utensils, Home, Landmark, Calculator, Sparkles, Printer, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import { PreloadedTrip } from "@/types";

interface BudgetEstimatorModalProps {
  trip: PreloadedTrip;
  travelers?: number;
  isOpen: boolean;
  onClose: () => void;
}

export type BudgetTier = "budget" | "standard" | "premium";

export default function BudgetEstimatorModal({
  trip,
  travelers = 2,
  isOpen,
  onClose
}: BudgetEstimatorModalProps) {
  const [tier, setTier] = useState<BudgetTier>("standard");
  const [travelersCount, setTravelersCount] = useState<number>(() => travelers || 2);
  const [includeCabDriver, setIncludeCabDriver] = useState<boolean>(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const days = Math.max(1, trip.itinerary.length || 3);
  const nights = Math.max(1, days - 1);
  const allStops = useMemo(() => trip.itinerary.flatMap((d) => d.stops), [trip]);
  const monumentsCount = Math.max(1, allStops.length);
  
  // Extract numeric distance
  const distanceKm = useMemo(() => {
    const raw = trip.stats?.totalDistance || "";
    const match = raw.match(/\d+/);
    return match ? parseInt(match[0], 10) : days * 65;
  }, [trip.stats, days]);

  // Pricing Multipliers based on Tier
  const pricing = useMemo(() => {
    const multiplier = tier === "budget" ? 0.7 : tier === "premium" ? 1.8 : 1.0;

    // Transport (Fuel for self-drive or Chauffeur Cab)
    const baseFuelCost = Math.round(distanceKm * (tier === "budget" ? 7 : tier === "premium" ? 14 : 9.5));
    const tollsAndParking = days * (tier === "budget" ? 150 : tier === "premium" ? 400 : 250);
    const cabChauffeurAllowance = includeCabDriver ? days * (tier === "premium" ? 1800 : 1200) : 0;
    const transportTotal = baseFuelCost + tollsAndParking + cabChauffeurAllowance;

    // Monument & Sightseeing Entry Fees (per person)
    const entryPerPerson = Math.round(monumentsCount * (tier === "budget" ? 35 : tier === "premium" ? 120 : 65));
    const monumentTotal = entryPerPerson * travelersCount;

    // Pure Veg / Regional Cuisine Meals (per person per day)
    const dailyFoodPerPerson = Math.round(tier === "budget" ? 320 : tier === "premium" ? 1100 : 550);
    const foodTotal = dailyFoodPerPerson * days * travelersCount;

    // Homestay / Heritage Stays (rooms needed: ceil(travelers / 2))
    const roomsCount = Math.ceil(travelersCount / 2);
    const roomRatePerNight = Math.round(tier === "budget" ? 1200 : tier === "premium" ? 4500 : 2400);
    const stayTotal = roomRatePerNight * nights * roomsCount;

    // Local Experiences & Temple Prasad (per person)
    const experiencePerPerson = Math.round(tier === "budget" ? 150 : tier === "premium" ? 800 : 350);
    const experienceTotal = experiencePerPerson * travelersCount;

    const grandTotal = transportTotal + monumentTotal + foodTotal + stayTotal + experienceTotal;
    const perPersonCost = Math.round(grandTotal / travelersCount);

    return {
      transportTotal,
      monumentTotal,
      foodTotal,
      stayTotal,
      experienceTotal,
      grandTotal,
      perPersonCost,
      roomsCount,
      dailyFoodPerPerson
    };
  }, [tier, distanceKm, days, nights, monumentsCount, travelersCount, includeCabDriver]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-5 sm:p-6 border-b border-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xl shadow-inner">
              💰
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase block">
                {trip.region || "Bharat"} Circuit Cost Planner
              </span>
              <h3 className="font-serif font-black text-lg sm:text-xl text-white tracking-wide">
                Trip Expense & Budget Estimator
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Top Controls: Tier Switcher & Travelers Selector */}
        <div className="bg-stone-50 p-4 sm:p-5 border-b border-stone-200 space-y-4">
          
          {/* Budget Tier Pills */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Calculator className="h-3.5 w-3.5 text-terracotta-600" />
              <span>Travel Style:</span>
            </span>

            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-stone-200 shadow-2xs">
              {[
                { id: "budget", label: "Economy / Budget", desc: "Local Eateries & Homestay Base" },
                { id: "standard", label: "Heritage Comfort ⭐", desc: "Recommended Verified Stay & Food" },
                { id: "premium", label: "Royal Luxury 👑", desc: "Palace Haveli & Private Cab" }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTier(t.id as BudgetTier)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tier === t.id
                      ? "bg-stone-900 text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Group Splitter Stepper */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-stone-200/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-terracotta-600" />
                <span>Group Size:</span>
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                ({pricing.roomsCount} {pricing.roomsCount === 1 ? "Room" : "Rooms"} required)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 4, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTravelersCount(num)}
                  className={`h-7 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    travelersCount === num
                      ? "bg-terracotta-600 text-white border-terracotta-600 shadow-2xs"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {num === 1 ? "Solo" : num === 2 ? "Couple (2)" : num === 4 ? "Family (4)" : `Group (${num})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Budget Breakdown Grid */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Grand Total Highlight Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-md flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-100 font-bold block">
                Estimated Total Trip Budget
              </span>
              <div className="font-serif font-black text-2xl sm:text-3xl text-white tracking-tight">
                ₹{pricing.grandTotal.toLocaleString("en-IN")}
              </div>
              <span className="text-[11px] text-emerald-100 font-medium">
                For {travelersCount} Traveler{travelersCount > 1 ? "s" : ""} • {days} Days ({nights} Nights)
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-right">
              <span className="text-[10px] font-mono uppercase text-emerald-100 font-bold block">
                Per-Person Split
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-white">
                ₹{pricing.perPersonCost.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Categorized Line-Item Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            {/* 1. Transport & Fuel */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-800">
                <span className="flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-blue-600" />
                  <span>Transport & Fuel</span>
                </span>
                <span className="font-mono text-sm text-stone-900">
                  ₹{pricing.transportTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">
                Based on ~{distanceKm} km circuit driving + highway tolls & parking.
              </p>
              <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeCabDriver}
                  onChange={(e) => setIncludeCabDriver(e.target.checked)}
                  className="rounded text-terracotta-600 focus:ring-terracotta-500"
                />
                <span className="text-[11px] font-bold text-stone-700">Include Dedicated Tourist Cab & Driver</span>
              </label>
            </div>

            {/* 2. Homestays & Stays */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-800">
                <span className="flex items-center gap-1.5">
                  <Home className="h-4 w-4 text-purple-600" />
                  <span>Verified Homestays</span>
                </span>
                <span className="font-mono text-sm text-stone-900">
                  ₹{pricing.stayTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">
                {pricing.roomsCount} room(s) for {nights} night(s) in authentic verified cultural stays.
              </p>
            </div>

            {/* 3. Pure Veg & Regional Dining */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-800">
                <span className="flex items-center gap-1.5">
                  <Utensils className="h-4 w-4 text-amber-600" />
                  <span>Meals & Cuisine</span>
                </span>
                <span className="font-mono text-sm text-stone-900">
                  ₹{pricing.foodTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">
                ~₹{pricing.dailyFoodPerPerson}/day per person for breakfast, lunch thali, and dinner.
              </p>
            </div>

            {/* 4. Heritage Monument Entry & Boating */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-800">
                <span className="flex items-center gap-1.5">
                  <Landmark className="h-4 w-4 text-terracotta-600" />
                  <span>Monuments & Passes</span>
                </span>
                <span className="font-mono text-sm text-stone-900">
                  ₹{pricing.monumentTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">
                Entry tickets & temple trust passes for {monumentsCount} destination checkpoints.
              </p>
            </div>

          </div>

          {/* Money Saving Tip Alert */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Smart Budget Tip:</strong> Booking verified homestays directly and carrying small cash for local temple prasad can save up to 20% on booking and transaction surcharges.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <div className="text-[11px] text-stone-500 font-medium hidden sm:block">
            *Estimates based on standard Indian tourism tariff benchmarks
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Printer className="h-3.5 w-3.5 text-stone-600" />
              <span>Print Estimate</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
