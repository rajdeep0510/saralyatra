"use client";

import React, { useEffect } from "react";
import { X, Printer, Sparkles, MapPin, Clock, Route, ShieldCheck, Utensils, PhoneCall, Compass, CheckCircle2, QrCode, Volume2, Camera, Eye, Share2, Award } from "lucide-react";
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
  const passId = `SY-MAG-${stateName.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200 print:p-0 print:bg-white print:static print:overflow-visible">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Screen Header (Hidden on Print) */}
        <div className="bg-stone-900 text-white px-6 py-4 border-b border-stone-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-lg shadow-inner">
              📑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                  Dekho Apna Desh • High-Res Magazine Edition
                </span>
                <span className="text-[9px] font-bold bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded">
                  SIH 2026
                </span>
              </div>
              <h3 className="font-serif font-black text-lg text-white">
                {trip.title} — Illustrated Cultural Guidebook
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-terracotta-600 hover:from-amber-600 hover:to-terracotta-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-105"
            >
              <Printer className="h-4 w-4" />
              <span>Print A4 Color Magazine / PDF</span>
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

        {/* Booklet Scrollable Body / Printable Magazine Spread */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1 bg-[#fcfaf7] print:p-0 print:bg-white print:overflow-visible text-stone-900 font-sans">
          
          {/* ======================================================== */}
          {/* MAGAZINE COVER PAGE SECTION */}
          {/* ======================================================== */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#0c0a09] text-white border-4 border-amber-600/60 relative overflow-hidden shadow-xl print:bg-stone-900 print:text-white print:rounded-2xl break-after-page">
            {/* Traditional Indian Geometric Header & Footer Accents */}
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-terracotta-600" />
            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-terracotta-600 via-orange-500 to-amber-400" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-stone-700">
                <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                  <Sparkles className="h-4 w-4" />
                  <span>SARAL YATRA • CULTURAL TOURIST MAGAZINE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full">
                    EDITION #{passId}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta-400 block">
                  HERITAGE CIRCUIT EXPLORATION GUIDE
                </span>
                <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  {trip.title}
                </h1>
                <p className="text-sm text-stone-300 max-w-2xl leading-relaxed pt-1">
                  An illustrated cultural field companion curated with certified pure-vegetarian dining, architectural secrets, emergency directories, and interactive QR codes linked to live 360° panoramas and oral history tracks.
                </p>
              </div>

              {/* Trip Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15 text-xs">
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-stone-400 font-mono block uppercase">DURATION</span>
                  <span className="font-serif font-bold text-base text-amber-300">{daysCount} Days Circuit</span>
                </div>
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-stone-400 font-mono block uppercase">STATE CIRCUIT</span>
                  <span className="font-serif font-bold text-base text-white">{stateName}</span>
                </div>
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-stone-400 font-mono block uppercase">TRAVEL GROUP</span>
                  <span className="font-serif font-bold text-base text-white">{travelers} Explorer{travelers > 1 ? "s" : ""}</span>
                </div>
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-stone-400 font-mono block uppercase">KITCHEN COMPLIANCE</span>
                  <span className="font-serif font-bold text-base text-emerald-400">
                    {dietary === "pureVeg" ? "100% Pure Veg" : dietary === "jain" ? "Strict Jain" : "Standard"}
                  </span>
                </div>
              </div>

              {/* Master Scannable QR Codes Banner */}
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/40 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-white p-1 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                    <QrCode className="h-10 w-10 text-stone-950" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      📱 Interactive Live Mobile Companion
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Scan with your smartphone camera to access turn-by-turn live navigation and 360° virtual tours!
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-[10px] font-bold">
                    OFFLINE VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* DAILY SCHEDULE CHAPTERS WITH QR CODES & FOLKLORE */}
          {/* ======================================================== */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b-2 border-amber-700/30">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta-800 font-mono flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-600" />
                <span>Illustrated Itinerary Chapters & Architectural Insights</span>
              </span>
              <span className="text-xs font-bold text-stone-500">
                {trip.itinerary.length} Curated Days
              </span>
            </div>

            <div className="space-y-6">
              {trip.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="p-6 rounded-3xl bg-white border-2 border-stone-200 shadow-sm space-y-4 break-inside-avoid print:border-stone-300"
                >
                  {/* Day Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-amber-500 to-terracotta-600 text-white font-serif font-black text-sm flex items-center justify-center shadow-sm">
                        D{day.day}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base text-stone-900">
                          Day {day.day} {day.date ? `• ${day.date}` : ""}
                        </h3>
                        <span className="text-xs text-stone-500 font-medium">
                          {day.stops.length} Checkpoints Planned
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full">
                      Full Day Flow
                    </span>
                  </div>

                  {/* Day Stops Magazine Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {day.stops.map((stop, idx) => (
                      <div
                        key={stop.id}
                        className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200 space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-terracotta-700 uppercase bg-terracotta-50 px-2 py-0.5 rounded border border-terracotta-200">
                              Stop #{idx + 1}
                            </span>
                            <span className="text-[10px] text-stone-500 font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3 text-stone-400" />
                              {stop.time}
                            </span>
                          </div>

                          <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                            {stop.title}
                          </h4>

                          <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                            {stop.desc}
                          </p>
                        </div>

                        {/* Interactive QR Code & 360 Scan Box for Print */}
                        <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-900">
                              <Eye className="h-3 w-3 text-amber-600" />
                              <span>Scan for 360° Tour</span>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-stone-500">
                              <Volume2 className="h-2.5 w-2.5 text-terracotta-600" />
                              <span>Audio Lore Included</span>
                            </div>
                          </div>

                          <div className="h-9 w-9 bg-white p-0.5 rounded-lg border border-stone-300 shadow-2xs flex items-center justify-center shrink-0">
                            <QrCode className="h-7 w-7 text-stone-900" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* REGIONAL CUISINE & PURITY STANDARDS */}
          {/* ======================================================== */}
          <div className="p-6 rounded-3xl bg-emerald-50/70 border-2 border-emerald-300 space-y-3 break-inside-avoid">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                <Utensils className="h-4 w-4" />
              </span>
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-emerald-950">
                  Authentic {stateName} Regional Cuisine & Temple Prasadam
                </h4>
                <span className="text-[11px] text-emerald-800">
                  Verified pure vegetarian, Jain and local culinary highlights
                </span>
              </div>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              When traveling through {stateName}, relish authentic indigenous preparations cooked with cold-pressed oils and sacred spices. For strict Jain travelers, request <em>&quot;Bina Kanda-Lasun&quot;</em> (no onion or garlic) meals prepared prior to sunset.
            </p>
          </div>

          {/* ======================================================== */}
          {/* 24/7 TOURIST SAFETY & EMERGENCY DIRECTORY */}
          {/* ======================================================== */}
          <div className="p-6 rounded-3xl bg-stone-900 text-white space-y-4 break-inside-avoid">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-amber-400" />
                <h4 className="font-serif font-bold text-sm text-white">
                  24/7 Verified Emergency & Tourist Assistance Directory
                </h4>
              </div>
              <span className="text-[10px] text-amber-300 font-mono font-bold bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
                Toll-Free Nationwide (Zero Internet Required)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-stone-400 font-mono block uppercase">TOURIST POLICE</span>
                <span className="font-mono font-black text-sm text-amber-300">📞 1363</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-stone-400 font-mono block uppercase">ALL EMERGENCY</span>
                <span className="font-mono font-black text-sm text-white">📞 112</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-stone-400 font-mono block uppercase">AMBULANCE</span>
                <span className="font-mono font-black text-sm text-emerald-400">📞 108</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-0.5">
                <span className="text-[10px] text-stone-400 font-mono block uppercase">HIGHWAY PATROL</span>
                <span className="font-mono font-black text-sm text-white">📞 1033</span>
              </div>
            </div>
          </div>

          {/* Booklet Footer */}
          <div className="text-center pt-4 border-t border-stone-300 text-stone-500 text-[11px] space-y-1">
            <p>Published by <strong>Saral Yatra</strong> • Smart India Hackathon (SIH 2026) Cultural Tourism Platform</p>
            <p className="font-mono text-[10px]">Document Reference: {passId} • Printed on {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
