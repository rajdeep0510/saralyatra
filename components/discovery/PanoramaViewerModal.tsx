"use client";

import React, { useState, useRef, useMemo } from "react";
import { X, Navigation, Maximize2, Minimize2, MapPin, Globe, Satellite, Eye, ExternalLink, Move } from "lucide-react";
import { translations } from "@/data/mockData";
import { LanguageCode, Monument } from "@/types";

interface PanoramaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  monument: Monument | null;
  currentLang: LanguageCode;
}

export default function PanoramaViewerModal({
  isOpen,
  onClose,
  monument,
  currentLang
}: PanoramaViewerModalProps) {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeMode, setActiveMode] = useState<"satellite" | "streetview">("satellite");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

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

  // Determine exact 360 & satellite URLs
  const { streetViewEmbedUrl, satelliteEmbedUrl, googleEarthUrl, googleMapsUrl } = useMemo(() => {
    if (!monument) return { streetViewEmbedUrl: "", satelliteEmbedUrl: "", googleEarthUrl: "", googleMapsUrl: "" };

    const lat = monument.coordinates?.lat || 20.5937;
    const lng = monument.coordinates?.lng || 78.9629;
    const query = `${monument.name}, ${monument.city ? monument.city + ", " : ""}${monument.state}`;

    // 1. Google Satellite 3D Embed (100% reliable, crystal-clear high-res terrain)
    const satUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&ll=${lat},${lng}&t=k&z=18&ie=UTF8&iwloc=&output=embed`;

    // 2. Google Street View official embed (if API key available or custom 360 tour URL)
    const apiKey = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : undefined;
    let streetUrl = monument.panoramaUrl || "";
    if (apiKey) {
      streetUrl = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${lng}&heading=180&pitch=0&fov=80`;
    } else if (!streetUrl || streetUrl === monument.imageUrl) {
      streetUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&ll=${lat},${lng}&layer=c&cbll=${lat},${lng}&cbp=12,180,,0,0&output=svembed`;
    }

    // 3. Google Earth 3D Flyover
    const earthUrl = `https://earth.google.com/web/search/${encodeURIComponent(monument.name + " " + monument.state)}/@${lat},${lng},300a,35d,35y,0h,45t,0r`;

    // 4. Direct Fullscreen Google Maps Street View Pano
    const mapsPanoUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;

    return {
      streetViewEmbedUrl: streetUrl,
      satelliteEmbedUrl: satUrl,
      googleEarthUrl: earthUrl,
      googleMapsUrl: mapsPanoUrl
    };
  }, [monument]);

  if (!isOpen || !monument) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-2 sm:p-6 animate-in fade-in duration-200">
      <div
        ref={modalContainerRef}
        className={`relative w-full max-w-5xl rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen ? "h-screen max-w-none rounded-none" : "h-[88vh]"
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-stone-900/95 border-b border-stone-800 z-20 text-white flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-terracotta-500/20 text-terracotta-400 border border-terracotta-500/30 flex items-center justify-center font-bold shrink-0">
              <Navigation className="h-4.5 w-4.5 rotate-45 text-terracotta-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-serif font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{monument.name}</span>
                </h3>
              </div>
              <p className="text-[11px] text-stone-400 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 text-terracotta-400" />
                <span>{monument.city ? `${monument.city}, ` : ""}{monument.state}</span>
                <span className="text-stone-600">•</span>
                <span className="font-mono text-stone-400 text-[10px]">
                  {monument.coordinates.lat.toFixed(4)}°N, {monument.coordinates.lng.toFixed(4)}°E
                </span>
              </p>
            </div>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-1.5 bg-stone-950/80 p-1 rounded-2xl border border-stone-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveMode("satellite")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMode === "satellite"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <Satellite className="h-3.5 w-3.5" />
              <span>3D Satellite Earth</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("streetview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeMode === "streetview"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>360° Street View</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Dynamic Multi-Mode Panoramic / Satellite View Container */}
        <div className="flex-1 relative overflow-hidden bg-stone-950">
          
          {/* MODE 1: Google 3D Satellite Earth Embed */}
          {activeMode === "satellite" && (
            <div className="w-full h-full relative">
              <iframe
                src={satelliteEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title={`Satellite 3D view of ${monument.name}`}
              />

              <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur border border-stone-700 text-stone-200 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[11px] font-semibold pointer-events-none shadow-lg z-10">
                <Satellite className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                <span>Live High-Resolution 3D Satellite Imagery • Zoom & Pan to explore topography</span>
              </div>
            </div>
          )}

          {/* MODE 2: Google Street View / 360 Tour Embed */}
          {activeMode === "streetview" && (
            <div className="w-full h-full relative">
              <iframe
                src={streetViewEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; gyroscope; magnetometer; camera; vr"
                loading="lazy"
                title={`360 Street View of ${monument.name}`}
              />

              <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur border border-stone-700 text-stone-200 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[11px] font-semibold pointer-events-none shadow-lg z-10">
                <Move className="h-3.5 w-3.5 text-amber-400" />
                <span>Interactive 360° Walkthrough • Click & Drag across the temple grounds</span>
              </div>
            </div>
          )}

        </div>

        {/* Interactive Bottom Control Toolbar */}
        <div className="px-4 sm:px-6 py-3 bg-stone-900/95 border-t border-stone-800 flex items-center justify-between gap-3 z-20 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400 font-medium hidden sm:inline-block">
              {monument.name} • Cultural Ground Inspection
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Direct Google Earth 3D Web Launcher */}
            <a
              href={googleEarthUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 border-blue-700/60 shadow-xs"
              title="Launch full 3D flyover in Google Earth"
            >
              <Globe className="h-3.5 w-3.5 text-blue-400" />
              <span>🌍 Open in Google Earth 3D</span>
              <ExternalLink className="h-3 w-3 text-blue-300 ml-0.5" />
            </a>

            {/* Direct Google Maps Pano Link */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700"
              title="Open direct in Google Maps"
            >
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>Open on Google Maps</span>
              <ExternalLink className="h-3 w-3 text-stone-400 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
