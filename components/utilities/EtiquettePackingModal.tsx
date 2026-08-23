"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, CheckSquare, Square, Printer, Sparkles, ShieldCheck, Shirt, CloudSun, AlertCircle, Compass } from "lucide-react";
import { PreloadedTrip } from "@/types";

interface EtiquettePackingModalProps {
  trip: PreloadedTrip;
  isOpen: boolean;
  onClose: () => void;
}

interface ChecklistItem {
  id: string;
  category: "etiquette" | "clothing" | "essentials" | "health";
  title: string;
  desc: string;
  isImportant?: boolean;
}

export default function EtiquettePackingModal({
  trip,
  isOpen,
  onClose
}: EtiquettePackingModalProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const stateName = trip.region || trip.title.split(" ")[0] || "Bharat";
  const allStops = useMemo(() => trip.itinerary.flatMap((d) => d.stops), [trip]);

  // Generate dynamic contextual checklist items
  const items: ChecklistItem[] = useMemo(() => {
    const list: ChecklistItem[] = [];
    const stateLower = stateName.toLowerCase();
    const isHimalayan = ["himachal", "uttarakhand", "jammu", "kashmir", "ladakh", "sikkim", "arunachal"].some((s) => stateLower.includes(s));
    const isRainforestOrCoastal = ["kerala", "meghalaya", "goa", "karnataka", "tamil nadu", "andaman", "assam"].some((s) => stateLower.includes(s));
    const isDesertOrWarm = ["rajasthan", "gujarat", "madhya pradesh", "maharashtra", "telangana", "andhra"].some((s) => stateLower.includes(s));
    const hasSpiritualStops = allStops.some((s) => s.type === "spiritual" || s.title.toLowerCase().includes("temple") || s.title.toLowerCase().includes("mandir") || s.title.toLowerCase().includes("gurudwara") || s.title.toLowerCase().includes("ghat"));

    // 1. Cultural & Sacred Etiquette Rules
    if (hasSpiritualStops || ["uttar pradesh", "punjab", "tamil nadu", "odisha", "gujarat"].some((s) => stateLower.includes(s))) {
      list.push({
        id: "head_cover",
        category: "etiquette",
        title: "Head Scarf / Dupatta / Rumāl",
        desc: "Mandatory for Gurudwaras (Golden Temple) and traditional north shrines; polite in heritage sanctums.",
        isImportant: true
      });
      list.push({
        id: "temple_dress_code",
        category: "etiquette",
        title: "Modest Temple Attire (Shoulders & Knees Covered)",
        desc: "Strictly avoid shorts/sleeveless tops; traditional Dhoti/Veshti/Kurta or Saree required for major South sanctums (e.g. Rameshwaram, Padmanabhaswamy).",
        isImportant: true
      });
      list.push({
        id: "footwear_etiquette",
        category: "etiquette",
        title: "Slip-on Footwear & Cotton Socks",
        desc: "Easy-to-remove shoes for temple checkrooms; cotton socks protect soles from hot marble courtyard floors at noon.",
        isImportant: false
      });
      list.push({
        id: "leather_warning",
        category: "etiquette",
        title: "Non-Leather Belt & Wallet Option",
        desc: "Certain traditional orthodox sanctums prohibit animal leather items inside the inner sanctum.",
        isImportant: false
      });
    }

    // 2. Climate & Terrain-Specific Clothing
    if (isHimalayan) {
      list.push({
        id: "thermal_layers",
        category: "clothing",
        title: "Heavy Woolens & Windproof Thermal Jacket",
        desc: "Temperatures can drop sharply near river valleys and high-altitude mountain passes.",
        isImportant: true
      });
      list.push({
        id: "trekking_shoes",
        category: "clothing",
        title: "Sturdy Gripped Walking/Trekking Boots",
        desc: "Essential for stone steps, hilly terrain, and morning dew.",
        isImportant: true
      });
    } else if (isRainforestOrCoastal) {
      list.push({
        id: "rain_gear",
        category: "clothing",
        title: "Compact Umbrella & Waterproof Poncho",
        desc: "Sudden tropical rain showers are common around hill stations, backwaters, and living root bridges.",
        isImportant: true
      });
      list.push({
        id: "quick_dry",
        category: "clothing",
        title: "Light Breathable Quick-Dry Clothing",
        desc: "Helps stay fresh in high-humidity coastal and riverine climates.",
        isImportant: false
      });
      list.push({
        id: "anti_slip_sandals",
        category: "clothing",
        title: "Water-Resistant Anti-Slip Sandals",
        desc: "Great for boat boarding, beach strolls, and rocky waterfall walks.",
        isImportant: false
      });
    } else if (isDesertOrWarm) {
      list.push({
        id: "sun_protection",
        category: "clothing",
        title: "UV Sunglasses, Sunscreen (SPF 50+) & Wide Hat",
        desc: "Intense afternoon sun across open fort ramparts and desert sands.",
        isImportant: true
      });
      list.push({
        id: "light_cotton",
        category: "clothing",
        title: "Loose-fitting 100% Breathable Cotton Kurtas/Tees",
        desc: "Keeps you cool during full-day monument exploration.",
        isImportant: false
      });
    }

    // 3. Indian Travel & Convenience Essentials
    list.push({
      id: "small_cash",
      category: "essentials",
      title: "Cash in ₹10, ₹20, ₹50 & ₹100 Notes",
      desc: "For temple shoe-custody counters, local auto-rickshaws, rural tea stalls, and prasad counters where UPI might have low signal.",
      isImportant: true
    });
    list.push({
      id: "power_bank",
      category: "essentials",
      title: "10,000+ mAh High-Capacity Power Bank",
      desc: "Full-day camera photography and GPS map tracking drain phone batteries quickly.",
      isImportant: true
    });
    list.push({
      id: "govt_id",
      category: "essentials",
      title: "Original Govt Photo ID (Aadhaar / Passport / Voter ID)",
      desc: "Mandatory for monument entry ticket checks, homestay KYC, and heritage permits.",
      isImportant: true
    });
    list.push({
      id: "reusable_bottle",
      category: "essentials",
      title: "Insulated Reusable Water Bottle",
      desc: "Stay hydrated and refill with filtered RO water at homestays and heritage tourist facilitation centers.",
      isImportant: false
    });

    // 4. Health, Dining & First Aid Essentials
    list.push({
      id: "ors_electrolytes",
      category: "health",
      title: "ORS Sachets & Glucose Electrolytes",
      desc: "Prevents heat fatigue and dehydration during multi-hour outdoor monument walks.",
      isImportant: true
    });
    list.push({
      id: "mosquito_repellent",
      category: "health",
      title: "Herbal Mosquito Repellent Roll-on / Cream",
      desc: "Helpful during evening outdoor aartis, garden strolls, and lakeside homestays.",
      isImportant: false
    });
    list.push({
      id: "first_aid_meds",
      category: "health",
      title: "Personal First Aid & Motion Sickness Tablets",
      desc: "Digestive aids, paracetamol, and motion sickness medication for winding ghat roads.",
      isImportant: false
    });
    list.push({
      id: "hand_sanitizer",
      category: "health",
      title: "Hand Sanitizer & Pocket Wet Wipes",
      desc: "Convenient for post-prasad cleansing and snacking on road trips.",
      isImportant: false
    });

    return list;
  }, [stateName, allStops]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCount = items.length;
  const packedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPct = Math.round((packedCount / Math.max(1, totalCount)) * 100);

  const categories = [
    { key: "etiquette", label: "Sacred & Temple Etiquette", icon: ShieldCheck, color: "text-amber-700 bg-amber-50 border-amber-200" },
    { key: "clothing", label: "Climate & Region Attire", icon: Shirt, color: "text-blue-700 bg-blue-50 border-blue-200" },
    { key: "essentials", label: "Travel & Transit Essentials", icon: Compass, color: "text-purple-700 bg-purple-50 border-purple-200" },
    { key: "health", label: "Health, Hydration & Wellness", icon: CloudSun, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-5 sm:p-6 border-b border-stone-700 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shadow-inner">
              🧳
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase block">
                {stateName} Cultural Guide & Checklist
              </span>
              <h3 className="font-serif font-black text-lg sm:text-xl text-white tracking-wide">
                Smart Cultural Etiquette & Packing
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Tracker Bar */}
        <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-800">
              Packing Readiness:
            </span>
            <span className="font-mono text-xs font-black text-terracotta-700">
              {packedCount} / {totalCount} Items ({progressPct}%)
            </span>
          </div>

          <div className="flex-1 max-w-xs bg-stone-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Checklist Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {categories.map((cat) => {
            const catItems = items.filter((it) => it.category === cat.key);
            if (catItems.length === 0) return null;
            const Icon = cat.icon;

            return (
              <div key={cat.key} className="space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-stone-100">
                  <span className={`p-1.5 rounded-lg border text-xs ${cat.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    {cat.label} ({catItems.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {catItems.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isChecked
                            ? "bg-emerald-50/70 border-emerald-300 text-stone-800"
                            : "bg-white border-stone-200 hover:border-stone-300 text-stone-900"
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 text-stone-400 hover:text-stone-700 transition-colors shrink-0"
                        >
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Square className="h-4 w-4 text-stone-300" />
                          )}
                        </button>

                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold ${
                                isChecked ? "line-through text-stone-500" : "text-stone-900"
                              }`}
                            >
                              {item.title}
                            </span>
                            {item.isImportant && (
                              <span className="text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded-full shrink-0">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              const allChecked: Record<string, boolean> = {};
              items.forEach((it) => (allChecked[it.id] = true));
              setCheckedItems(allChecked);
            }}
            className="text-xs font-bold text-stone-600 hover:text-stone-900 underline cursor-pointer"
          >
            Mark All as Packed
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Printer className="h-3.5 w-3.5 text-stone-600" />
              <span>Print Checklist</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
