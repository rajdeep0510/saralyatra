"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { HelpCircle, Loader2 } from "lucide-react";

export interface Hotspot3D {
  id: number | string;
  yaw: number;     // 0 - 360 degrees horizontal
  pitch: number;   // -85 to 85 degrees vertical
  title: string;
  description: string;
}

interface ThreeJsPanoramaViewerProps {
  panoramaUrl: string;
  fallbackUrl?: string;
  initialHeading?: number;
  initialPitch?: number;
  hotspots?: Hotspot3D[];
  isAutoRotating?: boolean;
  onHeadingChange?: (heading: number, pitch: number, fov: number) => void;
  onHotspotClick?: (hotspot: Hotspot3D) => void;
  className?: string;
}

// Generate guaranteed procedural 360 panoramic dome texture on HTML5 canvas if network textures fail
function generateProceduralPanorama(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Atmospheric sky gradient (deep twilight to golden temple horizon)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  skyGrad.addColorStop(0, "#090d16");
  skyGrad.addColorStop(0.35, "#1e1b4b");
  skyGrad.addColorStop(0.5, "#d97706");
  skyGrad.addColorStop(0.52, "#78350f");
  skyGrad.addColorStop(0.7, "#1c1917");
  skyGrad.addColorStop(1, "#0c0a09");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  // Night stars in upper dome
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * 2048;
    const y = Math.random() * 500;
    const r = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Distant mountain & temple silhouettes
  ctx.fillStyle = "#1e293b";
  ctx.beginPath();
  ctx.moveTo(0, 520);
  for (let x = 0; x <= 2048; x += 40) {
    const heightVariation = Math.sin(x * 0.015) * 35 + Math.cos(x * 0.03) * 20;
    ctx.lineTo(x, 520 - heightVariation);
  }
  ctx.lineTo(2048, 1024);
  ctx.lineTo(0, 1024);
  ctx.closePath();
  ctx.fill();

  // Subtle golden sunset glow at horizon center
  const sunGlow = ctx.createRadialGradient(1024, 520, 10, 1024, 520, 320);
  sunGlow.addColorStop(0, "rgba(251, 191, 36, 0.65)");
  sunGlow.addColorStop(0.5, "rgba(217, 119, 6, 0.2)");
  sunGlow.addColorStop(1, "rgba(217, 119, 6, 0)");
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, 2048, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

export default function ThreeJsPanoramaViewer({
  panoramaUrl,
  fallbackUrl,
  initialHeading = 180,
  initialPitch = 0,
  hotspots = [],
  isAutoRotating = true,
  onHeadingChange,
  onHotspotClick,
  className = ""
}: ThreeJsPanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hotspotContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot3D | null>(null);

  // Callbacks in refs to avoid triggering re-mount loops
  const onHeadingChangeRef = useRef(onHeadingChange);
  const onHotspotClickRef = useRef(onHotspotClick);
  const isAutoRotatingRef = useRef(isAutoRotating);
  const hotspotsRef = useRef(hotspots);

  useEffect(() => {
    onHeadingChangeRef.current = onHeadingChange;
  }, [onHeadingChange]);

  useEffect(() => {
    onHotspotClickRef.current = onHotspotClick;
  }, [onHotspotClick]);

  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  useEffect(() => {
    hotspotsRef.current = hotspots;
  }, [hotspots]);

  // Main Three.js Lifecycle (Runs ONCE per panoramaUrl/fallbackUrl)
  useEffect(() => {
    const container = containerRef.current;
    const hotspotLayer = hotspotContainerRef.current;
    if (!container) return;

    setIsLoading(true);
    setLoadError(null);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1200);

    // 2. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: false
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
    } catch {
      setLoadError("WebGL initialization error.");
      setIsLoading(false);
      return;
    }

    // 3. Inverted 360° Sphere Mesh
    const geometry = new THREE.SphereGeometry(500, 64, 32);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: false
    });
    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    // Internal navigation state
    let lon = initialHeading;
    let targetLon = initialHeading;
    let lat = initialPitch;
    let targetLat = initialPitch;
    let fov = 75;
    let targetFov = 75;
    let isUserInteracting = false;
    let onPointerDownPointerX = 0;
    let onPointerDownPointerY = 0;
    let onPointerDownLon = 0;
    let onPointerDownLat = 0;
    let animationFrameId: number | null = null;
    let lastHeadingReportTime = 0;

    // 4. Multi-Tier Texture Loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    const applyTexture = (texture: THREE.Texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      material.color.set(0xffffff);
      material.map = texture;
      material.needsUpdate = true;
      setIsLoading(false);
      setLoadError(null);
    };

    const loadProcedural = () => {
      try {
        const tex = generateProceduralPanorama();
        applyTexture(tex);
      } catch {
        setLoadError("Unable to render panorama.");
        setIsLoading(false);
      }
    };

    const tryLoad = (url: string, next?: () => void) => {
      if (!url || url.includes("example.com") || url.includes("wikimedia.org")) {
        if (next) next();
        else loadProcedural();
        return;
      }
      textureLoader.load(
        url,
        applyTexture,
        undefined,
        () => {
          if (next) next();
          else loadProcedural();
        }
      );
    };

    tryLoad(panoramaUrl, () => {
      if (fallbackUrl && fallbackUrl !== panoramaUrl) {
        tryLoad(fallbackUrl, loadProcedural);
      } else {
        loadProcedural();
      }
    });

    // 5. Hotspot DOM elements cache
    const hotspotDomMap = new Map<string | number, HTMLElement>();

    const updateHotspotElements = () => {
      if (!hotspotLayer) return;
      const currentHotspots = hotspotsRef.current || [];

      // Create missing DOM pins
      currentHotspots.forEach((hs) => {
        if (!hotspotDomMap.has(hs.id)) {
          const pin = document.createElement("div");
          pin.className = "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-75 group";
          pin.style.display = "none";

          pin.innerHTML = `
            <div class="relative flex h-7 w-7 items-center justify-center rounded-full bg-terracotta-600 hover:bg-terracotta-700 shadow-xl border-2 border-white transition-all hover:scale-110">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta-400 opacity-60"></span>
              <svg class="h-4 w-4 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-stone-900/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap shadow-xl border border-stone-700 pointer-events-none z-30">
              ${hs.title}
            </div>
          `;

          pin.addEventListener("click", (e) => {
            e.stopPropagation();
            setActiveHotspot(hs);
            if (onHotspotClickRef.current) {
              onHotspotClickRef.current(hs);
            }
          });

          hotspotLayer.appendChild(pin);
          hotspotDomMap.set(hs.id, pin);
        }
      });
    };

    updateHotspotElements();

    // 6. Animation Loop (Pure WebGL + Direct DOM Pin Position Updates)
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation
      if (isAutoRotatingRef.current && !isUserInteracting) {
        targetLon += 0.12;
      }

      // Smooth inertia damping
      lon += (targetLon - lon) * 0.08;
      lat += (targetLat - lat) * 0.08;
      fov += (targetFov - fov) * 0.08;

      if (Math.abs(camera.fov - fov) > 0.01) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }

      // Spherical coordinates
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(x, y, z);
      renderer.render(scene, camera);

      // Update 3D Hotspot Screen Positions directly on DOM (0 React re-renders)
      const currentWidth = container.clientWidth;
      const currentHeight = container.clientHeight;
      const currentHotspots = hotspotsRef.current || [];

      currentHotspots.forEach((hs) => {
        const pinEl = hotspotDomMap.get(hs.id);
        if (!pinEl) return;

        const hPhi = THREE.MathUtils.degToRad(90 - hs.pitch);
        const hTheta = THREE.MathUtils.degToRad(hs.yaw);
        const hRadius = 480;

        const hx = hRadius * Math.sin(hPhi) * Math.cos(hTheta);
        const hy = hRadius * Math.cos(hPhi);
        const hz = hRadius * Math.sin(hPhi) * Math.sin(hTheta);

        const pos = new THREE.Vector3(hx, hy, hz);
        pos.project(camera);

        if (pos.z < 1.0 && pos.x >= -1.1 && pos.x <= 1.1 && pos.y >= -1.1 && pos.y <= 1.1) {
          const screenX = (pos.x * 0.5 + 0.5) * currentWidth;
          const screenY = (-(pos.y * 0.5) + 0.5) * currentHeight;
          pinEl.style.display = "block";
          pinEl.style.left = `${screenX}px`;
          pinEl.style.top = `${screenY}px`;
        } else {
          pinEl.style.display = "none";
        }
      });

      // Throttle heading updates to ~4 times per second to prevent parent re-renders
      if (onHeadingChangeRef.current && time - lastHeadingReportTime > 250) {
        lastHeadingReportTime = time;
        const normHeading = Math.round(((lon % 360) + 360) % 360);
        onHeadingChangeRef.current(normHeading, Math.round(lat), Math.round(fov));
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    // 7. Interaction Handlers
    const onPointerDown = (e: PointerEvent) => {
      isUserInteracting = true;
      onPointerDownPointerX = e.clientX;
      onPointerDownPointerY = e.clientY;
      onPointerDownLon = targetLon;
      onPointerDownLat = targetLat;

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isUserInteracting) return;
      const fovFactor = fov / 75;
      const deltaX = (e.clientX - onPointerDownPointerX) * 0.15 * fovFactor;
      const deltaY = (e.clientY - onPointerDownPointerY) * 0.15 * fovFactor;

      targetLon = onPointerDownLon - deltaX;
      targetLat = Math.max(-85, Math.min(85, onPointerDownLat + deltaY));
    };

    const onPointerUp = () => {
      isUserInteracting = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomStep = e.deltaY * 0.05;
      targetFov = Math.max(30, Math.min(105, targetFov + zoomStep));
    };

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);

    // 8. Clean Cleanup on Unmount
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);

      hotspotDomMap.forEach((el) => {
        if (hotspotLayer && hotspotLayer.contains(el)) hotspotLayer.removeChild(el);
      });
      hotspotDomMap.clear();

      geometry.dispose();
      material.dispose();
      if (material.map) material.map.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [panoramaUrl, fallbackUrl, initialHeading, initialPitch]);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-stone-950 ${className}`}>
      {/* Three.js WebGL Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Direct DOM Hotspots Layer */}
      <div
        ref={hotspotContainerRef}
        className="absolute inset-0 pointer-events-auto overflow-hidden"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-950/80 backdrop-blur-xs text-white">
          <Loader2 className="h-8 w-8 animate-spin text-terracotta-500 mb-3" />
          <p className="text-xs font-semibold text-stone-300 tracking-wide">
            Rendering 3D WebGL Spherical Panorama...
          </p>
        </div>
      )}

      {/* Error Overlay */}
      {loadError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-950/90 text-white p-6 text-center">
          <div className="h-10 w-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
            ⚠️
          </div>
          <p className="text-xs font-medium text-rose-300 max-w-sm">{loadError}</p>
        </div>
      )}

      {/* Active Hotspot Modal Detail Card */}
      {activeHotspot && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-88 rounded-2xl bg-white/95 border border-stone-200 shadow-2xl p-4.5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 z-20">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-xs font-serif font-bold text-stone-900 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-terracotta-600 inline-block" />
              {activeHotspot.title}
            </h4>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-stone-400 hover:text-stone-700 cursor-pointer text-xs font-bold px-1.5 py-0.5 rounded-md hover:bg-stone-100"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-stone-600 leading-relaxed">{activeHotspot.description}</p>
        </div>
      )}
    </div>
  );
}
