"use client";

import React, { useEffect, useRef } from "react";
import { X, Plane, Sparkles, MapPin } from "lucide-react";
import TransitFareAggregator from "./TransitFareAggregator";

interface TransitDealsModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationStateOrCity: string;
  travelDate?: string;
  travelersCount?: number;
}

export default function TransitDealsModal({
  isOpen,
  onClose,
  destinationStateOrCity,
  travelDate,
  travelersCount = 2
}: TransitDealsModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-2 sm:p-6 animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Plane className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-bold text-white tracking-tight">
                  Lowest-Cost Transit & Air Fares to {destinationStateOrCity}
                </h3>
                <span className="text-[10px] font-black uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  SIH 2026 Compass
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium mt-0.5">
                Instant meta-search deals on Skyscanner, Google Flights, IRCTC & RedBus
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-stone-800 p-2 text-stone-300 border border-stone-700 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
            title="Close Transit Deals"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
          <TransitFareAggregator
            initialDestCityOrState={destinationStateOrCity}
            initialTravelDate={travelDate}
            travelersCount={travelersCount}
            isEmbeddedInPlanner={true}
          />
        </div>
      </div>
    </div>
  );
}
