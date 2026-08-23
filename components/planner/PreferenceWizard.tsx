"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ChevronRight, ChevronLeft, Sparkles, MapPin, Calendar as CalendarIcon, Users, Sliders, ShieldCheck, Trees, Flame, Landmark, Mountain, Layers, Search, CheckCircle2, Plus, Minus } from "lucide-react";
import { translations, indianStates, monuments } from "@/data/mockData";
import { DietaryType, FilterPreferences, LanguageCode, TripCategory } from "@/types";
import CustomLargeCalendar from "./CustomLargeCalendar";

interface PreferenceWizardProps {
  currentLang: LanguageCode;
  initialPreferences?: FilterPreferences | null;
  onGenerate?: (formData: FilterPreferences) => void;
  onStepChange?: (step: number, currentFormData: FilterPreferences) => void;
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatFriendlyDate(dateInput: string | Date | null | undefined, includeWeekday: boolean = true): string {
  if (!dateInput) return "";
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return "";
  const weekday = DAY_NAMES[d.getDay()];
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  return includeWeekday ? `${weekday}, ${day} ${month} ${year}` : `${day} ${month} ${year}`;
}

export default function PreferenceWizard({ currentLang, initialPreferences, onGenerate, onStepChange }: PreferenceWizardProps) {
  const t = translations[currentLang] || translations.en;
  const [step, setStep] = useState<number>(1);
  const [selectedZone, setSelectedZone] = useState<string>("All");
  const [stateSearch, setStateSearch] = useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

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
    if (step < 3) {
      handleNext();
      return;
    }
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

  // Calculate formatted start and end dates deterministically
  const dateRangeSummary = useMemo(() => {
    if (!formData.dates) return null;
    const start = new Date(formData.dates);
    if (isNaN(start.getTime())) return null;

    const end = new Date(start);
    end.setDate(start.getDate() + (formData.duration - 1));

    return {
      startText: formatFriendlyDate(start, false),
      endText: formatFriendlyDate(end, false),
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

  // Dynamic capacity calculation: how many realistic days can this state/region support?
  const maxFeasibleDays = useMemo(() => {
    if (formData.region === "All India") return 14;

    const count = matchedPlacesCount;
    if (count <= 1) return 1;
    if (count <= 2) return 2;
    if (count <= 4) return 3;
    if (count <= 6) return 4;
    return Math.min(10, Math.max(2, Math.ceil(count / 1.5)));
  }, [matchedPlacesCount, formData.region]);

  // Automatically adjust duration if user switches to a state with smaller capacity
  useEffect(() => {
    if (formData.duration > maxFeasibleDays) {
      updateField("duration", maxFeasibleDays);
    }
  }, [maxFeasibleDays, formData.duration]);

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden">
      {/* Wizard Banner Header */}
      <div className="bg-stone-50/90 p-5 sm:p-6 border-b border-stone-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-terracotta-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Step {step} of 3 • Trip Planner Engine</span>
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
        
        {/* Interactive Step Indicator Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { s: 1, title: "1. Theme & Destination", short: "Theme & State" },
            { s: 2, title: "2. Pacing & Mix", short: "Pacing & Mix" },
            { s: 3, title: "3. Dietary & Stays", short: "Dietary & Stays" }
          ].map((item) => (
            <button
              key={item.s}
              type="button"
              onClick={() => setStep(item.s)}
              className={`py-2 px-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                step === item.s
                  ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                  : step > item.s
                  ? "bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200/80"
                  : "bg-white text-stone-400 border-stone-200 hover:border-stone-300 hover:text-stone-700"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  step === item.s
                    ? "bg-amber-400 text-stone-950 font-black"
                    : step > item.s
                    ? "bg-emerald-600 text-white"
                    : "bg-stone-100 text-stone-500 border border-stone-300"
                }`}
              >
                {step > item.s ? "✓" : item.s}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold truncate leading-tight">
                  {item.title}
                </div>
                <div className={`text-[9px] truncate ${step === item.s ? "text-amber-200" : "text-stone-400"}`}>
                  {step === item.s ? "Active Step" : step > item.s ? "Completed" : "Optional"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
        
        {/* STEP 1: Experience Category, Pan-India State Selector, Calendar & Custom Days */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            {/* 1. Travel Theme Selection Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-terracotta-600" />
                  <span>1. Choose Travel Theme</span>
                </label>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Select 1 Theme
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = formData.category === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => updateField("category", cat.id)}
                      className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-center sm:text-left cursor-pointer ${
                        isSelected
                          ? "bg-stone-900 text-white border-stone-900 shadow-xs font-bold ring-2 ring-stone-900/10"
                          : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100/80"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-amber-400" : "text-stone-400"}`} />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Destination State Selection Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-terracotta-600" />
                  <span>2. Select State / Circuit ({filteredStates.length} Available)</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-500 font-medium">Selected:</span>
                  <span className="text-xs font-bold text-terracotta-800 bg-terracotta-50 px-2.5 py-0.5 rounded-lg border border-terracotta-200 shadow-2xs">
                    📍 {formData.region}
                  </span>
                </div>
              </div>

              {/* Toolbar: Search input + Zone Filter Chips */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                    <input
                      type="text"
                      value={stateSearch}
                      onChange={(e) => setStateSearch(e.target.value)}
                      placeholder="Filter state or attractions (e.g. Gujarat, Rajasthan, Kerala)..."
                      className="w-full rounded-xl bg-white border border-stone-200 py-1.5 pl-8 pr-3 text-xs text-stone-900 focus:border-stone-400 focus:outline-none shadow-2xs"
                    />
                  </div>
                </div>

                {/* Zone Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                  {zones.map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setSelectedZone(z)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedZone === z
                          ? "bg-stone-900 text-white shadow-2xs"
                          : "bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200"
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clean Scrollable State Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 max-h-36 overflow-y-auto p-1.5 border border-stone-200/90 rounded-xl bg-white/80">
                {filteredStates.map((st) => (
                  <button
                    type="button"
                    key={st.id}
                    onClick={() => updateField("region", st.name)}
                    className={`p-2 rounded-lg border text-xs font-semibold text-left transition-all cursor-pointer truncate ${
                      formData.region === st.name
                        ? "bg-terracotta-600 text-white border-terracotta-600 shadow-xs font-bold"
                        : "bg-stone-50/60 text-stone-700 border-stone-200 hover:bg-stone-100"
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

            {/* 3. Schedule, Duration & Travelers (2-Column Balanced Card) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200/70 pb-2.5">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-terracotta-600" />
                  <span>3. Schedule, Duration & Travelers</span>
                </label>
                {dateRangeSummary && (
                  <span className="text-[11px] font-bold text-terracotta-800 bg-terracotta-50 border border-terracotta-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    {dateRangeSummary.startText} &rarr; {dateRangeSummary.endText}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                
                {/* Left Column: Start Date & Large Calendar Trigger */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-600">Start Date</span>
                    <span className="text-[10px] font-semibold text-stone-400">Click to change</span>
                  </div>

                  {/* Interactive Date Button */}
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(true)}
                    className="w-full rounded-xl bg-white border-2 border-stone-200 hover:border-terracotta-500 py-2.5 px-3.5 flex items-center justify-between shadow-2xs cursor-pointer transition-all hover:bg-amber-50/20 group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-terracotta-50 group-hover:bg-terracotta-100 text-terracotta-700 flex items-center justify-center transition-colors">
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[9px] text-stone-400 font-bold uppercase">Date</div>
                        <div className="text-xs sm:text-sm font-black text-stone-900" suppressHydrationWarning>
                          {formData.dates ? formatFriendlyDate(formData.dates, true) : "Choose Start Date"}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-terracotta-700 bg-terracotta-50 group-hover:bg-terracotta-100 border border-terracotta-200 px-2.5 py-1 rounded-lg transition-all">
                      Calendar 🗓️
                    </span>
                  </button>

                  {/* Custom Large Interactive Calendar Modal Component */}
                  <CustomLargeCalendar
                    isOpen={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                    selectedDate={formData.dates}
                    durationDays={formData.duration}
                    onSelectDate={(dateStr) => updateField("dates", dateStr)}
                  />

                  {/* Quick Date Shortcuts */}
                  <div className="flex items-center gap-1 overflow-x-auto pt-0.5">
                    {[
                      { label: "Tomorrow", daysAhead: 1 },
                      { label: "This Weekend", daysAhead: Math.max(1, (6 - new Date().getDay() + 7) % 7 || 1) },
                      { label: "+7 Days", daysAhead: 7 },
                      { label: "Next Month", daysAhead: 30 }
                    ].map((preset) => {
                      const d = new Date();
                      d.setDate(d.getDate() + preset.daysAhead);
                      const formatted = d.toISOString().split("T")[0];
                      const isSelected = formData.dates === formatted;
                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => updateField("dates", formatted)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-terracotta-600 text-white border-terracotta-600 shadow-2xs"
                              : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Duration & Travelers */}
                <div className="space-y-3.5">
                  
                  {/* Duration Stepper & Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-stone-600">
                        Duration (Max {maxFeasibleDays}D)
                      </span>
                      <span className="text-[11px] font-bold text-terracotta-700 bg-terracotta-50 px-2 py-0.5 rounded border border-terracotta-200">
                        {formData.duration} {formData.duration === 1 ? "Day" : "Days"} • {Math.max(0, formData.duration - 1)}N
                      </span>
                    </div>

                    {/* Manual Stepper */}
                    <div className="flex items-center justify-between bg-white border border-stone-200 rounded-xl p-1 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateField("duration", Math.max(1, formData.duration - 1))}
                        disabled={formData.duration <= 1}
                        className="h-7 w-7 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 flex items-center justify-center text-stone-800 transition-colors cursor-pointer"
                        title="Decrease days"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>

                      <div className="flex items-center justify-center gap-1">
                        <input
                          type="number"
                          min="1"
                          max={maxFeasibleDays}
                          value={formData.duration}
                          onChange={(e) => updateField("duration", Math.max(1, Math.min(maxFeasibleDays, parseInt(e.target.value, 10) || 1)))}
                          className="w-10 text-center font-black text-sm text-stone-900 focus:outline-none"
                        />
                        <span className="text-[11px] text-stone-500 font-semibold">{formData.duration === 1 ? "Day" : "Days"}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => updateField("duration", Math.min(maxFeasibleDays, formData.duration + 1))}
                        disabled={formData.duration >= maxFeasibleDays}
                        className="h-7 w-7 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 flex items-center justify-center text-stone-800 transition-colors cursor-pointer"
                        title="Increase days"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Range Slider */}
                    <input
                      type="range"
                      min="1"
                      max={maxFeasibleDays}
                      value={Math.min(maxFeasibleDays, formData.duration)}
                      onChange={(e) => updateField("duration", parseInt(e.target.value, 10))}
                      className="w-full accent-terracotta-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Travelers Selector */}
                  <div className="space-y-1 pt-1.5 border-t border-stone-200/70">
                    <label className="text-[11px] font-bold text-stone-600 flex items-center gap-1">
                      <Users className="h-3 w-3 text-terracotta-600" />
                      <span>Travelers & Group Size</span>
                    </label>
                    <select
                      value={formData.travelers}
                      onChange={(e) => updateField("travelers", parseInt(e.target.value, 10))}
                      className="w-full rounded-xl bg-white border border-stone-200 py-1.5 px-3 text-xs font-semibold text-stone-900 focus:border-stone-400 focus:outline-none shadow-2xs"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Traveler (Solo Explorer)" : num === 2 ? "Travelers (Couple / Duo)" : num <= 4 ? `Travelers (Family of ${num})` : `Travelers (Group of ${num})`}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

              </div>

              {/* Dynamic Capacity Guidance Note */}
              {maxFeasibleDays < 7 && formData.region !== "All India" && (
                <div className="text-[10px] text-amber-800 bg-amber-50/90 border border-amber-200/80 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                  <span>✨</span>
                  <span>
                    <strong>{formData.region}</strong> is optimal for <strong>1–{maxFeasibleDays} Days</strong> based on {matchedPlacesCount} curated places in our database.
                  </span>
                </div>
              )}
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
            {/* Trip Blueprint Recap */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">📍</span>
                <span className="font-bold text-stone-900">{formData.region}</span>
                <span className="text-stone-400">•</span>
                <span className="font-bold text-terracotta-700">{formData.duration} Days ({formData.dates ? formatFriendlyDate(formData.dates, false) : "Selected Date"})</span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-600">{formData.travelers} Explorer{formData.travelers > 1 ? "s" : ""}</span>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[11px] font-bold text-terracotta-700 hover:underline cursor-pointer"
              >
                Change State/Days ✏️
              </button>
            </div>

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

          {step === 1 && (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1 py-2.5 px-5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white transition-all cursor-pointer shadow-sm"
            >
              <span>Next: Pacing & Mix &rarr;</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center gap-1 py-2.5 px-5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white transition-all cursor-pointer shadow-sm"
            >
              <span>Next: Dietary & Stays (Step 3) &rarr;</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}

          {step === 3 && (
            <button
              type="submit"
              className="flex items-center gap-1.5 py-2.5 px-6 rounded-xl text-xs font-bold bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <span>🚀 Generate {formData.duration}D {formData.region} Yatra</span>
              <Sparkles className="h-4 w-4 text-amber-200" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
