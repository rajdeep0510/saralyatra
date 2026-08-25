"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  opacity: number;
  emoji: string;
}

interface MarigoldConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

export default function MarigoldConfetti({
  active,
  onComplete
}: MarigoldConfettiProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active) {
      setPetals([]);
      return;
    }

    const emojis = ["🌼", "🌸", "🌺", "✨", "🏵️", "🪷"];
    const colors = ["#F59E0B", "#F97316", "#EA580C", "#EC4899", "#E11D48"];

    const newPetals: Petal[] = Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage vw
      y: -10 - Math.random() * 20, // percentage vh
      size: 16 + Math.random() * 18,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      speedY: 1.5 + Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 1.5,
      opacity: 0.9 + Math.random() * 0.1,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setPetals(newPetals);

    const timer = setTimeout(() => {
      setPetals([]);
      if (onComplete) onComplete();
    }, 3800);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active || petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-in fade-in duration-300 select-none"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            fontSize: `${p.size}px`,
            transform: `rotate(${p.rotation}deg)`,
            animation: `fallMarigold ${2.8 + (p.id % 4) * 0.3}s ease-in-out forwards`,
            animationDelay: `${(p.id % 8) * 0.12}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style jsx global>{`
        @keyframes fallMarigold {
          0% {
            transform: translateY(-5vh) rotate(0deg) scale(0.8);
            opacity: 1;
          }
          50% {
            transform: translateY(45vh) translateX(30px) rotate(180deg) scale(1.1);
            opacity: 0.95;
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
