"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menuCategories";
import { useTilt } from "@/lib/useTilt";
import { useCursor } from "@/lib/useCursor";
import Steam from "@/components/particles/Steam";
import { useProductModal } from "@/store/useProductModal";

export default function MenuCard({ item, accent }: { item: MenuItem; accent: string }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(7);
  const [favorite, setFavorite] = useState(false);
  const viewCursor = useCursor("view");
  const openQuickView = useProductModal((s) => s.open);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="menu-card group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-cream/70 p-6 shadow-[0_20px_60px_-30px_rgba(74,51,39,0.35)]"
    >
      <div
        className="relative mb-6 aspect-[5/4] w-full overflow-hidden rounded-2xl"
        {...viewCursor}
        onClick={() => openQuickView(item)}
        role="button"
        tabIndex={0}
        aria-label={`Quick view ${item.name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openQuickView(item);
        }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-grain-noise" />
        <Steam
          intensity={item.hot ? 0.9 : 0.12}
          wispCount={3}
          className="left-1/2 top-4 -translate-x-1/2"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setFavorite((f) => !f);
          }}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorite}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/85 shadow-md backdrop-blur transition-transform hover:scale-110"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={favorite ? accent : "none"}>
            <path
              d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.4 5 6 5c2 0 3.6 1.1 6 3.6C14.4 6.1 16 5 18 5c3.6 0 5.5 3.4 4 6.9C19.5 16.4 12 21 12 21Z"
              stroke={accent}
              strokeWidth="1.4"
            />
          </svg>
        </button>

        <span className="absolute bottom-3 left-3 rounded-full bg-cream/85 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-espresso/80 shadow backdrop-blur">
          {item.prepTime}
        </span>
      </div>

      <h3 className="section-heading font-serif text-xl text-espresso">{item.name}</h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-coffee/70">{item.story}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.ingredients.map((ing) => (
          <span
            key={ing}
            className="rounded-full bg-espresso/5 px-2.5 py-1 font-sans text-[10px] uppercase tracking-wide text-coffee/65"
          >
            {ing}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 font-sans text-xs text-coffee/55">
        <span>{item.calories} cal</span>
        <span className="flex items-center gap-1">
          <span style={{ color: accent }}>★</span> {item.rating}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-serif text-2xl text-forest">${item.price.toFixed(2)}</span>
        <button
          onClick={() => openQuickView(item)}
          className="rounded-full px-4 py-2 font-sans text-[11px] uppercase tracking-widest text-cream transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: accent }}
        >
          Quick View
        </button>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}80` }}
      />
    </motion.div>
  );
}
