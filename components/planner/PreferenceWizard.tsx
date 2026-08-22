"use client";

import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, Sparkles, MapPin, Calendar as CalendarIcon, Users, Sliders, ShieldCheck, Trees, Flame, Landmark, Mountain, Layers, Search, CheckCircle2, Plus, Minus } from "lucide-react";
import { translations, indianStates, monuments } from "@/data/mockData";
import { DietaryType, FilterPreferences, LanguageCode, TripCategory } from "@/types";

interface PreferenceWizardProps {
  currentLang: LanguageCode;
  initialPreferences?: FilterPreferences | null;
  onGenerate?: (formData: FilterPreferences) => void;
  onStepChange?: (step: number, currentFormData: FilterPreferences) => void;
}

export default function PreferenceWizard({ currentLang, initialPreferences, onGenerate, onStepChange }: PreferenceWizardProps) {
  const t = translations[currentLang] || translations.en;
  const [step, setStep] = useState<number>(1);
  const [selectedZone, setSelectedZone] = useState<string>("All");
  const [stateSearch, setStateSearch] = useState<string>("");

  // Default to tomorrow's date formatted as YYYY-MM-DD
  const defaultStartDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const [formData, setFormData] = useState<FilterPreferences>(() => {
    if (initialPreferences) {
      return { ...initialPreferences };
    }
    return {
      category: "nature",
      region: "Kerala",
      duration: 3,
      dates: defaultStartDate,
      travelers: 2,
      pacing: "Moderate",
      famousRatio: 60,
      dietary: "pureVeg",
      language: "Hindi",
      interests: ["Nature", "Scenic"]
    };
  });

  // Sync formData if initialPreferences changes
  React.useEffect(() => {
    if (initialPreferences) {
      setFormData({ ...initialPreferences });
    }
  }, [initialPreferences]);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  React.useEffect(() => {
    if (onStepChange) {
      onStepChange(step, formData);
    }
  }, [step, formData, onStepChange]);

  const updateField = <K extends keyof FilterPreferences>(field: K, value: FilterPreferences[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onGenerate) {
      onGenerate(formData);
    }
  };

  const categories: { id: TripCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: "All Themes", icon: Layers },
    { id: "nature", label: "Nature & Scenic", icon: Trees },
    { id: "spiritual", label: "Spiritual & Sacred", icon: Flame },
    { id: "heritage", label: "Heritage & Culture", icon: Landmark },
    { id: "adventure", label: "Adventure & Wilderness", icon: Mountain },
  ];

  const zones = ["All", "North", "South", "West", "Central", "East", "North-East"];

  // Calculate formatted start and end dates
  const dateRangeSummary = useMemo(() => {
    if (!formData.dates) return null;
    const start = new Date(formData.dates);
    if (isNaN(start.getTime())) return null;

    const end = new Date(start);
    end.setDate(start.getDate() + (formData.duration - 1));

    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    return {
      startText: start.toLocaleDateString("en-IN", options),
      endText: end.toLocaleDateString("en-IN", options),
    };
  }, [formData.dates, formData.duration]);

  // Filter states based on zone and search query
  const filteredStates = useMemo(() => {
    return indianStates.filter((st) => {
      const matchesZone = selectedZone === "All" || st.zone === selectedZone;
      const matchesSearch =
        !stateSearch ||
        st.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
        st.popularAttractions.some((a) => a.toLowerCase().includes(stateSearch.toLowerCase()));
      return matchesZone && matchesSearch;
    });
  }, [selectedZone, stateSearch]);

  // Live count of matched destinations in the database
  const matchedPlacesCount = useMemo(() => {
    return monuments.filter((m) => {
      const matchesCategory = formData.category === "all" || m.category === formData.category;
      const matchesRegion =
        formData.region === "All India" ||
        m.state.toLowerCase().includes(formData.region.toLowerCase()) ||
        m.name.toLowerCase().includes(formData.region.toLowerCase());
      return matchesCategory && matchesRegion;
    }).length;
  }, [formData.category, formData.region]);

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden">
      {/* Wizard Banner Header */}
      <div className="bg-stone-50/90 p-5 sm:p-6 border-b border-stone-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-terracotta-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Step {step} of 3 • Custom AI Engine</span>
          </div>

          {/* Live Matched Count Badge */}
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white text-stone-700 border border-stone-200 px-2 py-0.5 rounded-full shadow-2xs">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>{matchedPlacesCount} Places in {formData.region}</span>
          </span>
        </div>

        <h3 className="text-lg font-serif font-bold text-stone-900 mt-1.5">
          {t.plannerTitle}
        </h3>
        <p className="text-xs text-stone-500 mt-0.5 font-normal leading-relaxed">{t.plannerSub}</p>
        
        {/* Step Indicator dots */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div 
                className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                  step === s
                    ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                    : step > s
                    ? "bg-stone-200 text-stone-800 border-stone-300"
                    : "bg-white text-stone-400 border-stone-200"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div 
                  className={`h-0.5 w-8 transition-all ${
                    step > s ? "bg-stone-800" : "bg-stone-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
        
        {/* STEP 1: Experience Category, Pan-India State Selector, Calendar & Custom Days */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            {/* Category selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-terracotta-600" />
                <span>1. Choose Travel Theme</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = formData.category === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => updateField("category", cat.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left cursor-pointer ${
                        isSelected
                          ? "bg-stone-900 text-white border-stone-900 shadow-sm font-bold"
                          : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-amber-400" : "text-stone-400"}`} />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pan-India State / Region Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-terracotta-600" />
                  <span>2. Select State / Circuit ({filteredStates.length} Available)</span>
                </label>
                <span className="text-[11px] font-bold text-terracotta-700 bg-terracotta-50 px-2 py-0.5 rounded border border-terracotta-200">
                  {formData.region}
                </span>
              </div>

              {/* Zone Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                {zones.map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setSelectedZone(z)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedZone === z
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>

              {/* Search State Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                <input
                  type="text"
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  placeholder="Search state (e.g. Rajasthan, Himachal, Kerala, Meghalaya)..."
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 py-1.5 pl-8 pr-3 text-xs text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Scrollable State Chips Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-32 overflow-y-auto p-1 border border-stone-200 rounded-xl bg-stone-50/50">
                {filteredStates.map((st) => (
                  <button
                    type="button"
                    key={st.id}
                    onClick={() => updateField("region", st.name)}
                    className={`p-2 rounded-lg border text-xs font-semibold text-left transition-all cursor-pointer truncate ${
                      formData.region === st.name
                        ? "bg-terracotta-600 text-white border-terracotta-600 shadow-xs font-bold"
                        : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                    title={st.popularAttractions.join(", ")}
                  >
                    <div className="font-bold truncate">{st.name}</div>
                    <div className={`text-[9px] truncate ${formData.region === st.name ? "text-terracotta-100" : "text-stone-400"}`}>
                      {st.popularAttractions.slice(0, 2).join(", ")}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Popup Calendar Date Picker & Custom Duration Section */}
            <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200 space-y-4">
              
              {/* Start Date Calendar Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5 text-terracotta-600" />
                    <span>Select Trip Start Date</span>
                  </label>
                  {dateRangeSummary && (
                    <span className="text-[11px] font-bold text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded shadow-2xs">
                      {dateRangeSummary.startText} &rarr; {dateRangeSummary.endText}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="date"
                    value={formData.dates}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => updateField("dates", e.target.value)}
                    className="w-full rounded-xl bg-white border border-stone-200 py-2 px-3 text-xs font-bold text-stone-900 focus:border-stone-400 focus:outline-none shadow-2xs cursor-pointer"
                  />
                </div>
              </div>

              {/* Manual Duration Selector (Stepper + Range Slider) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">
                    Trip Duration
                  </span>
                  <span className="text-xs font-bold text-terracotta-700 bg-terracotta-50 px-2.5 py-0.5 rounded-md border border-terracotta-200">
                    {formData.duration} {formData.duration === 1 ? "Day" : "Days"} • {Math.max(0, formData.duration - 1)} {formData.duration <= 2 ? "Night" : "Nights"}
                  </span>
                </div>

                {/* Stepper with Direct Input */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center justify-between bg-white border border-stone-200 rounded-xl p-1.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => updateField("duration", Math.max(1, formData.duration - 1))}
                      className="h-8 w-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-800 transition-colors cursor-pointer"
                      title="Decrease days"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={formData.duration}
                        onChange={(e) => updateField("duration", Math.max(1, Math.min(30, parseInt(e.target.value, 10) || 1)))}
                        className="w-12 text-center font-black text-sm text-stone-900 focus:outline-none"
                      />
                      <span className="text-xs text-stone-500 font-semibold">{formData.duration === 1 ? "Day" : "Days"}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateField("duration", Math.min(30, formData.duration + 1))}
                      className="h-8 w-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-800 transition-colors cursor-pointer"
                      title="Increase days"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Duration Range Slider */}
                <div className="pt-1 space-y-1">
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={Math.min(14, formData.duration)}
                    onChange={(e) => updateField("duration", parseInt(e.target.value, 10))}
                    className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-medium px-0.5">
                    <span>1 Day</span>
                    <span>3 Days</span>
                    <span>7 Days</span>
                    <span>14 Days</span>
                  </div>
                </div>
              </div>

              {/* Number of Travelers */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-terracotta-600" />
                  <span>Travelers & Group Size</span>
                </label>
                <select
                  value={formData.travelers}
                  onChange={(e) => updateField("travelers", parseInt(e.target.value, 10))}
                  className="w-full rounded-xl bg-white border border-stone-200 py-1.5 px-3 text-xs text-stone-900 focus:border-stone-400 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? "Traveler (Solo)" : num === 2 ? "Travelers (Couple)" : `Travelers (Group of ${num})`}</option>
                  ))}
                </select>
              </div>

            </div>

          </div>
        )}

        {/* STEP 2: Pacing & Iconic vs Offbeat Mix */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Trip Pacing */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-terracotta-600" />
                <span>Trip Pacing</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "Relaxed", desc: "1 Place/Day + Leisure" },
                  { id: "Moderate", desc: "2 Places/Day + Meals" },
                  { id: "Intensive", desc: "3+ Places/Day Full Circuit" }
                ].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => updateField("pacing", p.id)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      formData.pacing === p.id
                        ? "bg-stone-900 text-white border-stone-900 shadow-sm font-bold"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <div className="text-xs font-bold">{p.id}</div>
                    <div className={`text-[9px] mt-0.5 ${formData.pacing === p.id ? "text-stone-300" : "text-stone-400"}`}>
                      {p.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Site Mix Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-bold text-stone-800">
                <span>Experience Balance</span>
                <span className="text-terracotta-700 font-bold">{formData.famousRatio}% Iconic Highlights / {100 - formData.famousRatio}% Hidden Gems</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="10"
                value={formData.famousRatio}
                onChange={(e) => updateField("famousRatio", parseInt(e.target.value, 10))}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
                <span>Hidden & Serene</span>
                <span>Balanced Circuit</span>
                <span>Famous Landmarks</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Dietary & Stay Style Profiling */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Dietary Profiling */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-terracotta-600" />
                <span>Dietary Readiness & Kitchen Verification</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "pureVeg", label: "Pure Veg" },
                  { id: "jain", label: "Jain Kitchen" },
                  { id: "halal", label: "Halal Ready" },
                  { id: "any", label: "Any Cuisine" }
                ].map((d) => (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => updateField("dietary", d.id as DietaryType)}
                    className={`py-2 px-1 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                      formData.dietary === d.id
                        ? "bg-terracotta-50 text-terracotta-800 border-terracotta-400 font-bold shadow-sm"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Host language match */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                Preferred Guide / Host Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => updateField("language", e.target.value)}
                className="w-full rounded-xl bg-stone-50 border border-stone-200 py-2 px-3 text-xs text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none"
              >
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Kannada">Kannada</option>
                <option value="Bengali">Bengali</option>
                <option value="Marathi">Marathi</option>
                <option value="English">English</option>
              </select>
            </div>

            {/* Specific Experience Focus */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800">
                Special Experience Interests
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Waterfalls", "Tea Gardens", "Royal Forts", "Temple Rituals", "Desert Safari", "Wildlife", "Folk Music", "River Boating", "Living Bridges"].map((interest) => {
                  const isSelected = formData.interests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-stone-900 text-white border-stone-900 font-bold"
                          : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center gap-1 py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
              step === 1
                ? "text-stone-300 cursor-not-allowed"
                : "text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 cursor-pointer"
            }`}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>{t.previous || "Previous"}</span>
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1 py-2 px-4 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white transition-all cursor-pointer"
            >
              <span>{t.next || "Next"}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-1.5 py-2.5 px-5 rounded-xl text-xs font-bold bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-sm transition-all cursor-pointer"
            >
              <span>Generate {formData.duration}D {formData.region} Yatra</span>
              <Sparkles className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
