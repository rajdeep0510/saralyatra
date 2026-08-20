"use client";

import React from "react";
import { preloadedTrips } from "@/data/mockData";
import { FilterPreferences, LanguageCode, PreloadedTrip } from "@/types";
import PreferenceWizard from "@/components/planner/PreferenceWizard";
import ItineraryTimeline from "@/components/planner/ItineraryTimeline";
import MapRouteVisualizer from "@/components/planner/MapRouteVisualizer";

interface TripPlannerViewProps {
  currentLang: LanguageCode;
  activeTrip: PreloadedTrip | null;
  setActiveTrip: (trip: PreloadedTrip) => void;
  activeStopId: string;
  setActiveStopId: (id: string) => void;
  onOpenDetails: (monumentId: string) => void;
  setFilterPreferences: (prefs: FilterPreferences) => void;
}

export default function TripPlannerView({
  currentLang,
  activeTrip,
  setActiveTrip,
  activeStopId,
  setActiveStopId,
  onOpenDetails,
  setFilterPreferences
}: TripPlannerViewProps) {
  const handleGenerateTrip = (formData: FilterPreferences) => {
    if (setFilterPreferences) {
      setFilterPreferences(formData);
    }

    let tripKey = "kerala";
    if (formData.category === "spiritual" || formData.region.toLowerCase().includes("uttar pradesh")) {
      tripKey = "varanasi";
    } else if (formData.category === "heritage" || formData.region.toLowerCase().includes("gujarat")) {
      tripKey = "gujarat";
    } else if (formData.category === "adventure" || formData.region.toLowerCase().includes("karnataka")) {
      tripKey = "hampi";
    } else if (formData.category === "nature" || formData.region.toLowerCase().includes("kerala")) {
      tripKey = "kerala";
    }

    const templateTrip: PreloadedTrip = JSON.parse(JSON.stringify(preloadedTrips[tripKey] || preloadedTrips.kerala));

    templateTrip.title = `Customized ${formData.pacing} ${formData.region} Journey`;
    templateTrip.pacing = formData.pacing;
    templateTrip.culturalFilter = {
      category: formData.category,
      dietary: formData.dietary,
      language: formData.language,
      interests: formData.interests
    };

    const dietaryNameMap: Record<string, string> = {
      jain: "Separate Jain Kitchen Lunch",
      pureVeg: "100% Pure Vegetarian Regional lunch",
      halal: "Verified Halal Specialty Lunch"
    };

    templateTrip.itinerary.forEach((dayGroup) => {
      dayGroup.stops.forEach((stop) => {
        if (stop.type === "lunch") {
          stop.title = dietaryNameMap[formData.dietary] || stop.title;
          stop.desc = `A customized dining experience tailored to your profile. Verified kitchen compliance.`;
        }
      });
    });

    if (formData.pacing === "Relaxed") {
      templateTrip.stats.travelTime = "Relaxed pace with extra leisure time";
    }

    setActiveTrip(templateTrip);
    
    if (templateTrip.itinerary[0]?.stops[0]) {
      setActiveStopId(templateTrip.itinerary[0].stops[0].id);
    }
  };

  return (
    <div className="space-y-8 py-4 animate-in fade-in duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700">
          Intelligent Multi-Category Planning Engine
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 mt-1">
          Universal Trip Architect
        </h2>
        <p className="text-sm text-stone-500 font-normal mt-1 max-w-2xl">
          Craft seamless journeys across Nature Valleys, Sacred Pilgrimages, Ancient Heritage, and Wilderness Trails tailored to your family&apos;s customs and pacing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Preference Wizard Form */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-6">
          <PreferenceWizard
            currentLang={currentLang}
            onGenerate={handleGenerateTrip}
          />
        </div>

        {/* Right Column: Combined Timeline & Live Map */}
        <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Draggable day-by-day itinerary */}
          <div className="flex flex-col">
            <ItineraryTimeline
              itinerary={activeTrip}
              currentLang={currentLang}
              activeStopId={activeStopId}
              onSelectStop={setActiveStopId}
              onOpenDetails={onOpenDetails}
            />
          </div>

          {/* Interactive Leaflet Map Route Visualizer */}
          <div className="flex flex-col h-full min-h-[440px]">
            <MapRouteVisualizer
              itinerary={activeTrip}
              currentLang={currentLang}
              activeStopId={activeStopId}
              onSelectStop={setActiveStopId}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
