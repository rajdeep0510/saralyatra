"use client";

import React, { useState } from "react";
import { LensScanResult } from "@/data/lensData";
import { LanguageCode } from "@/types";
import { Sparkles, MapPin, Landmark, Calendar, Layers, ShieldCheck, Volume2, Globe, PlusCircle, ArrowRight, Share2, Check, Plane, Play, Pause, Compass } from "lucide-react";
import { useTravel } from "@/context/TravelContext";
import PanoramaViewerModal from "@/components/discovery/PanoramaViewerModal";
import TripTransitReportModal from "@/components/transit/TripTransitReportModal";
import { monuments } from "@/data/mockData";

interface LensResultCardProps {
  result: LensScanResult;
  onResetScan: () => void;
  currentLang?: LanguageCode;
}

export default function LensResultCard({ result, onResetScan, currentLang = "en" }: LensResultCardProps) {
  const { activeTrip, setActiveTrip, handleOpenDetailsById, filterPreferences, userProfile } = useTravel();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [is360ModalOpen, setIs360ModalOpen] = useState(false);
  const [isTransitModalOpen, setIsTransitModalOpen] = useState(false);
  const [addedToTrip, setAddedToTrip] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(currentLang);

  const matchedMonument = monuments.find((m) => m.id === result.monumentId);

  // Audio Playback handler
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
    } else {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const textToSpeak = `${result.monumentName} in ${result.state}. ${result.untoldLegend}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Add to active trip handler
  const handleAddToActiveTrip = () => {
    if (!activeTrip || !matchedMonument) return;
    const updatedDays = [...activeTrip.itinerary];
    if (updatedDays.length > 0) {
      const firstDay = updatedDays[0];
      firstDay.stops.push({
        id: `lens-stop-${Date.now()}`,
        time: "02:30 PM",
        type: matchedMonument.category || "heritage",
        title: result.monumentName,
        desc: result.untoldLegend,
        monumentId: result.monumentId,
        duration: "2 hours",
        lat: result.coordinates.lat,
        lng: result.coordinates.lng
      });
      setActiveTrip({
        ...activeTrip,
        itinerary: updatedDays
      });
      setAddedToTrip(true);
      setTimeout(() => setAddedToTrip(false), 3500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white border border-stone-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header Banner with Monument Image & Match Badge */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900">
        <img
          src={result.imageUrl}
          alt={result.monumentName}
          className="h-full w-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        {/* Top Floating Match Tag */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-white font-black text-xs backdrop-blur-md shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Verified Match (99.4% Confidence)</span>
          </span>

          <button
            type="button"
            onClick={onResetScan}
            className="px-3 py-1 rounded-full bg-black/60 hover:bg-black text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          >
            ↺ Scan Another Photo
          </button>
        </div>

        {/* Bottom Hero Info */}
        <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="h-3.5 w-3.5 text-terracotta-400" />
            <span>{result.state}, India</span>
            <span>•</span>
            <span>{result.architecturalStyle.split(" ")[0]} Style</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight">
            {result.monumentName}
          </h2>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Quick Architectural Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Architectural Style
            </span>
            <div className="font-bold text-xs text-stone-900 mt-1 leading-tight">
              {result.architecturalStyle}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Dynasty & Era
            </span>
            <div className="font-bold text-xs text-stone-900 mt-1 leading-tight">
              {result.dynastyAndEra}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Consecration
            </span>
            <div className="font-bold text-xs text-stone-900 mt-1 leading-tight">
              {result.consecrationYear}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Primary Material
            </span>
            <div className="font-bold text-xs text-stone-900 mt-1 leading-tight">
              {result.primaryMaterial}
            </div>
          </div>
        </div>

        {/* Detected Key Architectural Features Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Landmark className="h-4 w-4 text-terracotta-600" />
              <span>AI-Detected Architectural Motifs & Elements</span>
            </h4>
            <span className="text-[11px] text-stone-500 font-medium">
              {result.keyFeatures.length} Key Signatures Analyzed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200 hover:border-amber-300 hover:bg-amber-50/20 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">{feat.name}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {feat.confidenceScore}% Match
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Untold Historical Legend & Audio Lore Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-terracotta-600/10 border border-amber-200/80 space-y-3 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/60">
            <div className="flex items-center gap-2">
              <span className="text-xl">📜</span>
              <div>
                <h4 className="font-serif font-bold text-amber-950 text-sm">
                  Untold Oral Folklore & Historical Legend
                </h4>
                <span className="text-[11px] text-amber-800/80">
                  Transcribed from local oral traditions & temple chronicles
                </span>
              </div>
            </div>

            {/* Audio Lore Player Button */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                isPlayingAudio
                  ? "bg-rose-600 hover:bg-rose-700 text-white animate-pulse"
                  : "bg-amber-600 hover:bg-amber-500 text-white"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pause Oral Lore</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Listen to Oral Lore 🔊</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-amber-950/90 leading-relaxed italic font-serif">
            &ldquo;{result.untoldLegend}&rdquo;
          </p>
        </div>

        {/* High-Powered Ecosystem Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          {/* 1. Launch 360° Ground Panorama & 3D Earth */}
          <button
            type="button"
            onClick={() => setIs360ModalOpen(true)}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-[1.02]"
          >
            <Globe className="h-4 w-4 text-amber-400" />
            <span>360° Ground & Street View ↗</span>
          </button>

          {/* 2. Add to Current Travel Circuit */}
          <button
            type="button"
            onClick={handleAddToActiveTrip}
            className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-[1.02] ${
              addedToTrip
                ? "bg-emerald-600 text-white"
                : "bg-terracotta-600 hover:bg-terracotta-500 text-white"
            }`}
          >
            {addedToTrip ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added to Day 1 Itinerary!</span>
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                <span>Add to My Trip Itinerary</span>
              </>
            )}
          </button>

          {/* 3. Check Transit & Fares */}
          <button
            type="button"
            onClick={() => setIsTransitModalOpen(true)}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-[1.02]"
          >
            <Plane className="h-4 w-4 text-sky-200" />
            <span>Check Flights & Trains ↗</span>
          </button>

        </div>

        {/* Quick Alternative Monument Switcher */}
        <div className="pt-3 border-t border-stone-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-500">
              🔍 Did you capture a different monument or carving?
            </span>
            <button
              type="button"
              onClick={onResetScan}
              className="text-[11px] font-bold text-terracotta-700 hover:underline cursor-pointer"
            >
              Scan Another Photo &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* 360 Ground & Street View Modal */}
      {is360ModalOpen && matchedMonument && (
        <PanoramaViewerModal
          monument={matchedMonument}
          isOpen={is360ModalOpen}
          onClose={() => setIs360ModalOpen(false)}
          currentLang={currentLang}
        />
      )}

      {/* Transit & Fares Modal */}
      {isTransitModalOpen && (
        <TripTransitReportModal
          isOpen={isTransitModalOpen}
          onClose={() => setIsTransitModalOpen(false)}
          trip={activeTrip}
          preferences={filterPreferences}
          homeCity={userProfile?.homeCity || "Ahmedabad"}
        />
      )}

    </div>
  );
}
