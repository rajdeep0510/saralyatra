"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCw, Move, HelpCircle, Navigation } from "lucide-react";
import { translations } from "@/data/mockData";
import { LanguageCode, Monument } from "@/types";

interface Hotspot {
  id: number;
  x: string;
  y: string;
  title: string;
  desc: string;
}

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
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);

  const t = translations[currentLang] || translations.en;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isOpen) return;

    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;

    const handleAutoRotate = () => {
      if (isAutoRotating && !isDragging.current && container) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 2) {
          container.scrollLeft = 0;
        }
      }
    };

    autoRotateTimer.current = setInterval(handleAutoRotate, 30);
    return () => {
      if (autoRotateTimer.current) {
        clearInterval(autoRotateTimer.current);
      }
    };
  }, [isAutoRotating, isOpen]);

  if (!isOpen || !monument) return null;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.8));

  const hotspots: Hotspot[] = [
    {
      id: 1,
      x: "35%",
      y: "45%",
      title: "Sacred Inscription",
      desc: "An ancient Sanskrit inscription testifying to Queen Udayamati's patronage."
    },
    {
      id: 2,
      x: "65%",
      y: "35%",
      title: "Structural Columns",
      desc: "Intricately aligned pillars demonstrating pristine Solanki architecture."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-md p-4 sm:p-6">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col h-[80vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-50 border-b border-stone-200">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <Navigation className="h-4.5 w-4.5 text-terracotta-600 rotate-45" />
              <span>{monument.name} — {t.virtualTour || "360° Virtual Preview"}</span>
            </h3>
            <p className="text-xs text-stone-500 font-normal mt-0.5">
              Click & drag left or right to explore the site in 360 degrees
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white p-2 text-stone-600 border border-stone-200 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer shadow-xs"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Panoramic Viewer Window */}
        <div className="flex-1 relative overflow-hidden bg-stone-950">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="w-full h-full overflow-x-hidden overflow-y-hidden cursor-grab active:cursor-grabbing flex items-center"
          >
            <div 
              className="relative h-full select-none transition-transform duration-100 ease-out"
              style={{
                width: "300%",
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center center"
              }}
            >
              <img
                src={monument.panoramaUrl}
                alt="360 View"
                className="w-full h-full object-cover pointer-events-none opacity-90"
              />

              {/* Hotspots */}
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  className="absolute"
                  style={{ left: spot.x, top: spot.y }}
                >
                  <button
                    onClick={() => setActiveHotspot(spot)}
                    className="relative flex h-6 w-6 items-center justify-center rounded-full bg-terracotta-600 hover:bg-terracotta-700 shadow-lg transition-all border-2 border-white animate-bounce cursor-pointer"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta-400 opacity-75"></span>
                    <HelpCircle className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Draggable Icon Alert overlay */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-stone-200 rounded-full px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-stone-700 pointer-events-none shadow-sm">
            <Move className="h-3.5 w-3.5 text-terracotta-600" />
            <span>Click & Drag to pan 360°</span>
          </div>

          {/* Hotspot details sidebar */}
          {activeHotspot && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-88 rounded-2xl bg-white border border-stone-200 shadow-2xl p-5 backdrop-blur-md animate-in fade-in">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-serif font-bold text-stone-900">{activeHotspot.title}</h4>
                <button 
                  onClick={() => setActiveHotspot(null)}
                  className="text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {activeHotspot.desc}
              </p>
            </div>
          )}
        </div>

        {/* Control Toolbar */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={zoomIn}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs text-stone-700 hover:bg-stone-100 font-semibold shadow-xs transition-all cursor-pointer"
            >
              <ZoomIn className="h-3.5 w-3.5" />
              <span>Zoom In</span>
            </button>
            <button
              onClick={zoomOut}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs text-stone-700 hover:bg-stone-100 font-semibold shadow-xs transition-all cursor-pointer"
            >
              <ZoomOut className="h-3.5 w-3.5" />
              <span>Zoom Out</span>
            </button>
          </div>

          <div>
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isAutoRotating
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
              }`}
            >
              <RotateCw className={`h-3.5 w-3.5 ${isAutoRotating ? "animate-spin" : ""}`} />
              <span>{isAutoRotating ? "Auto-Rotate On" : "Auto-Rotate Off"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
