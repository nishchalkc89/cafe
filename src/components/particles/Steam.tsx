"use client";

import { useEffect, useRef } from "react";

export default function Steam({
  intensity = 1,
  wispCount = 3,
  className = "",
}: {
  /** 0 = no steam (cold drinks), 1 = full steam (hot drinks) */
  intensity?: number;
  wispCount?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const bend = Math.max(-1, Math.min(1, (e.clientX - cx) / 240));
      el.style.setProperty("--wind", `${bend * 12}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (intensity <= 0.02) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute flex gap-2 ${className}`}
      style={{ opacity: Math.min(1, intensity) }}
    >
      {Array.from({ length: wispCount }).map((_, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full bg-white/50 blur-[3px]"
          style={{
            height: `${18 + i * 6}px`,
            animation: `steamRise ${3.2 + i * 0.6}s ${i * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
