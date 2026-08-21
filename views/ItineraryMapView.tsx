"use client";

import React, { useState, useMemo } from "react";
import { Sparkles, MapPin, Clock, Route, Compass, Printer, PlusCircle, ArrowRight, Trees, Flame, Landmark, Mountain, CheckCircle2, Navigation, Layers } from "lucide-react";
import { LanguageCode, Monument, PreloadedTrip } from "@/types";
import { removeDestinationFromTrip, addDestinationToTrip } from "@/utils/tripEngine";
import ItineraryTimeline from "@/components/planner/ItineraryTimeline";
import MapRouteVisualizer from "@/components/planner/MapRouteVisualizer";
import AddDestinationModal from "@/components/planner/AddDestinationModal";

interface ItineraryMapViewProps {
  currentLang: LanguageCode;
  activeTrip: PreloadedTrip | null;
  setActiveTrip: (trip: PreloadedTrip) => void;
  activeStopId: string;
  setActiveStopId: (id: string) => void;
  onOpenDetails: (monumentId: string) => void;
  onNavigateToPlanner: () => void;
  onLoadPresetTrip?: (key: string) => void;
}

export default function ItineraryMapView({
  currentLang,
  activeTrip,
  setActiveTrip,
  activeStopId,
  setActiveStopId,
  onOpenDetails,
  onNavigateToPlanner,
  onLoadPresetTrip
}: ItineraryMapViewProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedDayForAdd, setSelectedDayForAdd] = useState<number>(1);

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
                <span>Launch AI Trip Planner Studio</span>
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
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-terracotta-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Card Image Header */}
                    <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                      <img
                        src={route.image}
                        alt={route.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-amber-300" />
                          <span>{route.state}</span>
                        </span>
                        <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[10px]">
                          {route.duration} • {route.distance}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg border ${route.iconColor}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                          {route.tag}
                        </span>
                      </div>

                      <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors">
                        {route.title}
                      </h4>

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

  const { title, region, pacing, stats, culturalFilter } = activeTrip;

  return (
    <div className="space-y-6 py-6 animate-in fade-in duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner & Trip Overview Controls */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-terracotta-50 text-terracotta-700 border border-terracotta-200">
              Live Navigation & Schedule
            </span>
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

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 tracking-tight">
            {title}
          </h2>

          {region && (
            <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-terracotta-600" />
              <span>Destination Region: <strong className="text-stone-800">{region}</strong> • {activeTrip.itinerary.length} Days</span>
            </p>
          )}
        </div>

        {/* Stats & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
              <Route className="h-4 w-4 text-terracotta-600" />
              <span>{stats?.totalDistance || "180 km"}</span>
            </div>
            <div className="h-3 w-px bg-stone-200" />
            <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>{stats?.travelTime || "4.5 hrs transit"}</span>
            </div>
          </div>

          {/* Quick Add Destination Action */}
          <button
            onClick={() => handleOpenAddModal(1)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-800 border border-terracotta-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <PlusCircle className="h-4 w-4 text-terracotta-600" />
            <span>+ Add Place</span>
          </button>

          {/* Action: Customize in Planner */}
          <button
            onClick={onNavigateToPlanner}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer shadow-xs"
          >
            <Compass className="h-4 w-4 text-amber-400" />
            <span>Edit in Planner</span>
          </button>

          {/* Action: Print */}
          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-200 transition-all cursor-pointer"
            title="Print or Save PDF"
          >
            <Printer className="h-4 w-4 text-stone-600" />
            <span>Print</span>
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

        {/* Right Column: Large Interactive Leaflet Route Map (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[520px]">
          <MapRouteVisualizer
            itinerary={activeTrip}
            currentLang={currentLang}
            activeStopId={activeStopId}
            onSelectStop={setActiveStopId}
          />
        </div>

      </div>

      {/* Add Destination Search Modal (Scoped to Current Trip State) */}
      <AddDestinationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        dayNumber={selectedDayForAdd}
        tripState={activeTrip.region}
        onAddDestination={handleAddDestination}
        existingMonumentIds={existingMonumentIds}
      />

    </div>
  );
}
