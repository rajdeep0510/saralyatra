"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ItineraryMapView from "@/views/ItineraryMapView";
import { useTravel } from "@/context/TravelContext";
import { PreloadedTrip } from "@/types";

export default function ItineraryPage() {
  const router = useRouter();
  const {
    currentLang,
    activeTrip,
    setActiveTrip,
    activeStopId,
    setActiveStopId,
    handleOpenDetailsById,
    handleLoadDemoTrip,
    handleSaveTrip,
    handleCancelTrip,
    isCurrentTripSaved,
    isHydrated,
  } = useTravel();

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
        <div className="h-28 bg-stone-100/80 rounded-3xl border border-stone-200/60" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 h-[500px] bg-stone-100/80 rounded-3xl border border-stone-200/60" />
          <div className="lg:col-span-7 h-[500px] bg-stone-100/80 rounded-3xl border border-stone-200/60" />
        </div>
      </div>
    );
  }

  return (
    <ItineraryMapView
      currentLang={currentLang}
      activeTrip={activeTrip}
      setActiveTrip={(trip: PreloadedTrip) => setActiveTrip(trip)}
      activeStopId={activeStopId}
      setActiveStopId={setActiveStopId}
      onOpenDetails={handleOpenDetailsById}
      onNavigateToPlanner={() => router.push("/planner")}
      onLoadPresetTrip={handleLoadDemoTrip}
      onSaveTrip={handleSaveTrip}
      onCancelTrip={handleCancelTrip}
      isTripSaved={isCurrentTripSaved}
    />
  );
}
