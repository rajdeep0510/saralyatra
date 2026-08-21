import React, { useState, useEffect, useRef } from "react";
import { Play, Square, Music } from "lucide-react";

export default function AudioNarrator({ text, currentLang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDroneOn, setIsDroneOn] = useState(true);
  const [speechRate, setSpeechRate] = useState(1.0);

  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);

  function stopAll() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    stopDrone();
    setIsPlaying(prev => {
      if (prev) return false;
      return prev;
    });
  }
// this is a comment for git issue nothign related to this. 
  function stopDrone() {
    if (oscillatorsRef.current.length > 0) {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch { }
      });
      oscillatorsRef.current = [];
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch { }
      audioCtxRef.current = null;
    }
  }

  useEffect(() => {
    stopAll();
    return () => stopAll();
  }, [text, currentLang]);

  // Tambura Drone Synthesizer using Web Audio API
  const startDrone = () => {
    try {
      if (audioCtxRef.current) return;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
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

      const pitches = [196.00, 130.81, 130.81, 65.41];
      const types = ["sawtooth", "triangle", "sawtooth", "triangle"];

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

    if (isDroneOn) {
      gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      setIsDroneOn(false);
    } else {
      gainNodeRef.current.gain.setValueAtTime(0.06, audioCtxRef.current.currentTime);
      setIsDroneOn(true);
    }
  };

  const startSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
      en: "en-IN",
      hi: "hi-IN",
      gu: "gu-IN",
      ta: "ta-IN"
    };

    utterance.lang = langMap[currentLang] || "en-IN";
    utterance.rate = speechRate;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(utterance.lang));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      stopAll();
    };

    utterance.onerror = () => {
      stopAll();
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);

    if (isDroneOn) {
      startDrone();
    }
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
              {isPlaying ? "Narration Playing..." : "Oral History & Folklore Story"}
            </h5>
            <p className="text-[11px] text-stone-500 font-medium">
              Audio Language: <span className="font-bold text-stone-700 uppercase">{currentLang}</span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
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
              <span>{isDroneOn ? "Tambura Drone ON" : "Drone Muted"}</span>
            </button>
          )}

          {/* Speed selector */}
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-stone-200">
            {[0.8, 1.0, 1.2].map((rate) => (
              <button
                key={rate}
                onClick={() => {
                  setSpeechRate(rate);
                  if (isPlaying) {
                    startSpeech();
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

      {/* Folklore Reader Text */}
      <div className="text-sm font-serif italic text-stone-700 leading-relaxed max-h-36 overflow-y-auto pr-2 border-t border-stone-200/60 pt-3">
        &ldquo;{text}&rdquo;
      </div>
    </div>
  );
}
