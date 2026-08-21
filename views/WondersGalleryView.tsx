"use client";

import React, { useState, useMemo } from "react";
import { Search, Sparkles, Trees, Flame, Landmark, Mountain, LayoutGrid, MapPin, RotateCcw, Compass, Feather, Train, Utensils, Heart } from "lucide-react";
import { monuments } from "@/data/mockData";
import { LanguageCode, Monument, TripCategory } from "@/types";
import HeritageCard from "@/components/discovery/HeritageCard";

interface WondersGalleryViewProps {
  currentLang: LanguageCode;
  onOpen360: (monument: Monument) => void;
  onOpenDetails: (monument: Monument) => void;
  searchQuery: string;
  setSearchQuery?: (query: string) => void;
}

export default function WondersGalleryView({
  currentLang,
  onOpen360,
  onOpenDetails,
  searchQuery,
  setSearchQuery
}: WondersGalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<TripCategory>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [offbeatFilter, setOffbeatFilter] = useState<"all" | "iconic" | "offbeat">("all");

  const categories: { id: TripCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: "All Themes", icon: LayoutGrid },
    { id: "nature", label: "Nature & Scenic", icon: Trees },
    { id: "spiritual", label: "Spiritual & Sacred", icon: Flame },
    { id: "heritage", label: "Heritage & History", icon: Landmark },
    { id: "adventure", label: "Adventure & Wildlife", icon: Mountain },
  ];

  // List of states that currently have attractions in our dataset
  const availableStates = useMemo(() => {
    const statesSet = new Set(monuments.map((m) => m.state));
    return Array.from(statesSet).sort();
  }, []);

  const hasActiveFilters = selectedCategory !== "all" || selectedState !== "all" || offbeatFilter !== "all" || searchQuery !== "";

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedState("all");
    setOffbeatFilter("all");
    if (setSearchQuery) setSearchQuery("");
  };

  const filteredMonuments = useMemo(() => {
    return monuments.filter((mon) => {
      // Category check
      if (selectedCategory !== "all" && mon.category !== selectedCategory) {
        return false;
      }

      // State check
      if (selectedState !== "all" && mon.state.toLowerCase() !== selectedState.toLowerCase()) {
        return false;
      }

      // Offbeat / Iconic check
      if (offbeatFilter === "iconic" && mon.isOffbeat) return false;
      if (offbeatFilter === "offbeat" && !mon.isOffbeat) return false;

      // Search query check
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        mon.name.toLowerCase().includes(query) ||
        mon.state.toLowerCase().includes(query) ||
        (mon.subCategory && mon.subCategory.toLowerCase().includes(query)) ||
        (mon.era && mon.era.toLowerCase().includes(query))
      );
    });
  }, [selectedCategory, selectedState, offbeatFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header section with Cultural Stickers & Stamps */}
      <div className="relative bg-gradient-to-r from-white via-stone-50/80 to-amber-50/40 p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs overflow-hidden">
        
        {/* Decorative Floating Tourism Badges / Stickers in Header */}
        <div className="hidden lg:flex items-center gap-3 absolute top-6 right-6 z-10">
          <div className="rotate-2 transform hover:rotate-0 hover:scale-105 transition-all bg-white p-2 px-3 rounded-2xl border border-amber-300 shadow-sm flex items-center gap-1.5 cursor-default">
            <span className="text-base">🦚</span>
            <div className="text-left">
              <span className="block text-[9px] font-black uppercase text-amber-900 tracking-wider">Incredible India</span>
              <span className="block text-[8px] font-bold text-amber-700">100+ Heritage Wonders</span>
            </div>
          </div>

          <div className="-rotate-3 transform hover:rotate-0 hover:scale-105 transition-all bg-white p-2 px-3 rounded-2xl border border-emerald-300 shadow-sm flex items-center gap-1.5 cursor-default">
            <span className="text-base">🌿</span>
            <div className="text-left">
              <span className="block text-[9px] font-black uppercase text-emerald-900 tracking-wider">Eco & Nature</span>
              <span className="block text-[8px] font-bold text-emerald-700">Pristine Wilderness</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-terracotta-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Pan-India Interactive Archive • 100+ Destinations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight">
            Wonders of India: All Themes & States
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed max-w-2xl">
            Explore India&apos;s emerald tea valleys, sacred river ghats, royal desert citadels, and ancient temples. Hover over any destination card to unlock its oral folklore or launch 360° virtual previews.
          </p>

          {/* Search input inside header */}
          {setSearchQuery && (
            <div className="relative w-full sm:w-80 pt-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search monuments, states, hill stations..."
                className="w-full rounded-2xl bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-stone-900 placeholder-stone-400 border border-stone-200 focus:border-terracotta-500 focus:outline-none shadow-xs"
              />
            </div>
          )}
        </div>
      </div>

      {/* Playful Tourism & Culture Sticker Banner (Filling empty space with cheerful stamps) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar py-1">
        {[
          { label: "Royal Forts & Havelis", emoji: "🏰", color: "bg-amber-50 border-amber-200 text-amber-900 shadow-2xs rotate-[-1deg]" },
          { label: "Sacred Yatra & Shrines", emoji: "🛕", color: "bg-orange-50 border-orange-200 text-orange-900 shadow-2xs rotate-[2deg]" },
          { label: "Misty Tea Plantations", emoji: "🍃", color: "bg-emerald-50 border-emerald-200 text-emerald-900 shadow-2xs rotate-[-2deg]" },
          { label: "Heritage Toy Trains", emoji: "🚂", color: "bg-stone-50 border-stone-200 text-stone-800 shadow-2xs rotate-[1deg]" },
          { label: "High Mountain Treks", emoji: "🧗", color: "bg-cyan-50 border-cyan-200 text-cyan-900 shadow-2xs rotate-[-1.5deg]" },
          { label: "Satvik Culinary Flavors", emoji: "🍛", color: "bg-yellow-50 border-yellow-200 text-yellow-900 shadow-2xs rotate-[2deg]" },
          { label: "Living Oral Lore", emoji: "🪔", color: "bg-rose-50 border-rose-200 text-rose-900 shadow-2xs rotate-[-1deg]" },
        ].map((sticker, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-transform hover:scale-108 hover:rotate-0 cursor-default select-none ${sticker.color}`}
          >
            <span className="text-sm">{sticker.emoji}</span>
            <span>{sticker.label}</span>
          </div>
        ))}
      </div>

      {/* Multi-Dimensional Filter Control Center */}
      <div className="space-y-4">
        
        {/* Row 1: Primary Journey Theme Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-stone-900 text-white shadow-sm border border-stone-900 scale-100 ring-2 ring-stone-900/10"
                    : "bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-amber-400" : "text-stone-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Secondary Filters (State Selector, Iconic vs Offbeat, & Reset Counter) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
          
          {/* Left Group: State Selector & Offbeat Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* State selector */}
            <div className="flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200">
              <MapPin className="h-4 w-4 text-terracotta-600 shrink-0" />
              <span className="text-xs font-bold text-stone-600 hidden sm:inline">State:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent text-xs font-bold text-stone-900 focus:outline-none cursor-pointer pr-1"
              >
                <option value="all">🌐 All States ({availableStates.length} Active)</option>
                {availableStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Offbeat Filter Toggle */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
              {[
                { id: "all", label: "All Sites" },
                { id: "iconic", label: "Iconic" },
                { id: "offbeat", label: "Hidden Gems" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setOffbeatFilter(f.id as "all" | "iconic" | "offbeat")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    offbeatFilter === f.id
                      ? "bg-white text-stone-900 shadow-xs"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

          </div>

          {/* Right Group: Live Places Count & Reset Button */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-700 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200 whitespace-nowrap">
              Showing <span className="text-terracotta-700 font-extrabold">{filteredMonuments.length}</span> Destinations
            </span>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-xl border border-stone-200 transition-all cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="h-3.5 w-3.5 text-stone-500" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Grid of Destination Cards (with Interactive Hover Glow & Animations) */}
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
        <div className="py-20 text-center rounded-3xl bg-white border border-stone-200 space-y-4 p-8 relative overflow-hidden">
          <div className="h-16 w-16 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto text-2xl shadow-sm">
            🧭
          </div>
          <h4 className="font-serif text-lg font-bold text-stone-900">
            No destinations found matching your selected filters
          </h4>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try selecting &quot;All States&quot; or switching your category theme to see more wondrous attractions.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Bottom Cultural Tourism Footer Note with Stamp Accents */}
      <div className="pt-8 pb-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="text-base">🇮🇳</span>
          <span>Preserving oral folklore, vernacular traditions, and sustainable community tourism across Bharat.</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-bold border border-stone-200">
            {monuments.length} Curated Wonders
          </span>
        </div>
      </div>

    </div>
  );
}
