"use client";

import React, { useEffect } from "react";
import { X, Sparkles, Camera } from "lucide-react";
import YatraLensScanner from "./YatraLensScanner";
import { LanguageCode } from "@/types";

interface YatraLensModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: LanguageCode;
}

export default function YatraLensModal({ isOpen, onClose, currentLang = "en" }: YatraLensModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 text-white z-20 shrink-0 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-bold text-white tracking-tight">
                  Yatra Lens — AI Visual Monument Identifier
                </h3>
                <span className="text-[10px] font-black uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  SIH 2026 Innovation
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium mt-0.5">
                Computer Vision & Architectural Folklore Storyteller
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-stone-800 p-2 text-stone-300 border border-stone-700 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
          <YatraLensScanner currentLang={currentLang} />
        </div>

      </div>
    </div>
  );
}
