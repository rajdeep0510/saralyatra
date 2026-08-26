"use client";

import React, { useState, useMemo } from "react";
import { ActivityType, DietaryType, FilterPreferences, ItineraryDay, LanguageCode, Monument, PreloadedTrip } from "@/types";
import { ArrowRight, Calendar, Check, CheckCircle2, ChevronRight, Clock, Compass, Layers, MapPin, Navigation, PlusCircle, Printer, RotateCcw, Route, ShieldCheck, Sparkles, Trash2, Trees, Landmark, Flame, Mountain, BookmarkCheck, Heart, AlertTriangle, HelpCircle, Share2, Award, Volume2, Plane } from "lucide-react";
import { translations } from "@/data/mockData";
import { removeDestinationFromTrip, addDestinationToTrip } from "@/utils/tripEngine";
import ItineraryTimeline from "@/components/planner/ItineraryTimeline";
import MapRouteVisualizer from "@/components/planner/MapRouteVisualizer";
import AddDestinationModal from "@/components/planner/AddDestinationModal";
import YatraPassModal from "@/components/itinerary/YatraPassModal";
import EtiquettePackingModal from "@/components/utilities/EtiquettePackingModal";
import BudgetEstimatorModal from "@/components/utilities/BudgetEstimatorModal";
import DialectPhrasebookModal from "@/components/utilities/DialectPhrasebookModal";
import TravelGuideBookletModal from "@/components/itinerary/TravelGuideBookletModal";
import AtmosphericSoundscapePlayer from "@/components/audio/AtmosphericSoundscapePlayer";
import MarigoldConfetti from "@/components/wonders/MarigoldConfetti";
import TripTransitReportModal from "@/components/transit/TripTransitReportModal";

interface ItineraryMapViewProps {
  currentLang: LanguageCode;
  activeTrip: PreloadedTrip | null;
  setActiveTrip: (trip: PreloadedTrip) => void;
  activeStopId: string;
  setActiveStopId: (id: string) => void;
  onOpenDetails: (monumentId: string) => void;
  onNavigateToPlanner: () => void;
  onLoadPresetTrip?: (key: string) => void;
  onSaveTrip?: (trip: PreloadedTrip) => void;
  onCancelTrip?: () => void;
  isTripSaved?: boolean;
  filterPreferences?: FilterPreferences | null;
}

