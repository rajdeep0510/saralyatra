"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Play, Pause, Bell, Wind, Music, Radio } from "lucide-react";

export type SoundscapePreset = "spiritual" | "nature" | "heritage";

interface AtmosphericSoundscapePlayerProps {
  initialPreset?: SoundscapePreset;
  className?: string;
}

export default function AtmosphericSoundscapePlayer({
  initialPreset = "spiritual",
  className = ""
}: AtmosphericSoundscapePlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [preset, setPreset] = useState<SoundscapePreset>(initialPreset);
  const [volume, setVolume] = useState<number>(0.3);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Web Audio context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.value = volume;
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play resonant temple bell harmonic tone
  const triggerTempleBell = (ctx: AudioContext, masterGain: GainNode) => {
    const baseFreq = 528; // Solfeggio Love/Healing frequency
    const harmonics = [1, 2.76, 5.4, 8.93];

    harmonics.forEach((h, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = index === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(baseFreq * h, ctx.currentTime);

      const decay = 2.5 / (index + 1);
      gain.gain.setValueAtTime(0.12 / (index + 1), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decay);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start();
      osc.stop(ctx.currentTime + decay);
    });
  };

  // Play continuous Tanpura / Sitar resonant drone
  const createDroneLoop = (ctx: AudioContext, masterGain: GainNode, rootFreq: number = 138.59) => {
    // Sa - Pa Indian classical drone notes
    const freqs = [rootFreq, rootFreq * 1.5, rootFreq * 2];
    const nodes: { osc: OscillatorNode; gain: GainNode }[] = [];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Lowpass filter for warm rich acoustic acoustic sound
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320 + idx * 80, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start();
      nodes.push({ osc, gain });
    });

    return nodes;
  };

  // Soundscape runner
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const ctx = getAudioContext();
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    let droneNodes: { osc: OscillatorNode; gain: GainNode }[] = [];

    if (preset === "spiritual") {
      // Periodic soft temple bells + warm tanpura drone
      droneNodes = createDroneLoop(ctx, master, 138.59); // C# Sa
      triggerTempleBell(ctx, master);
      intervalRef.current = setInterval(() => {
        if (isPlaying && audioCtxRef.current) {
          triggerTempleBell(audioCtxRef.current, master);
        }
      }, 4200);
    } else if (preset === "nature") {
      // Flowing water & river breeze simulation
      droneNodes = createDroneLoop(ctx, master, 110.0); // A Sa
      intervalRef.current = setInterval(() => {
        if (isPlaying && audioCtxRef.current) {
          // Soft high bell chime
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(880 + Math.random() * 200, ctx.currentTime);
          g.gain.setValueAtTime(0.04, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
          osc.connect(g);
          g.connect(master);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        }
      }, 3500);
    } else if (preset === "heritage") {
      // Royal acoustic sitar resonance & desert wind
      droneNodes = createDroneLoop(ctx, master, 146.83); // D Sa
      intervalRef.current = setInterval(() => {
        if (isPlaying && audioCtxRef.current) {
          // Acoustic sitar pluck simulation
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(293.66 * (1 + Math.random() * 0.5), ctx.currentTime);
          g.gain.setValueAtTime(0.06, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
          osc.connect(g);
          g.connect(master);
          osc.start();
          osc.stop(ctx.currentTime + 1.8);
        }
      }, 3800);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      droneNodes.forEach(({ osc, gain }) => {
        try {
          gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
          osc.stop(ctx.currentTime + 0.3);
        } catch {
          // ignore already stopped
        }
      });
    };
  }, [isPlaying, preset]);

  // Volume handler
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  const togglePlayback = () => {
    getAudioContext();
    setIsPlaying((prev) => !prev);
  };

  const presetsConfig = [
    { id: "spiritual", label: "Temple Bells & Aarti", icon: Bell, desc: "Sacred chimes & tanpura drone", color: "text-amber-700 bg-amber-50" },
    { id: "nature", label: "River Ghats & Stream", icon: Wind, desc: "Flowing breeze & nature water", color: "text-emerald-700 bg-emerald-50" },
    { id: "heritage", label: "Royal Fort Sitar", icon: Music, desc: "Acoustic sitar & palace resonance", color: "text-purple-700 bg-purple-50" },
  ];

  return (
    <div className={`relative inline-flex items-center gap-2 ${className}`}>
      {/* Compact Mini Soundscape Controller */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 backdrop-blur-md border border-stone-200 shadow-2xs">
        <button
          type="button"
          onClick={togglePlayback}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isPlaying
              ? "bg-amber-500 text-stone-950 shadow-xs animate-pulse"
              : "bg-stone-100 hover:bg-stone-200 text-stone-700"
          }`}
          title={isPlaying ? "Pause Atmospheric Soundscape" : "Play Ambient Cultural Soundscape"}
        >
          {isPlaying ? (
            <>
              <Pause className="h-3.5 w-3.5 fill-current" />
              <span>Ambient Sound: ON</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Atmospheric Audio</span>
            </>
          )}
        </button>

        {/* Expand / Soundscape selector trigger */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          title="Soundscape settings"
        >
          <Radio className={`h-3.5 w-3.5 ${isPlaying ? "text-amber-600 animate-spin" : ""}`} />
        </button>
      </div>

      {/* Expanded Soundscape Popover Menu */}
      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-white border border-stone-200 shadow-xl z-50 space-y-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
            <span className="text-[10px] font-mono font-bold tracking-widest text-terracotta-700 uppercase">
              Ambient Soundscape
            </span>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-stone-400 hover:text-stone-700"
            >
              <VolumeX className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            {presetsConfig.map((p) => {
              const Icon = p.icon;
              const isSelected = preset === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPreset(p.id as SoundscapePreset);
                    if (!isPlaying) setIsPlaying(true);
                  }}
                  className={`w-full p-2 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-stone-50 hover:bg-stone-100 text-stone-800"
                  }`}
                >
                  <span className={`p-1 rounded-lg ${isSelected ? "bg-white/20 text-white" : p.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate leading-tight">
                      {p.label}
                    </div>
                    <div className={`text-[9px] truncate ${isSelected ? "text-amber-200" : "text-stone-400"}`}>
                      {p.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="pt-2 border-t border-stone-100 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-stone-600">
              <span className="flex items-center gap-1">
                <Volume2 className="h-3 w-3 text-stone-500" />
                <span>Ambient Volume</span>
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-terracotta-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}
