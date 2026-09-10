"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FilterPreferences, Homestay, LanguageCode, Monument, PreloadedTrip, UserProfile } from "@/types";
import { preloadedTrips, monuments, homestays } from "@/data/mockData";
import { generateDynamicItinerary } from "@/utils/tripEngine";
import { 
  getCurrentUserProfile, 
  saveTripToCloud, 
  deleteTripFromCloud, 
  signUpUser, 
  signInUser, 
  signOutUser,
  updateUserProfile as updateSupabaseProfile 
} from "@/lib/supabase/services";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

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
  
  // Auth additions
  currentUser: any | null;
  isAuthLoading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string, dietary?: string, homeState?: string) => Promise<any>;
  signOut: () => Promise<void>;
}

function getTodayLocalDateStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const defaultUserProfile: UserProfile = {
  name: "Guest Traveler",
  dietary: "pureVeg",
  homeState: "Gujarat",
  savedTrips: []
};

const defaultPreferences: FilterPreferences = {
  category: "nature",
  region: "Kerala",
  duration: 3,
  dates: getTodayLocalDateStr(),
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

  // Supabase Auth State
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Sync Supabase Auth & Profile
  const syncAuthSession = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setIsAuthLoading(false);
      return;
    }
    try {
      const { user, profile } = await getCurrentUserProfile();
      setCurrentUser(user);
      if (profile) {
        setUserProfile((prev) => ({
          ...prev,
          name: profile.name || prev.name,
          dietary: profile.dietary || prev.dietary,
          homeState: profile.homeState || prev.homeState,
          savedTrips: profile.savedTrips && profile.savedTrips.length > 0 ? profile.savedTrips : prev.savedTrips
        }));
      }
    } catch (err) {
      console.warn("Auth session check error:", err);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

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
    syncAuthSession();

    // Listen to Supabase Auth state changes
    const supabase = createClient();
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_OUT") {
          setCurrentUser(null);
          setUserProfile(defaultUserProfile);
          try {
            localStorage.removeItem("saralyatra_user_profile");
          } catch { }
        } else {
          syncAuthSession();
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [syncAuthSession]);

  // Save userProfile to localStorage on update & sync with Supabase if logged in
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (currentUser) {
        localStorage.setItem("saralyatra_user_profile", JSON.stringify(userProfile));
        updateSupabaseProfile(userProfile, currentUser.id);
      }
    } catch { }
  }, [userProfile, isHydrated, currentUser]);

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

  // Auth Action Methods
  const signIn = async (email: string, pass: string) => {
    await signInUser(email, pass);
    await syncAuthSession();
  };

  const signUp = async (email: string, pass: string, name: string, dietary = "pureVeg", homeState = "Gujarat") => {
    const res = await signUpUser(email, pass, name, dietary, homeState);
    await syncAuthSession();
    return res;
  };

  const signOut = async () => {
    await signOutUser();
    setCurrentUser(null);
    setUserProfile(defaultUserProfile);
    try {
      localStorage.removeItem("saralyatra_user_profile");
    } catch { }
  };

  // Load demo trips or dynamically generate for any requested state/region
  const handleLoadDemoTrip = (regionKey: string) => {
    const trip = preloadedTrips[regionKey];
    if (trip) {
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
          dates: getTodayLocalDateStr(),
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
        dates: getTodayLocalDateStr(),
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
        dates: getTodayLocalDateStr(),
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
        dates: getTodayLocalDateStr(),
        travelers: 2,
        pacing: "Relaxed",
        famousRatio: 80,
        dietary: "jain",
        language: "Hindi",
        interests: ["Ghats", "Temples", "Aarti"]
      });
    } else if (regionKey === "himachal") {
      setFilterPreferences({
        category: "adventure",
        region: "Himachal Pradesh",
        duration: 3,
        dates: getTodayLocalDateStr(),
        travelers: 2,
        pacing: "Active",
        famousRatio: 60,
        dietary: "any",
        language: "English",
        interests: ["Mountains", "Passes", "Trekking"]
      });
    } else if (regionKey === "gujarat") {
      setFilterPreferences({
        category: "spiritual",
        region: "Gujarat",
        duration: 3,
        dates: getTodayLocalDateStr(),
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
        dates: getTodayLocalDateStr(),
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
        dates: getTodayLocalDateStr(),
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

  // Confirm & Save Trip into User Profile + Cloud
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

    // Asynchronously sync to Supabase Cloud if user is logged in
    saveTripToCloud(tripWithId).catch(() => {});

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

  // Delete Saved Trip from User Profile + Cloud
  const handleDeleteSavedTrip = (tripId: string) => {
    setUserProfile((prev) => ({
      ...prev,
      savedTrips: (prev.savedTrips || []).filter((t) => t.id !== tripId)
    }));

    // Async delete from Supabase if logged in
    deleteTripFromCloud(tripId).catch(() => {});
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

  const getFilteredHomestays = (): Homestay[] => {
    if (!activeTrip || !activeTrip.region) return homestays;
    const region = activeTrip.region.toLowerCase();
    const matches = homestays.filter(
      (h) =>
        h.hostOrigin.toLowerCase().includes(region) ||
        region.includes(h.hostOrigin.toLowerCase())
    );
    return matches.length > 0 ? matches : homestays;
  };

  const isCurrentTripSaved = Boolean(
    activeTrip &&
    userProfile.savedTrips?.some(
      (t) => (t.id && activeTrip.id && t.id === activeTrip.id) || t.title === activeTrip.title
    )
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

        // Auth
        currentUser,
        isAuthLoading,
        signIn,
        signUp,
        signOut
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
