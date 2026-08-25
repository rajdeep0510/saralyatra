"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCw, Move, Sparkles, Image as ImageIcon } from "lucide-react";
import { Monument } from "@/types";

interface GroundPanoramaViewerProps {
  monument: Monument;
  onHeadingChange?: (heading: number) => void;
}

export default function GroundPanoramaViewer({
  monument,
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
  const dragStartRef = useRef<{ x: number; y: number; initialPanX: number; initialPanY: number }>({
    x: 0,
    y: 0,
    initialPanX: 0,
    initialPanY: 0
  });

  // Auto-pan animation loop
  useEffect(() => {
    if (!isAutoPanning || isDragging) return;

    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setPanOffset((prev) => {
        const nextX = (prev.x + delta * 18) % 360;
        if (onHeadingChange) {
          onHeadingChange(Math.round((nextX + 360) % 360));
        }
        return { x: nextX, y: prev.y };
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isAutoPanning, isDragging, onHeadingChange]);

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

      {/* Interactive Navigation Hint Overlay */}
      <div className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-md border border-stone-700 text-stone-200 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[11px] font-semibold pointer-events-none shadow-lg z-10">
        <Move className="h-3.5 w-3.5 text-amber-400" />
        <span>Interactive Ground View • Drag to look around • Scroll to zoom</span>
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

// Extract distinct images from monument record
function useMemoImages(monument: Monument): string[] {
  const list: string[] = [];
  if (monument.imageUrl) list.push(monument.imageUrl);
  if (monument.images && Array.isArray(monument.images)) {
    for (const img of monument.images) {
      if (img && !list.includes(img)) list.push(img);
    }
  }
  return list.length > 0 ? list : [monument.imageUrl];
}
