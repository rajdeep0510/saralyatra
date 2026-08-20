import React, { useState } from "react";
import { ShieldCheck, Heart, Coffee, Check } from "lucide-react";
import { translations } from "../../data/mockData";
import CulturalMatchScore from "./CulturalMatchScore";

export default function HomestayCard({ homestay, currentLang }) {
  const t = translations[currentLang];
  const [isBooked, setIsBooked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    name,
    hostName,
    hostOrigin,
    languagesSpoken,
    foodSpecialty,
    dietaryReady,
    pricePerNight,
    compatibilityScore,
    about
  } = homestay;

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 3500);
  };

  const getDietaryLabel = () => {
    if (dietaryReady === "jain") return t.jainKitchen || "Separate Jain Kitchen";
    if (dietaryReady === "pureVeg") return t.pureVegKitchen || "100% Pure Vegetarian";
    return t.halalKitchen || "Halal Certified Kitchen";
  };

  return (
    <div className="rounded-2xl bg-white border border-stone-200 p-6 hover:border-stone-300 hover:shadow-[0_12px_28px_rgba(28,25,23,0.06)] transition-all duration-300 flex flex-col justify-between gap-5 relative">
      
      {/* Top section */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h4 className="text-lg font-serif font-bold text-stone-900">{name}</h4>
            <p className="text-xs text-stone-500 font-normal mt-0.5">
              Host: <span className="text-stone-800 font-semibold">{hostName}</span> ({hostOrigin})
            </p>
          </div>
          
          {/* Match Score Indicator */}
          <CulturalMatchScore score={compatibilityScore} />
        </div>

        {/* About description */}
        <p className="text-xs text-stone-600 font-normal leading-relaxed mb-4">
          {about}
        </p>

        {/* Host Details Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100 text-xs">
          {/* Languages Spoken */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
              {t.hostDialect || "Host Languages"}
            </span>
            <div className="flex flex-wrap gap-1">
              {languagesSpoken.map((lang) => (
                <span 
                  key={lang} 
                  className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-medium text-[11px]"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Culinary Specialties */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
              {t.dietarySafety || "Dietary Readiness"}
            </span>
            <span className="flex items-center gap-1.5 text-stone-800 font-semibold text-[11px]">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{getDietaryLabel()}</span>
            </span>
          </div>
        </div>

        {/* Signature Dishes Card */}
        <div className="mt-4 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs flex items-start gap-2.5">
          <Coffee className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-stone-800 block mb-0.5">Signature Dishes:</span>
            <span className="text-stone-600 leading-relaxed font-normal">{foodSpecialty}</span>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100">
        <div>
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-bold">Price / Night</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-serif font-black text-stone-900">₹{pricePerNight}</span>
            <span className="text-[10px] text-stone-400">all incl.</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2.5 rounded-xl border transition-all ${
              isSaved
                ? "bg-rose-50 text-rose-600 border-rose-200"
                : "bg-stone-50 text-stone-400 border-stone-200 hover:text-stone-700"
            }`}
            title="Save Homestay"
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-rose-600" : ""}`} />
          </button>

          <button
            onClick={handleBook}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isBooked
                ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                : "bg-stone-900 hover:bg-stone-800 text-white cursor-pointer"
            }`}
          >
            {isBooked ? (
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" />
                <span>Reserved!</span>
              </span>
            ) : (
              t.bookNow || "Book Homestay"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
