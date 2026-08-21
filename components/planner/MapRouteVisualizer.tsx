"use client";

import React, { useEffect, useRef } from "react";
import { translations } from "@/data/mockData";
import { LanguageCode, PreloadedTrip } from "@/types";

interface MapRouteVisualizerProps {
  itinerary: PreloadedTrip | null;
  currentLang: LanguageCode;
  activeStopId: string;
  onSelectStop?: (id: string) => void;
}

export default function MapRouteVisualizer({
  itinerary,
  currentLang,
  activeStopId,
  onSelectStop
}: MapRouteVisualizerProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polylineRef = useRef<any>(null);

  const t = translations[currentLang] || translations.en;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let isMounted = true;

    // Dynamically import Leaflet so it only runs on client
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

      // Create map instance
      const map = L.map(mapContainerRef.current, {
        center: [22.0, 75.0],
        zoom: 6,
        zoomControl: true,
        attributionControl: false
      });

      // Add Tile Layer (Clean Standard Carto / OSM)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers & Polylines when itinerary changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    import("leaflet").then((L) => {
      // Clear old markers
      markersRef.current.forEach((marker) => map.removeLayer(marker));
      markersRef.current = [];

      // Clear old polyline
      if (polylineRef.current) {
        map.removeLayer(polylineRef.current);
        polylineRef.current = null;
      }

      if (!itinerary || !itinerary.itinerary) return;

      // Collect all stops with valid coordinates
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stopsWithCoords: any[] = [];
      itinerary.itinerary.forEach((dayGroup) => {
        dayGroup.stops.forEach((stop) => {
          if (stop.lat && stop.lng) {
            stopsWithCoords.push(stop);
          }
        });
      });

      if (stopsWithCoords.length === 0) return;

      // Create custom pin icons using Leaflet divIcon
      const createCustomIcon = (type: string, index: number, isActive: boolean) => {
        let bgColor = "bg-stone-900 text-white border-white";
        if (type === "lunch") bgColor = "bg-amber-600 text-white border-white";
        if (type === "hotel") bgColor = "bg-emerald-700 text-white border-white";
        if (isActive) bgColor = "bg-terracotta-600 text-white border-white ring-4 ring-terracotta-200 animate-bounce";

        return L.divIcon({
          className: "custom-marker-icon",
          html: `<div class="flex items-center justify-center h-7 w-7 rounded-full font-bold text-[11px] border-2 shadow-md transition-all ${bgColor}">
                   ${index + 1}
                 </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });
      };

      // Draw markers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const latlngs: any[] = [];
      stopsWithCoords.forEach((stop, index) => {
        const isSelected = activeStopId === stop.id;
        const markerIcon = createCustomIcon(stop.type, index, isSelected);
        const latlng: [number, number] = [stop.lat, stop.lng];
        latlngs.push(latlng);

        const marker = L.marker(latlng, { icon: markerIcon })
          .addTo(map)
          .bindPopup(
            `<div class="p-1 max-w-[200px]">
               <h6 class="font-serif font-bold text-xs text-stone-900">${stop.title}</h6>
               <p class="text-[11px] text-stone-600 mt-1 leading-snug">${stop.desc}</p>
               <div class="text-[9px] font-bold text-terracotta-700 mt-1.5 uppercase tracking-wider">${stop.type} • ${stop.duration || ""}</div>
             </div>`
          );

        marker.on("click", () => {
          if (onSelectStop) {
            onSelectStop(stop.id);
          }
        });

        markersRef.current.push(marker);

        if (isSelected) {
          marker.openPopup();
        }
      });

      // Draw routing Polyline
      if (latlngs.length > 1) {
        polylineRef.current = L.polyline(latlngs, {
          color: "#c85a32",
          weight: 3.5,
          opacity: 0.85,
          dashArray: "6, 6"
        }).addTo(map);
      }

      // Fit Bounds
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [50, 50] });
    });
  }, [itinerary, activeStopId, onSelectStop]);

  // Center map on active stop changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !itinerary || !activeStopId) return;

    let targetLatLng: [number, number] | null = null;
    itinerary.itinerary.forEach((dayGroup) => {
      dayGroup.stops.forEach((stop) => {
        if (stop.id === activeStopId && stop.lat && stop.lng) {
          targetLatLng = [stop.lat, stop.lng];
        }
      });
    });

    if (targetLatLng) {
      map.setView(targetLatLng, 13, { animate: true, duration: 1 });
    }
  }, [activeStopId, itinerary]);

  return (
    <div className="relative w-full h-full min-h-[440px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm">
      <div ref={mapContainerRef} className="w-full h-full min-h-[440px] z-10" />

      {/* Floating Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 border border-stone-200 rounded-xl p-3 shadow-md flex flex-col gap-1.5 text-xs font-semibold text-stone-700 backdrop-blur-sm">
        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-0.5">Route Stops</span>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-stone-900 border border-white"></div>
          <span>{t.monumentLabel || "Heritage Stop"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-amber-600 border border-white"></div>
          <span>{t.lunchLabel || "Culinary Stop"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-700 border border-white"></div>
          <span>{t.hotelLabel || "Homestay"}</span>
        </div>
      </div>
    </div>
  );
}
