"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Sparkles, MapPin, Calendar, Users, Sliders, ShieldCheck, Trees, Flame, Landmark, Mountain, Layers } from "lucide-react";
import { translations } from "@/data/mockData";
import { DietaryType, FilterPreferences, LanguageCode, TripCategory } from "@/types";

interface PreferenceWizardProps {
  currentLang: LanguageCode;
  onGenerate?: (formData: FilterPreferences) => void;
}

export default function PreferenceWizard({ currentLang, onGenerate }: PreferenceWizardProps) {
  const t = translations[currentLang] || translations.en;
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FilterPreferences>({
    category: "nature",
    region: "Kerala",
    duration: 3,
    dates: "",
    travelers: 2,
    pacing: "Moderate",
    famousRatio: 70,
    dietary: "pureVeg",
    language: "Hindi",
    interests: ["Nature", "Scenic"]
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const updateField = <K extends keyof FilterPreferences>(field: K, value: FilterPreferences[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
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
    { id: "nature", label: "Nature & Scenic", icon: Trees },
    { id: "spiritual", label: "Spiritual & Pilgrimage", icon: Flame },
    { id: "heritage", label: "Heritage & Culture", icon: Landmark },
    { id: "adventure", label: "Adventure & Wildlife", icon: Mountain },
  ];

  const regionsByCategory: Record<string, { id: string; name: string }[]> = {
    nature: [
      { id: "Kerala", name: "Kerala Valleys & Backwaters" },
      { id: "Karnataka", name: "Coorg & Western Ghats" },
    ],
    spiritual: [
      { id: "Uttar Pradesh", name: "Varanasi & Sarnath" },
      { id: "Gujarat", name: "Somnath & Dwarka Trail" },
    ],
    heritage: [
      { id: "Gujarat", name: "Gujarat Stepwells & Temples" },
      { id: "Karnataka", name: "Hampi Architectural Ruins" },
    ],
    adventure: [
      { id: "Karnataka", name: "Hampi & Daroji Wilderness" },
      { id: "Kerala", name: "Periyar & Anamudi Trails" },
    ],
  };

  const currentRegions = regionsByCategory[formData.category || "nature"] || regionsByCategory.nature;

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden">
      {/* Wizard Banner Header */}
      <div className="bg-stone-50/80 p-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-terracotta-700 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="h-4 w-4" />
          <span>Step {step} of 3</span>
        </div>
        <h3 className="text-lg font-serif font-bold text-stone-900">
          {t.plannerTitle}
        </h3>
        <p className="text-xs text-stone-500 mt-1 font-normal leading-relaxed">{t.plannerSub}</p>
        
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
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* STEP 1: Experience Category, Destination & Dates */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Category selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-terracotta-600" />
                <span>Choose Journey Theme</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = formData.category === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => {
                        updateField("category", cat.id);
                        const defaultRegion = (regionsByCategory[cat.id] && regionsByCategory[cat.id][0].id) || "Kerala";
                        updateField("region", defaultRegion);
                      }}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
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

            {/* Region selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-terracotta-600" />
                <span>Destination Circuit</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentRegions.map((reg) => (
                  <button
                    type="button"
                    key={reg.id}
                    onClick={() => updateField("region", reg.id)}
                    className={`py-3 px-3.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      formData.region === reg.id
                        ? "bg-terracotta-50 text-terracotta-800 border-terracotta-400 shadow-sm font-bold"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {reg.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel dates & Travelers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-terracotta-600" />
                  <span>Start Date</span>
                </label>
                <input
                  type="date"
                  value={formData.dates}
                  onChange={(e) => updateField("dates", e.target.value)}
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 py-2 px-3 text-xs text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-terracotta-600" />
                  <span>Travelers</span>
                </label>
                <select
                  value={formData.travelers}
                  onChange={(e) => updateField("travelers", parseInt(e.target.value, 10))}
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 py-2 px-3 text-xs text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? "Traveler" : "Travelers"}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Pacing & Experience Mix */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Trip Pacing */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-terracotta-600" />
                <span>Trip Pacing</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Relaxed", "Moderate", "Intensive"].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => updateField("pacing", p)}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                      formData.pacing === p
                        ? "bg-stone-900 text-white border-stone-900 shadow-sm font-bold"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Site Mix Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-bold text-stone-700">
                <span>Experience Balance</span>
                <span className="text-terracotta-700 font-bold">{formData.famousRatio}% Popular Highlights / {100 - formData.famousRatio}% Offbeat Gems</span>
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
                <span>Hidden & Peaceful</span>
                <span>Balanced</span>
                <span>Iconic Landmarks</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Dietary & Stay Style Profiling */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Dietary Profiling */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-terracotta-600" />
                <span>Dietary Preference</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "pureVeg", label: "Pure Veg" },
                  { id: "jain", label: "Jain Kitchen" },
                  { id: "halal", label: "Halal Ready" }
                ].map((d) => (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => updateField("dietary", d.id as DietaryType)}
                    className={`py-2 px-1 rounded-lg border text-xs font-semibold text-center transition-all ${
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
              <label className="text-xs font-bold text-stone-700">
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
                <option value="English">English</option>
              </select>
            </div>

            {/* Specific Experience Interests */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700">
                Experience Focus
              </label>
              <div className="flex flex-wrap gap-2">
                {["Waterfalls", "Tea Gardens", "Temple Rituals", "Architecture", "Wildlife", "Folk Arts", "Boating"].map((interest) => {
                  const isSelected = formData.interests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
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
                : "text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200"
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
              className="flex items-center gap-1.5 py-2 px-5 rounded-xl text-xs font-bold bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-sm transition-all cursor-pointer"
            >
              <span>{t.generate || "Generate Custom Yatra"}</span>
              <Sparkles className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
