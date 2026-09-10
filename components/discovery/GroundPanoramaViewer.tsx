"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ZoomIn, ZoomOut, RotateCw, Move, Sparkles, Image as ImageIcon, Volume2, VolumeX, Pause, X, MapPin, CheckCircle2 } from "lucide-react";
import { Monument, LanguageCode } from "@/types";
import { getHotspotsForMonument, ArchitecturalHotspot } from "@/data/hotspotsData";

interface GroundPanoramaViewerProps {
  monument: Monument;
  currentLang?: LanguageCode;
  onHeadingChange?: (heading: number) => void;
}

export default function GroundPanoramaViewer({
  monument,
  currentLang = "en",
  onHeadingChange
}: GroundPanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Gallery of available ground perspectives
  const availableImages = useMemoImages(monument);
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const activeImageUrl = availableImages[selectedImageIdx] || monument.imageUrl;

  // Interactive Pan & Zoom state
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [isAutoPanning, setIsAutoPanning] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // Interactive Hotspot State
  const hotspots: ArchitecturalHotspot[] = useMemo(() => {
    return getHotspotsForMonument(monument.id, monument.name);
  }, [monument.id, monument.name]);

  const [activeHotspot, setActiveHotspot] = useState<ArchitecturalHotspot | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dragStartRef = useRef<{ x: number; y: number; initialPanX: number; initialPanY: number }>({
    x: 0,
    y: 0,
    initialPanX: 0,
    initialPanY: 0
  });

  // Stop audio on unmount or monument change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [monument.id]);

  // Auto-pan animation loop
  useEffect(() => {
    if (!isAutoPanning || isDragging || activeHotspot !== null) return;

    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setPanOffset((prev) => {
        const nextX = (prev.x + delta * 14) % 360;
        if (onHeadingChange) {
          onHeadingChange(Math.round((nextX + 360) % 360));
        }
        return { x: nextX, y: prev.y };
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isAutoPanning, isDragging, activeHotspot, onHeadingChange]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: panOffset.x,
      initialPanY: panOffset.y
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - dragStartRef.current.x) * 0.25;
    const deltaY = (e.clientY - dragStartRef.current.y) * 0.15;

    const newX = dragStartRef.current.initialPanX + deltaX;
    const newY = Math.max(-25, Math.min(25, dragStartRef.current.initialPanY - deltaY));

    setPanOffset({ x: newX, y: newY });
    if (onHeadingChange) {
      onHeadingChange(Math.round((newX % 360 + 360) % 360));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Wheel Zoom Handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    setZoomLevel((prev) => Math.max(1.0, Math.min(2.8, prev + zoomDelta)));
  };

  // Handle Hotspot Audio Playback
  const handleToggleAudio = (hotspot: ArchitecturalHotspot) => {
    if (isPlayingAudio) {
      if (audioRef.current) audioRef.current.pause();
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const narrative = hotspot.audioNarrative[currentLang] || hotspot.audioNarrative.en;
    setIsPlayingAudio(true);

    const ttsUrl = `/api/tts?lang=${encodeURIComponent(currentLang)}&text=${encodeURIComponent(narrative.slice(0, 200))}`;
    const audio = new Audio(ttsUrl);
    audioRef.current = audio;

    audio.onended = () => {
      setIsPlayingAudio(false);
    };

    audio.onerror = () => {
      // Fallback to SpeechSynthesis
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(narrative);
        const langMap: Record<LanguageCode, string> = {
          en: "en-IN",
          hi: "hi-IN",
          gu: "gu-IN",
          mr: "mr-IN",
          ta: "ta-IN",
          bn: "bn-IN"
        };
        utterance.lang = langMap[currentLang] || "en-IN";
        utterance.onend = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsPlayingAudio(false);
      }
    };

    audio.play().catch(() => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(narrative);
        utterance.onend = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsPlayingAudio(false);
      }
    });
  };

  const handleSelectHotspot = (hotspot: ArchitecturalHotspot, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPanning(false);
    setActiveHotspot(hotspot);
    // Auto start audio narration for immersive feel
    handleToggleAudio(hotspot);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      className={`w-full h-full relative overflow-hidden bg-stone-950 select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Seamless High-Resolution Panoramic Canvas */}
      <div
        className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${zoomLevel}) translate(${(panOffset.x % 100) * 0.4}px, ${panOffset.y * 0.8}px)`
        }}
      >
        <img
          src={activeImageUrl}
          alt={monument.name}
          className="w-full h-full object-cover filter brightness-105 contrast-105"
          draggable={false}
        />
        {/* Subtle Ambient Atmosphere Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/40 pointer-events-none" />
      </div>

      {/* 360° Interactive Pulsing Audio Hotspots Layer */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {hotspots.map((hotspot) => {
          // Dynamic coordinate shift with pan
          const posX = ((hotspot.xPercent + (panOffset.x * 0.15)) % 100 + 100) % 100;
          const posY = hotspot.yPercent + (panOffset.y * 0.2);

          return (
            <div
              key={hotspot.id}
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: "translate(-50%, -50%)"
              }}
              className="absolute pointer-events-auto"
            >
              <button
                type="button"
                onClick={(e) => handleSelectHotspot(hotspot, e)}
                className="relative group cursor-pointer flex items-center justify-center"
                title={hotspot.title[currentLang] || hotspot.title.en}
              >
                {/* Glowing Pulsing Ring */}
                <span className="absolute h-9 w-9 rounded-full bg-amber-400/40 animate-ping" />
                <span className="absolute h-7 w-7 rounded-full bg-terracotta-500/60 animate-pulse" />
                
                {/* Core Hotspot Pin */}
                <div className="relative h-7 w-7 rounded-full bg-gradient-to-tr from-amber-500 to-terracotta-600 text-white border-2 border-white shadow-xl flex items-center justify-center text-xs font-black transition-transform group-hover:scale-125">
                  <span className="text-[11px]">{hotspot.icon}</span>
                </div>

                {/* Micro Tooltip */}
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-lg bg-stone-900/90 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-stone-700 shadow-md pointer-events-none">
                  {hotspot.title[currentLang] || hotspot.title.en}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Expanded Hotspot Architectural Story Card */}
      {activeHotspot && (
        <div className="absolute bottom-16 left-4 right-4 sm:right-auto sm:max-w-md z-30 animate-in slide-in-from-bottom duration-200">
          <div className="p-4 sm:p-5 rounded-3xl bg-stone-900/95 backdrop-blur-md border border-amber-500/50 shadow-2xl text-white space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-lg">
                  {activeHotspot.icon}
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
                    Architectural Hotspot Secret
                  </span>
                  <h4 className="font-serif font-black text-sm text-white">
                    {activeHotspot.title[currentLang] || activeHotspot.title.en}
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveHotspot(null);
                  if (audioRef.current) audioRef.current.pause();
                  if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
                  setIsPlayingAudio(false);
                }}
                className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              {activeHotspot.architecturalSecret[currentLang] || activeHotspot.architecturalSecret.en}
            </p>

            {/* Audio Voice Narration Trigger */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleToggleAudio(activeHotspot)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  isPlayingAudio
                    ? "bg-amber-500 text-stone-950 animate-pulse font-black"
                    : "bg-white text-stone-900 hover:bg-amber-100"
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    <span>Pause Audio Lore</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5 text-amber-600" />
                    <span>Play Audio Lore ({currentLang.toUpperCase()})</span>
                  </>
                )}
              </button>

              <span className="text-[10px] text-stone-400 font-mono">
                {isPlayingAudio ? "🔊 Narration Active" : "Click to Listen"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Navigation Hint Overlay */}
      <div className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-md border border-stone-700 text-stone-200 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[11px] font-semibold pointer-events-none shadow-lg z-10">
        <Move className="h-3.5 w-3.5 text-amber-400" />
        <span>Tap glowing 📌 pins for 360° Architectural Audio Lore • Drag to explore</span>
      </div>

      {/* Multiple Ground Perspectives Switcher (if gallery available) */}
      {availableImages.length > 1 && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-stone-900/85 backdrop-blur-md p-1.5 rounded-2xl border border-stone-700">
          <span className="text-[10px] font-bold text-stone-400 uppercase px-1.5 flex items-center gap-1">
            <ImageIcon className="h-3 w-3 text-amber-400" />
            <span>Angle:</span>
          </span>
          {availableImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIdx(idx);
              }}
              className={`h-7 w-7 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                selectedImageIdx === idx
                  ? "border-amber-400 scale-110 shadow-sm"
                  : "border-stone-700 opacity-60 hover:opacity-100"
              }`}
              title={`Perspective #${idx + 1}`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Floating Zoom & Auto-Pan Controls Overlay */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-stone-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-700">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setZoomLevel((prev) => Math.min(2.8, prev + 0.3));
          }}
          className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-all cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setZoomLevel((prev) => Math.max(1.0, prev - 0.3));
          }}
          className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-all cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsAutoPanning((prev) => !prev);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            isAutoPanning
              ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-500 shadow-xs"
              : "bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700"
          }`}
          title="Toggle Auto-Panning Sweep"
        >
          <RotateCw className={`h-3.5 w-3.5 ${isAutoPanning ? "animate-spin" : ""}`} />
          <span>{isAutoPanning ? "Auto-Pan ON" : "Auto-Pan OFF"}</span>
        </button>
      </div>
    </div>
  );
}

function useMemoImages(monument: Monument): string[] {
  return useMemo(() => {
    const list: string[] = [];
    if (monument.imageUrl) list.push(monument.imageUrl);
    if (monument.images && monument.images.length > 0) {
      monument.images.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    return list.length > 0 ? list : [monument.imageUrl];
  }, [monument]);
}
