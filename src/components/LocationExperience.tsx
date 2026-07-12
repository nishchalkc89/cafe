"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LOCATION, WEATHER } from "@/data/location";
import { useCursor } from "@/lib/useCursor";

type TimeBucket = "morning" | "afternoon" | "golden" | "evening" | "night";

const SKY: Record<TimeBucket, { from: string; to: string; body: "sun" | "moon"; stars: boolean }> = {
  morning: { from: "#EAF2ED", to: "#D3E6DC", body: "sun", stars: false },
  afternoon: { from: "#FBF3E3", to: "#F0DDBB", body: "sun", stars: false },
  golden: { from: "#F7C97A", to: "#E08A4F", body: "sun", stars: false },
  evening: { from: "#6B4C3A", to: "#2E1F17", body: "moon", stars: true },
  night: { from: "#1B1410", to: "#0A0806", body: "moon", stars: true },
};

function getBucket(hour: number): TimeBucket {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 18) return "golden";
  if (hour >= 18 && hour < 20) return "evening";
  return "night";
}

export default function LocationExperience() {
  const [bucket, setBucket] = useState<TimeBucket>("afternoon");
  const [hour, setHour] = useState(13);
  const hoverCursor = useCursor("hover");

  useEffect(() => {
    const now = new Date();
    setHour(now.getHours() + now.getMinutes() / 60);
    setBucket(getBucket(now.getHours()));
  }, []);

  const sky = SKY[bucket];
  const arcProgress = ((hour - 5 + 24) % 24) / 14; // 5am..7pm mapped 0..1-ish
  const sunX = 10 + Math.min(Math.max(arcProgress, 0), 1) * 80;
  const sunY = 65 - Math.sin(Math.min(Math.max(arcProgress, 0), 1) * Math.PI) * 50;

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION.mapsQuery)}`;

  return (
    <section id="location" className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5 flex items-center justify-center gap-3 text-coffee/70"
        >
          <span className="h-px w-10 bg-honey" /> Find Us <span className="h-px w-10 bg-honey" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="section-heading font-serif text-4xl leading-tight text-espresso sm:text-5xl"
        >
          One corner,
          <span className="font-serif-italic text-honey-dark"> always warm.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Illustrated scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-30px_rgba(74,51,39,0.4)] transition-colors duration-[3000ms]"
          style={{ backgroundImage: `linear-gradient(180deg, ${sky.from} 0%, ${sky.to} 100%)` }}
        >
          {/* stars */}
          {sky.stars && (
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute h-[2px] w-[2px] rounded-full bg-white/70"
                  style={{
                    left: `${(i * 37) % 100}%`,
                    top: `${(i * 53) % 60}%`,
                    opacity: 0.3 + ((i * 13) % 60) / 100,
                    animation: `breathe ${3 + (i % 4)}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          )}

          {/* sun / moon */}
          <motion.div
            className="absolute h-10 w-10 rounded-full"
            style={{
              left: `${sunX}%`,
              top: `${sunY}%`,
              background: sky.body === "sun" ? "#FBEBA0" : "#EDEAE0",
              boxShadow:
                sky.body === "sun"
                  ? "0 0 60px 20px rgba(251,235,160,0.6)"
                  : "0 0 30px 8px rgba(237,234,224,0.35)",
            }}
          />

          {/* skyline silhouette */}
          <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full" style={{ height: "40%" }}>
            <path
              d="M0,100 L0,55 L20,55 L20,40 L45,40 L45,60 L70,60 L70,30 L95,30 L95,58 L130,58 L130,45 L160,45 L160,62 L190,62 L190,35 L220,35 L220,58 L250,58 L250,42 L280,42 L280,60 L310,60 L310,48 L340,48 L340,62 L370,62 L370,50 L400,50 L400,100 Z"
              fill={bucket === "night" || bucket === "evening" ? "#14100C" : "#4A3327"}
              opacity={bucket === "night" ? 0.9 : 0.55}
            />
          </svg>

          {/* café window glow */}
          <div className="absolute bottom-[18%] left-1/2 h-16 w-24 -translate-x-1/2 rounded-t-lg bg-honey/70 blur-sm" />

          {/* location marker */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-[85%] flex-col items-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className="h-10 w-10 rotate-45 rounded-tl-full rounded-tr-full rounded-bl-full bg-espresso shadow-lg"
                style={{ borderRadius: "50% 50% 50% 0" }}
              />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-honey" />
            </motion.div>
            <motion.div
              className="mt-1 h-2 w-8 rounded-full bg-espresso/30 blur-[2px]"
              animate={{ scaleX: [1, 0.7, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* weather badge */}
          <div className="glass absolute right-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5">
            <span className="font-sans text-xs text-espresso/80">{WEATHER.label}</span>
            <span className="font-serif text-sm text-espresso">{WEATHER.temp}°F</span>
          </div>
        </motion.div>

        {/* info card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass flex flex-col justify-between rounded-[2rem] p-8"
        >
          <div>
            <div className="font-serif text-xl text-espresso">{LOCATION.address}</div>

            <div className="mt-6 space-y-2">
              {LOCATION.hours.map((h) => (
                <div key={h.day} className="flex justify-between font-sans text-sm text-coffee/70">
                  <span>{h.day}</span>
                  <span className="text-espresso">{h.time}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 font-sans text-sm leading-relaxed text-coffee/60">{LOCATION.parking}</p>
          </div>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            {...hoverCursor}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3.5 font-sans text-[12px] uppercase tracking-widest text-cream transition-transform hover:-translate-y-0.5"
          >
            Get Directions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
