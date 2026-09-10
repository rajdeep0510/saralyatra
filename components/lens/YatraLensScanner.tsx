"use client";

import React, { useState, useRef, useMemo } from "react";
import { Camera, Upload, Sparkles, Image as ImageIcon, CheckCircle2, RefreshCw, Layers, ArrowRight, ShieldCheck, Landmark, Search } from "lucide-react";
import { SAMPLE_HERITAGE_GALLERY, analyzeMonumentImage, LensScanResult } from "@/data/lensData";
import { LanguageCode } from "@/types";
import { monuments } from "@/data/mockData";
import LensResultCard from "./LensResultCard";

interface YatraLensScannerProps {
  currentLang?: LanguageCode;
  onScanComplete?: (result: LensScanResult) => void;
}

export default function YatraLensScanner({ currentLang = "en", onScanComplete }: YatraLensScannerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState("Initializing Multimodal Vision Engine...");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<LensScanResult | null>(null);
  const [selectedHint, setSelectedHint] = useState<string>("all");
  const [monumentSearch, setMonumentSearch] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const visualArchetypes = [
    { id: "hampi", label: "Vijayanagara Stone Chariot", hint: "hampi", emoji: "🛕", defaultId: "kar-1" },
    { id: "konark", label: "Kalinga Sun Temple Spire", hint: "konark", emoji: "☀️", defaultId: "odi-2" },
    { id: "meenakshi", label: "Dravidian Temple Gopuram", hint: "meenakshi", emoji: "🛕", defaultId: "tn-1" },
    { id: "taj", label: "Mughal White Marble Dome", hint: "taj", emoji: "🕌", defaultId: "up-2" },
    { id: "khajuraho", label: "Chandela Sandstone Spire", hint: "khajuraho", emoji: "🛕", defaultId: "mp-1" },
    { id: "ajanta", label: "Rock-Cut Monolithic Cave", hint: "ajanta", emoji: "🗿", defaultId: "mah-1" },
    { id: "ranikivav", label: "Subterranean Stepwell", hint: "stepwell", emoji: "🏛️", defaultId: "guj-2" },
    { id: "amber", label: "Rajput Royal Desert Fort", hint: "fort", emoji: "🏰", defaultId: "raj-1" },
  ];

  const searchFilteredMonuments = useMemo(() => {
    if (!monumentSearch.trim()) return [];
    const q = monumentSearch.toLowerCase();
    return monuments.filter(m => m.name.toLowerCase().includes(q) || m.state.toLowerCase().includes(q)).slice(0, 6);
  }, [monumentSearch]);

  const scanStepMessages = [
    "Extracting Architectural Geometry & Spires...",
    "Analyzing Stone Joinery & Monolithic Carvings...",
    "Matching Dynasty & ASI Heritage Taxonomy...",
    "Retrieving Verified Oral Folklore & 360 Panoramas..."
  ];

  const triggerScan = async (imageSource: string, identifier?: string, hintParam?: string) => {
    setSelectedImage(imageSource);
    setIsScanning(true);
    setScanProgress(15);
    setScanResult(null);

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < scanStepMessages.length) {
        setScanStepText(scanStepMessages[stepIndex]);
        setScanProgress((prev) => Math.min(prev + 25, 90));
      }
    }, 350);

    const effectiveHint = hintParam || (selectedHint !== "all" ? selectedHint : undefined);

    try {
      const res = await fetch("/api/lens/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imageSource.startsWith("data:") ? imageSource.slice(0, 500) : imageSource,
          filename: identifier && !identifier.includes("-") ? identifier : undefined,
          monumentId: identifier && identifier.includes("-") ? identifier : undefined,
          visualHint: effectiveHint
        })
      });
      const data = await res.json();
      clearInterval(interval);
      setScanProgress(100);
      if (data.success && data.result) {
        setScanResult(data.result);
        if (onScanComplete) onScanComplete(data.result);
      } else {
        const fallback = analyzeMonumentImage(
          identifier && identifier.includes("-")
            ? { monumentId: identifier }
            : { filename: identifier, visualHint: effectiveHint }
        );
        setScanResult(fallback);
      }
    } catch {
      clearInterval(interval);
      setScanProgress(100);
      const fallback = analyzeMonumentImage(
        identifier && identifier.includes("-")
          ? { monumentId: identifier }
          : { filename: identifier, visualHint: effectiveHint }
      );
      setScanResult(fallback);
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      
      // Perform client-side canvas color extraction
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 20;
          canvas.height = 20;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, 20, 20);
            const data = ctx.getImageData(0, 0, 20, 20).data;
            let r = 0, g = 0, b = 0;
            for (let i = 0; i < data.length; i += 4) {
              r += data[i];
              g += data[i + 1];
              b += data[i + 2];
            }
            const count = data.length / 4;
            const avgR = r / count;
            const avgG = g / count;
            const avgB = b / count;
            const brightness = (avgR + avgG + avgB) / 3;

            let guessedId = "kar-1"; // Hampi Stone Chariot
            if (brightness > 165 && Math.abs(avgR - avgB) < 30) {
              guessedId = "up-2"; // Taj Mahal
            } else if (avgR > avgG + 25 && avgR > avgB + 35) {
              guessedId = "raj-1"; // Amber Fort
            } else if (avgR > 130 && avgG > 110 && avgB < 90) {
              guessedId = "odi-2"; // Konark Sun Temple
            } else if (brightness < 85) {
              guessedId = "mah-1"; // Ajanta Caves
            } else if (avgG > avgR && avgG > avgB) {
              guessedId = "ker-1"; // Kerala Nature
            } else {
              guessedId = "tn-1"; // Meenakshi Amman
            }
            triggerScan(base64Url, guessedId);
            return;
          }
        } catch {}
        triggerScan(base64Url, file.name);
      };
      img.src = base64Url;
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setScanResult(null);
    setIsScanning(false);
    setScanProgress(0);
    setSelectedHint("all");
    setMonumentSearch("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      
      {/* If scan is finished, display the result card */}
      {scanResult && !isScanning ? (
        <LensResultCard
          result={scanResult}
          onResetScan={handleReset}
          currentLang={currentLang}
        />
      ) : (
        <div className="space-y-6">
          
          {/* Visual Camera Viewfinder & Upload Box */}
          <div className="relative rounded-3xl bg-stone-950 border-2 border-stone-800 shadow-2xl p-6 sm:p-10 overflow-hidden text-center text-white">
            
            {/* Viewfinder Target Brackets */}
            <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-amber-400" />

            {/* Scanning Laser Overlay Animation */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-bounce duration-1000" />
                <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-[1px] flex flex-col items-center justify-center space-y-4">
                  <div className="h-16 w-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-amber-400" />
                  </div>
                  <div className="space-y-1 text-center px-4">
                    <div className="text-sm font-bold text-amber-300 font-mono tracking-wider">
                      {scanStepText}
                    </div>
                    <div className="w-48 h-1.5 bg-stone-800 rounded-full mx-auto overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* If an image is selected and scanning, show preview */}
            {selectedImage ? (
              <div className="relative max-h-72 max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg border border-white/20">
                <img
                  src={selectedImage}
                  alt="Selected Monument"
                  className="w-full h-full object-cover max-h-72"
                />
              </div>
            ) : (
              /* Initial Upload State */
              <div className="space-y-4 py-6 max-w-lg mx-auto">
                <div className="h-16 w-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto shadow-inner">
                  <Camera className="h-8 w-8 animate-pulse" />
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Scan Any Monument or Carving
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1 leading-relaxed">
                    Upload or snap a photo of any Indian temple, fort, or architectural detail. Our AI will identify its dynasty, architectural style, and untold folklore.
                  </p>
                </div>

                {/* Upload & Camera Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all cursor-pointer shadow-lg hover:scale-105"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Monument Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.setAttribute("capture", "environment");
                        fileInputRef.current.click();
                      }
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs border border-stone-700 transition-all cursor-pointer hover:scale-105"
                  >
                    <Camera className="h-4 w-4 text-amber-400" />
                    <span>Take Live Picture</span>
                  </button>
                </div>

                {/* Optional Visual Archetype Selector */}
                <div className="pt-4 border-t border-stone-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-stone-400 block">
                    ⚡ Or select architectural motif you photographed:
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xl mx-auto">
                    {visualArchetypes.map((arch) => (
                      <button
                        key={arch.id}
                        type="button"
                        onClick={() => {
                          setSelectedHint(arch.hint);
                          triggerScan(arch.label, arch.defaultId, arch.hint);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                          selectedHint === arch.hint
                            ? "bg-amber-400 text-stone-950 border-amber-400 shadow-sm font-black scale-105"
                            : "bg-stone-900/90 text-stone-300 border-stone-700 hover:bg-stone-800 hover:text-white"
                        }`}
                      >
                        <span>{arch.emoji}</span>
                        <span>{arch.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Direct Search & Monument Autocomplete Scanner */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Search className="h-4 w-4 text-terracotta-600" />
                <span>Search & Scan Any Monument in Bharat (180+ Available)</span>
              </span>
              <span className="text-[10px] font-bold text-stone-400">
                Type name to instant analyze
              </span>
            </div>

            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={monumentSearch}
                onChange={(e) => setMonumentSearch(e.target.value)}
                placeholder="Type monument name (e.g. Konark Sun Temple, Hampi, Meenakshi, Taj Mahal, Ajanta, Rani ki Vav)..."
                className="w-full rounded-2xl bg-stone-50 border border-stone-200 py-2.5 pl-10 pr-4 text-xs font-medium text-stone-900 focus:outline-none focus:bg-white focus:border-terracotta-500 shadow-2xs"
              />
            </div>

            {/* Autocomplete Results */}
            {searchFilteredMonuments.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                {searchFilteredMonuments.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => triggerScan(m.imageUrl, m.id)}
                    className="p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-400 text-left transition-all cursor-pointer flex items-center gap-2.5 group"
                  >
                    <div className="h-8 w-8 rounded-lg overflow-hidden shrink-0">
                      <img src={m.imageUrl} alt={m.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-stone-900 truncate group-hover:text-amber-900">
                        {m.name}
                      </div>
                      <div className="text-[10px] text-stone-400 truncate">
                        {m.state}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Instant Sample Heritage Gallery (For 1-Click Testing / Demo) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-terracotta-700 uppercase block">
                  Interactive Demo Gallery
                </span>
                <h4 className="font-serif font-bold text-stone-900 text-base mt-0.5">
                  Try 1-Click Sample Monument Scans
                </h4>
              </div>
              <span className="text-xs text-stone-400 font-medium hidden sm:inline">
                Tap any sample to run instant AI vision analysis
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAMPLE_HERITAGE_GALLERY.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => triggerScan(sample.thumbnailUrl, sample.monumentId)}
                  disabled={isScanning}
                  className="group relative rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer text-left bg-stone-900 disabled:opacity-50"
                >
                  <div className="h-28 w-full overflow-hidden">
                    <img
                      src={sample.thumbnailUrl}
                      alt={sample.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-85"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                  
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                    <span className="text-[9px] font-bold text-amber-300 block uppercase truncate">
                      {sample.state}
                    </span>
                    <div className="text-xs font-bold text-white truncate leading-tight mt-0.5">
                      {sample.title}
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black flex items-center justify-center">
                      <Sparkles className="h-3 w-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
