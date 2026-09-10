"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, QrCode, Share2, Sparkles, MapPin, Calendar, Users, ShieldCheck, CheckCircle2, RotateCw, Printer, Compass, Ticket, BookOpen, Award, Flame, Star, Check, Download } from "lucide-react";
import { FilterPreferences, PreloadedTrip, LanguageCode } from "@/types";

interface YatraPassModalProps {
  trip: PreloadedTrip;
  preferences: FilterPreferences | null;
  currentLang: LanguageCode;
  isOpen: boolean;
  onClose: () => void;
}

export type ExplorerTier = "Heritage Explorer" | "Temple Connoisseur" | "Himalayan Nomad" | "Bharat Ratna Yatri";

export default function YatraPassModal({
  trip,
  preferences,
  currentLang,
  isOpen,
  onClose
}: YatraPassModalProps) {
  const [activeTab, setActiveTab] = useState<"boarding_pass" | "stamps" | "badges">("boarding_pass");
  const [copied, setCopied] = useState<boolean>(false);
  const [stampedIds, setStampedIds] = useState<Record<string, boolean>>({});
  const [socialBadgeCopied, setSocialBadgeCopied] = useState<boolean>(false);
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
  const passNumber = `SY-DAD-${stateName.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  // Calculate Explorer Level
  const visitedCount = allStops.length + Object.keys(stampedIds).length;
  let explorerTier: ExplorerTier = "Heritage Explorer";
  let tierBadge = "🌱 Level 1";
  let tierColor = "from-emerald-600 to-teal-700";
  let tierDesc = "Embarking on the sacred soil of India.";

  if (visitedCount >= 10) {
    explorerTier = "Bharat Ratna Yatri";
    tierBadge = "👑 Master Tier";
    tierColor = "from-amber-500 via-orange-600 to-terracotta-700";
    tierDesc = "True connoisseur of Indian heritage and sacred geography.";
  } else if (visitedCount >= 6) {
    explorerTier = "Himalayan Nomad";
    tierBadge = "🏔️ Level 3";
    tierColor = "from-sky-600 via-blue-700 to-indigo-800";
    tierDesc = "Fearless explorer of mountain trails, river valleys & ghats.";
  } else if (visitedCount >= 3) {
    explorerTier = "Temple Connoisseur";
    tierBadge = "🛕 Level 2";
    tierColor = "from-amber-600 via-terracotta-600 to-rose-700";
    tierDesc = "Deep scholar of ancient Dravidian & Nagara architecture.";
  }

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

  const toggleStamp = (stopId: string) => {
    setStampedIds((prev) => ({
      ...prev,
      [stopId]: !prev[stopId]
    }));
  };

  const handleCopySocialBadge = () => {
    const text = `🎖️ Just unlocked the "${explorerTier}" Badge on #DekhoApnaDesh Digital Passport with @SaralYatra! Exploring ${stateName} (${allStops.length} heritage wonders). #IncredibleIndia #TravelBharat`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setSocialBadgeCopied(true);
      setTimeout(() => setSocialBadgeCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-transparent my-auto flex flex-col items-center gap-3 select-none"
      >
        {/* Top Segmented Controls: 3 Tabs (Boarding Pass, Passport Stamps, Explorer Badges) */}
        <div className="w-full flex items-center justify-between px-2 text-white flex-wrap gap-2">
          
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/20">
            {/* 1. Boarding Pass */}
            <button
              type="button"
              onClick={() => setActiveTab("boarding_pass")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "boarding_pass"
                  ? "bg-amber-500 text-stone-950 shadow-md font-black"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <Ticket className="h-3.5 w-3.5" />
              <span>Boarding Pass</span>
            </button>

            {/* 2. Passport Stamps */}
            <button
              type="button"
              onClick={() => setActiveTab("stamps")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "stamps"
                  ? "bg-amber-500 text-stone-950 shadow-md font-black"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Stamps ({allStops.length})</span>
            </button>

            {/* 3. Dekho Apna Desh Explorer Badges */}
            <button
              type="button"
              onClick={() => setActiveTab("badges")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "badges"
                  ? "bg-amber-500 text-stone-950 shadow-md font-black"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>Badges & Tiers</span>
            </button>
          </div>

          {/* Close Action */}
          <div className="flex items-center gap-2">
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

        {/* Dynamic Display Area */}
        <div className="w-full">
          
          {/* ======================================================== */}
          {/* TAB 1: CULTURAL 3D BOARDING PASS */}
          {/* ======================================================== */}
          {activeTab === "boarding_pass" && (
            <div className="w-full rounded-3xl bg-gradient-to-br from-[#fffdfa] via-[#fff9f0] to-[#fef3e2] border-4 border-amber-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col relative text-stone-900 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Header */}
              <div className="bg-stone-900 text-white p-5 sm:p-6 border-b-4 border-amber-600 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]" />
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
                    🇮🇳
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                        Dekho Apna Desh • Ministry of Tourism
                      </span>
                      <span className="text-[9px] font-bold bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded">
                        {tierBadge}
                      </span>
                    </div>
                    <h3 className="font-serif font-black text-xl sm:text-2xl text-white tracking-wide mt-0.5">
                      BHARAT YATRA PASSPORT
                    </h3>
                  </div>
                </div>

                <div className="text-right relative z-10 hidden sm:block">
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
                      <span>VERIFIED YATRA</span>
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
                    <span className="text-[10px] text-stone-400 font-bold uppercase block">Explorer Rank</span>
                    <span className="font-bold text-amber-800 flex items-center gap-1 mt-0.5">
                      <Award className="h-3.5 w-3.5 text-amber-600" />
                      <span>{explorerTier}</span>
                    </span>
                  </div>
                </div>

                {/* Daily Itinerary Stamping Checkpoints */}
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Curated Itinerary Checkpoints ({allStops.length} Wonders)
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold">
                      Tap &quot;Stamps&quot; tab to collect seals ↗
                    </span>
                  </div>
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
                      CERTIFIED DEKHO APNA DESH
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: DEKHO APNA DESH COLLECTIBLE PASSPORT STAMPS */}
          {/* ======================================================== */}
          {activeTab === "stamps" && (
            <div className="w-full rounded-3xl bg-gradient-to-br from-[#292524] via-[#1c1917] to-[#0c0a09] border-4 border-amber-600/70 shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col relative text-white p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-300">
              
              <div className="flex items-center justify-between border-b border-stone-700 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-xl">
                    🛕
                  </div>
                  <div>
                    <h4 className="font-serif font-black text-lg text-amber-300 tracking-wide">
                      Digital Passport Stamp Book
                    </h4>
                    <p className="text-[10px] text-stone-400 font-medium">
                      Tap any wonder card to stamp your official visitor seal!
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-700/50 px-3 py-1 rounded-full">
                  {allStops.length} Monument Stamps
                </span>
              </div>

              {/* Grid of Postage Monument Stamps with Interactive Stamping */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
                {allStops.map((stop, i) => {
                  const isStamped = stampedIds[stop.id] ?? true;
                  return (
                    <button
                      key={stop.id}
                      type="button"
                      onClick={() => toggleStamp(stop.id)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-inner group relative overflow-hidden ${
                        isStamped
                          ? "bg-stone-900 border-amber-500/80 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                          : "bg-stone-950/60 border-dashed border-stone-700 hover:border-stone-500 opacity-60"
                      }`}
                    >
                      {/* Stamped Ink Seal Watermark */}
                      {isStamped && (
                        <div className="absolute right-1 bottom-1 opacity-15 text-4xl select-none pointer-events-none rotate-[-15deg]">
                          🇮🇳
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-amber-400 font-bold">
                          SEAL #{i + 1}
                        </span>
                        <span className={`h-2.5 w-2.5 rounded-full ${
                          isStamped ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-stone-600"
                        }`} />
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

                      <div className="pt-1.5 border-t border-stone-800 flex items-center justify-between text-[8px] font-mono">
                        <span className={isStamped ? "text-emerald-400 font-bold" : "text-stone-500"}>
                          {isStamped ? "✓ STAMPED" : "TAP TO STAMP"}
                        </span>
                        <span className="text-stone-500">{startDate}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-stone-800 text-center text-xs text-stone-400 font-serif italic">
                &ldquo;Dekho Apna Desh: Exploring the boundless soul and heritage of Bharat.&rdquo;
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: EXPLORER TIERS & GEN-Z SOCIAL BADGES */}
          {/* ======================================================== */}
          {activeTab === "badges" && (
            <div className="w-full rounded-3xl bg-gradient-to-br from-[#1c1917] via-[#18181b] to-[#09090b] border-4 border-amber-500/70 shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col relative text-white p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-300">
              
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-terracotta-600 flex items-center justify-center text-xl shadow-md">
                    🎖️
                  </div>
                  <div>
                    <h4 className="font-serif font-black text-lg text-amber-300 tracking-wide">
                      Dekho Apna Desh • Yatra Ranks & Badges
                    </h4>
                    <p className="text-[10px] text-stone-400 font-medium">
                      Designed to promote indigenous Indian tourism among youth & Gen-Z
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black bg-amber-500 text-stone-950 px-3 py-1 rounded-full shadow-md">
                  {tierBadge}
                </span>
              </div>

              {/* Active User Rank Showcase Card */}
              <div className={`p-5 rounded-2xl bg-gradient-to-r ${tierColor} text-white shadow-lg space-y-2 border border-white/20 relative overflow-hidden`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 font-bold">
                    Current Explorer Status
                  </span>
                  <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    {visitedCount} Wonders Visited
                  </span>
                </div>
                <h3 className="font-serif font-black text-2xl tracking-wide">
                  {explorerTier}
                </h3>
                <p className="text-xs text-white/90 font-medium">
                  {tierDesc}
                </p>
              </div>

              {/* 4 Cultural Tiers Ladder */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {[
                  { name: "Heritage Explorer", icon: "🌱", stops: "1-3 Wonders", current: explorerTier === "Heritage Explorer" },
                  { name: "Temple Connoisseur", icon: "🛕", stops: "4-7 Wonders", current: explorerTier === "Temple Connoisseur" },
                  { name: "Himalayan Nomad", icon: "🏔️", stops: "8-12 Wonders", current: explorerTier === "Himalayan Nomad" },
                  { name: "Bharat Ratna Yatri", icon: "👑", stops: "13+ Wonders", current: explorerTier === "Bharat Ratna Yatri" }
                ].map((tier) => (
                  <div
                    key={tier.name}
                    className={`p-3 rounded-2xl border text-left space-y-1 transition-all ${
                      tier.current
                        ? "bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/40 shadow-md"
                        : "bg-stone-900/60 border-stone-800 text-stone-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{tier.icon}</span>
                      {tier.current && (
                        <span className="text-[8px] font-black bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded uppercase">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <div className="font-serif font-bold text-white text-[11px] leading-tight mt-1">
                      {tier.name}
                    </div>
                    <span className="text-[9px] text-stone-400 block">{tier.stops}</span>
                  </div>
                ))}
              </div>

              {/* Shareable Social Media Card Trigger */}
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <span className="text-xs font-bold text-white block">
                    🚀 Share your Dekho Apna Desh Badge on Social Media
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Insta story caption & verified travel credentials.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopySocialBadge}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-terracotta-600 hover:from-amber-600 hover:to-terracotta-700 text-white font-bold text-xs transition-all cursor-pointer shadow-md hover:scale-105"
                >
                  <span>{socialBadgeCopied ? "Badge Copied! 🎉" : "Copy Social Story Badge ✨"}</span>
                </button>
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
            <span>{copied ? "Link Copied! ✨" : "Share Passport"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
