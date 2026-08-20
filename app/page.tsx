"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardView from "@/views/DashboardView";
import WondersGalleryView from "@/views/WondersGalleryView";
import TripPlannerView from "@/views/TripPlannerView";
import HeritageDetailsView from "@/views/HeritageDetailsView";
import PanoramaViewerModal from "@/components/discovery/PanoramaViewerModal";
import HomestayCard from "@/components/homestays/HomestayCard";
import { preloadedTrips, monuments, homestays, translations } from "@/data/mockData";
import { FilterPreferences, Homestay, LanguageCode, Monument, PreloadedTrip } from "@/types";

export default function Home() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en");
  const [activeTab, setActiveTab] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Preloaded trip state (defaulting to Kerala Nature & Backwaters Retreat)
  const [activeTrip, setActiveTrip] = useState<PreloadedTrip>(preloadedTrips.kerala);
  const [activeStopId, setActiveStopId] = useState<string>("ker-1");

  // Modals
  const [selectedDetailMonument, setSelectedDetailMonument] = useState<Monument | null>(null);
  const [selected360Monument, setSelected360Monument] = useState<Monument | null>(null);

  // Preference configuration tracker
  const [filterPreferences, setFilterPreferences] = useState<FilterPreferences>({
    category: "nature",
    region: "Kerala",
    duration: 3,
    dates: "2026-08-20",
    travelers: 2,
    pacing: "Relaxed",
    famousRatio: 70,
    dietary: "pureVeg",
    language: "Tamil",
    interests: ["Nature", "Scenic", "Waterfalls"]
  });

  const t = translations[currentLang] || translations.en;

  // Load demo trips across all 4 categories and navigate to itinerary view
  const handleLoadDemoTrip = (regionKey: string) => {
    const trip = preloadedTrips[regionKey] || preloadedTrips.kerala;
    setActiveTrip(trip);
    if (trip.itinerary[0]?.stops[0]) {
      setActiveStopId(trip.itinerary[0].stops[0].id);
    }
    
    if (regionKey === "kerala") {
      setFilterPreferences({
        category: "nature",
        region: "Kerala",
        duration: 3,
        dates: "2026-08-20",
        travelers: 2,
        pacing: "Relaxed",
        famousRatio: 70,
        dietary: "pureVeg",
        language: "Tamil",
        interests: ["Nature", "Scenic", "Waterfalls"]
      });
    } else if (regionKey === "varanasi") {
      setFilterPreferences({
        category: "spiritual",
        region: "Uttar Pradesh",
        duration: 3,
        dates: "2026-08-21",
        travelers: 2,
        pacing: "Moderate",
        famousRatio: 80,
        dietary: "pureVeg",
        language: "Hindi",
        interests: ["Spiritual", "Pilgrimage", "Rituals"]
      });
    } else if (regionKey === "gujarat") {
      setFilterPreferences({
        category: "heritage",
        region: "Gujarat",
        duration: 3,
        dates: "2026-08-20",
        travelers: 2,
        pacing: "Moderate",
        famousRatio: 60,
        dietary: "pureVeg",
        language: "Gujarati",
        interests: ["Architecture", "Heritage"]
      });
    } else {
      setFilterPreferences({
        category: "adventure",
        region: "Karnataka",
        duration: 3,
        dates: "2026-08-22",
        travelers: 3,
        pacing: "Intensive",
        famousRatio: 80,
        dietary: "pureVeg",
        language: "Tamil",
        interests: ["Architecture", "Adventure", "Wildlife"]
      });
    }
    setActiveTab("itinerary");
  };

  const handleOpenDetailsById = (monumentId: string) => {
    const mon = monuments.find((m) => m.id === monumentId);
    if (mon) {
      setSelectedDetailMonument(mon);
    }
  };

  // Homestay dynamic matchmaking calculation
  const getFilteredHomestays = (): Homestay[] => {
    const query = searchQuery.toLowerCase();
    
    const searchedHomestays = homestays.filter((home) => {
      if (!searchQuery) return true;
      return (
        home.name.toLowerCase().includes(query) ||
        home.hostName.toLowerCase().includes(query) ||
        home.hostOrigin.toLowerCase().includes(query) ||
        home.foodSpecialty.toLowerCase().includes(query) ||
        (home.category && home.category.toLowerCase().includes(query))
      );
    });

    if (!filterPreferences) return searchedHomestays;

    return searchedHomestays
      .map((home) => {
        let foodScore = 50;
        let languageScore = 50;
        let heritageScore = 80;

        // 1. Food compliance
        if (home.dietaryReady === filterPreferences.dietary) {
          foodScore = 100;
        } else if (filterPreferences.dietary === "pureVeg" && home.dietaryReady === "jain") {
          foodScore = 95;
        } else if (filterPreferences.dietary === "jain" && home.dietaryReady === "pureVeg") {
          foodScore = 65;
        }

        // 2. Language alignment
        const speaksDialect = home.languagesSpoken.some(
          (lang) => lang.toLowerCase() === filterPreferences.language.toLowerCase()
        );
        languageScore = speaksDialect ? 100 : 60;

        // 3. Category & Interest guidance
        const matchesInterests = filterPreferences.interests.some(
          (interest) => 
            home.about.toLowerCase().includes(interest.toLowerCase()) || 
            home.foodSpecialty.toLowerCase().includes(interest.toLowerCase()) ||
            (home.category && home.category.toLowerCase() === filterPreferences.category)
        );
        heritageScore = matchesInterests ? 98 : 80;

        const overall = Math.round((foodScore * 0.45) + (languageScore * 0.3) + (heritageScore * 0.25));

        return {
          ...home,
          compatibilityScore: {
            food: foodScore,
            language: languageScore,
            heritage: heritageScore,
            overall
          }
        };
      })
      .sort((a, b) => (b.compatibilityScore?.overall || 0) - (a.compatibilityScore?.overall || 0));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f5] text-stone-900 font-sans">
      {/* Top Editorial Navbar */}
      <Navbar
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userPreferences={filterPreferences}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-16">
        
        {/* 1. Landing Entrance Portal */}
        {activeTab === "home" && (
          <DashboardView
            onLoadTrip={handleLoadDemoTrip}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* 2. Dedicated Multi-Category Wonders of India Archive */}
        {(activeTab === "wonders" || activeTab === "explore") && (
          <WondersGalleryView
            currentLang={currentLang}
            onOpen360={setSelected360Monument}
            onOpenDetails={setSelectedDetailMonument}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* 3. AI Trip Planner & Itinerary Builder */}
        {(activeTab === "planner" || activeTab === "itinerary") && (
          <TripPlannerView
            currentLang={currentLang}
            activeTrip={activeTrip}
            setActiveTrip={setActiveTrip}
            activeStopId={activeStopId}
            setActiveStopId={setActiveStopId}
            onOpenDetails={handleOpenDetailsById}
            setFilterPreferences={setFilterPreferences}
          />
        )}

        {/* 4. Culturally Matched Regional & Nature Homestays */}
        {activeTab === "homestays" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700">
                Verified Community Lodging & Eco-Retreats
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 mt-1">
                {t.homestaysTitle || "Authentic Regional & Nature Homestays"}
              </h2>
              <p className="text-sm text-stone-500 font-normal mt-1 max-w-2xl">
                {t.homestaysSub || "Stay in tea estate bungalows, sacred river ashrams, and heritage havelis matching your diet and dialect."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredHomestays().map((home) => (
                <HomestayCard
                  key={home.id}
                  homestay={home}
                  currentLang={currentLang}
                />
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Museum Footer */}
      <Footer />

      {/* Modals overlays */}
      <HeritageDetailsView
        monument={selectedDetailMonument}
        onClose={() => setSelectedDetailMonument(null)}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        onOpen360={setSelected360Monument}
      />

      <PanoramaViewerModal
        isOpen={!!selected360Monument}
        onClose={() => setSelected360Monument(null)}
        monument={selected360Monument}
        currentLang={currentLang}
      />
    </div>
  );
}
