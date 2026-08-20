import React from "react";
import { Sparkles, ArrowRight, Compass, Map, Home, Headphones } from "lucide-react";
import { monuments } from "../data/mockData";
import HeritageCard from "../components/discovery/HeritageCard";

export default function DashboardView({
  currentLang,
  onLoadTrip,
  onOpen360,
  onOpenDetails,
  onNavigateTab,
  searchQuery
}) {
  // Filter monuments based on search query
  const filteredMonuments = monuments.filter(mon => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      mon.name.toLowerCase().includes(query) ||
      mon.state.toLowerCase().includes(query) ||
      mon.era.toLowerCase().includes(query)
    );
  });

  // Official Google Arts & Culture Wonders of India header image
  const wondersOfIndiaHeroImg = "https://lh3.googleusercontent.com/ci/AL18g_SocoJGleNrMOVFY_A5kf_7YIsmrqSEN06kTsYxIUfuBwwXz4w9M3PXlcUaO5qyKHo--3t8yWc";

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      
      {/* 1. Grand Editorial Hero Banner with Google Arts & Culture Image Background */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden border-b border-stone-200">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={wondersOfIndiaHeroImg}
            alt="Wonders of India — Google Arts & Culture"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          
          {/* Editorial Museum Gradient & Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f5] via-stone-900/60 to-stone-950/75 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/40 to-stone-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-20 text-center space-y-7">
          
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-stone-100 text-xs font-semibold shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Google Arts & Culture Inspired • Wonders of India</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
            Wonders of India
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-200 font-light leading-relaxed drop-shadow-sm">
            A showcase of India's finest cultural treasures. Ancient monuments, spiritual heritage, regional arts, and authentic folklore — curated into personalized smart journeys.
          </p>

          {/* Curated Demo Action Chips */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => onLoadTrip("gujarat")}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-stone-950 hover:bg-stone-100 text-xs font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <span>3-Day Gujarat Heritage Trail</span>
              <ArrowRight className="h-3.5 w-3.5 text-stone-900 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onLoadTrip("hampi")}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white border border-white/30 backdrop-blur-md text-xs font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <span>3-Day Hampi Architectural Circuit</span>
              <ArrowRight className="h-3.5 w-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </section>

      {/* Main Landing Page Content (Spacious Ivory Container) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 2. Feature Gateway Cards (Access all core features directly from landing page) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700">
                Core Cultural Architecture
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Explore Features & Tourism Modules
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Access smart itinerary generation, interactive Leaflet route maps, Indic voice narrators, and verified regional homestays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: AI Trip Planner */}
            <div 
              onClick={() => onNavigateTab("planner")}
              className="group bg-white rounded-2xl border border-stone-200/90 p-6 hover:border-stone-400 hover:shadow-[0_12px_28px_rgba(28,25,23,0.06)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-700 border border-terracotta-200/60 group-hover:bg-terracotta-600 group-hover:text-white transition-colors">
                  <Compass className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors">
                  AI Trip Architect
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Multi-step preference wizard configuring trip pacing, offbeat site mix, and cultural dietary profiling (Jain, Pure Veg, Halal).
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-terracotta-700">
                <span>Launch Planner</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Interactive Itinerary & Live Map */}
            <div 
              onClick={() => onNavigateTab("itinerary")}
              className="group bg-white rounded-2xl border border-stone-200/90 p-6 hover:border-stone-400 hover:shadow-[0_12px_28px_rgba(28,25,23,0.06)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand-100 text-stone-800 border border-sand-200 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                  <Map className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                  Live Itinerary & Map
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Draggable day-by-day timeline paired with interactive Leaflet route polylines and live transit indicators.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900">
                <span>View Route Map</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Folklore & Audio Narration */}
            <div 
              onClick={() => onOpenDetails(monuments[0])}
              className="group bg-white rounded-2xl border border-stone-200/90 p-6 hover:border-stone-400 hover:shadow-[0_12px_28px_rgba(28,25,23,0.06)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-800 border border-stone-200 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                  <Headphones className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                  Indic Voice Narrator
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Listen to authentic regional history in Hindi, Gujarati, Tamil, or English with an ambient synthesized tambura drone.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900">
                <span>Listen to Folklore</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Matched Cultural Homestays */}
            <div 
              onClick={() => onNavigateTab("homestays")}
              className="group bg-white rounded-2xl border border-stone-200/90 p-6 hover:border-stone-400 hover:shadow-[0_12px_28px_rgba(28,25,23,0.06)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                  <Home className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  Cultural Homestays
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Curated regional stays featuring dynamic compatibility scores, native-language host tags, and verified dietary kitchens.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-emerald-800">
                <span>Browse Homestays</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </section>

        {/* 3. Featured Monuments & Heritage Stories Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700">
                Curated Monuments & Stories
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Historic Wonders of Western & Southern India
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Select any wonder to launch an interactive 360° virtual preview or listen to the oral history in your regional dialect.
            </p>
          </div>

          {filteredMonuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMonuments.map((mon) => (
                <HeritageCard
                  key={mon.id}
                  monument={mon}
                  currentLang={currentLang}
                  onOpen360={onOpen360}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center rounded-2xl bg-white border border-stone-200">
              <p className="text-sm text-stone-500 font-medium">No heritage sites match your search query.</p>
            </div>
          )}
        </section>

      </div>

    </div>
  );
}