export default function ItineraryMapView({
  currentLang,
  activeTrip,
  setActiveTrip,
  activeStopId,
  setActiveStopId,
  onOpenDetails,
  onNavigateToPlanner,
  onLoadPresetTrip,
  onSaveTrip,
  onCancelTrip,
  isTripSaved = false,
  filterPreferences = null
}: ItineraryMapViewProps) {
  const t = translations[currentLang] || translations.en;

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isYatraPassOpen, setIsYatraPassOpen] = useState<boolean>(false);
  const [isPackingModalOpen, setIsPackingModalOpen] = useState<boolean>(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState<boolean>(false);
  const [isPhrasebookModalOpen, setIsPhrasebookModalOpen] = useState<boolean>(false);
  const [isGuideBookletOpen, setIsGuideBookletOpen] = useState<boolean>(false);
  const [isTransitModalOpen, setIsTransitModalOpen] = useState<boolean>(false);
  const [showMarigoldCelebration, setShowMarigoldCelebration] = useState<boolean>(false);
  const [selectedDayForAdd, setSelectedDayForAdd] = useState<number>(1);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showSaveSuccessToast, setShowSaveSuccessToast] = useState<boolean>(false);

  // Extract all existing monument IDs in current trip
  const existingMonumentIds = useMemo(() => {
    if (!activeTrip) return [];
    const ids: string[] = [];
    activeTrip.itinerary.forEach((day) => {
      day.stops.forEach((stop) => {
        if (stop.monumentId) ids.push(stop.monumentId);
      });
    });
    return ids;
  }, [activeTrip]);

  // If no trip has been selected or planned yet, render the Pan-India Discovery & Route Inspiration Hub
  if (!activeTrip) {
    const featuredRoutes = [
      {
        id: "kerala",
        title: "God's Own Country Circuit",
        state: "Kerala",
        tag: "Nature & Backwaters",
        icon: Trees,
        iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
        duration: "3 Days",
        distance: "210 km",
        highlights: ["Munnar Tea Hills", "Alleppey Houseboat", "Athirappilly Falls"],
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "rajasthan",
        title: "Royal Rajputana Citadel Trail",
        state: "Rajasthan",
        tag: "Heritage & Forts",
        icon: Landmark,
        iconColor: "text-amber-600 bg-amber-50 border-amber-200",
        duration: "3 Days",
        distance: "180 km",
        highlights: ["Amber Palace", "Hawa Mahal", "Nahargarh Sunset"],
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "varanasi",
        title: "Sacred Ganga & Sarnath Corridor",
        state: "Uttar Pradesh",
        tag: "Spiritual Pilgrimage",
        icon: Flame,
        iconColor: "text-orange-600 bg-orange-50 border-orange-200",
        duration: "3 Days",
        distance: "90 km",
        highlights: ["Kashi Vishwanath", "Manikarnika Aarti", "Dhamek Stupa"],
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "hampi",
        title: "Vijayanagara Ruins & Boulder Valley",
        state: "Karnataka",
        tag: "Adventure & History",
        icon: Mountain,
        iconColor: "text-teal-600 bg-teal-50 border-teal-200",
        duration: "3 Days",
        distance: "140 km",
        highlights: ["Virupaksha Temple", "Stone Chariot", "Matanga Hill"],
        image: "https://images.unsplash.com/photo-1600100397608-f010e422a578?auto=format&fit=crop&w=800&q=80"
      }
    ];

    return (
      <div className="space-y-10 py-8 animate-in fade-in duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Welcome Header */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-50 border border-terracotta-200 text-terracotta-800 text-xs font-bold uppercase tracking-wider">
              <Navigation className="h-3.5 w-3.5 text-terracotta-600" />
              <span>Live Navigation & Route Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight leading-tight">
              Interactive Route Visualizer
            </h2>

            <p className="text-sm text-stone-600 font-normal leading-relaxed">
              No active itinerary is loaded yet. You can launch our <strong>AI Trip Architect</strong> to craft a custom multi-day itinerary for any Indian state, or select any of the curated regional corridors below to preview its live Leaflet driving route, daily timeline, and oral folklore.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToPlanner}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Launch Trip Planner Studio</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Decorative Map Pattern Badge */}
          <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 h-44 w-44 rounded-2xl bg-stone-50 border border-stone-200 items-center justify-center p-6 text-center text-stone-400 rotate-2 shadow-2xs">
            <div>
              <Layers className="h-10 w-10 text-terracotta-600 mx-auto mb-2" />
              <span className="text-[11px] font-bold uppercase text-stone-700 block">Leaflet Map Engine</span>
              <span className="text-[10px] text-stone-500">Transit Polylines & Markers</span>
            </div>
          </div>
        </div>

        {/* Featured Travel Corridors (Instant Live Map Preview Cards) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700">
                1-Click Route Previews
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Explore Popular Indian Circuits
              </h3>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">
              Click any circuit to load its day-by-day stops and Leaflet polyline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <div
                  key={route.id}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                      <img
                        src={route.image}
                        alt={route.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md bg-white/90 ${route.iconColor}`}>
                          <Icon className="h-3 w-3" />
                          <span>{route.tag}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors leading-snug">
                        {route.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 font-semibold">
                        <span>{route.state}</span>
                        <span>•</span>
                        <span>{route.duration}</span>
                        <span>•</span>
                        <span>{route.distance}</span>
                      </div>

                      {/* Stops list preview */}
                      <div className="space-y-1 pt-1">
                        {route.highlights.map((h, i) => (
                          <div key={i} className="text-[11px] text-stone-600 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-terracotta-600 shrink-0" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Load on Live Map Action Button */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => onLoadPresetTrip && onLoadPresetTrip(route.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-800 border border-stone-200 text-xs font-bold transition-all cursor-pointer group/btn"
                    >
                      <span>Preview on Live Map</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capabilities Infobar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-stone-200">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-terracotta-50 text-terracotta-700 border border-terracotta-200 shrink-0">
              <Route className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-stone-900">Real-Time Distance & Driving Times</h5>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                Calculates haversine travel segments and route polylines dynamically across all stops.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-stone-900">Custom Destination Add & Delete</h5>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                Add or remove any attraction from any day with instant schedule and map updates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-stone-900">Dietary & Dining Waypoints</h5>
              <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                Pre-verified pure veg and Jain satvik meal stops integrated directly into the day&apos;s flow.
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Active Trip State (Live timeline + interactive map)
  const handleRemoveStop = (dayNumber: number, stopId: string) => {
    const updated = removeDestinationFromTrip(activeTrip, dayNumber, stopId);
    setActiveTrip(updated);
  };

  const handleOpenAddModal = (dayNumber: number) => {
    setSelectedDayForAdd(dayNumber);
    setIsAddModalOpen(true);
  };

  const handleAddDestination = (dayNumber: number, monument: Monument) => {
    const updated = addDestinationToTrip(activeTrip, dayNumber, monument);
    setActiveTrip(updated);
  };

  const handleConfirmAndSave = () => {
    if (onSaveTrip) {
      onSaveTrip(activeTrip);
    }
    setShowMarigoldCelebration(true);
    setShowSaveSuccessToast(true);
    setTimeout(() => {
      setShowSaveSuccessToast(false);
    }, 4000);
  };

  const { title, region, pacing, stats, culturalFilter, category } = activeTrip;

  return (
    <div className="space-y-6 py-6 animate-in fade-in duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      
      {/* Save Celebration Toast Notification */}
      {showSaveSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="h-8 w-8 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center font-bold">
            ✓
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Yatra Confirmed & Saved!</h5>
            <p className="text-[11px] text-stone-300">This trip is now saved in your Traveler Profile.</p>
          </div>
        </div>
      )}

      {/* Cancel Trip Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto text-xl">
              <AlertTriangle className="h-6 w-6" />
            </div>
            
            <div className="text-center space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Cancel & Reset Trip Planning?
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Are you sure you want to cancel? This will discard your current route blueprint and return you to the home page.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
              >
                Keep Planning
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  if (onCancelTrip) {
                    onCancelTrip();
                  }
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Discard & Go Home</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner & Trip Overview Controls */}
      <div className={`p-6 rounded-3xl border shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 ${
        isTripSaved
          ? "bg-gradient-to-r from-emerald-50/50 via-white to-white border-emerald-500/40 ring-2 ring-emerald-500/10"
          : "bg-white border-stone-200"
      }`}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-terracotta-50 text-terracotta-700 border border-terracotta-200">
              Live Route Navigation
            </span>
            {isTripSaved ? (
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-300 flex items-center gap-1.5 shadow-2xs animate-in fade-in zoom-in duration-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <BookmarkCheck className="h-3.5 w-3.5 text-emerald-700" />
                <span>Trip Confirmed & Saved</span>
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                Draft Blueprint
              </span>
            )}
            {pacing && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                {pacing} Pacing
              </span>
            )}
            {culturalFilter?.dietary && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {culturalFilter.dietary === "pureVeg" ? "Pure Veg Verified" : culturalFilter.dietary === "jain" ? "Jain Kitchen" : culturalFilter.dietary}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 tracking-tight">
              {title}
            </h2>
            {isTripSaved && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                ✓ Saved in Profile
              </span>
            )}
          </div>

          {region && (
            <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-terracotta-600" />
              <span>Destination: <strong className="text-stone-800">{region}</strong> • {activeTrip.itinerary.length} Days Itinerary</span>
            </p>
          )}
        </div>

        {/* Primary Controls (2 Balanced Rows) */}
        <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
          
          {/* Upper Row: Stats & Secondary Editing */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-stone-50 p-2 rounded-2xl border border-stone-200 text-xs">
              <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                <Route className="h-3.5 w-3.5 text-terracotta-600" />
                <span>{stats?.totalDistance || "180 km"}</span>
              </div>
              <div className="h-3 w-px bg-stone-200" />
              <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                <span>{stats?.travelTime || "4.5 hrs transit"}</span>
              </div>
            </div>

            {/* Action: Add Place */}
            <button
              onClick={() => handleOpenAddModal(1)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-800 border border-terracotta-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <PlusCircle className="h-3.5 w-3.5 text-terracotta-600" />
              <span>{t.addPlace || "+ Add Place"}</span>
            </button>

            {/* Action: Edit in Planner */}
            <button
              onClick={onNavigateToPlanner}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-200 transition-all cursor-pointer"
              title="Adjust preferences and dates"
            >
              <Compass className="h-3.5 w-3.5 text-amber-600" />
              <span>{t.editInPlanner || "Edit in Planner"}</span>
            </button>
          </div>

          {/* Lower Row: Confirm Trip & Cancel Trip */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-start lg:justify-end">
            {/* Confirm Trip Button (Green with White font) */}
            <button
              onClick={handleConfirmAndSave}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                isTripSaved
                  ? "bg-emerald-700 hover:bg-emerald-800 text-white ring-2 ring-emerald-400/40 shadow-emerald-700/20 shadow-md"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
              title="Confirm and save trip to profile"
            >
              <Check className={`h-4 w-4 ${isTripSaved ? "text-emerald-200 stroke-[3]" : "text-white"}`} />
              <span>{isTripSaved ? (t.tripConfirmed || "Trip Confirmed ✓") : (t.confirmTrip || "Confirm Trip")}</span>
            </button>

            {/* Cancel Trip Button (Red with White font) */}
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Cancel and reset trip"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>{t.cancelTrip || "Cancel Trip"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Dedicated Smart Cultural Travel Utilities Ribbon */}
      <div className="p-4 sm:p-5 rounded-3xl bg-stone-50/80 border border-stone-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-stone-200/60">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Smart Cultural & Travel Utilities</span>
            </span>
            <span className="text-[10px] font-bold bg-white text-stone-600 border border-stone-200 px-2 py-0.5 rounded-full shadow-2xs">
              State Guide: {region || "Bharat"}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Atmospheric Soundscapes Player */}
            <AtmosphericSoundscapePlayer
              initialPreset={category === "spiritual" ? "spiritual" : category === "nature" ? "nature" : "heritage"}
            />

            {/* Action: 1-Click Illustrated PDF Travel Guide Booklet */}
            <button
              type="button"
              onClick={() => setIsGuideBookletOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-900 text-xs font-bold border border-terracotta-200 transition-all cursor-pointer shadow-2xs"
              title="Open illustrated A4 printable booklet"
            >
              <span>📖 Illustrated Travel Guide</span>
            </button>

            {/* Action: Print / Save PDF */}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold border border-stone-200 transition-all cursor-pointer shadow-2xs"
              title="Print or Save PDF"
            >
              <Printer className="h-3.5 w-3.5 text-stone-600" />
              <span>Print PDF</span>
            </button>
          </div>
        </div>

        {/* 5 Balanced, Spacious Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* 1. Bharat Yatra Pass Card */}
          <button
            type="button"
            onClick={() => setIsYatraPassOpen(true)}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-terracotta-600 text-white text-left transition-all cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.02] flex items-center justify-between gap-3 group"
          >
            <div className="space-y-0.5 min-w-0">
              <span className="text-[9px] font-mono font-bold tracking-widest text-amber-200 uppercase block">
                3D Digital Ticket
              </span>
              <h4 className="font-serif font-black text-sm text-white truncate">
                🎟️ Bharat Yatra Pass
              </h4>
              <p className="text-[10px] text-amber-100/90 truncate">
                Boarding pass & stamps
              </p>
            </div>
            <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
              <Sparkles className="h-4 w-4 text-amber-200" />
            </div>
          </button>

          {/* 2. SIH 2026 Lowest-Cost Transit & Air Fares Card */}
          <button
            type="button"
            onClick={() => setIsTransitModalOpen(true)}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 text-white text-left transition-all cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.02] flex items-center justify-between gap-3 group"
          >
            <div className="space-y-0.5 min-w-0">
              <span className="text-[9px] font-mono font-bold tracking-widest text-sky-200 uppercase block">
                Skyscanner & IRCTC
              </span>
              <h4 className="font-serif font-black text-sm text-white truncate">
                ✈️ Transit & Fares
              </h4>
              <p className="text-[10px] text-sky-100/90 truncate">
                Cheapest flights & trains
              </p>
            </div>
            <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Plane className="h-4 w-4 text-sky-200" />
            </div>
          </button>

          {/* 3. Smart Packing & Cultural Etiquette Card */}
          <button
            type="button"
            onClick={() => setIsPackingModalOpen(true)}
            className="p-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200/90 hover:border-stone-300 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:scale-[1.02] flex items-center justify-between gap-3 group"
          >
            <div className="space-y-0.5 min-w-0">
              <span className="text-[9px] font-mono font-bold tracking-widest text-stone-400 uppercase block">
                Checklist & Dress Code
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-900 truncate group-hover:text-terracotta-700 transition-colors">
                🧳 Packing & Etiquette
              </h4>
              <p className="text-[10px] text-stone-500 truncate">
                Temple rules & gear
              </p>
            </div>
            <div className="h-8 w-8 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="text-sm">🧥</span>
            </div>
          </button>

          {/* 4. Trip Expense & Budget Estimator Card */}
          <button
            type="button"
            onClick={() => setIsBudgetModalOpen(true)}
            className="p-3.5 rounded-2xl bg-white hover:bg-emerald-50/40 border border-stone-200/90 hover:border-emerald-300 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:scale-[1.02] flex items-center justify-between gap-3 group"
          >
            <div className="space-y-0.5 min-w-0">
              <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-600 uppercase block">
                Cost & Group Splitter
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-900 truncate group-hover:text-emerald-800 transition-colors">
                💰 Budget Estimator
              </h4>
              <p className="text-[10px] text-stone-500 truncate">
                Fuel & stay breakdown
              </p>
            </div>
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="text-sm">📊</span>
            </div>
          </button>

          {/* 5. Local Dialect Phrasebook Card */}
          <button
            type="button"
            onClick={() => setIsPhrasebookModalOpen(true)}
            className="p-3.5 rounded-2xl bg-white hover:bg-amber-50/40 border border-stone-200/90 hover:border-amber-300 text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:scale-[1.02] flex items-center justify-between gap-3 group"
          >
            <div className="space-y-0.5 min-w-0">
              <span className="text-[9px] font-mono font-bold tracking-widest text-amber-600 uppercase block">
                Audio Lore & Safety
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-900 truncate group-hover:text-amber-800 transition-colors">
                🗣️ Dialect Phrasebook
              </h4>
              <p className="text-[10px] text-stone-500 truncate">
                10 phrases & helplines
              </p>
            </div>
            <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span className="text-sm">🔊</span>
            </div>
          </button>

        </div>
      </div>

      {/* Split Interactive Layout: Day Timeline (Left) + Leaflet Map (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Day-by-Day Interactive Timeline (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <ItineraryTimeline
            itinerary={activeTrip}
            currentLang={currentLang}
            activeStopId={activeStopId}
            onSelectStop={setActiveStopId}
            onOpenDetails={onOpenDetails}
            onRemoveStop={handleRemoveStop}
            onAddStopClick={handleOpenAddModal}
          />
        </div>

        {/* Right Column: Interactive Leaflet Map Visualizer (7 Cols) */}
        <div className="lg:col-span-7 sticky top-24">
          <MapRouteVisualizer
            itinerary={activeTrip}
            currentLang={currentLang}
            activeStopId={activeStopId}
            onSelectStop={setActiveStopId}
            onOpenDetails={onOpenDetails}
          />
        </div>

      </div>

      {/* Add Custom Destination Modal (Prioritizes attractions in current trip state) */}
      {isAddModalOpen && (
        <AddDestinationModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          tripState={region || "Kerala"}
          dayNumber={selectedDayForAdd}
          existingMonumentIds={existingMonumentIds}
          onAddDestination={handleAddDestination}
        />
      )}

      {/* 3D Cultural Yatra Pass Modal */}
      {isYatraPassOpen && (
        <YatraPassModal
          trip={activeTrip}
          preferences={filterPreferences || null}
          currentLang={currentLang}
          isOpen={isYatraPassOpen}
          onClose={() => setIsYatraPassOpen(false)}
        />
      )}

      {/* Smart Cultural Etiquette & Packing Checklist Modal */}
      {isPackingModalOpen && (
        <EtiquettePackingModal
          trip={activeTrip}
          isOpen={isPackingModalOpen}
          onClose={() => setIsPackingModalOpen(false)}
        />
      )}

      {/* Trip Expense & Budget Estimator Modal */}
      {isBudgetModalOpen && (
        <BudgetEstimatorModal
          trip={activeTrip}
          travelers={filterPreferences?.travelers || 2}
          isOpen={isBudgetModalOpen}
          onClose={() => setIsBudgetModalOpen(false)}
        />
      )}

      {/* Local Dialect Phrasebook & Emergency Directory Modal */}
      {isPhrasebookModalOpen && (
        <DialectPhrasebookModal
          trip={activeTrip}
          isOpen={isPhrasebookModalOpen}
          onClose={() => setIsPhrasebookModalOpen(false)}
        />
      )}

      {/* 1-Click Illustrated PDF Travel Guide Booklet Modal */}
      {isGuideBookletOpen && (
        <TravelGuideBookletModal
          trip={activeTrip}
          preferences={filterPreferences}
          isOpen={isGuideBookletOpen}
          onClose={() => setIsGuideBookletOpen(false)}
        />
      )}

      {/* SIH 2026 Comprehensive Trip Transit & In-Trip Commute Compass Modal */}
      {isTransitModalOpen && (
        <TripTransitReportModal
          isOpen={isTransitModalOpen}
          onClose={() => setIsTransitModalOpen(false)}
          trip={activeTrip}
          preferences={filterPreferences}
          homeCity={filterPreferences?.departureCity || "Ahmedabad"}
        />
      )}

      {/* Marigold Petal & Rangoli Confetti Celebration */}
      <MarigoldConfetti
        active={showMarigoldCelebration}
        onComplete={() => setShowMarigoldCelebration(false)}
      />

    </div>
  );
}
