"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useProductModal } from "@/store/useProductModal";
import { useCursor } from "@/lib/useCursor";

export default function ProductModal() {
  const item = useProductModal((s) => s.item);
  const close = useProductModal((s) => s.close);
  const closeCursor = useCursor("hover");
  const labelsRef = useRef<HTMLDivElement>(null);
  const nutritionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({ delay: 0.5 });
    const labels = labelsRef.current?.querySelectorAll(".ingredient-tag");
    const facts = nutritionRef.current?.querySelectorAll(".nutrition-fact");
    if (labels?.length) {
      tl.fromTo(
        labels,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" }
      );
    }
    if (facts?.length) {
      tl.fromTo(
        facts,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.2"
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      tl.kill();
    };
  }, [item, close]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="product-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.name} quick view`}
          className="fixed inset-0 z-[1050] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute inset-0 bg-warmblack/85 backdrop-blur-xl"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="glass-dark relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-[2rem] md:grid-cols-2"
          >
            <button
              onClick={close}
              {...closeCursor}
              aria-label="Close quick view"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-transform hover:scale-110"
            >
              ✕
            </button>

            <div className="relative aspect-square md:aspect-auto md:min-h-[520px]">
              <Image src={item.image} alt={item.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="eyebrow text-honey/80">Quick View</span>
              <h3 className="section-heading mt-3 font-serif text-3xl text-cream sm:text-4xl">
                {item.name}
              </h3>
              <p className="mt-4 font-sans text-cream/70">{item.story}</p>

              <div ref={labelsRef} className="mt-6 flex flex-wrap gap-2">
                {item.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="ingredient-tag rounded-full border border-honey/30 px-3 py-1 font-sans text-xs uppercase tracking-wide text-honey/90 opacity-0"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <div ref={nutritionRef} className="mt-8 grid grid-cols-3 gap-4">
                <div className="nutrition-fact opacity-0">
                  <div className="font-serif text-2xl text-cream">{item.calories}</div>
                  <div className="font-sans text-[11px] uppercase tracking-wide text-cream/50">Calories</div>
                </div>
                <div className="nutrition-fact opacity-0">
                  <div className="font-serif text-2xl text-cream">{item.prepTime}</div>
                  <div className="font-sans text-[11px] uppercase tracking-wide text-cream/50">Prep Time</div>
                </div>
                <div className="nutrition-fact opacity-0">
                  <div className="font-serif text-2xl text-cream">★ {item.rating}</div>
                  <div className="font-sans text-[11px] uppercase tracking-wide text-cream/50">Rating</div>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <span className="font-serif text-3xl text-honey">${item.price.toFixed(2)}</span>
                <button className="rounded-full bg-honey px-7 py-3.5 font-sans text-[12px] uppercase tracking-widest text-espresso transition-transform hover:-translate-y-0.5">
                  Add to Order
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
