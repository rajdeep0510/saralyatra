"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Square, Music } from "lucide-react";
import { LanguageCode } from "@/types";
import { translations } from "@/data/mockData";

import AtmosphericSoundscapePlayer from "@/components/audio/AtmosphericSoundscapePlayer";

interface AudioNarratorProps {
  text: string;
  currentLang: LanguageCode;
}

export default function AudioNarrator({ text, currentLang }: AudioNarratorProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDroneOn, setIsDroneOn] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Audio stream reference for neural TTS
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Persistent reference for Web Speech synthesis
  const activeUtterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
  const currentSentenceIdxRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);

  const t = translations[currentLang] || translations.en;

  // Load available voices asynchronously
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  function stopDrone() {
    if (oscillatorsRef.current.length > 0) {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch { }
      });
      oscillatorsRef.current = [];
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch { }
      audioCtxRef.current = null;
    }
  }

  function stopAll() {
    isPlayingRef.current = false;
    currentSentenceIdxRef.current = 0;
    activeUtterancesRef.current = [];

    // Detach listeners and stop HTML5 Audio Stream if active
    if (currentAudioRef.current) {
      try {
        const audio = currentAudioRef.current;
        audio.onended = null;
        audio.onerror = null;
        audio.pause();
        audio.src = "";
      } catch { }
      currentAudioRef.current = null;
    }

    // Stop Browser Web Speech if active
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch { }
    }

    stopDrone();
    setIsPlaying(false);
  }

  useEffect(() => {
    stopAll();
    return () => stopAll();
  }, [text, currentLang]);

  // Tambura Drone Synthesizer using Web Audio API
  const startDrone = () => {
    try {
      if (typeof window === "undefined" || audioCtxRef.current) return;

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(350, ctx.currentTime);
      filter.connect(masterGain);

      const pitches = [196.0, 130.81, 130.81, 65.41];
      const types: OscillatorType[] = ["sawtooth", "triangle", "sawtooth", "triangle"];

      pitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = types[idx];
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime(idx * 3 - 4, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(filter);

        const lfoOsc = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfoOsc.frequency.setValueAtTime(0.2 + idx * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.1, ctx.currentTime);

        lfoOsc.connect(lfoGain);
        lfoGain.connect(oscGain.gain);

        lfoOsc.start();
        osc.start();

        oscillatorsRef.current.push(osc);
        oscillatorsRef.current.push(lfoOsc);
      });
    } catch {
      console.warn("Web Audio API not fully supported or blocked");
    }
  };

  const toggleDroneMute = () => {
    if (!audioCtxRef.current) {
      if (isPlaying) startDrone();
      setIsDroneOn(true);
      return;
    }

    if (isDroneOn && gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      setIsDroneOn(false);
    } else if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0.06, audioCtxRef.current.currentTime);
      setIsDroneOn(true);
    }
  };

  // Splits paragraph into sentence chunks of max ~150 chars for neural TTS streaming
  const chunkTextForAudio = (fullText: string): string[] => {
    const rawSentences = fullText
      .split(/(?<=[।.\n!?])/g)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const chunks: string[] = [];
    let currentChunk = "";

    for (const sent of rawSentences) {
      if ((currentChunk + " " + sent).length < 160) {
        currentChunk = currentChunk ? `${currentChunk} ${sent}` : sent;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = sent;
      }
    }
    if (currentChunk) chunks.push(currentChunk);
    return chunks.length > 0 ? chunks : [fullText];
  };

  // Primary High-Fidelity Audio Streamer (Crystal clear for Gujarati, Marathi, Bengali, Tamil, Hindi)
  const playAudioStream = (chunks: string[], langCode: string) => {
    if (!isPlayingRef.current || chunks.length === 0) {
      stopAll();
      return;
    }

    let chunkIdx = 0;

    const playNextChunk = () => {
      if (!isPlayingRef.current || chunkIdx >= chunks.length) {
        stopAll();
        return;
      }

      const chunk = chunks[chunkIdx];
      const streamUrl = `/api/tts?text=${encodeURIComponent(chunk)}&lang=${encodeURIComponent(langCode)}`;

      const audio = new Audio(streamUrl);
      currentAudioRef.current = audio;
      audio.playbackRate = speechRate;

      audio.onended = () => {
        chunkIdx++;
        if (isPlayingRef.current) {
          playNextChunk();
        }
      };

      audio.onerror = () => {
        if (!isPlayingRef.current) return;
        console.warn("Neural audio stream failed, falling back to Web Speech synthesis");
        playWebSpeechFallback();
      };

      audio.play().catch((err) => {
        if (!isPlayingRef.current) return;
        if (err && err.name === "AbortError") return;
        playWebSpeechFallback();
      });
    };

    playNextChunk();
  };

  // Fallback: Browser Web Speech API
  const playWebSpeechFallback = () => {
    if (!isPlayingRef.current) return;

    if (typeof window === "undefined" || !window.speechSynthesis) {
      stopAll();
      return;
    }

    window.speechSynthesis.cancel();

    const langMap: Record<LanguageCode, string> = {
      en: "en-IN",
      hi: "hi-IN",
      mr: "mr-IN",
      gu: "gu-IN",
      bn: "bn-IN",
      ta: "ta-IN"
    };

    const targetLangCode = langMap[currentLang] || "en-IN";
    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();

    const matchedVoice =
      voices.find((v) => v.lang.toLowerCase().replace("_", "-") === targetLangCode.toLowerCase()) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(currentLang.toLowerCase())) ||
      voices.find((v) => v.lang.toLowerCase().includes("in"));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLangCode;
    utterance.rate = speechRate;
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      stopAll();
    };
    utterance.onerror = () => {
      stopAll();
    };

    activeUtterancesRef.current = [utterance];
    window.speechSynthesis.speak(utterance);
  };

  const startSpeech = () => {
    stopAll();

    isPlayingRef.current = true;
    setIsPlaying(true);

    if (isDroneOn) {
      startDrone();
    }

    const ttsLangMap: Record<LanguageCode, string> = {
      en: "en",
      hi: "hi",
      mr: "mr",
      gu: "gu",
      bn: "bn",
      ta: "ta"
    };

    const targetCode = ttsLangMap[currentLang] || "gu";
    const textChunks = chunkTextForAudio(text);

    // Play high quality neural native speech stream for selected language
    playAudioStream(textChunks, targetCode);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAll();
    } else {
      startSpeech();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-200">
      {/* Player Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <button
            onClick={handleTogglePlay}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 shadow-md ${
              isPlaying
                ? "bg-terracotta-600 hover:bg-terracotta-700 text-white"
                : "bg-stone-900 hover:bg-stone-800 text-white"
            } cursor-pointer`}
          >
            {isPlaying ? (
              <Square className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current translate-x-0.5" />
            )}
          </button>
          <div>
            <h5 className="text-sm font-serif font-bold text-stone-900">
              {isPlaying ? t.audioPlaying || "Narration Playing..." : t.oralHistoryFolklore || "Oral Folklore & Traditions"}
            </h5>
            <p className="text-[11px] text-stone-500 font-medium">
              {t.audioLanguage || "Audio Language"}: <span className="font-bold text-stone-700 uppercase">{currentLang}</span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Atmospheric Ambient Soundscape */}
          <AtmosphericSoundscapePlayer initialPreset="spiritual" />

          {isPlaying && (
            <button
              onClick={toggleDroneMute}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                isDroneOn
                  ? "bg-amber-50 text-amber-900 border-amber-300 shadow-2xs"
                  : "bg-stone-100 text-stone-400 border-stone-200"
              }`}
              title="Toggle ambient tambura drone"
            >
              <Music className={`h-3.5 w-3.5 ${isDroneOn ? "animate-bounce" : ""}`} />
              <span>{isDroneOn ? t.tamburaOn || "Tambura Drone ON" : t.tamburaMuted || "Drone Muted"}</span>
            </button>
          )}

          {/* Speed selector */}
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-stone-200">
            {[0.8, 1.0, 1.2].map((rate) => (
              <button
                key={rate}
                onClick={() => {
                  setSpeechRate(rate);
                  if (isPlaying && currentAudioRef.current) {
                    currentAudioRef.current.playbackRate = rate;
                  }
                }}
                className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
                  speechRate === rate
                    ? "bg-stone-900 text-white font-bold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Audio Soundwave Frequency Visualizer */}
      <div className="rounded-xl bg-stone-900/95 p-3 sm:p-3.5 border border-stone-800 shadow-inner flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-[11px] text-stone-400">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping" : "bg-stone-600"}`} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300 font-bold">
              {isPlaying ? "Live Neural Lore Audio Stream" : "Audio Lore Ready"}
            </span>
          </div>
          <span className="font-mono text-[10px] text-stone-400">
            {isPlaying ? `${speechRate}x • Vernacular Voice` : "Ready to play"}
          </span>
        </div>

        {/* Dynamic Soundwave Bars */}
        <div className="h-10 sm:h-12 flex items-end justify-between gap-1 sm:gap-1.5 px-1 pt-1">
          {Array.from({ length: 28 }).map((_, i) => {
            // Harmonic wave pattern
            const baseHeight = 15 + Math.sin(i * 0.4) * 12 + ((i * 7) % 25);
            return (
              <div
                key={i}
                className={`w-full rounded-full transition-all duration-150 ${
                  isPlaying
                    ? "bg-gradient-to-t from-amber-500 via-terracotta-500 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    : "bg-stone-700/60"
                }`}
                style={{
                  height: isPlaying ? `${Math.max(18, (baseHeight + ((i % 5) * 8)) % 95)}%` : "14%",
                  animationName: isPlaying ? "pulse" : "none",
                  animationDuration: `${(0.35 + (i % 6) * 0.12).toFixed(2)}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                  animationDelay: `${(i * 0.04).toFixed(2)}s`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Folklore Reader Text */}
      <div className="text-sm font-serif italic text-stone-800 leading-relaxed max-h-36 overflow-y-auto pr-2 border-t border-stone-200/60 pt-3">
        &ldquo;{text}&rdquo;
      </div>
    </div>
  );
}
