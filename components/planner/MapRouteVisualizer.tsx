"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Navigation, Compass, Layers, Maximize2, MapPin, Sparkles, RefreshCw } from "lucide-react";
import { translations } from "@/data/mockData";
import { LanguageCode, PreloadedTrip } from "@/types";

interface MapRouteVisualizerProps {
  itinerary: PreloadedTrip | null;
  currentLang: LanguageCode;
  activeStopId: string;
  onSelectStop?: (id: string) => void;
  onOpenDetails?: (monumentId: string) => void;
}

/**
 * Generates a realistic curved road spline between coordinate waypoints
 * used as an instant fallback when offline or when OSRM is rate-limited.
 */
function generateCurvedRoadPath(coords: [number, number][]): [number, number][] {
  if (coords.length < 2) return coords;
  const path: [number, number][] = [];

  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const pointsCount = 18;

    // Calculate perpendicular offset vector to simulate natural highway curves
    const midLat = (p1[0] + p2[0]) / 2;
    const midLng = (p1[1] + p2[1]) / 2;
    const dLat = p2[0] - p1[0];
    const dLng = p2[1] - p1[1];
    
    // Perpendicular displacement
    const curveIntensity = 0.08 * (i % 2 === 0 ? 1 : -1);
    const ctrlLat = midLat - dLng * curveIntensity;
    const ctrlLng = midLng + dLat * curveIntensity;

    for (let t = 0; t <= 1; t += 1 / pointsCount) {
      // Quadratic Bezier Curve interpolation
      const lat = (1 - t) * (1 - t) * p1[0] + 2 * (1 - t) * t * ctrlLat + t * t * p2[0];
      const lng = (1 - t) * (1 - t) * p1[1] + 2 * (1 - t) * t * ctrlLng + t * t * p2[1];
      path.push([lat, lng]);
    }
  }

  path.push(coords[coords.length - 1]);
  return path;
}

