"use client";

import React from "react";
import { Globe } from "lucide-react";
import { LanguageCode } from "@/types";

interface LanguageSelectorProps {
  currentLang: LanguageCode;
  onChange: (lang: LanguageCode) => void;
}

export default function LanguageSelector({ currentLang, onChange }: LanguageSelectorProps) {
  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "Hindi", native: "हिन्दी" },
    { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
    { code: "ta", label: "Tamil", native: "தமிழ்" }
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Globe className="h-4 w-4 text-terracotta-500 mr-1" />
      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850">
        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onChange(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? "bg-terracotta-600 text-slate-100 shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="block text-[10px] font-bold">{lang.native}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
