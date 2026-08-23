"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Compass, Search, Globe, User, Landmark, Map, Home, Sparkles, X, ChevronDown, ShieldCheck, MapPin, BookmarkCheck, Trash2, ArrowRight } from "lucide-react";
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

  const t = translations[currentLang] || translations.en;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [activeProfileTab, setActiveProfileTab] = useState<"profile" | "trips">("profile");
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
    return "home";
  };

  const currentTab = getActiveTab();

  const navItems = [
    { id: "home", href: "/", label: "", icon: Home, isHome: true },
    { id: "wonders", href: "/wonders", label: t.exploreTab || "Wonders", icon: Landmark },
    { id: "planner", href: "/planner", label: t.plannerTab || "Trip Planner", icon: Sparkles },
    { id: "itinerary", href: "/itinerary", label: t.itineraryTab || "Live Map", icon: Map },
    { id: "homestays", href: "/homestays", label: t.homestaysTab || "Stays", icon: Home },
  ];

  const savedTrips = userProfile.savedTrips || [];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-3 sm:gap-6">
          
          {/* Left Side: Brand Logo + Primary Navigation grouped together */}
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-6 min-w-0">
            
            {/* Brand Logo with 'Smart Yatra' positioned below the title */}
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

            {/* Navigation Tabs (With Home icon and compact pills) */}
            <nav className="hidden lg:flex items-center gap-1 bg-stone-100/90 p-1 rounded-full border border-stone-200/70 shrink-0">
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-white text-stone-900 shadow-xs border border-stone-200 font-bold"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-terracotta-600" : "text-stone-400"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

          </div>

          {/* Right Side: Search, Language Switcher, and Interactive User Profile Customizer */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            
            {/* Search Input */}
            <div className="relative hidden md:flex items-center w-32 lg:w-40 xl:w-48">
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

            {/* Language Switcher */}
            <div className="flex items-center gap-1 rounded-full bg-stone-100 border border-stone-200 px-2 py-1.5 text-xs font-medium text-stone-700 hover:border-stone-300 transition-all shrink-0">
              <Globe className="h-3.5 w-3.5 text-terracotta-600" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value as LanguageCode)}
                className="bg-transparent pr-0.5 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="en">EN</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
                <option value="gu">ગુજરાતી</option>
                <option value="bn">বাংলা</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>

            {/* Interactive User Profile Section with Popover Dropdown */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                className={`flex items-center gap-2 pl-2 sm:pl-3 border-l border-stone-200 shrink-0 cursor-pointer p-1 rounded-xl transition-all ${
                  isProfileModalOpen ? "bg-stone-100" : "hover:bg-stone-50"
                }`}
                title="Edit Traveler Profile & Saved Trips"
              >
                <div className="flex flex-col items-end text-right shrink-0">
                  <div className="flex items-center gap-1">
                    <span suppressHydrationWarning className="text-xs font-bold text-stone-900 leading-tight whitespace-nowrap">
                      {userProfile.name || "Traveler Profile"}
                    </span>
                    <ChevronDown className={`h-3 w-3 text-stone-400 transition-transform ${isProfileModalOpen ? "rotate-180 text-stone-800" : ""}`} />
                  </div>
                  <span suppressHydrationWarning className="text-[9px] font-bold text-terracotta-700 bg-terracotta-50 px-1.5 py-0.5 rounded border border-terracotta-200/70 whitespace-nowrap leading-none mt-0.5">
                    {dietaryLabels[userProfile.dietary] || "Pure Veg"} • {savedTrips.length > 0 ? `${savedTrips.length} Saved` : userProfile.homeState || "India"}
                  </span>
                </div>
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-stone-900 text-white ring-2 ring-white shadow-xs shrink-0 font-bold text-xs">
                  {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
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
                          Preferences sync live across homestays & dining
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
