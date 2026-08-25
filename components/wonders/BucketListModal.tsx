"use client";

import React, { useEffect, useMemo } from "react";
import { X, Heart, Sparkles, MapPin, Trash2, ArrowRight, Compass, BookmarkCheck } from "lucide-react";
import { Monument, LanguageCode } from "@/types";
import { monuments } from "@/data/mockData";

interface BucketListModalProps {
  bookmarkedIds: string[];
  onRemoveBookmark: (id: string) => void;
  onOpenDetails: (id: string) => void;
  onPlanTrip?: (state: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function BucketListModal({
  bookmarkedIds,
  onRemoveBookmark,
  onOpenDetails,
  onPlanTrip,
  isOpen,
  onClose
}: BucketListModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const savedMonuments: Monument[] = useMemo(() => {
    return monuments.filter((m) => bookmarkedIds.includes(m.id));
  }, [bookmarkedIds]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-5 sm:p-6 border-b border-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-xl shadow-inner">
              ❤️
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase block">
                Saved Heritage & Wonders ({savedMonuments.length})
              </span>
              <h3 className="font-serif font-black text-lg sm:text-xl text-white tracking-wide">
                My Bharat Cultural Bucket List
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {savedMonuments.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="h-16 w-16 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl">
                🪔
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Your Bucket List is Empty
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                Click the ❤️ heart bookmark on any monument or heritage story to save it to your personal dream travel list!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedMonuments.map((monument) => (
                <div
                  key={monument.id}
                  className="p-4 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-terracotta-50 text-terracotta-700 px-2 py-0.5 rounded-full border border-terracotta-200">
                        {monument.category || "Heritage"}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveBookmark(monument.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove from Bucket List"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-terracotta-700 transition-colors">
                        {monument.name}
                      </h4>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-terracotta-600 shrink-0" />
                        <span>{monument.city ? `${monument.city}, ` : ""}{monument.state}</span>
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-normal">
                      {monument.folklore.en || monument.folklore.hi || ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenDetails(monument.id);
                      }}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Explore Lore</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>

                    {onPlanTrip && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onPlanTrip(monument.state);
                        }}
                        className="py-1.5 px-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Compass className="h-3 w-3" />
                        <span>Plan Yatra</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="text-[11px] text-stone-500 font-medium">
            🌼 {savedMonuments.length} Wonder{savedMonuments.length !== 1 ? "s" : ""} saved in your Bharat Travel Bookmarks
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
