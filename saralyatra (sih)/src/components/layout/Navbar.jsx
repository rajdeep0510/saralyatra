import React from "react";
import { Compass, Search, Globe, User, Landmark, Map, Home, Sparkles } from "lucide-react";
import { translations } from "../../data/mockData";

export default function Navbar({
  currentLang,
  setCurrentLang,
  searchQuery,
  setSearchQuery,
  userPreferences,
  activeTab,
  setActiveTab
}) {
  const t = translations[currentLang];

  const getProfileBadge = () => {
    if (!userPreferences) return "Cultural Explorer";
    const dietaryMap = {
      pureVeg: "Pure Veg",
      jain: "Jain",
      halal: "Halal"
    };
    const diet = dietaryMap[userPreferences.dietary] || "Explorer";
    const lang = userPreferences.language || "English";
    return `${diet} • ${lang}`;
  };

  const navItems = [
    { id: "explore", label: t.exploreTab || "Wonders & Stories", icon: Landmark },
    { id: "planner", label: t.plannerTab || "AI Trip Planner", icon: Sparkles },
    { id: "itinerary", label: t.itineraryTab || "Itinerary & Live Map", icon: Map },
    { id: "homestays", label: t.homestaysTab || "Cultural Homestays", icon: Home },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab("explore")}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-900 text-stone-50 group-hover:bg-terracotta-600 transition-colors shadow-sm">
              <Compass className="h-6 w-6 transition-transform group-hover:rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
                  {t.brand}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                  Wonders of India
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-normal">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-stone-100/70 p-1.5 rounded-full border border-stone-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-white text-stone-900 shadow-sm border border-stone-200/80 font-bold"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/50"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-terracotta-600" : "text-stone-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Bar: Search, Language, Profile */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Search Bar */}
            <div className="relative hidden md:flex items-center w-48 xl:w-60">
              <Search className="absolute left-3 h-3.5 w-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wonders, stories..."
                className="w-full rounded-full bg-stone-100/80 py-1.5 pl-8 pr-3 text-xs text-stone-900 placeholder-stone-400 border border-stone-200/80 focus:border-stone-400 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Indic Language Switcher */}
            <div className="flex items-center gap-1.5 rounded-full bg-stone-100 border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:border-stone-300 transition-all">
              <Globe className="h-3.5 w-3.5 text-terracotta-600" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-transparent pr-1 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="gu">ગુજરાતી</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>

            {/* Profile Chip */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-stone-200">
              <div className="text-right">
                <p className="text-xs font-bold text-stone-900">Aarav Patel</p>
                <span className="text-[10px] font-medium text-terracotta-600 bg-terracotta-50 px-1.5 py-0.2 rounded border border-terracotta-200/50">
                  {getProfileBadge()}
                </span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 text-stone-700">
                <User className="h-4 w-4" />
              </div>
            </div>

          </div>

        </div>

        {/* Mobile Navigation Links */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-stone-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-stone-900 text-white font-bold"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </nav>
  );
}
