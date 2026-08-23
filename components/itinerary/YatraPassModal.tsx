"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, QrCode, Share2, Sparkles, MapPin, Calendar, Users, ShieldCheck, CheckCircle2, RotateCw, Printer, Compass, Ticket, BookOpen } from "lucide-react";
import { FilterPreferences, PreloadedTrip, LanguageCode } from "@/types";

interface YatraPassModalProps {
  trip: PreloadedTrip;
  preferences: FilterPreferences | null;
  currentLang: LanguageCode;
  isOpen: boolean;
  onClose: () => void;
}

export default function YatraPassModal({
  trip,
  preferences,
  currentLang,
  isOpen,
  onClose
}: YatraPassModalProps) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

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

  const totalDays = trip.itinerary.length || preferences?.duration || 3;
  const stateName = preferences?.region || trip.title.split(" ")[0] || "Bharat";
  const startDate = preferences?.dates || new Date().toISOString().split("T")[0];
  const travelers = preferences?.travelers || 2;
  const dietary = preferences?.dietary === "pureVeg" ? "100% Pure Veg Kitchen" : preferences?.dietary === "jain" ? "Strict Jain Kitchen (No Root Veg)" : preferences?.dietary === "halal" ? "Halal Certified" : "Multi-Cuisine";

  // Collect all unique monuments in this trip
  const allStops = trip.itinerary.flatMap((d) => d.stops);
  const passNumber = `SY-YATRA-${stateName.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-transparent my-auto flex flex-col items-center gap-3 select-none"
      >
        {/* Top Controls & View Switcher Bar */}
        <div className="w-full flex items-center justify-between px-2 text-white flex-wrap gap-2">
          {/* Segmented View Switcher */}
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/20">
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !isFlipped
                  ? "bg-amber-500 text-stone-950 shadow-md font-black"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <Ticket className="h-3.5 w-3.5" />
              <span>Boarding Pass</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isFlipped
                  ? "bg-amber-500 text-stone-950 shadow-md font-black"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Passport Stamps ({allStops.length})</span>
            </button>
          </div>

          {/* Flip & Close Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFlipped((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer shadow-sm hover:scale-105"
              title="Flip between Boarding Pass and Passport Stamps"
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span>Flip Card 🔄</span>
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

        {/* Card Display View with Non-Inverted Upright Orientation */}
        <div className="w-full">
          {!isFlipped ? (
            /* ======================================================== */
            /* FRONT SIDE: CULTURAL BOARDING PASS */
            /* ======================================================== */
            <div className="w-full rounded-3xl bg-gradient-to-br from-[#fffdfa] via-[#fff9f0] to-[#fef3e2] border-4 border-amber-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col relative text-stone-900 animate-in fade-in zoom-in-95 duration-300">
              {/* Traditional Indian Border Header */}
              <div className="bg-stone-900 text-white p-5 sm:p-6 border-b-4 border-amber-600 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]" />
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
                    🇮🇳
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase block">
                      Saral Yatra Cultural Ministry
                    </span>
                    <h3 className="font-serif font-black text-xl sm:text-2xl text-white tracking-wide">
                      BHARAT YATRA PASS
                    </h3>
                  </div>
                </div>

                <div className="text-right relative z-10">
                  <span className="text-[9px] font-mono text-stone-400 block uppercase">PASS IDENTIFIER</span>
                  <span className="font-mono text-xs sm:text-sm font-black text-amber-400">
                    {passNumber}
                  </span>
                </div>
              </div>

              {/* Main Ticket Body */}
              <div className="p-6 sm:p-7 space-y-6">
                {/* Circuit Route Header */}
                <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-dashed border-stone-300">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      Destination State Circuit
                    </span>
                    <div className="font-serif font-black text-2xl sm:text-3xl text-terracotta-800 flex items-center gap-2">
                      <span>{stateName}</span>
                      <span className="text-amber-600 text-lg">✦</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-mono text-xs font-bold">
                      {totalDays} DAYS CIRCUIT
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-700" />
                      <span>CONFIRMED</span>
                    </span>
                  </div>
                </div>

                {/* Key Travel Credentials Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-1 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Start Date</span>
                    <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3.5 w-3.5 text-terracotta-600" />
                      <span>{startDate}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Travelers</span>
                    <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                      <Users className="h-3.5 w-3.5 text-terracotta-600" />
                      <span>{travelers} Explorer{travelers > 1 ? "s" : ""}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Kitchen Certified</span>
                    <span className="font-bold text-emerald-800 flex items-center gap-1 mt-0.5 truncate" title={dietary}>
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{preferences?.dietary || "Pure Veg"}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Lore Dialect</span>
                    <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                      <Compass className="h-3.5 w-3.5 text-amber-600" />
                      <span className="uppercase">{preferences?.language || currentLang}</span>
                    </span>
                  </div>
                </div>

                {/* Daily Itinerary Stamping Checkpoints */}
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Curated Itinerary Checkpoints ({allStops.length} Wonders)
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {allStops.map((stop, i) => (
                      <span
                        key={stop.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-[11px] font-bold text-stone-700 shadow-2xs"
                      >
                        <span className="text-amber-600">#{i + 1}</span>
                        <span>{stop.title}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Barcode & Security Hologram Footer */}
                <div className="pt-4 border-t-2 border-dashed border-stone-300 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-white p-1.5 rounded-xl border border-stone-300 shadow-inner flex items-center justify-center">
                      <QrCode className="h-9 w-9 text-stone-900" />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-stone-400 font-bold">DIGITAL VERIFICATION</div>
                      <div className="font-mono text-[10px] font-bold text-stone-800">Scan for Live Offline Map</div>
                    </div>
                  </div>

                  <div className="h-10 px-4 rounded-xl bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 border border-amber-400 flex items-center gap-2 shadow-inner">
                    <Sparkles className="h-4 w-4 text-amber-800" />
                    <span className="font-serif font-bold text-xs text-amber-900 tracking-wider">
                      CERTIFIED HERITAGE YATRA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* BACK SIDE: CULTURAL PASSPORT STAMP BOOK (PERFECTLY UPRIGHT) */
            /* ======================================================== */
            <div className="w-full rounded-3xl bg-gradient-to-br from-[#292524] via-[#1c1917] to-[#0c0a09] border-4 border-amber-600/70 shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col relative text-white p-6 sm:p-7 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between border-b border-stone-700 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-xl">
                    🛕
                  </div>
                  <div>
                    <h4 className="font-serif font-black text-lg text-amber-300 tracking-wide">
                      Heritage Passport Stamp Book
                    </h4>
                    <p className="text-[10px] text-stone-400 font-medium">
                      Official verified seals for your {stateName} journey
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-700/50 px-3 py-1 rounded-full">
                  {allStops.length} Stamps
                </span>
              </div>

              {/* Grid of Postage Monument Stamps */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
                {allStops.map((stop, i) => (
                  <div
                    key={stop.id}
                    className="p-3 rounded-2xl bg-stone-900/90 border-2 border-dashed border-amber-500/40 hover:border-amber-400 flex flex-col justify-between gap-2 shadow-inner group transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-amber-400 font-bold">
                        SEAL #{i + 1}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="font-serif font-bold text-xs text-white group-hover:text-amber-200 transition-colors line-clamp-2">
                        {stop.title}
                      </div>
                      <div className="text-[9px] text-stone-400 flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5 text-terracotta-400 shrink-0" />
                        <span className="truncate">{stateName}</span>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-stone-800 text-[8px] font-mono text-stone-400 text-right">
                      VERIFIED VISITOR
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-800 text-center text-xs text-stone-400 font-serif italic">
                &ldquo;A journey of a thousand miles begins with a single step across the sacred land of Bharat.&rdquo;
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Toolbar */}
        <div className="w-full flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <Printer className="h-4 w-4 text-terracotta-700" />
            <span>Print / Save PDF</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-900 text-white hover:bg-stone-800 border border-stone-700 font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <Share2 className="h-4 w-4 text-amber-400" />
            <span>{copied ? "Link Copied! ✨" : "Share Pass"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
