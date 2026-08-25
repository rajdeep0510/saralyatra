"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, Volume2, PhoneCall, ShieldAlert, Heart, Compass, Utensils, MessageSquare, Sparkles, Check, Globe } from "lucide-react";
import { PreloadedTrip, LanguageCode } from "@/types";

interface DialectPhrasebookModalProps {
  trip: PreloadedTrip;
  isOpen: boolean;
  onClose: () => void;
}

interface PhraseItem {
  id: string;
  category: "greetings" | "food" | "navigation" | "shopping" | "gratitude";
  english: string;
  regionalText: string;
  phonetic: string;
}

export default function DialectPhrasebookModal({
  trip,
  isOpen,
  onClose
}: DialectPhrasebookModalProps) {
  const stateName = trip.region || trip.title.split(" ")[0] || "Bharat";

  // Determine regional language code based on state
  const defaultLangForState = useMemo(() => {
    const s = stateName.toLowerCase();
    if (s.includes("gujarat")) return "gu";
    if (s.includes("maharashtra")) return "mr";
    if (s.includes("tamil")) return "ta";
    if (s.includes("bengal")) return "bn";
    if (s.includes("kerala")) return "ml";
    if (s.includes("karnataka")) return "kn";
    if (s.includes("rajasthan") || s.includes("uttar pradesh") || s.includes("madhya") || s.includes("delhi") || s.includes("bihar") || s.includes("himachal") || s.includes("uttarakhand")) return "hi";
    return "hi";
  }, [stateName]);

  const [selectedLang, setSelectedLang] = useState<string>(defaultLangForState);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Dictionary of phrases across 6 major Indian tongues
  const phraseDictionary: Record<string, PhraseItem[]> = {
    gu: [
      { id: "gu_1", category: "greetings", english: "Hello / How are you?", regionalText: "નમસ્તે, તમે કેમ છો?", phonetic: "Namaste, tame kem chho?" },
      { id: "gu_2", category: "food", english: "Is this 100% pure vegetarian?", regionalText: "શું આ શુદ્ધ શાકાહારી ભોજન છે?", phonetic: "Shu aa shuddh shaakahari bhojan chhe?" },
      { id: "gu_3", category: "food", english: "Where can I get drinking water?", regionalText: "પીવાનું ચોખ્ખું પાણી ક્યાં મળશે?", phonetic: "Peevaanu chokkhu paani kyaan malshe?" },
      { id: "gu_4", category: "navigation", english: "Which way is the temple / monument?", regionalText: "મંદિર / સ્મારક કઈ તરફ છે?", phonetic: "Mandir / smaarak kai taraf chhe?" },
      { id: "gu_5", category: "navigation", english: "How far is the next destination?", regionalText: "આગળનું સ્થળ કેટલું દૂર છે?", phonetic: "Aagalnu sthal ketlu door chhe?" },
      { id: "gu_6", category: "shopping", english: "How much does this cost?", regionalText: "આના કેટલા રૂપિયા થશે?", phonetic: "Aana ketla rupiya thashe?" },
      { id: "gu_7", category: "shopping", english: "Please give me the final reasonable price.", regionalText: "કૃપા કરીને વ્યાજબી ભાવ આપો.", phonetic: "Krupa karine vyaajbi bhaav aapo." },
      { id: "gu_8", category: "navigation", english: "Where is the taxi / auto stand?", regionalText: "રિક્ષા / ટેક્સી સ્ટેન્ડ ક્યાં છે?", phonetic: "Rickshaw / taxi stand kyaan chhe?" },
      { id: "gu_9", category: "gratitude", english: "Thank you very much for your help!", regionalText: "તમારી મદદ માટે ખૂબ ખૂબ આભાર!", phonetic: "Tamaari madad maate khoob khoob aabhaar!" },
      { id: "gu_10", category: "gratitude", english: "See you again! Have a good day.", regionalText: "ફરી મળીશું! તમારો દિવસ શુભ રહે.", phonetic: "Fari malishun! Tamaaro divas shubh rahe." },
    ],
    hi: [
      { id: "hi_1", category: "greetings", english: "Hello / Greetings!", regionalText: "नमस्ते / प्रणाम! आप कैसे हैं?", phonetic: "Namaste / Pranaam! Aap kaise hain?" },
      { id: "hi_2", category: "food", english: "Is this 100% pure vegetarian?", regionalText: "क्या यह शुद्ध शाकाहारी खाना है?", phonetic: "Kya yeh shuddh shaakahari khaana hai?" },
      { id: "hi_3", category: "food", english: "Please give drinking water.", regionalText: "कृपया पीने का साफ़ पानी दीजिए।", phonetic: "Kripya peene ka saaf paani deejiye." },
      { id: "hi_4", category: "navigation", english: "Which way leads to the temple / ghat?", regionalText: "मंदिर / घाट की ओर कौन सा रास्ता जाता है?", phonetic: "Mandir / ghaat ki ore kaun sa raasta jaata hai?" },
      { id: "hi_5", category: "navigation", english: "How far is the destination from here?", regionalText: "यहाँ से वह जगह कितनी दूर है?", phonetic: "Yahaan se woh jagah kitni door hai?" },
      { id: "hi_6", category: "shopping", english: "How much is this?", regionalText: "यह कितने का है?", phonetic: "Yeh kitne ka hai?" },
      { id: "hi_7", category: "shopping", english: "Please give a fair price.", regionalText: "थोड़ा सही दाम लगा लीजिए।", phonetic: "Thoda sahi daam laga leejiye." },
      { id: "hi_8", category: "navigation", english: "Where can I get an auto or cab?", regionalText: "यहाँ ऑटो या टैक्सी कहाँ मिलेगी?", phonetic: "Yahaan auto ya taxi kahaan milegi?" },
      { id: "hi_9", category: "gratitude", english: "Thank you very much!", regionalText: "आपका बहुत-बहुत धन्यवाद!", phonetic: "Aapka bahut-bahut dhanyavaad!" },
      { id: "hi_10", category: "gratitude", english: "Good day, see you again.", regionalText: "फिर मिलेंगे, आपका दिन शुभ हो।", phonetic: "Phir milenge, aapka din shubh ho." },
    ],
    mr: [
      { id: "mr_1", category: "greetings", english: "Hello / How are you?", regionalText: "नमस्कार, तुम्ही कसे आहात?", phonetic: "Namaskar, tumhi kase aahaat?" },
      { id: "mr_2", category: "food", english: "Is this pure vegetarian food?", regionalText: "हे शुद्ध शाकाहारी जेवण आहे का?", phonetic: "He shuddh shaakahari jevan aahe ka?" },
      { id: "mr_3", category: "food", english: "Where is clean drinking water?", regionalText: "पिण्याचे पाणी कुठे मिळेल?", phonetic: "Pinyaache paani kuthe milel?" },
      { id: "mr_4", category: "navigation", english: "Which way is the temple / fort?", regionalText: "मंदिराकडे / किल्ल्याकडे जाणारा रस्ता कोणता?", phonetic: "Mandiraakade / killyaakade jaanara rasta konta?" },
      { id: "mr_5", category: "navigation", english: "How far is it?", regionalText: "ते ठिकाण किती लांब आहे?", phonetic: "Te thikaan kiti laamb aahe?" },
      { id: "mr_6", category: "shopping", english: "How much does this cost?", regionalText: "ह्याची किंमत किती आहे?", phonetic: "Hyaachi kimmat kiti aahe?" },
      { id: "mr_7", category: "shopping", english: "Please give a reasonable discount.", regionalText: "कृपया योग्य दर लावा.", phonetic: "Krupaya yogya dar laava." },
      { id: "mr_8", category: "navigation", english: "Where is the bus / taxi stop?", regionalText: "बस किंवा रिक्षा कुठे मिळेल?", phonetic: "Bus kinva rickshaw kuthe milel?" },
      { id: "mr_9", category: "gratitude", english: "Thank you very much!", regionalText: "तुमचे मनापासून खूप आभार!", phonetic: "Tumche manaapasun khoop aabhaar!" },
      { id: "mr_10", category: "gratitude", english: "See you again!", regionalText: "पुन्हा भेटूया, धन्यवाद!", phonetic: "Punha bhetuya, dhanyavaad!" },
    ],
    ta: [
      { id: "ta_1", category: "greetings", english: "Greetings / Hello!", regionalText: "வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்?", phonetic: "Vanakkam! Neengal eppadi irukkireergal?" },
      { id: "ta_2", category: "food", english: "Is this pure vegetarian food?", regionalText: "இது சுத்த சைவ உணவா?", phonetic: "Idhu suththa saiva unavaa?" },
      { id: "ta_3", category: "food", english: "Where can I get drinking water?", regionalText: "குடிநீர் எங்கு கிடைக்கும்?", phonetic: "Kudineer engu kidaikkum?" },
      { id: "ta_4", category: "navigation", english: "Which way is the temple?", regionalText: "கோவிலுக்கு செல்லும் வழி எது?", phonetic: "Kovilukku sellum vazhi edhu?" },
      { id: "ta_5", category: "navigation", english: "How far is this destination?", regionalText: "இங்கிருந்து எவ்வளவு தூரம்?", phonetic: "Ingirundhu evvalavu thooram?" },
      { id: "ta_6", category: "shopping", english: "How much is this?", regionalText: "இதன் விலை என்ன?", phonetic: "Idhan vilai enna?" },
      { id: "ta_7", category: "shopping", english: "Can you give a fair price?", regionalText: "சரியான விலையில் தருவீர்களா?", phonetic: "Sariyaana vilaiyil tharuveergalaa?" },
      { id: "ta_8", category: "navigation", english: "Where is the auto / taxi stand?", regionalText: "ஆட்டோ ஸ்டாண்ட் எங்கே இருக்கிறது?", phonetic: "Auto stand enge irukkiradhu?" },
      { id: "ta_9", category: "gratitude", english: "Thank you very much!", regionalText: "மிக்க நன்றி!", phonetic: "Mikka nandri!" },
      { id: "ta_10", category: "gratitude", english: "Good day, see you again.", regionalText: "மீண்டும் சந்திப்போம், நன்றி!", phonetic: "Meendum sandhippom, nandri!" },
    ],
    bn: [
      { id: "bn_1", category: "greetings", english: "Hello / Greetings!", regionalText: "নমস্কার! আপনি কেমন আছেন?", phonetic: "Nomoshkar! Aapni kemon aachhen?" },
      { id: "bn_2", category: "food", english: "Is this pure vegetarian food?", regionalText: "এটি কি সম্পূর্ণ নিরামিষ খাবার?", phonetic: "Eti ki shompurno niraamish khaabaar?" },
      { id: "bn_3", category: "food", english: "Where can I get clean water?", regionalText: "খাবার জল কোথায় পাব?", phonetic: "Khaabaar jol kothaay paabo?" },
      { id: "bn_4", category: "navigation", english: "Which way is the temple / monument?", regionalText: "মন্দিরে / ঘাটে যাওয়ার রাস্তা কোনটি?", phonetic: "Mandire / ghaate jaowaar raasta konti?" },
      { id: "bn_5", category: "navigation", english: "How far is it from here?", regionalText: "এখান থেকে কতটা দূর?", phonetic: "Ekhaan theke kototaa door?" },
      { id: "bn_6", category: "shopping", english: "How much does this cost?", regionalText: "এটার দাম কত?", phonetic: "Etaar daam koto?" },
      { id: "bn_7", category: "shopping", english: "Please give a reasonable price.", regionalText: "একটু সঠিক দাম রাখুন।", phonetic: "Ektu shotik daam raakhun." },
      { id: "bn_8", category: "navigation", english: "Where can I get a taxi / auto?", regionalText: "এখানে ট্যাক্সি বা অটো কোথায় পাওয়া যাবে?", phonetic: "Ekhaane taxi baa auto kothaay paaowa jaabe?" },
      { id: "bn_9", category: "gratitude", english: "Thank you very much!", regionalText: "আপনাকে অনেক ধন্যবাদ!", phonetic: "Aapnaake onek dhonyobaad!" },
      { id: "bn_10", category: "gratitude", english: "See you again!", regionalText: "আবার দেখা হবে, ভালো থাকবেন।", phonetic: "Aabaar dekha hobe, bhaalo thaakben." },
    ]
  };

  const activePhrases = phraseDictionary[selectedLang] || phraseDictionary.hi;

  const playAudio = (item: PhraseItem) => {
    if (typeof window === "undefined") return;

    setPlayingId(item.id);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.regionalText);
      utterance.lang = selectedLang === "gu" ? "gu-IN" : selectedLang === "hi" ? "hi-IN" : selectedLang === "mr" ? "mr-IN" : selectedLang === "ta" ? "ta-IN" : selectedLang === "bn" ? "bn-IN" : "en-IN";
      utterance.rate = 0.9;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingId(null), 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-5 sm:p-6 border-b border-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shadow-inner">
              🗣️
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase block">
                Everyday Indic Dialect & Safety Card
              </span>
              <h3 className="font-serif font-black text-lg sm:text-xl text-white tracking-wide">
                Local Phrasebook & Emergency Directory
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

        {/* Dialect Selector Bar */}
        <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-terracotta-600" />
            <span className="text-xs font-bold text-stone-800">
              Spoken Tongue for {stateName}:
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: "gu", label: "ગુજરાતી (Gujarati)" },
              { id: "hi", label: "हिन्दी (Hindi)" },
              { id: "mr", label: "मराठी (Marathi)" },
              { id: "ta", label: "தமிழ் (Tamil)" },
              { id: "bn", label: "বাংলা (Bengali)" },
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setSelectedLang(lang.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedLang === lang.id
                    ? "bg-stone-900 text-white shadow-2xs"
                    : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body: Phrases & Emergency Helplines */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* 10 Everyday Phrases Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-terracotta-600" />
                <span>10 Essential Travel Phrases (Tap 🔊 to Hear Pronunciation)</span>
              </span>
              <span className="text-[10px] text-stone-500 font-medium hidden sm:inline">
                Tap any card to speak
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activePhrases.map((phrase) => {
                const isPlaying = playingId === phrase.id;
                return (
                  <div
                    key={phrase.id}
                    onClick={() => playAudio(phrase)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 group select-none ${
                      isPlaying
                        ? "bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20"
                        : "bg-stone-50/50 hover:bg-white border-stone-200 hover:border-stone-300 shadow-2xs"
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide block">
                        {phrase.english}
                      </span>
                      <div className="font-serif font-bold text-sm text-stone-900 leading-snug">
                        {phrase.regionalText}
                      </div>
                      <div className="text-[11px] font-mono text-terracotta-700 font-medium">
                        &ldquo;{phrase.phonetic}&rdquo;
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isPlaying
                          ? "bg-amber-500 text-stone-950 shadow-md scale-110"
                          : "bg-white text-stone-600 group-hover:bg-stone-900 group-hover:text-white border border-stone-200 shadow-2xs"
                      }`}
                      title="Play Pronunciation"
                    >
                      <Volume2 className={`h-4 w-4 ${isPlaying ? "animate-pulse" : ""}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 24/7 State Emergency & Tourist Helpline Card */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
              <span>24/7 Verified Emergency & Tourist Assistance Helplines</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { title: "National Emergency", num: "112", icon: ShieldAlert, color: "text-rose-700 bg-rose-50 border-rose-200" },
                { title: "Incredible India Tourist Helpline", num: "1363", icon: Compass, color: "text-blue-700 bg-blue-50 border-blue-200" },
                { title: "Medical Ambulance", num: "108", icon: Heart, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                { title: "Highway Assistance", num: "1033", icon: PhoneCall, color: "text-amber-700 bg-amber-50 border-amber-200" }
              ].map((h) => (
                <a
                  key={h.num}
                  href={`tel:${h.num}`}
                  className="p-3 rounded-2xl border bg-white hover:bg-stone-50 transition-all flex flex-col justify-between gap-1 shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider truncate">
                      {h.title}
                    </span>
                    <span className={`p-1 rounded-md border text-[10px] ${h.color}`}>
                      <h.icon className="h-3 w-3" />
                    </span>
                  </div>
                  <span className="font-mono text-base font-black text-stone-900 group-hover:text-terracotta-700 transition-colors">
                    📞 {h.num}
                  </span>
                  <span className="text-[9px] text-stone-400 font-medium">Toll-Free 24/7</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="text-[11px] text-stone-500 font-medium">
            💡 Tap any phrase to hear authentic regional audio pronunciation
          </div>

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
  );
}
