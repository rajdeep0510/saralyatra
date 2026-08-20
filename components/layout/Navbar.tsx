"use client";

import React from "react";
import { Compass, Search, Globe, User, Landmark, Map, Home, Sparkles } from "lucide-react";
import { translations } from "@/data/mockData";
import { FilterPreferences, LanguageCode } from "@/types";

interface NavbarProps {
  currentLang: LanguageCode;
  setCurrentLang: (lang: LanguageCode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userPreferences: FilterPreferences;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({
  currentLang,
  setCurrentLang,
  searchQuery,
  setSearchQuery,
  userPreferences,
  activeTab,
  setActiveTab
}: NavbarProps) {
  const t = translations[currentLang] || translations.en;

  const getProfileBadge = () => {
    if (!userPreferences) return "Explorer";
    const dietaryMap: Record<string, string> = {
      pureVeg: "Pure Veg",
      jain: "Jain",
      halal: "Halal"
    };
    const diet = dietaryMap[userPreferences.dietary] || "Explorer";
    const lang = userPreferences.language || "English";
    return `${diet} • ${lang}`;
  };

  const navItems = [
    { id: "home", label: "", icon: Home, isHome: true },
    { id: "wonders", label: t.exploreTab || "Wonders", icon: Landmark },
    { id: "planner", label: t.plannerTab || "AI Planner", icon: Sparkles },
    { id: "itinerary", label: t.itineraryTab || "Live Map", icon: Map },
    { id: "homestays", label: t.homestaysTab || "Stays", icon: Home },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-3 sm:gap-6">
          
          {/* Left Side: Brand Logo + Primary Navigation grouped together */}
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-6 min-w-0">
            
            {/* Brand Logo with 'Smart Yatra' positioned below the title */}
            <div 
              onClick={() => setActiveTab("home")}
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
            </div>

            {/* Navigation Tabs (With Home icon and compact pills) */}
            <nav className="hidden lg:flex items-center gap-1 bg-stone-100/90 p-1 rounded-full border border-stone-200/70 shrink-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                if (item.isHome) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      title="Home"
                      className={`flex items-center justify-center p-2 rounded-full transition-all cursor-pointer ${
                        isActive
                          ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                          : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-terracotta-600" : "text-stone-500"}`} />
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-white text-stone-900 shadow-xs border border-stone-200 font-bold"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-terracotta-600" : "text-stone-400"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Right Side: Search, Language Switcher, and User Profile Chip */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
            
            {/* Search Input */}
            <div className="relative hidden md:flex items-center w-36 lg:w-44 xl:w-52">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab === "home") {
                    setActiveTab("wonders");
                  }
                }}
                placeholder="Search..."
                className="w-full rounded-full bg-stone-100 py-1.5 pl-8 pr-2.5 text-xs text-stone-900 placeholder-stone-400 border border-stone-200 focus:border-stone-400 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 rounded-full bg-stone-100 border border-stone-200 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:border-stone-300 transition-all shrink-0">
              <Globe className="h-3.5 w-3.5 text-terracotta-600" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value as LanguageCode)}
                className="bg-transparent pr-0.5 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="en">EN</option>
                <option value="hi">हिन्दी</option>
                <option value="gu">ગુજરાતી</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>

            {/* User Profile Section — FULLY VISIBLE & SHIFTED COMFORTABLY */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-stone-200 shrink-0">
              <div className="flex flex-col items-end text-right shrink-0">
                <span className="text-xs font-bold text-stone-900 leading-tight whitespace-nowrap">
                  Aarav Patel
                </span>
                <span className="text-[9px] font-bold text-terracotta-700 bg-terracotta-50 px-1.5 py-0.5 rounded border border-terracotta-200/70 whitespace-nowrap leading-none mt-0.5">
                  {getProfileBadge()}
                </span>
              </div>
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-stone-200 text-stone-800 ring-2 ring-white shadow-xs shrink-0">
                <User className="h-4 w-4" />
              </div>
            </div>

          </div>

        </div>

        {/* Mobile Navigation Sub-Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1.5 border-t border-stone-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-stone-900 text-white font-bold shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.isHome ? "Home" : item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
