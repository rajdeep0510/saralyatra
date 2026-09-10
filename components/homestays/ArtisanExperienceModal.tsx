"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, ShieldCheck, CheckCircle2, Clock, MapPin, Users, Heart, Phone, MessageSquare, Send, Award, Gift, Palette } from "lucide-react";
import { Homestay, LanguageCode } from "@/types";
import { getArtisanWorkshopsForHomestay, ArtisanExperience } from "@/data/artisanExperiences";

interface ArtisanExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  homestay: Homestay | null;
  currentLang?: LanguageCode;
}

export default function ArtisanExperienceModal({
  isOpen,
  onClose,
  homestay,
  currentLang = "en"
}: ArtisanExperienceModalProps) {
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [dietaryNote, setDietaryNote] = useState<string>("strict_jain");
  const [pickupRequested, setPickupRequested] = useState<boolean>(true);
  const [customMessage, setCustomMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !homestay) return null;

  const workshops = getArtisanWorkshopsForHomestay(
    homestay.id,
    homestay.name,
    homestay.hostOrigin || "India"
  );

  const selectedWorkshop = workshops.find((w) => w.id === selectedWorkshopId) || workshops[0];

  const totalWorkshopCost = selectedWorkshop ? selectedWorkshop.feePerPerson * guestCount : 0;
  const totalStayCost = homestay.pricePerNight;
  const grandTotal = totalStayCost + totalWorkshopCost;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xl font-bold">
              🎨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-bold text-white tracking-tight">
                  Artisan Craft Workshop & Host Inquiry
                </h3>
                <span className="text-[10px] font-black uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  Indigenous Craft
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium mt-0.5">
                {homestay.name} • Host: <strong>{homestay.hostName}</strong> ({homestay.hostOrigin})
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
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-stone-50">
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmitInquiry} className="space-y-6">
              
              {/* Section 1: Choose an Artisan Craft Workshop */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-amber-600" />
                    <h4 className="font-serif font-bold text-stone-900 text-sm">
                      1. Add an Indigenous Artisan Craft Workshop
                    </h4>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    Conducted on-site with certified local masters
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {workshops.map((ws) => {
                    const isSelected = (selectedWorkshopId || workshops[0].id) === ws.id;
                    return (
                      <button
                        key={ws.id}
                        type="button"
                        onClick={() => setSelectedWorkshopId(ws.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                          isSelected
                            ? "bg-amber-50/80 border-amber-500 ring-2 ring-amber-400/40 shadow-sm"
                            : "bg-white border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xl">{ws.icon}</span>
                            <span className="font-mono text-xs font-black text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-full">
                              ₹{ws.feePerPerson} / person
                            </span>
                          </div>

                          <h5 className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
                            {ws.craftName}
                          </h5>

                          <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                            {ws.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-200/70 space-y-1 text-[10px] text-stone-500">
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3 text-terracotta-600 shrink-0" />
                            <span className="font-medium text-stone-700">{ws.artisanMaster}</span>
                            <span>• {ws.artisanAccreditation}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Gift className="h-3 w-3 text-emerald-600 shrink-0" />
                            <span>Take-home: <strong className="text-stone-800">{ws.takeHomeSouvenir}</strong></span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Dietary & Stay Inquiries */}
              <div className="bg-white rounded-3xl p-5 border border-stone-200 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    2. Kitchen Customization & Traveler Preferences
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Dietary selection */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                      Kitchen & Diet Preparation:
                    </label>
                    <select
                      value={dietaryNote}
                      onChange={(e) => setDietaryNote(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    >
                      <option value="strict_jain">Strict Jain Kitchen (No Root Veg / Night-time dining)</option>
                      <option value="pure_veg">100% Pure Vegetarian / Sattvik Kitchen</option>
                      <option value="organic_vegan">Organic Farm-to-Table Vegan</option>
                      <option value="halal">Halal Certified Preparation</option>
                      <option value="standard">Standard Regional Home-cooked</option>
                    </select>
                  </div>

                  {/* Travelers count */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                      Number of Workshop Participants:
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(num)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            guestCount === num
                              ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                              : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Village / Station Pickup Option */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pickup"
                      checked={pickupRequested}
                      onChange={(e) => setPickupRequested(e.target.checked)}
                      className="h-4 w-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300"
                    />
                    <label htmlFor="pickup" className="text-xs text-stone-800 font-medium cursor-pointer">
                      Request Village / Station Arrival Pickup by Host
                    </label>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Free for Saral Yatra Explorers
                  </span>
                </div>

                {/* Custom Note to Host */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                    Message to Host {homestay.hostName}:
                  </label>
                  <textarea
                    rows={2}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder={`e.g. "We would love to try the ${homestay.foodSpecialty} and learn more about local traditions!"`}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-800 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Price Summary & Submit */}
              <div className="p-4 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                <div className="space-y-0.5 text-xs">
                  <div className="text-stone-400">
                    Stay (₹{totalStayCost}) + Workshop ({guestCount} × ₹{selectedWorkshop.feePerPerson} = ₹{totalWorkshopCost})
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-black text-xl text-amber-400">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-400">Total Estimated Experience Package</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-terracotta-600 hover:from-amber-600 hover:to-terracotta-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Direct Host & Artisan Inquiry</span>
                </button>
              </div>

            </form>
          ) : (
            /* Confirmation State */
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-300 text-center space-y-5 animate-in zoom-in-95 duration-300">
              <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-700 border-2 border-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-inner">
                ✓
              </div>

              <div className="space-y-1 max-w-md mx-auto">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Inquiry Dispatched to Host
                </span>
                <h4 className="font-serif font-black text-2xl text-stone-900">
                  Host & Artisan Notified!
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  <strong>{homestay.hostName}</strong> and master artisan <strong>{selectedWorkshop.artisanMaster}</strong> have received your inquiry for the <em>&quot;{selectedWorkshop.craftName}&quot;</em> workshop.
                </p>
              </div>

              {/* Booking Voucher Recap */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Dietary Certification:</span>
                  <span className="font-bold text-emerald-800">Confirmed (Sattvik/Jain compliant)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Take-Home Souvenir:</span>
                  <span className="font-bold text-stone-800">{selectedWorkshop.takeHomeSouvenir}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Host Languages:</span>
                  <span className="font-bold text-stone-800">{homestay.languagesSpoken.join(", ")}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
