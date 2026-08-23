"use client";

import React from "react";
import HomestayCard from "@/components/homestays/HomestayCard";
import { translations } from "@/data/mockData";
import { useTravel } from "@/context/TravelContext";

export default function HomestaysPage() {
  const { currentLang, getFilteredHomestays } = useTravel();
  const t = translations[currentLang] || translations.en;

  const homestaysList = getFilteredHomestays();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700">
          Verified Community Lodging & Eco-Retreats
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 mt-1">
          {t.homestaysTitle || "Authentic Regional & Nature Homestays"}
        </h2>
        <p className="text-sm text-stone-500 font-normal mt-1 max-w-2xl">
          {t.homestaysSub || "Stay in tea estate bungalows, desert havelis, and sacred river ashrams matching your diet and dialect."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homestaysList.map((home) => (
          <HomestayCard
            key={home.id}
            homestay={home}
            currentLang={currentLang}
          />
        ))}
      </div>
    </div>
  );
}
