"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardView from "@/views/DashboardView";
import WondersGalleryView from "@/views/WondersGalleryView";
import TripPlannerView from "@/views/TripPlannerView";
import ItineraryMapView from "@/views/ItineraryMapView";
import PanoramaViewerModal from "@/components/discovery/PanoramaViewerModal";
import HeritageDetailsView from "@/views/HeritageDetailsView";
import HomestayCard from "@/components/homestays/HomestayCard";
import { preloadedTrips, monuments, homestays, translations } from "@/data/mockData";
import { generateDynamicItinerary } from "@/utils/tripEngine";
import { FilterPreferences, Homestay, LanguageCode, Monument, PreloadedTrip, UserProfile } from "@/types";

export default function Home() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en");
  const [activeTab, setActiveTab] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Custom User Profile & Customs State (Interactive in top right Navbar)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Yaksh Patel",
    dietary: "pureVeg",
    homeState: "Gujarat",
    savedTrips: []
  });

  // Load userProfile from localStorage on client mount to prevent SSR hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("saralyatra_user_profile");
        if (cached) {
          setUserProfile(JSON.parse(cached));
        }
      } catch { }
    }
  }, []);

  // Save userProfile to localStorage on update
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("saralyatra_user_profile", JSON.stringify(userProfile));
      } catch { }
    }
  }, [userProfile]);

  // Preloaded trip state (null initially until planned or loaded)
  const [activeTrip, setActiveTrip] = useState<PreloadedTrip | null>(null);
  const [activeStopId, setActiveStopId] = useState<string>("");

  // Modals
  const [selectedDetailMonument, setSelectedDetailMonument] = useState<Monument | null>(null);
  const [selected360Monument, setSelected360Monument] = useState<Monument | null>(null);

  // Preference configuration tracker
  const [filterPreferences, setFilterPreferences] = useState<FilterPreferences>({
    category: "nature",
    region: "Kerala",
    duration: 3,
    dates: new Date().toISOString().split("T")[0],
    travelers: 2,
    pacing: "Relaxed",
    famousRatio: 70,
    dietary: userProfile.dietary,
    language: "Tamil",
    interests: ["Nature", "Scenic", "Waterfalls"]
  });

  const t = translations[currentLang] || translations.en;

  // Load demo trips or dynamically generate for any requested state/region
  const handleLoadDemoTrip = (regionKey: string) => {
    if (preloadedTrips[regionKey]) {
      const trip = preloadedTrips[regionKey];
      setActiveTrip(trip);
      if (trip.itinerary[0]?.stops[0]) {
        setActiveStopId(trip.itinerary[0].stops[0].id);
      }
    } else {
      // Dynamically generate for state
      const dynamicTrip = generateDynamicItinerary(
        {
          category: "all",
          region: regionKey,
          duration: 3,
          dates: new Date().toISOString().split("T")[0],
          travelers: 2,
          pacing: "Moderate",
          famousRatio: 60,
          dietary: "pureVeg",
          language: "Hindi",
          interests: []
        },
        monuments
      );
      setActiveTrip(dynamicTrip);
      if (dynamicTrip.itinerary[0]?.stops[0]) {
        setActiveStopId(dynamicTrip.itinerary[0].stops[0].id);
      }
    }
    
    if (regionKey === "kerala") {
      setFilterPreferences({
        category: "nature",
        region: "Kerala",
        duration: 3,
        dates: new Date().toISOString().split("T")[0],
        travelers: 2,
        pacing: "Relaxed",
        famousRatio: 70,
        dietary: "pureVeg",
        language: "Tamil",
        interests: ["Nature", "Scenic", "Waterfalls"]
      });
    } else if (regionKey === "rajasthan") {
      setFilterPreferences({
        category: "heritage",
        region: "Rajasthan",
        duration: 3,
        dates: new Date().toISOString().split("T")[0],
        travelers: 2,
        pacing: "Moderate",
        famousRatio: 60,
        dietary: "pureVeg",
        language: "Hindi",
        interests: ["Forts", "Palaces", "Heritage"]
      });
    } else if (regionKey === "varanasi") {
      setFilterPreferences({
        category: "spiritual",
        region: "Uttar Pradesh",
        duration: 3,
        dates: new Date().toISOString().split("T")[0],
        travelers: 2,
        pacing: "Relaxed",
        famousRatio: 80,
        dietary: "jain",
        language: "Hindi",
        interests: ["Ghats", "Temples", "Aarti"]
      });
    } else if (regionKey === "hampi") {
      setFilterPreferences({
        category: "adventure",
        region: "Karnataka",
        duration: 3,
        dates: new Date().toISOString().split("T")[0],
        travelers: 2,
        pacing: "Intensive",
        famousRatio: 50,
        dietary: "pureVeg",
        language: "English",
        interests: ["Ruins", "Boulders", "Trekking"]
      });
    }

    setActiveTab("itinerary");
  };

  // Global Toast State for Saved Trip
  const [savedTripToast, setSavedTripToast] = useState<{ title: string; message: string } | null>(null);

  // Confirm & Save Trip into User Profile, then Reset Planner and Live Map
  const handleSaveTrip = (tripToSave: PreloadedTrip) => {
    const tripWithId: PreloadedTrip = {
      ...tripToSave,
      id: tripToSave.id || `trip-${Date.now()}`
    };
    setUserProfile((prev) => {
      const existing = prev.savedTrips || [];
      const filtered = existing.filter((t) => t.id !== tripWithId.id && t.title !== tripWithId.title);
      const updatedTrips = [tripWithId, ...filtered];
      return {
        ...prev,
        savedTrips: updatedTrips
      };
    });

    // 1. Reset Live Map Active Itinerary
    setActiveTrip(null);
    setActiveStopId("");

    // 2. Reset AI Trip Planner Wizard Preferences to clean defaults
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFilterPreferences({
      category: "nature",
      region: "Kerala",
      duration: 3,
      dates: tomorrow.toISOString().split("T")[0],
      travelers: 2,
      pacing: "Moderate",
      famousRatio: 60,
      dietary: userProfile.dietary,
      language: "Hindi",
      interests: ["Nature", "Scenic"]
    });

    // 3. Show Celebration Toast & Redirect cleanly to Home
    setSavedTripToast({
      title: "Trip Confirmed & Saved!",
      message: `"${tripWithId.title}" is saved in your Profile. Planner and Live Map have been reset for your next journey.`
    });
    setActiveTab("home");

    setTimeout(() => {
      setSavedTripToast(null);
    }, 6000);
  };

  // Cancel Trip Planning & Reset to Home
  const handleCancelTrip = () => {
    setActiveTrip(null);
    setActiveStopId("");
    setActiveTab("home");
  };

  // Load Saved Trip from User Profile
  const handleLoadSavedTrip = (savedTrip: PreloadedTrip) => {
    setActiveTrip(savedTrip);
    if (savedTrip.itinerary[0]?.stops[0]) {
      setActiveStopId(savedTrip.itinerary[0].stops[0].id);
    }
    if (savedTrip.culturalFilter) {
      setFilterPreferences((prev) => ({
        ...prev,
        category: savedTrip.category || prev.category,
        region: savedTrip.region || prev.region,
        duration: savedTrip.itinerary.length || prev.duration,
        dietary: savedTrip.culturalFilter?.dietary || prev.dietary,
        language: savedTrip.culturalFilter?.language || prev.language
      }));
    }
    setActiveTab("itinerary");
  };

  // Delete Saved Trip from User Profile
  const handleDeleteSavedTrip = (tripId: string) => {
    setUserProfile((prev) => ({
      ...prev,
      savedTrips: (prev.savedTrips || []).filter((t) => t.id !== tripId)
    }));
  };

  const handleOpenDetailsById = (monumentId: string) => {
    let found = monuments.find((m) => m.id === monumentId);
    if (!found) {
      found = monuments.find(
        (m) =>
          m.name.toLowerCase() === monumentId.toLowerCase() ||
          m.name.toLowerCase().includes(monumentId.toLowerCase()) ||
          monumentId.toLowerCase().includes(m.name.toLowerCase())
      );
    }

    // Fallback: If it's a custom stop from the active itinerary, build dynamic monument record
    if (!found && activeTrip) {
      for (const day of activeTrip.itinerary) {
        const stop = day.stops.find(
          (s) => s.id === monumentId || s.monumentId === monumentId || s.title === monumentId
        );
        if (stop) {
          found = {
            id: stop.id,
            name: stop.title,
            state: activeTrip.region || "India",
            era: "Curated Destination",
            category: (stop.type as "heritage" | "nature" | "spiritual" | "adventure") || "heritage",
            isOffbeat: false,
            imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
            panoramaUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
            folklore: {
              en: stop.desc,
              hi: stop.desc,
              mr: stop.desc,
              gu: stop.desc,
              bn: stop.desc,
              ta: stop.desc
            },
            languagesAvailable: ["en", "hi", "mr", "gu", "bn", "ta"],
            coordinates: { lat: stop.lat || 20.0, lng: stop.lng || 78.0 }
          };
          break;
        }
      }
    }

    if (found) {
      setSelectedDetailMonument(found);
    }
  };

  // Filter homestays based on user dietary preference and region
  const getFilteredHomestays = (): Homestay[] => {
    return homestays
      .map((stay) => {
        let foodScore = 70;
        if (userProfile.dietary === "pureVeg" && stay.dietaryReady === "pureVeg") foodScore = 98;
        if (userProfile.dietary === "jain" && stay.dietaryReady === "jain") foodScore = 100;
        if (userProfile.dietary === "halal" && stay.dietaryReady === "halal") foodScore = 98;

        let languageScore = 75;
        const requestedLangName = currentLang === "en" ? "English" : currentLang === "hi" ? "Hindi" : currentLang === "mr" ? "Marathi" : currentLang === "gu" ? "Gujarati" : currentLang === "bn" ? "Bengali" : "Tamil";
        if (stay.languagesSpoken.some((l) => l.toLowerCase().includes(requestedLangName.toLowerCase()))) {
          languageScore = 95;
        }

        const heritageScore = 88;
        const overall = Math.round((foodScore * 0.4) + (languageScore * 0.3) + (heritageScore * 0.3));

        return {
          ...stay,
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

  const isCurrentTripSaved = Boolean(
    activeTrip && userProfile.savedTrips?.some((t) => (t.id && t.id === activeTrip.id) || t.title === activeTrip.title)
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f5] text-stone-900 font-sans">
      {/* Top Editorial Navbar with User Profile & Saved Trips Popover */}
      <Navbar
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userPreferences={filterPreferences}
        userProfile={userProfile}
        setUserProfile={(newProfile) => {
          setUserProfile(newProfile);
          setFilterPreferences((prev) => ({ ...prev, dietary: newProfile.dietary }));
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLoadSavedTrip={handleLoadSavedTrip}
        onDeleteSavedTrip={handleDeleteSavedTrip}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-16">
        
        {/* 1. Landing Entrance Portal */}
        {activeTab === "home" && (
          <DashboardView
            currentLang={currentLang}
            onLoadTrip={handleLoadDemoTrip}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* 2. Dedicated Pan-India Wonders & Folklore Archive */}
        {(activeTab === "wonders" || activeTab === "explore") && (
          <WondersGalleryView
            currentLang={currentLang}
            onOpen360={setSelected360Monument}
            onOpenDetails={setSelectedDetailMonument}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* 3. DEDICATED FEATURE: AI Trip Planner (Architect Studio) */}
        {activeTab === "planner" && (
          <TripPlannerView
            currentLang={currentLang}
            activeTrip={activeTrip}
            setActiveTrip={setActiveTrip}
            setActiveStopId={setActiveStopId}
            filterPreferences={filterPreferences}
            setFilterPreferences={setFilterPreferences}
            onNavigateToItinerary={() => setActiveTab("itinerary")}
            onLoadPresetTrip={handleLoadDemoTrip}
          />
        )}

        {/* 4. DEDICATED FEATURE: Itinerary & Live Route Map (With live add/remove, confirm & cancel trip) */}
        {activeTab === "itinerary" && (
          <ItineraryMapView
            currentLang={currentLang}
            activeTrip={activeTrip}
            setActiveTrip={setActiveTrip}
            activeStopId={activeStopId}
            setActiveStopId={setActiveStopId}
            onOpenDetails={handleOpenDetailsById}
            onNavigateToPlanner={() => setActiveTab("planner")}
            onLoadPresetTrip={handleLoadDemoTrip}
            onSaveTrip={handleSaveTrip}
            onCancelTrip={handleCancelTrip}
            isTripSaved={isCurrentTripSaved}
          />
        )}

        {/* 5. DEDICATED FEATURE: Culturally Matched Homestays & Eco-Retreats */}
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
                {t.homestaysSub || "Stay in tea estate bungalows, desert havelis, and sacred river ashrams matching your diet and dialect."}
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

      {/* 360-Degree Virtual Preview Modal */}
      {selected360Monument && (
        <PanoramaViewerModal
          isOpen={Boolean(selected360Monument)}
          monument={selected360Monument}
          currentLang={currentLang}
          onClose={() => setSelected360Monument(null)}
        />
      )}

      {/* Full Editorial Heritage Story Modal with Vernacular Audio Narration */}
      {selectedDetailMonument && (
        <HeritageDetailsView
          monument={selectedDetailMonument}
          onClose={() => setSelectedDetailMonument(null)}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          onOpen360={(m) => setSelected360Monument(m)}
        />
      )}

      {/* Global Saved Trip Toast Notification */}
      {savedTripToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-stone-900 text-white p-4 rounded-3xl shadow-2xl border border-emerald-500/60 flex items-start gap-3.5 animate-in slide-in-from-bottom duration-300">
          <div className="h-9 w-9 rounded-2xl bg-emerald-500 text-stone-950 flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
            ✓
          </div>
          <div className="flex-1 space-y-1">
            <h5 className="text-xs font-bold text-white">{savedTripToast.title}</h5>
            <p className="text-[11px] text-stone-300 leading-relaxed">{savedTripToast.message}</p>
          </div>
          <button
            onClick={() => setSavedTripToast(null)}
            className="text-stone-400 hover:text-white p-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Modern Global Footer */}
      <Footer />
    </div>
  );
}
