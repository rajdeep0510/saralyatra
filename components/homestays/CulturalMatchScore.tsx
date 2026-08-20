"use client";

import React, { useState } from "react";
import { Sparkles, Info } from "lucide-react";
import { CompatibilityScore } from "@/types";

interface CulturalMatchScoreProps {
  score?: CompatibilityScore;
}

export default function CulturalMatchScore({ score }: CulturalMatchScoreProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  if (!score) return null;

  const getScoreColorClass = (val: number) => {
    if (val >= 90) return "text-emerald-800 bg-emerald-50 border-emerald-200";
    if (val >= 75) return "text-amber-800 bg-amber-50 border-amber-200";
    return "text-stone-700 bg-stone-100 border-stone-200";
  };

  const getProgressColor = (val: number) => {
    if (val >= 90) return "bg-emerald-600";
    if (val >= 75) return "bg-amber-600";
    return "bg-stone-600";
  };

  return (
    <div className="relative inline-block">
      {/* Badge Button */}
      <button
        type="button"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold tracking-wide transition-all shadow-xs cursor-pointer ${getScoreColorClass(
          score.overall
        )}`}
      >
        <Sparkles className="h-3 w-3 fill-current" />
        <span>{score.overall}% Match</span>
        <Info className="h-3 w-3 opacity-60" />
      </button>

      {/* Dropdown Tooltip detail panel */}
      {showTooltip && (
        <div className="absolute right-0 bottom-full mb-2.5 z-30 w-60 rounded-2xl bg-white border border-stone-200 p-4 shadow-xl animate-in fade-in duration-200">
          <h5 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3 pb-1 border-b border-stone-100">
            Cultural Compatibility Breakdown
          </h5>

          {/* Breakdown bars */}
          <div className="space-y-2.5">
            {/* Food */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-stone-700 mb-1">
                <span>Dietary Alignment</span>
                <span className="font-bold">{score.food}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${getProgressColor(score.food)}`}
                  style={{ width: `${score.food}%` }}
                />
              </div>
            </div>

            {/* Language */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-stone-700 mb-1">
                <span>Host Dialect Match</span>
                <span className="font-bold">{score.language}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${getProgressColor(score.language)}`}
                  style={{ width: `${score.language}%` }}
                />
              </div>
            </div>

            {/* Heritage Guidance */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-stone-700 mb-1">
                <span>Heritage Guidance</span>
                <span className="font-bold">{score.heritage}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${getProgressColor(score.heritage)}`}
                  style={{ width: `${score.heritage}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-[10px] text-stone-400 mt-3 pt-2 border-t border-stone-100 italic text-right font-normal">
            Dynamically matched to your profile
          </p>
        </div>
      )}
    </div>
  );
}
