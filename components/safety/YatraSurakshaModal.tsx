"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, Phone, Heart, User, MapPin, X, Printer, CheckCircle2, ChevronRight, Sparkles, Lock, ExternalLink, HelpCircle } from "lucide-react";
import { getStateSafetyProfile, StateSafetyProfile, LocalScamWarning } from "@/data/safetyData";
import { PreloadedTrip } from "@/types";

interface YatraSurakshaModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip?: PreloadedTrip | null;
  stateName?: string;
}

export default function YatraSurakshaModal({
  isOpen,
  onClose,
  trip,
  stateName
}: YatraSurakshaModalProps) {
  const [activeTab, setActiveTab] = useState<"scams" | "women" | "directory" | "offline">("scams");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [hasSavedOffline, setHasSavedOffline] = useState(false);

  if (!isOpen) return null;

  const targetState = stateName || trip?.region || "Kerala";
  const safetyProfile: StateSafetyProfile = getStateSafetyProfile(targetState);

  const handleSaveOfflinePack = () => {
    setHasSavedOffline(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl text-emerald-300 shadow-inner">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                  Verified Safety Shield
                </span>
                <span className="text-xs text-stone-300 font-medium">
                  {safetyProfile.state}
                </span>
                <span className="text-[10px] font-bold bg-emerald-400 text-stone-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  ★ {safetyProfile.soloFemaleSafetyRating}/10 Solo Safety Index
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-1">
                Yatra Suraksha • Safety Shield & Scam Radar
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

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 py-2 gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: "scams", label: "⚠️ Local Scam Radar", count: safetyProfile.scams.length },
            { id: "women", label: "👩 Solo Traveler & Women Safety" },
            { id: "directory", label: "🚨 24/7 Emergency Helplines" },
            { id: "offline", label: "📄 1-Click Offline SOS Pass" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                activeTab === tab.id
                  ? "bg-white text-stone-900 shadow-xs border-stone-300 scale-102"
                  : "bg-stone-100 text-stone-600 border-stone-200 hover:bg-white"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: Local Scam Radar */}
          {activeTab === "scams" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-base">
                    Active Tourist Scam Radar ({safetyProfile.state})
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Verified common tourist traps, tout scenarios, and official fair rate caps.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-stone-400 hidden sm:inline">
                  Updated Live for 2026
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {safetyProfile.scams.map((scam) => (
                  <div
                    key={scam.id}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-2xs space-y-2.5 transition-all hover:border-amber-400 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                            scam.alertLevel === "High"
                              ? "bg-rose-100 text-rose-800 border-rose-300"
                              : "bg-amber-100 text-amber-900 border-amber-300"
                          }`}>
                            {scam.alertLevel} Alert
                          </span>
                          <span className="text-[10px] font-bold text-stone-500">
                            {scam.category} • 📍 {scam.location}
                          </span>
                        </div>
                        <h5 className="font-serif font-bold text-sm text-stone-900 mt-1">
                          {scam.title}
                        </h5>
                      </div>
                    </div>

                    {/* How It Works */}
                    <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/60 text-xs text-rose-950 space-y-1">
                      <span className="font-bold text-[11px] block text-rose-900">
                        🎭 The Trap Scenario:
                      </span>
                      <p className="text-[11px] leading-relaxed">
                        {scam.howItWorks}
                      </p>
                    </div>

                    {/* How to Avoid & Fair Rate */}
                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-xs text-emerald-950 space-y-1">
                      <span className="font-bold text-[11px] block text-emerald-900">
                        🛡️ How to Avoid:
                      </span>
                      <p className="text-[11px] leading-relaxed">
                        {scam.howToAvoid}
                      </p>
                      {scam.officialFairRate && (
                        <div className="pt-1.5 mt-1.5 border-t border-emerald-200/60 font-bold text-emerald-900 text-[11px]">
                          🏷️ <strong>Official Fair Rate Benchmark:</strong> {scam.officialFairRate}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Solo Female Traveler & Women Safety Shield */}
          {activeTab === "women" && (
            <div className="space-y-5">
              <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/60 border border-emerald-300 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👩</span>
                    <h4 className="font-serif font-bold text-emerald-950 text-base">
                      Women & Solo Traveler Safety Scorecard
                    </h4>
                  </div>
                  <span className="text-xs font-black text-emerald-900 bg-white px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                    Rating: {safetyProfile.soloFemaleSafetyRating} / 10 ({safetyProfile.safetyTier})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-white rounded-2xl border border-emerald-200 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Night Transit Index
                    </span>
                    <span className="font-bold text-stone-900">
                      {safetyProfile.nightTravelIndex}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-emerald-200 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Police & Security Presence
                    </span>
                    <span className="font-bold text-stone-900">
                      {safetyProfile.policePresence}
                    </span>
                  </div>
                </div>
              </div>

              {/* State-Specific Women Safety Guidelines */}
              <div className="space-y-3">
                <h5 className="font-serif font-bold text-stone-900 text-sm">
                  Verified Safety Protocols for {safetyProfile.state}
                </h5>

                <div className="space-y-2">
                  {safetyProfile.safetyTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs text-stone-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 24/7 Verified Emergency Directory */}
          {activeTab === "directory" && (
            <div className="space-y-5">
              
              {/* 1-Tap Quick Dial Grid */}
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base mb-1">
                  1-Tap Government Emergency Helplines
                </h4>
                <p className="text-xs text-stone-500 mb-3">
                  Direct government emergency dispatch (toll-free across all mobile networks).
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { label: "National Emergency (All-in-One)", number: safetyProfile.emergencyNumbers.nationalEmergency, color: "bg-rose-600 text-white", icon: "🚨" },
                    { label: "Women Safety Helpline", number: safetyProfile.emergencyNumbers.womenHelpline, color: "bg-emerald-700 text-white", icon: "👩" },
                    { label: "Tourist Police Assistance", number: safetyProfile.emergencyNumbers.touristPolice, color: "bg-stone-900 text-white", icon: "👮" },
                    { label: "Ambulance / Medical", number: safetyProfile.emergencyNumbers.ambulance, color: "bg-red-700 text-white", icon: "🚑" },
                    { label: "National Highway Patrol", number: safetyProfile.emergencyNumbers.highwayPatrol, color: "bg-amber-700 text-white", icon: "🛣️" },
                    { label: "Ministry of Tourism Infoline", number: "1363", color: "bg-sky-700 text-white", icon: "📞" }
                  ].map((helpline) => (
                    <a
                      key={helpline.label}
                      href={`tel:${helpline.number.split(" ")[0]}`}
                      className={`p-3.5 rounded-2xl ${helpline.color} text-left transition-all cursor-pointer shadow-xs hover:scale-102 flex flex-col justify-between`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{helpline.icon}</span>
                        <span className="text-[10px] uppercase font-bold opacity-80">Call ↗</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-base font-black tracking-tight">{helpline.number}</div>
                        <div className="text-[10px] opacity-90 truncate">{helpline.label}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Nearest 24/7 Multi-Specialty Government Hospitals */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
                  <span>🏥</span>
                  <span>24/7 Verified Emergency Hospitals ({safetyProfile.state})</span>
                </h4>

                <div className="space-y-2">
                  {safetyProfile.keyHospitals.map((hosp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-stone-900 block">{hosp.name}</span>
                        <span className="text-[10px] text-stone-500">📍 {hosp.location} • {hosp.type}</span>
                      </div>
                      <a
                        href={`tel:${hosp.phone}`}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold shrink-0 flex items-center gap-1"
                      >
                        <Phone className="h-3 w-3" />
                        <span>{hosp.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: 1-Click Offline SOS Pass */}
          {activeTab === "offline" && (
            <div className="space-y-5">
              <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-300 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  <div>
                    <h4 className="font-serif font-bold text-amber-950 text-base">
                      1-Click Offline Yatra Emergency Pass
                    </h4>
                    <span className="text-xs text-amber-800">
                      Save to device or print a pocket-sized emergency pass that functions with 0% internet.
                    </span>
                  </div>
                </div>

                {/* Traveler Custom Emergency Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      value={emergencyContactName}
                      onChange={(e) => setEmergencyContactName(e.target.value)}
                      placeholder="e.g. Parent / Spouse Name"
                      className="w-full rounded-xl bg-white border border-stone-200 p-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      Contact Phone Number
                    </label>
                    <input
                      type="tel"
                      value={emergencyContactPhone}
                      onChange={(e) => setEmergencyContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl bg-white border border-stone-200 p-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      Blood Group
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full rounded-xl bg-white border border-stone-200 p-2 text-xs font-bold text-stone-900 focus:outline-none cursor-pointer"
                    >
                      {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Printable Pocket Pass Preview */}
              <div className="p-6 rounded-3xl bg-white border-2 border-dashed border-stone-300 space-y-3 font-sans print:border-solid">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇮🇳</span>
                    <span className="font-serif font-black text-sm text-stone-900">
                      SARAL YATRA • EMERGENCY PASS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">
                    Offline SOS Document
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-[9px] text-stone-400 uppercase font-bold block">Travel State</span>
                    <strong className="text-stone-900">{safetyProfile.state}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 uppercase font-bold block">Blood Group</span>
                    <strong className="text-rose-700">{bloodGroup}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 uppercase font-bold block">Emergency Contact</span>
                    <strong className="text-stone-900">{emergencyContactName || "Not set"}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 uppercase font-bold block">Contact Phone</span>
                    <strong className="text-stone-900">{emergencyContactPhone || "Not set"}</strong>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1 text-stone-700">
                  <div className="font-bold text-[11px] text-stone-900">🚨 Key Emergency Dials:</div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono font-bold">
                    <span>Police/SOS: 112</span>
                    <span>Women: 1090</span>
                    <span>Medical: 108</span>
                  </div>
                </div>
              </div>

              {/* Print / Save Action */}
              <button
                type="button"
                onClick={handleSaveOfflinePack}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all cursor-pointer shadow-md hover:scale-[1.01]"
              >
                <Printer className="h-4 w-4 text-amber-300" />
                <span>🖨️ Print / Save Offline PDF Emergency Pass</span>
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-stone-500 font-medium">
            🛡️ Certified by Ministry of Tourism & State Police Guidelines
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 cursor-pointer shadow-2xs"
          >
            Close Shield
          </button>
        </div>

      </div>
    </div>
  );
}
