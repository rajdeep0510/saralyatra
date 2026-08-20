import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Sparkles, MapPin, Calendar, Users, Sliders, ShieldCheck } from "lucide-react";
import { translations } from "../../data/mockData";

export default function PreferenceWizard({ currentLang, onGenerate }) {
  const t = translations[currentLang];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    region: "Gujarat",
    duration: 3,
    dates: "",
    travelers: 2,
    pacing: "Moderate", // Relaxed, Moderate, Intensive
    famousRatio: 60, // Slider value (60% Famous, 40% Offbeat)
    dietary: "pureVeg", // pureVeg, jain, halal
    language: "Gujarati", // Gujarati, Hindi, Tamil, Kannada
    interests: ["Architecture"] // Architecture, Spiritual, Nature, Crafts
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onGenerate) {
      onGenerate(formData);
    }
  };

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
        
        {/* STEP 1: Destination & Dates */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Region selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-terracotta-600" />
                <span>Destination Circuit</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Gujarat", "Karnataka"].map((reg) => (
                  <button
                    type="button"
                    key={reg}
                    onClick={() => updateField("region", reg)}
                    className={`py-3 px-3.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      formData.region === reg
                        ? "bg-stone-900 text-white border-stone-900 shadow-sm font-bold"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {reg === "Gujarat" ? "Gujarat Heritage Trail" : "Hampi Architecture Circuit"}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel dates */}
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
                  onChange={(e) => updateField("travelers", parseInt(e.target.value))}
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 py-2 px-3 text-xs text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? "Traveler" : "Travelers"}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Pacing & Site Mix */}
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
                <span>Site Mix Ratio</span>
                <span className="text-terracotta-700 font-bold">{formData.famousRatio}% Popular / {100 - formData.famousRatio}% Offbeat</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="10"
                value={formData.famousRatio}
                onChange={(e) => updateField("famousRatio", parseInt(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
                <span>Offbeat Treasures</span>
                <span>Balanced</span>
                <span>Iconic Wonders</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Cultural Differentiator Profiling */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Dietary Profiling */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-terracotta-600" />
                <span>Dietary Requirement</span>
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
                    onClick={() => updateField("dietary", d.id)}
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
                Host Language Alignment
              </label>
              <select
                value={formData.language}
                onChange={(e) => updateField("language", e.target.value)}
                className="w-full rounded-xl bg-stone-50 border border-stone-200 py-2 px-3 text-xs text-stone-900 focus:border-stone-400 focus:bg-white focus:outline-none"
              >
                <option value="Gujarati">Gujarati</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Kannada">Kannada</option>
              </select>
            </div>

            {/* Heritage interests */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700">
                Heritage Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {["Architecture", "Spiritual", "Nature", "Crafts"].map((interest) => {
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
