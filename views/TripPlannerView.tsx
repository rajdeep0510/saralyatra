"use client";

import React, { useState } from "react";
import { monuments } from "@/data/mockData";
import { generateDynamicItinerary } from "@/utils/tripEngine";
import { FilterPreferences, LanguageCode, PreloadedTrip } from "@/types";
import { ArrowRight, Sparkles, Map, Route, Clock, Users, MapPin, CheckCircle2, Lock, ShieldCheck, Headphones, Compass, Heart, HelpCircle, ChevronDown, ChevronUp, Star, Globe } from "lucide-react";
import PreferenceWizard from "@/components/planner/PreferenceWizard";
import CulturalAtmosphereHero from "@/components/layout/CulturalAtmosphereHero";

interface TripPlannerViewProps {
  currentLang: LanguageCode;
  activeTrip: PreloadedTrip | null;
  setActiveTrip: (trip: PreloadedTrip) => void;
  setActiveStopId: (id: string) => void;
  filterPreferences: FilterPreferences | null;
  setFilterPreferences: (prefs: FilterPreferences) => void;
  onNavigateToItinerary: () => void;
  onLoadPresetTrip: (key: string) => void;
}

export default function TripPlannerView({
  currentLang,
  activeTrip,
  setActiveTrip,
  setActiveStopId,
  filterPreferences,
  setFilterPreferences,
  onNavigateToItinerary,
  onLoadPresetTrip
}: TripPlannerViewProps) {
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardDraft, setWizardDraft] = useState<FilterPreferences | null>(() => filterPreferences || null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sync draft if filterPreferences change
  React.useEffect(() => {
    if (filterPreferences) {
      setWizardDraft(filterPreferences);
    }
  }, [filterPreferences]);

  const handleStepChange = (step: number, currentFormData: FilterPreferences) => {
    setWizardStep(step);
    setWizardDraft(currentFormData);
  };

  const handleGenerateTrip = (formData: FilterPreferences) => {
    if (setFilterPreferences) {
      setFilterPreferences(formData);
    }

    // Algorithmic synthesis for ANY state/region and category
    const generatedTrip = generateDynamicItinerary(formData, monuments);
    setActiveTrip(generatedTrip);

    if (generatedTrip.itinerary[0]?.stops[0]) {
      setActiveStopId(generatedTrip.itinerary[0].stops[0].id);
    }

    // Automatically navigate to the dedicated Itinerary & Live Map view upon generation
    onNavigateToItinerary();
  };

  const faqs = [
    {
      q: "How does the AI Engine generate custom multi-day circuits?",
      a: "Our algorithmic engine filters over 100+ curated Indian destinations based on your chosen theme and state. It calculates haversine driving distances, spaces out sightseeing based on your pacing (Relaxed, Moderate, or Intensive), and injects certified regional meal checkpoints."
    },
    {
      q: "Can I add or delete specific places after generating the trip?",
      a: "Yes! In the 'Itinerary & Live Map' view, you can delete any stop with a single click, or tap '+ Add Destination' to search and add any attraction in your trip's state. Distances and driving times recalculate instantly."
    },
    {
      q: "How are dietary preferences (Pure Veg, Jain, Halal) guaranteed?",
      a: "The engine pairs each day's schedule with verified local restaurants and homestays that observe strict separate kitchens (e.g. zero onion/garlic/root veggies for Jain dining, or 100% pure vegetarian facilities)."
    },
    {
      q: "Which languages and Indic dialects are supported for voice lore?",
      a: "We currently support English, Hindi (हिन्दी), Marathi (मराठी), Gujarati (ગુજરાતી), Bengali (বাংলা), and Tamil (தமிழ்) with native audio narration and folklore."
    }
  ];

  return (
    <div className="space-y-12 py-6 animate-in fade-in duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Header with Cultural Atmosphere & Badges */}
      <CulturalAtmosphereHero className="rounded-3xl border border-stone-200 shadow-xs bg-white/90 p-6 sm:p-8">
        
        {/* Floating Badges */}
        <div className="hidden md:flex items-center gap-3 absolute top-6 right-6 z-10">
          <div className="rotate-2 bg-white px-3 py-1.5 rounded-2xl border border-amber-300 shadow-xs flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <span>✨</span>
            <span>AI Dynamic Synthesis</span>
          </div>
          <div className="-rotate-2 bg-white px-3 py-1.5 rounded-2xl border border-emerald-300 shadow-xs flex items-center gap-1.5 text-xs font-bold text-emerald-900">
            <span>🇮🇳</span>
            <span>Pan-India 28 States</span>
          </div>
        </div>

        <div className="max-w-3xl space-y-2 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700">
            AI Journey Architect Studio
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">
            Universal Trip Planner
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed max-w-2xl">
            Configure your travel theme across Nature, Pilgrimage, Heritage, or Adventure. Choose any Indian state, pick your calendar dates, and customize your duration.
          </p>
        </div>
      </CulturalAtmosphereHero>

      {/* 2. Main Studio Grid (Wizard + Blueprint Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 3-Step Preference Wizard (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <PreferenceWizard
            currentLang={currentLang}
            initialPreferences={filterPreferences}
            onGenerate={handleGenerateTrip}
            onStepChange={handleStepChange}
          />
        </div>

        {/* Right Column: Blueprint Preview & Presets (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* CONDITION 1: Step 1 Active - Blueprint is Locked until user selects State/Days/Travelers and taps Next */}
          {wizardStep === 1 ? (
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-stone-400" />
                  <span>Itinerary Blueprint Preview</span>
                </span>
                <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
                  Step 1 in Progress
                </span>
              </div>

              <div className="py-4 text-center space-y-2.5">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto text-xl shadow-2xs">
                  🗺️
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Awaiting Trip Details
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Choose your <strong>Theme</strong>, <strong>State</strong>, <strong>Dates & Duration</strong>, and <strong>Travelers</strong> on the left, then tap <strong className="text-stone-800">&quot;Next&quot;</strong> to generate your real-time blueprint.
                </p>
              </div>

              {/* Progress Checklist */}
              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-2 text-stone-700">
                  <span className="h-2 w-2 rounded-full bg-terracotta-600 animate-pulse" />
                  <span className="font-medium">1. Select Travel Theme & State</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <span className="h-2 w-2 rounded-full bg-terracotta-600 animate-pulse" />
                  <span className="font-medium">2. Pick Start Date & Custom Duration</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <span className="h-2 w-2 rounded-full bg-stone-300" />
                  <span>3. Unlock Live Route Preview in Step 2</span>
                </div>
              </div>
            </div>
          ) : (
            /* CONDITION 2: Step 2 or 3 Active - Blueprint is unlocked with the user's selected state, duration, and travelers! */
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Active Blueprint Preview</span>
                </span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>{wizardDraft?.duration || 3} Days Planned</span>
                </span>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  {wizardDraft?.duration || 3}-Day {wizardDraft?.region || "Custom"} Journey
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-1">
                  <span className="flex items-center gap-1 font-semibold text-stone-800">
                    <MapPin className="h-3.5 w-3.5 text-terracotta-600" />
                    <span>{wizardDraft?.region}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-stone-800">
                    <Users className="h-3.5 w-3.5 text-terracotta-600" />
                    <span>{wizardDraft?.travelers} Travelers</span>
                  </span>
                  <span>•</span>
                  <span className="capitalize font-semibold text-stone-800">
                    {wizardDraft?.category === "all" ? "All Themes" : `${wizardDraft?.category} Theme`}
                  </span>
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                  <Route className="h-4 w-4 text-terracotta-600 shrink-0" />
                  <div>
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">Est. Circuit</div>
                    <div className="font-bold text-stone-800">{((wizardDraft?.duration || 3) * 60)} km route</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                  <Clock className="h-4 w-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">Pacing</div>
                    <div className="font-bold text-stone-800">{wizardDraft?.pacing || "Moderate"}</div>
                  </div>
                </div>
              </div>

              {/* Step 3 Completion Guidance or Generate CTA */}
              {wizardStep === 3 ? (
                <button
                  onClick={() => wizardDraft && handleGenerateTrip(wizardDraft)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer group mt-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Final {wizardDraft?.duration}D {wizardDraft?.region} Itinerary</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-center space-y-1 mt-2">
                  <div className="text-[11px] font-bold text-amber-900 flex items-center justify-center gap-1">
                    <span>✨</span>
                    <span>Step {wizardStep} of 3 in Progress</span>
                  </div>
                  <p className="text-[10px] text-amber-700 leading-tight">
                    Complete all 3 customization steps to unlock your live route & map blueprint.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quick-Load Curated Circuit Presets */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Inspiration & Presets
              </span>
              <h4 className="font-serif text-base font-bold text-stone-900 mt-0.5">
                Popular State Circuits
              </h4>
            </div>

            <div className="space-y-2">
              {[
                { id: "kerala", title: "3-Day Kerala Nature & Backwaters", tag: "Nature", state: "Kerala", emoji: "🌿" },
                { id: "rajasthan", title: "3-Day Rajasthan Royal Forts", tag: "Heritage", state: "Rajasthan", emoji: "🏰" },
                { id: "varanasi", title: "3-Day Kashi & Sarnath Pilgrimage", tag: "Spiritual", state: "Uttar Pradesh", emoji: "🛕" },
              ].map((circuit) => (
                <button
                  key={circuit.id}
                  onClick={() => onLoadPresetTrip(circuit.id)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-stone-200 hover:border-stone-400 bg-stone-50/50 hover:bg-white text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{circuit.emoji}</span>
                    <div>
                      <div className="text-xs font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors">
                        {circuit.title}
                      </div>
                      <div className="text-[10px] text-stone-400 font-medium">
                        {circuit.state} • {circuit.tag}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. Cheerful Indian Tourism & Travel Stickers Ribbon */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Travel Perks & Guarantee Seals
          </span>
          <span className="text-[11px] text-stone-400">100% Tailored for Indian Families</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-2.5 rotate-[-0.5deg] hover:rotate-0 hover:scale-102 transition-all">
            <span className="text-xl">🦚</span>
            <div>
              <span className="text-xs font-bold text-amber-900 block">Pride of Bharat</span>
              <span className="text-[10px] text-amber-700">100+ Heritage Jewels</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-2.5 rotate-[0.5deg] hover:rotate-0 hover:scale-102 transition-all">
            <span className="text-xl">🥗</span>
            <div>
              <span className="text-xs font-bold text-emerald-900 block">Verified Kitchens</span>
              <span className="text-[10px] text-emerald-700">Jain & Pure Veg Ready</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-orange-50/80 border border-orange-200/80 flex items-center gap-2.5 rotate-[-0.5deg] hover:rotate-0 hover:scale-102 transition-all">
            <span className="text-xl">🪔</span>
            <div>
              <span className="text-xs font-bold text-orange-900 block">Indic Oral Lore</span>
              <span className="text-[10px] text-orange-700">6 Native Dialects</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-cyan-50/80 border border-cyan-200/80 flex items-center gap-2.5 rotate-[0.5deg] hover:rotate-0 hover:scale-102 transition-all">
            <span className="text-xl">🗺️</span>
            <div>
              <span className="text-xs font-bold text-cyan-900 block">Smart Polylines</span>
              <span className="text-[10px] text-cyan-700">Live Distance & Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Intelligent Architecture Pillar Cards (Fills lower scroll space elegantly) */}
      <div className="space-y-4 pt-2">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700">
            How Saral Yatra Works
          </span>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Engineered for Mindful, Seamless Travel
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3 hover:border-terracotta-400 transition-colors">
            <div className="h-10 w-10 rounded-2xl bg-terracotta-50 text-terracotta-700 border border-terracotta-200 flex items-center justify-center">
              <Route className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900">
              1. Haversine Circuit Routing
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every itinerary calculates real road coordinates to ensure you never waste hours zigzagging. Attractions are grouped into optimal morning, afternoon, and sunset clusters.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3 hover:border-emerald-400 transition-colors">
            <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900">
              2. Cultural & Dietary Assurance
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Travel comfortably without dining worries. Jain satvik and 100% pure veg restaurants are automatically mapped along your route with zero detour hassle.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3 hover:border-amber-400 transition-colors">
            <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Headphones className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900">
              3. Vernacular Audio & 360° Lore
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Experience the soul of every ancient fort and sacred ghat with authentic oral folklore narrated in Hindi, Marathi, Gujarati, Bengali, Tamil, or English.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Frequently Asked Questions Accordion */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-terracotta-600" />
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="divide-y divide-stone-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
              >
                <span className="text-xs sm:text-sm font-bold text-stone-800 group-hover:text-terracotta-700 transition-colors">
                  {faq.q}
                </span>
                {openFaq === idx ? (
                  <ChevronUp className="h-4 w-4 text-terracotta-600 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-stone-400 group-hover:text-stone-700 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <p className="text-xs text-stone-600 mt-2 leading-relaxed animate-in fade-in duration-200">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
