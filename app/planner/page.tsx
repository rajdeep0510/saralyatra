"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TripPlannerView from "@/views/TripPlannerView";
import { useTravel } from "@/context/TravelContext";
import { PreloadedTrip } from "@/types";

export default function PlannerPage() {
  const router = useRouter();
  const {
    currentLang,
    activeTrip,
    setActiveTrip,
    setActiveStopId,
    filterPreferences,
    setFilterPreferences,
    handleLoadDemoTrip,
  } = useTravel();

  return (
    <TripPlannerView
      currentLang={currentLang}
      activeTrip={activeTrip}
      setActiveTrip={(trip: PreloadedTrip) => setActiveTrip(trip)}
      setActiveStopId={setActiveStopId}
      filterPreferences={filterPreferences}
      setFilterPreferences={(prefs) => setFilterPreferences(prefs)}
      onNavigateToItinerary={() => router.push("/itinerary")}
      onLoadPresetTrip={handleLoadDemoTrip}
    />
  );
}
