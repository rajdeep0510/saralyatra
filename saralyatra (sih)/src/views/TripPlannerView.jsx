import React from "react";
import { preloadedTrips } from "../data/mockData";
import PreferenceWizard from "../components/planner/PreferenceWizard";
import ItineraryTimeline from "../components/planner/ItineraryTimeline";
import MapRouteVisualizer from "../components/planner/MapRouteVisualizer";

export default function TripPlannerView({
  currentLang,
  activeTrip,
  setActiveTrip,
  activeStopId,
  setActiveStopId,
  onOpenDetails,
  setFilterPreferences
}) {
  const handleGenerateTrip = (formData) => {
    if (setFilterPreferences) {
      setFilterPreferences(formData);
    }

    const regionKey = formData.region.toLowerCase() === "gujarat" ? "gujarat" : "hampi";
    const templateTrip = JSON.parse(JSON.stringify(preloadedTrips[regionKey]));

    templateTrip.title = `Customized ${formData.pacing} ${formData.region} Yatra`;
    templateTrip.pacing = formData.pacing;
    templateTrip.culturalFilter = {
      dietary: formData.dietary,
      language: formData.language,
      interests: formData.interests
    };

    const dietaryNameMap = {
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
      templateTrip.itinerary = templateTrip.itinerary.map((dayGroup) => {
        if (dayGroup.day === 2) {
          dayGroup.stops = dayGroup.stops.filter(stop => stop.monumentId !== "modherasun" && stop.monumentId !== "anegundi");
        }
        return dayGroup;
      });
      templateTrip.stats.travelTime = "3 hours total driving";
      templateTrip.stats.monumentsCount = 3;
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
          Smart Travel Planning Engine
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 mt-1">
          Cultural Trip Architect
        </h2>
        <p className="text-sm text-stone-500 font-normal mt-1 max-w-2xl">
          Design a custom regional circuit tailored to your family’s dietary customs, preferred pacing, and native host dialects.
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
