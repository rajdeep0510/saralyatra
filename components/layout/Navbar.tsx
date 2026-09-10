"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Compass, Search, Globe, User, Landmark, Map, Home, Sparkles, X, ChevronDown, ShieldCheck, MapPin, BookmarkCheck, Trash2, ArrowRight, Plane, Camera } from "lucide-react";
import { translations, indianStates } from "@/data/mockData";
import { DietaryType, LanguageCode } from "@/types";
import { useTravel } from "@/context/TravelContext";

interface NavbarProps {
  currentLang?: LanguageCode;
  setCurrentLang?: (lang: LanguageCode) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Navbar(props: NavbarProps) {
  const travel = useTravel();
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = props.currentLang ?? travel.currentLang;
  const setCurrentLang = props.setCurrentLang ?? travel.setCurrentLang;
  const searchQuery = props.searchQuery ?? travel.searchQuery;
  const setSearchQuery = props.setSearchQuery ?? travel.setSearchQuery;
  const userProfile = travel.userProfile;
  const setUserProfile = travel.setUserProfile;
  const onLoadSavedTrip = travel.handleLoadSavedTrip;
  const onDeleteSavedTrip = travel.handleDeleteSavedTrip;
  const { currentUser, isAuthLoading, signIn, signUp, signOut } = travel;

  const t = translations[currentLang] || translations.en;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [activeProfileTab, setActiveProfileTab] = useState<"profile" | "trips" | "account">("profile");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileModalOpen(false);
      }
    }
    if (isProfileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileModalOpen]);

  const dietaryLabels: Record<string, string> = {
    pureVeg: "Pure Veg",
    jain: "Jain Kitchen",
    halal: "Halal Ready",
    any: "Any Cuisine"
  };

  const getActiveTab = () => {
    if (props.activeTab) return props.activeTab;
    if (pathname === "/") return "home";
    if (pathname?.startsWith("/wonders") || pathname?.startsWith("/explore")) return "wonders";
    if (pathname?.startsWith("/planner")) return "planner";
    if (pathname?.startsWith("/itinerary")) return "itinerary";
    if (pathname?.startsWith("/homestays")) return "homestays";
    if (pathname?.startsWith("/transit")) return "transit";
    return "home";
  };

  const currentTab = getActiveTab();

  const navItems = [
    { id: "home", href: "/", label: "", icon: Home, isHome: true },
    { id: "wonders", href: "/wonders", label: t.exploreTab || "Wonders", icon: Landmark },
    { id: "planner", href: "/planner", label: t.plannerTab || "Planner", icon: Sparkles },
    { id: "itinerary", href: "/itinerary", label: t.itineraryTab || "Live Map", icon: Map },
    { id: "transit", href: "/transit", label: t.transitTab || "Transit Deals", icon: Plane, isNew: true },
    { id: "homestays", href: "/homestays", label: t.homestaysTab || "Stays", icon: Home },
  ];

  const savedTrips = userProfile.savedTrips || [];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="w-full px-3 sm:px-5 lg:px-7">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4 lg:gap-5">
          
          {/* Left Side: Brand Logo */}
          <Link 
            href="/"
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-stone-900 text-stone-50 group-hover:bg-terracotta-600 transition-colors shadow-sm shrink-0">
              <Compass className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-tight whitespace-nowrap">
                {t.brand}
              </span>
              <span className="text-[10px] font-semibold text-terracotta-700 tracking-wider leading-none mt-0.5 whitespace-nowrap">
                Smart Yatra
              </span>
            </div>
          </Link>

          {/* Center Navigation Tabs (Compact, Elegant, Zero Collision) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-stone-100/90 p-1 rounded-full border border-stone-200/70 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              
              if (item.isHome) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    title="Home"
                    className={`flex items-center justify-center p-2 rounded-full transition-all cursor-pointer ${
                      isActive
                        ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-terracotta-600" : "text-stone-500"}`} />
                  </Link>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-white text-stone-900 shadow-xs border border-stone-200 font-bold"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/60 font-medium"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-terracotta-600" : "text-stone-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Search and Interactive User Profile Customizer */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Search Input (Responsive width, expands on focus) */}
            <div className="relative hidden xl:flex items-center w-36 2xl:w-44">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (pathname === "/") {
                    router.push("/wonders");
                  }
                }}
                placeholder="Search..."
                className="w-full rounded-full bg-stone-100 py-1.5 pl-8 pr-2.5 text-xs text-stone-900 placeholder-stone-400 border border-stone-200 focus:border-stone-400 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Interactive User Profile Section with Popover Dropdown (Contains Language Selection) */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                className={`flex items-center gap-2 pl-2 sm:pl-3 border-l border-stone-200 shrink-0 cursor-pointer p-1 rounded-xl transition-all ${
                  isProfileModalOpen ? "bg-stone-100" : "hover:bg-stone-50"
                }`}
                title="Edit Traveler Profile, Language & Saved Trips"
              >
                <div className="flex flex-col items-end text-right shrink-0">
                  <div className="flex items-center gap-1">
                    <span suppressHydrationWarning className="text-xs font-bold text-stone-900 leading-tight whitespace-nowrap">
                      {currentUser ? (userProfile.name || "Traveler Profile") : "Guest Traveler"}
                    </span>
                    <ChevronDown className={`h-3 w-3 text-stone-400 transition-transform ${isProfileModalOpen ? "rotate-180 text-stone-800" : ""}`} />
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span suppressHydrationWarning className="text-[9px] font-bold text-terracotta-700 bg-terracotta-50 px-1.5 py-0.5 rounded border border-terracotta-200/70 whitespace-nowrap leading-none">
                      {dietaryLabels[userProfile.dietary] || "Pure Veg"}
                    </span>
                    <span className="text-[9px] font-bold text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 uppercase leading-none">
                      🌐 {currentLang}
                    </span>
                  </div>
                </div>
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-stone-900 text-white ring-2 ring-white shadow-xs shrink-0 font-bold text-xs">
                  {currentUser && userProfile.name ? userProfile.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </div>
              </button>

              {/* Profile Configuration & Saved Trips Popover Drawer */}
              {isProfileModalOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-3xl bg-white border border-stone-200 shadow-2xl p-5 z-50 space-y-4 animate-in fade-in duration-150">
                  
                  {/* Top Bar with Tab Switcher */}
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setActiveProfileTab("profile")}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeProfileTab === "profile"
                            ? "bg-white text-stone-900 shadow-2xs"
                            : "text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        Profile & Customs
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveProfileTab("trips")}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeProfileTab === "trips"
                            ? "bg-white text-stone-900 shadow-2xs"
                            : "text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        <BookmarkCheck className="h-3.5 w-3.5 text-terracotta-600" />
                        <span>Saved Trips ({savedTrips.length})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveProfileTab("account")}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeProfileTab === "account"
                            ? "bg-white text-stone-900 shadow-2xs"
                            : "text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        <User className="h-3.5 w-3.5 text-stone-700" />
                        <span>{currentUser ? "Account" : "Sign In"}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsProfileModalOpen(false)}
                      className="text-stone-400 hover:text-stone-900 p-1 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* TAB 1: Profile & Customs */}
                  {activeProfileTab === "profile" && (
                    <div className="space-y-3.5">
                      
                      {/* Language Selection Grid */}
                      <div className="space-y-1.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-terracotta-600" />
                            <span>App Language / भाषा</span>
                          </label>
                          <span className="text-[9px] font-black text-terracotta-700 uppercase bg-terracotta-50 px-1.5 py-0.5 rounded border border-terracotta-200">
                            {currentLang.toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                          {[
                            { code: "en", label: "English" },
                            { code: "hi", label: "हिन्दी" },
                            { code: "mr", label: "मराठी" },
                            { code: "gu", label: "ગુજરાતી" },
                            { code: "bn", label: "বাংলা" },
                            { code: "ta", label: "தமிழ்" },
                          ].map((lang) => (
                            <button
                              key={lang.code}
                              type="button"
                              onClick={() => setCurrentLang(lang.code as LanguageCode)}
                              className={`py-1 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                currentLang === lang.code
                                  ? "bg-stone-900 text-white border-stone-900 shadow-2xs scale-102"
                                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
                              }`}
                            >
                              {lang.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Field 1: User Name Input */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-700 flex items-center justify-between">
                          <span>Your Name</span>
                          <span className="text-[9px] text-stone-400">Displayed across trips</span>
                        </label>
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => {
                            if (setUserProfile) {
                              setUserProfile({ ...userProfile, name: e.target.value });
                            }
                          }}
                          placeholder="Enter traveler name..."
                          className="w-full rounded-xl bg-stone-50 border border-stone-200 py-1.5 px-3 text-xs font-bold text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none"
                        />
                      </div>

                      {/* Field 2: Food & Dietary Selection */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-terracotta-600" />
                          <span>Food & Dietary Preference</span>
                        </label>
                        <select
                          value={userProfile.dietary}
                          onChange={(e) => {
                            if (setUserProfile) {
                              setUserProfile({ ...userProfile, dietary: e.target.value as DietaryType });
                            }
                          }}
                          className="w-full rounded-xl bg-stone-50 border border-stone-200 py-2 px-3 text-xs font-bold text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none cursor-pointer"
                        >
                          <option value="pureVeg">🥦 100% Pure Vegetarian</option>
                          <option value="jain">🪔 Jain Satvik Kitchen (No Onion/Garlic)</option>
                          <option value="halal">🥩 Halal Certified Specialty</option>
                          <option value="any">🍽️ Any Regional Cuisine</option>
                        </select>
                      </div>

                      {/* Field 3: Home State / Origin */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-terracotta-600" />
                          <span>Home State / Region of Origin</span>
                        </label>
                        <select
                          value={userProfile.homeState}
                          onChange={(e) => {
                            if (setUserProfile) {
                              setUserProfile({ ...userProfile, homeState: e.target.value });
                            }
                          }}
                          className="w-full rounded-xl bg-stone-50 border border-stone-200 py-2 px-3 text-xs font-bold text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none cursor-pointer max-h-40"
                        >
                          {indianStates.map((st) => (
                            <option key={st.id} value={st.name}>
                              {st.name} ({st.zone} Zone)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-[10px] text-stone-500 font-medium">
                          {currentUser ? "☁️ Synced with Supabase" : "📱 Saved to device (Sign in to sync)"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsProfileModalOpen(false)}
                          className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 cursor-pointer shadow-2xs"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Confirmed & Saved Trips */}
                  {activeProfileTab === "trips" && (
                    <div className="space-y-3">
                      {savedTrips.length > 0 ? (
                        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                          {savedTrips.map((trip, idx) => (
                            <div
                              key={trip.id || idx}
                              className="p-3 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2 hover:border-terracotta-300 transition-all"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h5 className="text-xs font-bold text-stone-900 line-clamp-1">
                                    {trip.title}
                                  </h5>
                                  <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-medium mt-0.5">
                                    <span>{trip.region || "Custom Region"}</span>
                                    <span>•</span>
                                    <span>{trip.itinerary.length} Days</span>
                                    <span>•</span>
                                    <span>{trip.stats.totalDistance}</span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onDeleteSavedTrip && trip.id) {
                                      onDeleteSavedTrip(trip.id);
                                    }
                                  }}
                                  className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                                  title="Delete saved trip"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <div className="pt-1 flex items-center justify-between">
                                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  ✓ Confirmed
                                </span>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onLoadSavedTrip) {
                                      onLoadSavedTrip(trip);
                                    }
                                    setIsProfileModalOpen(false);
                                  }}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-[10px] font-bold transition-all cursor-pointer shadow-2xs"
                                >
                                  <span>View Route</span>
                                  <ArrowRight className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center space-y-2 bg-stone-50 rounded-2xl border border-stone-200/80 p-4">
                          <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto text-lg">
                            🗺️
                          </div>
                          <h5 className="text-xs font-bold text-stone-800">
                            No Confirmed Trips Yet
                          </h5>
                          <p className="text-[11px] text-stone-500 max-w-xs mx-auto leading-relaxed">
                            Generate a custom itinerary in Trip Planner and click <strong>&quot;Confirm Trip&quot;</strong> to save it here for easy access!
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: Supabase Account / Auth */}
                  {activeProfileTab === "account" && (
                    <div className="space-y-3.5">
                      {currentUser ? (
                        <div className="space-y-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                          <div className="flex items-center gap-2.5">
                            <div className="h-10 w-10 rounded-full bg-terracotta-600 text-white flex items-center justify-center font-bold text-sm">
                              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-stone-900 truncate">{userProfile.name}</h4>
                              <p className="text-[10px] text-stone-500 truncate">{currentUser.email}</p>
                            </div>
                          </div>
                          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-medium flex items-center gap-1.5">
                            <span>☁️</span>
                            <span>Cloud Sync Active: Trips sync across devices via Supabase.</span>
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              await signOut();
                              setAuthSuccess("Logged out successfully");
                            }}
                            className="w-full py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-all cursor-pointer"
                          >
                            Sign Out
                          </button>
                        </div>
                      ) : (
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setAuthError(null);
                            setAuthSuccess(null);
                            setIsSubmittingAuth(true);
                            try {
                              if (authMode === "signup") {
                                const res = await signUp(authEmail, authPassword, authName || userProfile.name, userProfile.dietary, userProfile.homeState);
                                if (res?.needsEmailConfirmation) {
                                  setAuthSuccess("Account created! Supabase has sent a confirmation email. Please confirm it to log in, or disable 'Confirm email' in Supabase Auth settings.");
                                } else {
                                  setAuthSuccess("Account created & logged in successfully!");
                                }
                              } else {
                                await signIn(authEmail, authPassword);
                                setAuthSuccess("Signed in successfully!");
                              }
                            } catch (err: any) {
                              const msg = err?.message || "Authentication failed.";
                              if (msg.toLowerCase().includes("invalid login credentials")) {
                                setAuthError("Invalid credentials. If you don't have an account yet, switch to 'Create Account' above. If you signed up, make sure to click the email confirmation link.");
                              } else {
                                setAuthError(msg);
                              }
                            } finally {
                              setIsSubmittingAuth(false);
                            }
                          }}
                          className="space-y-3"
                        >
                          {/* Segmented Auth Mode Switcher */}
                          <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl">
                            <button
                              type="button"
                              onClick={() => {
                                setAuthMode("login");
                                setAuthError(null);
                                setAuthSuccess(null);
                              }}
                              className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                authMode === "login"
                                  ? "bg-white text-stone-900 shadow-2xs"
                                  : "text-stone-500 hover:text-stone-800"
                              }`}
                            >
                              Sign In
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setAuthMode("signup");
                                setAuthError(null);
                                setAuthSuccess(null);
                              }}
                              className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                authMode === "signup"
                                  ? "bg-white text-stone-900 shadow-2xs"
                                  : "text-stone-500 hover:text-stone-800"
                              }`}
                            >
                              Create Account
                            </button>
                          </div>

                          {authError && (
                            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] leading-relaxed">
                              ⚠️ {authError}
                            </div>
                          )}

                          {authSuccess && (
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] leading-relaxed">
                              ✅ {authSuccess}
                            </div>
                          )}

                          {authMode === "signup" && (
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-stone-600">Full Name</label>
                              <input
                                type="text"
                                required
                                value={authName}
                                onChange={(e) => setAuthName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full rounded-xl bg-stone-50 border border-stone-200 py-1.5 px-3 text-xs font-medium text-stone-900 focus:outline-none focus:bg-white"
                              />
                            </div>
                          )}

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-stone-600">Email Address</label>
                            <input
                              type="email"
                              required
                              value={authEmail}
                              onChange={(e) => setAuthEmail(e.target.value)}
                              placeholder="traveler@example.com"
                              className="w-full rounded-xl bg-stone-50 border border-stone-200 py-1.5 px-3 text-xs font-medium text-stone-900 focus:outline-none focus:bg-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-stone-600">Password</label>
                            <input
                              type="password"
                              required
                              value={authPassword}
                              onChange={(e) => setAuthPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full rounded-xl bg-stone-50 border border-stone-200 py-1.5 px-3 text-xs font-medium text-stone-900 focus:outline-none focus:bg-white"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmittingAuth}
                            className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs disabled:opacity-50 mt-1"
                          >
                            {isSubmittingAuth ? "Processing..." : authMode === "login" ? "Sign In" : "Create Account"}
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation Sub-Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1.5 border-t border-stone-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-stone-900 text-white font-bold shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.isHome ? "Home" : item.label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </header>
  );
}
