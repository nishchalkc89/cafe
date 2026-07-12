"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import WhyIcon from "./WhyIcon";
import { useAppStore } from "@/store/useAppStore";

interface Props {
  title: string;
  desc: string;
  icon: string;
  variant: "lift" | "steam" | "expand" | "spotlight";
  index: number;
}

export default function WhyCard({ title, desc, icon, variant, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);

  const handleSpotlight = (e: React.MouseEvent) => {
    if (variant !== "spotlight" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleSpotlight}
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        variant === "lift"
          ? { y: -10, rotate: 3, scale: 1.02 }
          : { y: -6 }
      }
      className="group relative overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-cream/70 p-8 shadow-[0_16px_50px_-28px_rgba(74,51,39,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgba(74,51,39,0.45)]"
      style={
        variant === "spotlight"
          ? ({ "--x": "50%", "--y": "50%" } as React.CSSProperties)
          : undefined
      }
    >
      {variant === "expand" && (
        <div className="pointer-events-none absolute -inset-8 scale-0 rounded-full bg-honey/10 blur-2xl transition-transform duration-700 ease-out group-hover:scale-100" />
      )}

      {variant === "spotlight" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(220px circle at var(--x) var(--y), rgba(217,164,65,0.18), transparent 70%)",
          }}
        />
      )}

      {variant === "lift" && (
        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 0 1px rgba(217,164,65,0.5)" }} />
      )}

      <div className="relative">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-forest/8 text-forest">
          <WhyIcon name={icon} />
          {variant === "steam" && (
            <>
              <span className="absolute -top-3 left-1/2 h-6 w-1 -translate-x-1/2 rounded-full bg-cream/0 opacity-0 blur-[2px] transition-all duration-700 group-hover:-top-9 group-hover:bg-latte/60 group-hover:opacity-70" />
              <span className="absolute -top-3 left-[40%] h-5 w-1 -translate-x-1/2 rounded-full bg-cream/0 opacity-0 blur-[2px] transition-all delay-100 duration-700 group-hover:-top-8 group-hover:bg-latte/50 group-hover:opacity-60" />
              <span className="absolute -top-3 left-[60%] h-5 w-1 -translate-x-1/2 rounded-full bg-cream/0 opacity-0 blur-[2px] transition-all delay-200 duration-700 group-hover:-top-8 group-hover:bg-latte/50 group-hover:opacity-60" />
            </>
          )}
        </div>

        <h3 className="mt-6 font-serif text-xl text-espresso">{title}</h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-coffee/70">{desc}</p>
      </div>
    </motion.div>
  );
}
