"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_IMAGES } from "@/data/gallery";
import { useCursor } from "@/lib/useCursor";
import { useAppStore } from "@/store/useAppStore";
import CoffeeBeans from "@/components/particles/CoffeeBeans";

const SPAN_CLASSES: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

export default function Gallery() {
  const openCursor = useCursor("open");
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, setActiveIndex]);

  const active = activeIndex !== null ? GALLERY_IMAGES[activeIndex] : null;

  return (
    <section id="gallery" className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40">
      <CoffeeBeans variant="drift" />

      <div className="mx-auto mb-16 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5 flex items-center justify-center gap-3 text-coffee/70"
        >
          <span className="h-px w-10 bg-honey" /> Inside Aurora Roast <span className="h-px w-10 bg-honey" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="section-heading font-serif text-4xl leading-tight text-espresso sm:text-5xl"
        >
          A few quiet
          <span className="font-serif-italic text-honey-dark"> moments.</span>
        </motion.h2>
      </div>

      <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[190px] sm:grid-cols-3 lg:grid-cols-4">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={img.id}
            layoutId={`gallery-${img.id}`}
            onClick={() => setActiveIndex(i)}
            {...openCursor}
            role="button"
            tabIndex={0}
            aria-label={`Open photo: ${img.caption}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActiveIndex(i);
            }}
            whileHover={{ scale: 1.02 }}
            className={`group relative cursor-none overflow-hidden rounded-2xl shadow-[0_16px_40px_-24px_rgba(74,51,39,0.4)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-24px_rgba(74,51,39,0.5)] ${SPAN_CLASSES[img.span]}`}
          >
            {/* Purely decorative mask reveal — kept off the click target so an
                in-progress clip-path animation can never eat pointer events. */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, amount: 0, margin: "200px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.08 }}
            >
              <Image
                src={img.image}
                alt={img.caption}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.35)" }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 bg-gradient-to-t from-black/55 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-sans text-xs uppercase tracking-widest text-white">{img.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[1040] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => setCursorVariant("default")}
          >
            <motion.div
              className="absolute inset-0 bg-warmblack/90 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIndex(null)}
            />

            <motion.div
              layoutId={`gallery-${active.id}`}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image src={active.image} alt={active.caption} fill sizes="672px" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <span className="font-serif text-xl italic text-white">{active.caption}</span>
              </div>
            </motion.div>

            <button
              onClick={() => setActiveIndex(null)}
              aria-label="Close gallery"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-transform hover:scale-110"
            >
              ✕
            </button>
            <button
              onClick={() =>
                setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length))
              }
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-transform hover:scale-110 sm:left-8"
            >
              ←
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length))}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-transform hover:scale-110 sm:right-8"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
