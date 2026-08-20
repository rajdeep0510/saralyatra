"use client";

import React, { useState } from "react";
import { Search, Sparkles, Trees, Flame, Landmark, Mountain, LayoutGrid } from "lucide-react";
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

  const categories: { id: TripCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: "All Experiences", icon: LayoutGrid },
    { id: "nature", label: "Nature & Scenic", icon: Trees },
    { id: "spiritual", label: "Spiritual & Pilgrimage", icon: Flame },
    { id: "heritage", label: "Heritage & Culture", icon: Landmark },
    { id: "adventure", label: "Adventure & Wildlife", icon: Mountain },
  ];

  const filteredMonuments = monuments.filter((mon) => {
    // Category check
    if (selectedCategory !== "all" && mon.category !== selectedCategory) {
      return false;
    }

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-terracotta-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Multi-Experience Archive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 mt-1">
            Wonders of India: Nature, Pilgrimage & Heritage
          </h2>
          <p className="text-sm text-stone-500 font-normal mt-1 max-w-2xl">
            Explore India&apos;s diverse landscapes, sacred shrines, and architectural gems. Click any spot to listen to oral stories or preview 360° virtual tours.
          </p>
        </div>

        {/* Search input */}
        {setSearchQuery && (
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, state, keyword..."
              className="w-full rounded-full bg-white py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 border border-stone-200 focus:border-stone-400 focus:outline-none shadow-2xs"
            />
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-stone-900 text-white shadow-sm border border-stone-900"
                  : "bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-amber-400" : "text-stone-400"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Destination Cards */}
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
          <p className="text-sm text-stone-500 font-medium">
            No destinations found matching your selected category and search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
