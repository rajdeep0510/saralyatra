"use client";

import React, { useState, useRef, useMemo, useCallback } from "react";
import { X, ZoomIn, ZoomOut, RotateCw, Move, Navigation, Maximize2, Minimize2, Compass, MapPin } from "lucide-react";
import { translations } from "@/data/mockData";
import { LanguageCode, Monument } from "@/types";
import ThreeJsPanoramaViewer, { Hotspot3D } from "./ThreeJsPanoramaViewer";

interface PanoramaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  monument: Monument | null;
  currentLang: LanguageCode;
}

// Fallback high-fidelity equirectangular 360 sphere textures categorized by environment (CORS-enabled)
const DEFAULT_360_PANORAMAS: Record<string, string> = {
  heritage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=80",
  spiritual: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2400&q=80",
  nature: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80",
  adventure: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2400&q=80",
  default: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=80"
};

export default function PanoramaViewerModal({
  isOpen,
  onClose,
  monument,
  currentLang
}: PanoramaViewerModalProps) {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [headingData, setHeadingData] = useState<{ heading: number; pitch: number; fov: number }>({
    heading: 180,
    pitch: 0,
    fov: 75
  });

  const t = translations[currentLang] || translations.en;

  // Toggle Native Fullscreen
  const toggleFullscreen = async () => {
    if (!modalContainerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await modalContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch { }
  };

  // Generate strict 1-to-1 Hotspots specific to this active monument
  const monumentHotspots: Hotspot3D[] = useMemo(() => {
    if (!monument) return [];

    const spots: Hotspot3D[] = [];

    // Hotspot 1: Primary Sanctum / Architecture Landmark
    const story = monument.folklore?.[currentLang] || monument.folklore?.en || `${monument.name} in ${monument.state}.`;
    spots.push({
      id: `${monument.id}-spot-1`,
      yaw: 180,
      pitch: 2,
      title: `${monument.name} Sanctum`,
      description: story
    });

    // Hotspot 2: Architectural Details & Inscriptions
    spots.push({
      id: `${monument.id}-spot-2`,
      yaw: 120,
      pitch: 18,
      title: "Monumental Architecture",
      description: `Intricately preserved structures in ${monument.state}. Recognized for sacred geometry and historic artistry.`
    });

    // Hotspot 3: Sacred Surrounding / Landscape
    spots.push({
      id: `${monument.id}-spot-3`,
      yaw: 250,
      pitch: -6,
      title: "Surrounding Periphery",
      description: `Elevated vantage point overlooking the sacred grounds of ${monument.city || monument.state}.`
    });

    return spots;
  }, [monument]);

  // Determine exact 360 panorama URL with strict 1-to-1 mapping guarantee
  const { panoramaSrc, fallbackSrc } = useMemo(() => {
    if (!monument) return { panoramaSrc: "", fallbackSrc: "" };

    const categoryKey = monument.category || "heritage";
    const categoryFallback = DEFAULT_360_PANORAMAS[categoryKey] || DEFAULT_360_PANORAMAS.default;

    const hasValidPanorama =
      monument.panoramaUrl &&
      !monument.panoramaUrl.includes("example.com") &&
      !monument.panoramaUrl.includes("wikimedia.org") &&
      (monument.panoramaUrl.startsWith("http://") || monument.panoramaUrl.startsWith("https://"));

    const primary = hasValidPanorama ? monument.panoramaUrl! : (monument.imageUrl || categoryFallback);
    const fallback = monument.imageUrl || categoryFallback;

    return {
      panoramaSrc: primary,
      fallbackSrc: fallback
    };
  }, [monument]);

  // Memoized Heading Change Callback
  const handleHeadingChange = useCallback((h: number, p: number, fov: number) => {
    setHeadingData({ heading: h, pitch: p, fov });
  }, []);

  if (!isOpen || !monument) return null;

  // Convert degrees to cardinal compass point
  const getCardinalDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-2 sm:p-6 animate-in fade-in duration-200">
      <div
        ref={modalContainerRef}
        className={`relative w-full max-w-5xl rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen ? "h-screen max-w-none rounded-none" : "h-[85vh]"
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-900/95 border-b border-stone-800/80 z-20 text-white">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-terracotta-500/20 text-terracotta-400 border border-terracotta-500/30 flex items-center justify-center font-bold">
              <Navigation className="h-4.5 w-4.5 rotate-45 text-terracotta-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-serif font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{monument.name}</span>
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-terracotta-500/20 text-terracotta-300 border border-terracotta-500/40">
                  WebGL 360° VR
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 text-terracotta-400" />
                <span>{monument.city ? `${monument.city}, ` : ""}{monument.state}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Compass Heading Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 text-stone-300 text-xs font-mono border border-stone-700">
              <Compass className="h-3.5 w-3.5 text-amber-400" />
              <span>{headingData.heading}° {getCardinalDirection(headingData.heading)}</span>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="rounded-xl bg-stone-800 p-2 text-stone-300 border border-stone-700 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-xl bg-stone-800 p-2 text-stone-300 border border-stone-700 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
              title="Close 360 View"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Panoramic 3D WebGL Viewer */}
        <div className="flex-1 relative overflow-hidden bg-stone-950">
          <ThreeJsPanoramaViewer
            key={monument.id}
            panoramaUrl={panoramaSrc}
            fallbackUrl={fallbackSrc}
            initialHeading={180}
            initialPitch={0}
            hotspots={monumentHotspots}
            isAutoRotating={isAutoRotating}
            onHeadingChange={handleHeadingChange}
          />

          {/* User Gesture Hint Badge */}
          <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur border border-stone-700 text-stone-200 rounded-full px-3 py-1.5 flex items-center gap-2 text-[11px] font-semibold pointer-events-none shadow-lg z-10">
            <Move className="h-3.5 w-3.5 text-terracotta-400" />
            <span>Drag in any direction • Scroll to zoom</span>
          </div>
        </div>

        {/* Interactive Bottom Control Toolbar */}
        <div className="px-5 py-3 bg-stone-900/95 border-t border-stone-800/80 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400 font-medium hidden sm:inline-block">
              {monument.name} • 360° Ground Inspection
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Auto Rotate Button */}
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isAutoRotating
                  ? "bg-terracotta-600 hover:bg-terracotta-700 text-white border-terracotta-500 shadow-xs"
                  : "bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700"
              }`}
            >
              <RotateCw className={`h-3.5 w-3.5 ${isAutoRotating ? "animate-spin" : ""}`} />
              <span>{isAutoRotating ? "Auto-Rotate ON" : "Auto-Rotate OFF"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
