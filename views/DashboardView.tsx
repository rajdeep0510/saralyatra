"use client";

import React from "react";
import { Sparkles, ArrowRight, Compass, Map, Home, Headphones, Trees, Flame, Landmark, Mountain } from "lucide-react";

interface DashboardViewProps {
  onLoadTrip: (regionKey: string) => void;
  onNavigateTab: (tab: string) => void;
}

export default function DashboardView({
  onLoadTrip,
  onNavigateTab,
}: DashboardViewProps) {
  // Panoramic travel hero image of India's diverse wonders
  const travelHeroImg = "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2400&q=85";

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* 1. Grand Editorial Hero Banner */}
      <section className="relative min-h-[580px] lg:min-h-[620px] flex items-center justify-center overflow-hidden border-b border-stone-200">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={travelHeroImg}
            alt="Diverse Wonders of India"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          
          {/* Editorial Museum Gradient & Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f5] via-stone-900/65 to-stone-950/80 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/40 to-stone-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-16 text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-stone-100 text-xs font-semibold shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Universal AI Trip Architect • All-Category Tourism</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
            Wonders of India
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-200 font-light leading-relaxed drop-shadow-sm">
            Plan smart journeys across majestic green valleys, sacred pilgrimage shrines, monumental heritage, and untamed wilderness — tailored to your dietary customs and pacing.
          </p>

          {/* Category Quick-Launch Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { label: "Nature & Scenic", icon: Trees },
              { label: "Spiritual & Sacred", icon: Flame },
              { label: "Heritage & History", icon: Landmark },
              { label: "Adventure & Wildlife", icon: Mountain },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  onClick={() => onNavigateTab("wonders")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
                >
                  <Icon className="h-3.5 w-3.5 text-amber-300" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Curated Demo Action Chips */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onLoadTrip("kerala")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-stone-950 hover:bg-stone-100 text-xs font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <span>🌿 3-Day Kerala Nature Retreat</span>
              <ArrowRight className="h-3.5 w-3.5 text-stone-900 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onLoadTrip("varanasi")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white border border-white/30 backdrop-blur-md text-xs font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <span>🛕 3-Day Kashi Pilgrimage</span>
              <ArrowRight className="h-3.5 w-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onLoadTrip("gujarat")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white border border-white/30 backdrop-blur-md text-xs font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <span>🏛️ 3-Day Gujarat Heritage Trail</span>
              <ArrowRight className="h-3.5 w-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </section>

      {/* Main Landing Gateway Cards Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Feature Gateway Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700">
                Core Planning Architecture
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Explore Features & Tourism Modules
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Click any module to launch smart itinerary generation, interactive Leaflet route maps, Indic voice narrators, or verified regional homestays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Wonders & Folklore Stories */}
            <div 
              onClick={() => onNavigateTab("wonders")}
              className="group bg-white rounded-2xl border border-stone-200/90 p-6 hover:border-terracotta-400 hover:shadow-[0_12px_28px_rgba(28,25,23,0.08)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-800 border border-stone-200 group-hover:bg-terracotta-600 group-hover:text-white transition-colors">
                  <Headphones className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors">
                  Wonders & Oral Lore
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Explore Nature Valleys, Sacred Shrines, and Heritage Sites with 360° virtual tours and voice narrators in regional Indic dialects.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-terracotta-700">
                <span>Browse All Categories</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: AI Trip Planner */}
            <div 
              onClick={() => onNavigateTab("planner")}
              className="group bg-white rounded-2xl border border-stone-200/90 p-6 hover:border-terracotta-400 hover:shadow-[0_12px_28px_rgba(28,25,23,0.08)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-700 border border-terracotta-200/60 group-hover:bg-terracotta-600 group-hover:text-white transition-colors">
                  <Compass className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors">
                  AI Trip Architect
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Multi-step preference wizard configuring trip theme (Nature, Spiritual, Heritage, Adventure), pacing, and dietary profiling.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-terracotta-700">
                <span>Launch Planner</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Interactive Itinerary & Live Map */}
            <div 
              onClick={() => onNavigateTab("itinerary")}
              className="group bg-white rounded-2xl border border-stone-200/90 p-6 hover:border-stone-400 hover:shadow-[0_12px_28px_rgba(28,25,23,0.08)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand-100 text-stone-800 border border-sand-200 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                  <Map className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                  Live Itinerary & Map
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Draggable day-by-day timeline paired with interactive Leaflet route polylines, scenic stops, and live transit indicators.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900">
                <span>View Route Map</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Matched Cultural & Nature Homestays */}
            <div 
              onClick={() => onNavigateTab("homestays")}
              className="group bg-white rounded-2xl border border-stone-200/90 p-6 hover:border-emerald-400 hover:shadow-[0_12px_28px_rgba(28,25,23,0.08)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                  <Home className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  Eco & Heritage Stays
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Curated tea plantation farmstays, Vedic ashrams, and heritage havelis featuring dynamic compatibility scores.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-emerald-800">
                <span>Browse Stays</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
}
