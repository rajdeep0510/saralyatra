"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X, Search, Plus, MapPin, Trees, Flame, Landmark, Mountain, Check, Globe } from "lucide-react";
import { monuments } from "@/data/mockData";
import { Monument, TripCategory } from "@/types";

interface AddDestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  tripState?: string;
  onAddDestination: (dayNumber: number, monument: Monument) => void;
  existingMonumentIds: string[];
}

export default function AddDestinationModal({
  isOpen,
  onClose,
  dayNumber,
  tripState,
  onAddDestination,
  existingMonumentIds
}: AddDestinationModalProps) {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<TripCategory>("all");
  const [selectedState, setSelectedState] = useState<string>(tripState || "all");

  // Sync selectedState whenever tripState changes or modal opens
  useEffect(() => {
    if (tripState && tripState !== "All India") {
      setSelectedState(tripState);
    } else {
      setSelectedState("all");
    }
  }, [tripState, isOpen]);

  const categories: { id: TripCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: "All Themes", icon: Plus },
    { id: "nature", label: "Nature", icon: Trees },
    { id: "spiritual", label: "Spiritual", icon: Flame },
    { id: "heritage", label: "Heritage", icon: Landmark },
    { id: "adventure", label: "Adventure", icon: Mountain },
  ];

  const availableStates = useMemo(() => {
    return Array.from(new Set(monuments.map((m) => m.state))).sort();
  }, []);

  const filteredMonuments = useMemo(() => {
    return monuments.filter((m) => {
      const matchesCategory = selectedCategory === "all" || m.category === selectedCategory;
      const matchesState =
        selectedState === "all" ||
        m.state.toLowerCase() === selectedState.toLowerCase() ||
        m.state.toLowerCase().includes(selectedState.toLowerCase());

      const matchesSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.state.toLowerCase().includes(search.toLowerCase()) ||
        (m.subCategory && m.subCategory.toLowerCase().includes(search.toLowerCase()));

      return matchesCategory && matchesState && matchesSearch;
    });
  }, [selectedCategory, selectedState, search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-stone-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-700">
                Customize Day {dayNumber}
              </span>
              {tripState && (
                <span className="text-[10px] font-bold bg-terracotta-50 text-terracotta-800 border border-terracotta-200 px-2 py-0.2 rounded-full">
                  {tripState} Trip Circuit
                </span>
              )}
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
              Add Destinations in {selectedState === "all" ? "India" : selectedState}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-stone-100 space-y-3 bg-white">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search attractions in ${selectedState === "all" ? "India" : selectedState}...`}
              className="w-full rounded-xl bg-stone-50 border border-stone-200 py-2 pl-9 pr-3 text-xs text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Category & State Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            
            {/* Category pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* State filter selector */}
            <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-lg border border-stone-200 text-[11px]">
              <MapPin className="h-3 w-3 text-terracotta-600" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent font-bold text-stone-700 focus:outline-none cursor-pointer text-[11px]"
              >
                <option value="all">🌐 All States</option>
                {availableStates.map((st) => (
                  <option key={st} value={st}>
                    {st} {tripState && st.toLowerCase() === tripState.toLowerCase() ? "📍 (Current Trip State)" : ""}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* State Scope Quick Notification */}
          {tripState && selectedState !== "all" && (
            <div className="flex items-center justify-between text-[11px] text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/80">
              <span>Filtered to destinations in <strong>{selectedState}</strong></span>
              {selectedState.toLowerCase() === tripState.toLowerCase() ? (
                <button
                  type="button"
                  onClick={() => setSelectedState("all")}
                  className="text-terracotta-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Globe className="h-3 w-3" />
                  <span>Show All India</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedState(tripState)}
                  className="text-terracotta-700 font-bold hover:underline cursor-pointer"
                >
                  Reset to {tripState}
                </button>
              )}
            </div>
          )}

        </div>

        {/* Destination List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-stone-100">
          {filteredMonuments.length > 0 ? (
            filteredMonuments.map((mon) => {
              const isAlreadyAdded = existingMonumentIds.includes(mon.id);
              return (
                <div
                  key={mon.id}
                  className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={mon.imageUrl}
                      alt={mon.name}
                      className="h-12 w-12 rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {mon.name}
                        </h4>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-stone-100 text-stone-600">
                          {mon.state}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5 max-w-sm">
                        {mon.subCategory || mon.era}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddDestination(dayNumber, mon);
                      onClose();
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      isAlreadyAdded
                        ? "bg-stone-100 text-stone-500 hover:bg-stone-200"
                        : "bg-terracotta-600 text-white hover:bg-terracotta-700 shadow-2xs"
                    }`}
                  >
                    {isAlreadyAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Add Again</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add to Day {dayNumber}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center space-y-2 text-stone-400 text-xs font-medium">
              <p>No destinations found in {selectedState}.</p>
              <button
                onClick={() => setSelectedState("all")}
                className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer"
              >
                Browse All India Places
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
