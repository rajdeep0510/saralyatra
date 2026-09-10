"use client";

import React from "react";
import TransitFareAggregator from "@/components/transit/TransitFareAggregator";
import { useTravel } from "@/context/TravelContext";

export default function TransitPage() {
  const travel = useTravel();
  const activeRegion = travel.filterPreferences?.region || "Kerala";
  const travelDate = travel.filterPreferences?.dates;
  const travelers = travel.filterPreferences?.travelers || 2;
  const homeCity = travel.userProfile?.homeState === "Gujarat" ? "Ahmedabad" : "Delhi";

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <TransitFareAggregator
        initialOriginCity={homeCity}
        initialDestCityOrState={activeRegion}
        initialTravelDate={travelDate}
        travelersCount={travelers}
      />
    </div>
  );
}
