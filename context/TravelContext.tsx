"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FilterPreferences, Homestay, LanguageCode, Monument, PreloadedTrip, UserProfile } from "@/types";
import { preloadedTrips, monuments, homestays } from "@/data/mockData";
import { generateDynamicItinerary } from "@/utils/tripEngine";

interface TravelContextType {
  currentLang: LanguageCode;
  setCurrentLang: (lang: LanguageCode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  activeTrip: PreloadedTrip | null;
  setActiveTrip: React.Dispatch<React.SetStateAction<PreloadedTrip | null>>;
  activeStopId: string;
  setActiveStopId: (id: string) => void;
  filterPreferences: FilterPreferences;
  setFilterPreferences: React.Dispatch<React.SetStateAction<FilterPreferences>>;
  selectedDetailMonument: Monument | null;
  setSelectedDetailMonument: (monument: Monument | null) => void;
  selected360Monument: Monument | null;
  setSelected360Monument: (monument: Monument | null) => void;
  savedTripToast: { title: string; message: string } | null;
  setSavedTripToast: (toast: { title: string; message: string } | null) => void;
  handleLoadDemoTrip: (regionKey: string) => void;
  handleSaveTrip: (tripToSave: PreloadedTrip) => void;
  handleCancelTrip: () => void;
  handleLoadSavedTrip: (savedTrip: PreloadedTrip) => void;
  handleDeleteSavedTrip: (tripId: string) => void;
  handleOpenDetailsById: (monumentId: string) => void;
  getFilteredHomestays: () => Homestay[];
  isCurrentTripSaved: boolean;
  isHydrated: boolean;
}

const defaultUserProfile: UserProfile = {
  name: "Yaksh Patel",
  dietary: "pureVeg",
  homeState: "Gujarat",
  savedTrips: []
};

const defaultPreferences: FilterPreferences = {
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
};

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export function TravelProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [activeTrip, setActiveTrip] = useState<PreloadedTrip | null>(null);
  const [activeStopId, setActiveStopId] = useState<string>("");

  const [filterPreferences, setFilterPreferences] = useState<FilterPreferences>(defaultPreferences);
  const [selectedDetailMonument, setSelectedDetailMonument] = useState<Monument | null>(null);
  const [selected360Monument, setSelected360Monument] = useState<Monument | null>(null);
  const [savedTripToast, setSavedTripToast] = useState<{ title: string; message: string } | null>(null);

  // Hydrate userProfile and activeTrip from localStorage safely on client mount
  useEffect(() => {
    try {
      const cachedProfile = localStorage.getItem("saralyatra_user_profile");
      if (cachedProfile) {
        setUserProfile(JSON.parse(cachedProfile));
      }
      const cachedTrip = localStorage.getItem("saralyatra_active_trip");
      if (cachedTrip) {
        const parsed = JSON.parse(cachedTrip);
        setActiveTrip(parsed);
        if (parsed?.itinerary?.[0]?.stops?.[0]?.id) {
          setActiveStopId(parsed.itinerary[0].stops[0].id);
        }
      }
    } catch { }
    setIsHydrated(true);
  }, []);

  // Save userProfile to localStorage on update
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("saralyatra_user_profile", JSON.stringify(userProfile));
    } catch { }
  }, [userProfile, isHydrated]);

  // Save activeTrip to localStorage on update
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (activeTrip) {
        localStorage.setItem("saralyatra_active_trip", JSON.stringify(activeTrip));
      } else {
        localStorage.removeItem("saralyatra_active_trip");
      }
    } catch { }
  }, [activeTrip, isHydrated]);

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
    } else if (regionKey === "gujarat") {
      setFilterPreferences({
        category: "heritage",
        region: "Gujarat",
        duration: 3,
        dates: new Date().toISOString().split("T")[0],
        travelers: 2,
        pacing: "Moderate",
        famousRatio: 70,
        dietary: "pureVeg",
        language: "Gujarati",
        interests: ["Somnath Jyotirlinga", "Dwarkadhish", "Rani Ki Vav"]
      });
    } else if (regionKey === "kashmir") {
      setFilterPreferences({
        category: "nature",
        region: "Jammu & Kashmir",
        duration: 3,
        dates: new Date().toISOString().split("T")[0],
        travelers: 2,
        pacing: "Relaxed",
        famousRatio: 80,
        dietary: "any",
        language: "Hindi",
        interests: ["Pari Mahal", "Martand Sun Temple", "Alpine Valleys"]
      });
    } else if (regionKey === "meghalaya") {
      setFilterPreferences({
        category: "nature",
        region: "Meghalaya",
        duration: 3,
        dates: new Date().toISOString().split("T")[0],
        travelers: 2,
        pacing: "Moderate",
        famousRatio: 60,
        dietary: "any",
        language: "English",
        interests: ["Living Root Bridge", "Mawphlang Sacred Grove", "Waterfalls"]
      });
    }

    router.push("/itinerary");
  };

  // Confirm & Save Trip into User Profile (stays on Itinerary page with confirmed state)
  const handleSaveTrip = (tripToSave: PreloadedTrip) => {
    const tripWithId: PreloadedTrip = {
      ...tripToSave,
      id: tripToSave.id || `trip-${Date.now()}`
    };

    setUserProfile((prev) => {
      const existing = prev.savedTrips || [];
      const filtered = existing.filter((t) => (t.id && t.id !== tripWithId.id) || (!t.id && t.title !== tripWithId.title));
      const updatedTrips = [tripWithId, ...filtered];
      return {
        ...prev,
        savedTrips: updatedTrips
      };
    });

    // Keep activeTrip loaded with its saved ID so it remains visible on the map/timeline
    setActiveTrip(tripWithId);

    // Show celebration confirmation toast
    setSavedTripToast({
      title: "Trip Confirmed & Saved!",
      message: `"${tripWithId.title}" is saved in your Profile. You can re-access or manage it anytime from the top menu.`
    });

    setTimeout(() => {
      setSavedTripToast(null);
    }, 5000);
  };

  // Cancel Trip Planning & Reset to Home
  const handleCancelTrip = () => {
    setActiveTrip(null);
    setActiveStopId("");
    router.push("/");
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
    router.push("/itinerary");
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
    <TravelContext.Provider
      value={{
        currentLang,
        setCurrentLang,
        searchQuery,
        setSearchQuery,
        userProfile,
        setUserProfile,
        activeTrip,
        setActiveTrip,
        activeStopId,
        setActiveStopId,
        filterPreferences,
        setFilterPreferences,
        selectedDetailMonument,
        setSelectedDetailMonument,
        selected360Monument,
        setSelected360Monument,
        savedTripToast,
        setSavedTripToast,
        handleLoadDemoTrip,
        handleSaveTrip,
        handleCancelTrip,
        handleLoadSavedTrip,
        handleDeleteSavedTrip,
        handleOpenDetailsById,
        getFilteredHomestays,
        isCurrentTripSaved,
        isHydrated,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error("useTravel must be used within a TravelProvider");
  }
  return context;
}
