"use client";

import React, { useState, useMemo } from "react";
import { Search, Sparkles, Trees, Flame, Landmark, Mountain, LayoutGrid, MapPin, RotateCcw, Compass, Feather, Train, Utensils, Heart } from "lucide-react";
import { monuments, translations } from "@/data/mockData";
import { LanguageCode, Monument, TripCategory } from "@/types";
import HeritageCard from "@/components/discovery/HeritageCard";
import BucketListModal from "@/components/wonders/BucketListModal";
import MarigoldConfetti from "@/components/wonders/MarigoldConfetti";

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
  const [isBucketListOpen, setIsBucketListOpen] = useState<boolean>(false);
  const [showMarigold, setShowMarigold] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("saralyatra_bucket_list");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
      } else {
        updated = [...prev, id];
        setShowMarigold(true);
      }
      try {
        localStorage.setItem("saralyatra_bucket_list", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const t = translations[currentLang] || translations.en;

  const categories: { id: TripCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: t.allThemes || "All Themes", icon: LayoutGrid },
    { id: "nature", label: t.natureTheme || "Nature & Scenic", icon: Trees },
    { id: "spiritual", label: t.spiritualTheme || "Spiritual & Sacred", icon: Flame },
    { id: "heritage", label: t.heritageTheme || "Heritage & History", icon: Landmark },
    { id: "adventure", label: t.adventureTheme || "Adventure & Wildlife", icon: Mountain },
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
            <span>{t.heroBadge || "Pan-India Interactive Archive • 100+ Destinations"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight">
            {t.exploreTitle || "Wonders of India: All Themes & States"}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed max-w-2xl">
            {t.exploreSub || "Explore India's emerald tea valleys, sacred river ghats, royal desert citadels, and ancient temples. Hover over any destination card to unlock its oral folklore or launch 360° virtual previews."}
          </p>

          {/* Search input and Bucket List button inside header */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {setSearchQuery && (
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder || "Search monuments, states, hill stations..."}
                  className="w-full rounded-2xl bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-stone-900 placeholder-stone-400 border border-stone-200 focus:border-terracotta-500 focus:outline-none shadow-xs"
                />
              </div>
            )}

            {/* My Bucket List Trigger Button */}
            <button
              type="button"
              onClick={() => setIsBucketListOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-rose-50 border border-stone-200 hover:border-rose-300 text-stone-800 hover:text-rose-900 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:scale-105"
            >
              <Heart className={`h-4 w-4 ${bookmarkedIds.length > 0 ? "text-rose-600 fill-rose-500" : "text-stone-400"}`} />
              <span>❤️ My Bucket List ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Playful Tourism & Culture Sticker Banner */}
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

      {/* Interactive Filtering Navigation Bar */}
      <div className="space-y-4 bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
        
        {/* Row 1: Primary Category Pills */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-terracotta-600 text-white shadow-sm"
                      : "bg-stone-50 text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Reset Filters CTA if active */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs font-bold text-terracotta-700 hover:text-terracotta-800 bg-terracotta-50 px-3.5 py-2 rounded-2xl border border-terracotta-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.resetFilters || "Reset All Filters"}</span>
            </button>
          )}
        </div>

        {/* Row 2: State Picker & Iconic vs Offbeat Segmented Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
          
          {/* State / Region Dropdown */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-stone-500 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-terracotta-600" />
              <span>{t.stateLabel || "State"}:</span>
            </span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-2xl px-3.5 py-1.5 text-xs font-bold text-stone-800 focus:outline-none focus:border-terracotta-500 cursor-pointer shadow-2xs"
            >
              <option value="all">{t.allStates || "All States & Regions"}</option>
              {availableStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Iconic vs Hidden Gems Segmented Control */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl border border-stone-200 text-xs font-semibold text-stone-700 w-fit">
            <button
              onClick={() => setOffbeatFilter("all")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                offbeatFilter === "all"
                  ? "bg-white text-stone-900 font-bold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {t.allSites || "All Sites"}
            </button>
            <button
              onClick={() => setOffbeatFilter("iconic")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                offbeatFilter === "iconic"
                  ? "bg-white text-stone-900 font-bold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              ⭐ {t.iconic || "Iconic"}
            </button>
            <button
              onClick={() => setOffbeatFilter("offbeat")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                offbeatFilter === "offbeat"
                  ? "bg-white text-stone-900 font-bold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              ✨ {t.hiddenGems || "Hidden Gems"}
            </button>
          </div>

        </div>

      </div>

      {/* Results Count & Sub-header */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
        <span>
          {t.showingPlaces || "Showing"} <strong className="text-stone-900">{filteredMonuments.length}</strong> {t.destinations || "Destinations"}
        </span>
        {hasActiveFilters && (
          <span className="text-terracotta-700 font-bold">
            Filtered View Active
          </span>
        )}
      </div>

      {/* Destinations Grid (Hover Card Glow & Scale Animation) */}
      {filteredMonuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMonuments.map((monument) => (
            <HeritageCard
              key={monument.id}
              monument={monument}
              currentLang={currentLang}
              onOpen360={onOpen360}
              onOpenDetails={onOpenDetails}
              isBookmarked={bookmarkedIds.includes(monument.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 shadow-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 mx-auto">
            <Search className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-xl font-bold text-stone-900">
              No matching destinations found
            </h4>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We couldn&apos;t find any attractions matching your exact filters or search query. Try choosing &apos;All States&apos; or resetting your search.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t.resetFilters || "Reset All Filters"}</span>
          </button>
        </div>
      )}

      {/* Cultural Heritage Bucket List Modal */}
      {isBucketListOpen && (
        <BucketListModal
          bookmarkedIds={bookmarkedIds}
          onRemoveBookmark={toggleBookmark}
          onOpenDetails={(id) => {
            const mon = monuments.find((m) => m.id === id);
            if (mon) onOpenDetails(mon);
          }}
          isOpen={isBucketListOpen}
          onClose={() => setIsBucketListOpen(false)}
        />
      )}

      {/* Marigold Flower Petal Celebration */}
      <MarigoldConfetti
        active={showMarigold}
        onComplete={() => setShowMarigold(false)}
      />

    </div>
  );
}