export default function MapRouteVisualizer({
  itinerary,
  currentLang,
  activeStopId,
  onSelectStop,
  onOpenDetails
}: MapRouteVisualizerProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polylineCasingRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polylineCoreRef = useRef<any>(null);

  const [mapStyle, setMapStyle] = useState<"streets" | "terrain">("streets");
  const [isRoutingLoading, setIsRoutingLoading] = useState<boolean>(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);

  const t = translations[currentLang] || translations.en;

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom Control at bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // CartoDB Voyager / OpenStreetMap Clean Tile Layer
      const tileUrl =
        mapStyle === "terrain"
          ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: "abcd"
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

  // Recenter Entire Route Function
  const fitEntireRoute = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map || !itinerary || !itinerary.itinerary) return;

    import("leaflet").then((L) => {
      const latlngs: [number, number][] = [];
      itinerary.itinerary.forEach((dayGroup) => {
        dayGroup.stops.forEach((stop) => {
          if (stop.lat && stop.lng) {
            latlngs.push([stop.lat, stop.lng]);
          }
        });
      });

      if (latlngs.length > 0) {
        const bounds = L.latLngBounds(latlngs);
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 13,
          animate: true,
          duration: 0.8
        });
      }
    });
  }, [itinerary]);

  // Construct Real Driving Highway Road Polylines & Interactive Waypoint Pins
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    let isCancelled = false;

    import("leaflet").then(async (L) => {
      if (isCancelled) return;

      // 1. Clear previous layers
      markersRef.current.forEach((marker) => map.removeLayer(marker));
      markersRef.current = [];

      if (polylineCasingRef.current) {
        map.removeLayer(polylineCasingRef.current);
        polylineCasingRef.current = null;
      }
      if (polylineCoreRef.current) {
        map.removeLayer(polylineCoreRef.current);
        polylineCoreRef.current = null;
      }

      if (!itinerary || !itinerary.itinerary) return;

      // 2. Collect all stops with valid coordinates
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stopsWithCoords: any[] = [];
      itinerary.itinerary.forEach((dayGroup) => {
        dayGroup.stops.forEach((stop) => {
          if (stop.lat && stop.lng) {
            stopsWithCoords.push({
              ...stop,
              dayNumber: dayGroup.day
            });
          }
        });
      });

      if (stopsWithCoords.length === 0) return;

      setIsRoutingLoading(true);

      // 3. Create Google Maps style Custom Waypoint Icons
      const createWaypointIcon = (stop: any, index: number, isFirst: boolean, isLast: boolean, isSelected: boolean) => {
        let badgeBg = "bg-stone-900 text-white";
        let labelText = `${index + 1}`;
        let iconEmoji = "📍";

        if (isFirst) {
          badgeBg = "bg-emerald-600 text-white ring-4 ring-emerald-200";
          labelText = "START";
          iconEmoji = "🟢";
        } else if (isLast) {
          badgeBg = "bg-rose-600 text-white ring-4 ring-rose-200";
          labelText = "END";
          iconEmoji = "🏁";
        } else if (stop.type === "lunch") {
          badgeBg = "bg-amber-600 text-white";
          iconEmoji = "🍽️";
        } else if (stop.type === "hotel") {
          badgeBg = "bg-emerald-700 text-white";
          iconEmoji = "🏨";
        } else if (stop.type === "spiritual") {
          badgeBg = "bg-amber-700 text-white";
          iconEmoji = "🛕";
        } else if (stop.type === "nature") {
          badgeBg = "bg-teal-700 text-white";
          iconEmoji = "🌿";
        }

        if (isSelected) {
          badgeBg = "bg-terracotta-600 text-white ring-4 ring-terracotta-300 scale-125 shadow-xl animate-pulse";
        }

        return L.divIcon({
          className: "custom-gmap-marker",
          html: `
            <div class="relative flex flex-col items-center group cursor-pointer">
              <div class="flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full font-black text-[10px] tracking-tight border-2 border-white shadow-lg transition-transform ${badgeBg}">
                ${labelText}
              </div>
              <div class="w-2 h-2 -mt-1 rotate-45 border-r-2 border-b-2 border-white ${badgeBg.split(" ")[0]}"></div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 32],
          popupAnchor: [0, -32]
        });
      };

      // 4. Draw Waypoint Markers
      const rawWaypoints: [number, number][] = [];
      stopsWithCoords.forEach((stop, index) => {
        const isFirst = index === 0;
        const isLast = index === stopsWithCoords.length - 1;
        const isSelected = activeStopId === stop.id;
        const latlng: [number, number] = [stop.lat, stop.lng];
        rawWaypoints.push(latlng);

        const isAttraction = stop.type !== "lunch" && stop.type !== "hotel" && stop.type !== "transit";

        const marker = L.marker(latlng, {
          icon: createWaypointIcon(stop, index, isFirst, isLast, isSelected),
          zIndexOffset: isSelected ? 1000 : isFirst || isLast ? 500 : 100
        }).addTo(map);

        const popupContent = `
          <div class="p-2 max-w-[230px] font-sans">
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-terracotta-50 text-terracotta-800 border border-terracotta-200">
                Day ${stop.dayNumber} • ${stop.time}
              </span>
              <span class="text-[10px] font-bold text-stone-400">Stop ${index + 1}</span>
            </div>
            <h6 class="font-serif font-black text-sm text-stone-900 leading-tight">${stop.title}</h6>
            <p class="text-[11px] text-stone-600 mt-1 leading-snug line-clamp-3">${stop.desc}</p>
            ${
              isAttraction && onOpenDetails
                ? `<button id="btn-popup-${stop.id}" style="cursor: pointer;" class="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-stone-900 hover:bg-orange-600 text-white rounded-xl text-[11px] font-bold transition-all shadow-sm">
                     ✨ Unfold Oral Lore & 360°
                   </button>`
                : ""
            }
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on("click", () => {
          if (onSelectStop) onSelectStop(stop.id);
        });

        marker.on("popupopen", () => {
          const btn = document.getElementById(`btn-popup-${stop.id}`);
          if (btn && onOpenDetails) {
            btn.onclick = () => {
              onOpenDetails(stop.monumentId || stop.title);
            };
          }
        });

        markersRef.current.push(marker);

        if (isSelected) {
          marker.openPopup();
        }
      });

      // 5. Fetch Driving Road Network Coordinates from OSRM or fallback to realistic highway curves
      let detailedRoadCoords: [number, number][] = [];

      if (rawWaypoints.length >= 2) {
        try {
          // Format coordinates for OSRM: lon,lat;lon,lat...
          const osrmCoordString = stopsWithCoords
            .map((s) => `${s.lng},${s.lat}`)
            .join(";");

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2800);

          const res = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${osrmCoordString}?overview=full&geometries=geojson`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            if (data.routes && data.routes[0] && data.routes[0].geometry) {
              // Convert [lon, lat] geojson to Leaflet [lat, lon]
              detailedRoadCoords = data.routes[0].geometry.coordinates.map(
                (c: [number, number]) => [c[1], c[0]] as [number, number]
              );

              // Set formatted driving stats
              const km = Math.round(data.routes[0].distance / 1000);
              const hrs = (data.routes[0].duration / 3600).toFixed(1);
              setRouteInfo({
                distance: `${km} km driving`,
                duration: `${hrs} hrs transit`
              });
            }
          }
        } catch {
          // Graceful fallback to high-resolution realistic highway spline
        }
      }

      // If OSRM wasn't available or returned empty, use the realistic highway road spline
      if (detailedRoadCoords.length === 0) {
        detailedRoadCoords = generateCurvedRoadPath(rawWaypoints);
      }

      if (isCancelled) return;
      setIsRoutingLoading(false);

      // 6. Draw Dual-Layer Google Maps Road Routing
      if (detailedRoadCoords.length > 1) {
        // Layer A: Outer Highway Road Casing (Dark Navy / Shadow Border)
        polylineCasingRef.current = L.polyline(detailedRoadCoords, {
          color: "#1e3a8a", // Dark Highway Navy Blue
          weight: 7,
          opacity: 0.85,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);

        // Layer B: Inner Glowing Driving Road Core (Google Maps Azure Blue)
        polylineCoreRef.current = L.polyline(detailedRoadCoords, {
          color: "#3b82f6", // Vibrant Google Maps Drive Blue
          weight: 4.5,
          opacity: 1,
          lineCap: "round",
          lineJoin: "round"
        }).addTo(map);
      }

      // 7. Instantly Auto-Fit the Entire Route on the screen
      const bounds = L.latLngBounds(rawWaypoints);
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 13,
        animate: true,
        duration: 1
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [itinerary, activeStopId, onSelectStop, onOpenDetails]);

  // Center on individual stop when selected from timeline
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
      map.setView(targetLatLng, 13, { animate: true, duration: 0.8 });
    }
  }, [activeStopId, itinerary]);

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[540px] rounded-3xl overflow-hidden border border-stone-300 shadow-md bg-stone-100 flex flex-col">
      
      {/* Top Floating Navigation HUD Bar */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
        
        {/* Route Overview Badge */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-stone-200 shadow-md flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-terracotta-700 flex items-center gap-1">
              <Navigation className="h-3 w-3" />
              <span>Live Highway Driving Route</span>
            </span>
            <span className="text-xs font-bold text-stone-900 truncate max-w-[200px] sm:max-w-[280px]">
              {itinerary?.title || "Pan-India Route Navigation"}
            </span>
          </div>
        </div>

        {/* Quick Map Controls: Recenter Entire Route */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-stone-200 shadow-md">
          <button
            onClick={fitEntireRoute}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold transition-all cursor-pointer shadow-xs"
            title="Recenter and frame full route"
          >
            <Maximize2 className="h-3 w-3 text-amber-300" />
            <span className="hidden sm:inline">Fit Route</span>
          </button>
        </div>

      </div>

      {/* Main Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[480px] lg:min-h-[540px] z-10 flex-1" />

      {/* Floating Route Legend & Road Waypoints HUD on Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 border border-stone-200 rounded-2xl p-3 shadow-md flex flex-col gap-2 text-xs font-semibold text-stone-800 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-extrabold flex items-center gap-1">
            <Compass className="h-3 w-3 text-terracotta-600" />
            <span>Turn-by-Turn Waypoints</span>
          </span>
          {routeInfo && (
            <span className="text-[9px] font-black bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
              {routeInfo.distance}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-4 px-1 rounded-full bg-emerald-600 text-white text-[8px] font-black">
            START
          </div>
          <span className="text-[11px] font-medium text-stone-600">Day 1 Departure</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-5 rounded-full bg-blue-500 border border-blue-900"></div>
          <span className="text-[11px] font-medium text-stone-600">Highway Transit Road</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-4 px-1 rounded-full bg-rose-600 text-white text-[8px] font-black">
            END
          </div>
          <span className="text-[11px] font-medium text-stone-600">Final Destination</span>
        </div>
      </div>

    </div>
  );
}
