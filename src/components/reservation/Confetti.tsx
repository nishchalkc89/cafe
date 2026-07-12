"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#D9A441", "#2C3B2E", "#C68B4F", "#F0C674", "#6B4C3A"];

export default function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        angle: Math.random() * Math.PI * 2,
        distance: 120 + Math.random() * 220,
        size: 5 + Math.random() * 6,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
        delay: Math.random() * 0.15,
        duration: 1 + Math.random() * 0.8,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {pieces.map((p) => {
        const dx = Math.cos(p.angle) * p.distance;
        const dy = Math.sin(p.angle) * p.distance - 40;
        return (
          <motion.span
            key={p.id}
            className="absolute"
            style={{ width: p.size, height: p.size * 0.5, backgroundColor: p.color }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: dx, y: dy, opacity: 0, rotate: p.rotate }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
