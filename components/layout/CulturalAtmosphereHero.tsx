"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Sparkles, Sun, Moon, Sunrise, Sunset } from "lucide-react";

export type AtmosphereMode = "auto" | "dawn" | "day" | "dusk" | "night";

interface CulturalAtmosphereHeroProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CulturalAtmosphereHero({
  className = "",
  children
}: CulturalAtmosphereHeroProps) {
  const [mode, setMode] = useState<AtmosphereMode>("auto");
  const [currentHour, setCurrentHour] = useState<number>(12);

  // Sync current local hour on client
  useEffect(() => {
    const h = new Date().getHours();
    setCurrentHour(h);
  }, []);

  // Compute active theme based on mode or hour
  const activeAtmosphere = useMemo(() => {
    if (mode !== "auto") return mode;
    if (currentHour >= 5 && currentHour < 8) return "dawn";
    if (currentHour >= 8 && currentHour < 17) return "day";
    if (currentHour >= 17 && currentHour < 20) return "dusk";
    return "night";
  }, [mode, currentHour]);

  const atmosphereData = useMemo(() => {
    switch (activeAtmosphere) {
      case "dawn":
        return {
          label: "Bhor • Sacred Sunrise",
          icon: Sunrise,
          badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
          gradient: "from-rose-500/10 via-amber-500/10 to-orange-400/5",
          particles: "bg-amber-400/30",
          glowColor: "rgba(251, 146, 60, 0.15)"
        };
      case "dusk":
        return {
          label: "Godhuli • Twilight Dusk",
          icon: Sunset,
          badgeColor: "bg-orange-100 text-orange-900 border-orange-300",
          gradient: "from-terracotta-700/15 via-amber-600/10 to-purple-900/10",
          particles: "bg-orange-400/30",
          glowColor: "rgba(194, 65, 12, 0.18)"
        };
      case "night":
        return {
          label: "Ratri • Starlight Night",
          icon: Moon,
          badgeColor: "bg-indigo-950 text-indigo-200 border-indigo-700",
          gradient: "from-indigo-950/20 via-stone-900/15 to-amber-500/5",
          particles: "bg-amber-200/40",
          glowColor: "rgba(99, 102, 241, 0.12)"
        };
      default:
        return {
          label: "Divas • Golden Sunlight",
          icon: Sun,
          badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
          gradient: "from-amber-400/10 via-stone-50/20 to-terracotta-500/5",
          particles: "bg-amber-400/20",
          glowColor: "rgba(245, 158, 11, 0.12)"
        };
    }
  }, [activeAtmosphere]);

  const Icon = atmosphereData.icon;

  const cycleMode = () => {
    const modes: AtmosphereMode[] = ["auto", "dawn", "day", "dusk", "night"];
    const nextIdx = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[nextIdx]);
  };

  return (
    <div className={`relative overflow-hidden transition-all duration-700 ${className}`}>
      {/* Dynamic Ambient Horizon Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${atmosphereData.gradient} pointer-events-none transition-all duration-1000`}
      />

      {/* Ambient Light Orbs */}
      <div
        className="absolute -top-16 -right-16 h-64 w-64 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: atmosphereData.glowColor }}
      />
      <div
        className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: atmosphereData.glowColor }}
      />

      {/* Floating Starlight / Diya Sparkles (Rendered only on Client to avoid hydration issues) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "15%", left: "10%", size: 4, delay: 0 },
          { top: "25%", left: "80%", size: 6, delay: 1.2 },
          { top: "70%", left: "20%", size: 5, delay: 2.1 },
          { top: "60%", left: "75%", size: 4, delay: 0.8 },
          { top: "40%", left: "90%", size: 5, delay: 1.7 }
        ].map((p, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full ${atmosphereData.particles} pointer-events-none`}
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationName: "pulse",
              animationDuration: `${2.5 + (idx % 3)}s`,
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              animationIterationCount: "infinite",
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Ambient Atmosphere Mode Badge Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={cycleMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md transition-all cursor-pointer shadow-2xs hover:scale-105 ${atmosphereData.badgeColor}`}
          title="Click to cycle dynamic cultural atmosphere lighting"
        >
          <Icon className="h-3 w-3" />
          <span>{atmosphereData.label}</span>
          <Sparkles className="h-2.5 w-2.5 opacity-60" />
        </button>
      </div>

      {/* Child Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
