"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENU_CATEGORIES } from "@/data/menuCategories";
import CategoryTabs from "./CategoryTabs";
import MenuCard from "./MenuCard";
import CoffeeBeans from "@/components/particles/CoffeeBeans";

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [displayCategory, setDisplayCategory] = useState(MENU_CATEGORIES[0].id);
  const isFirstExit = useRef(true);
  const isFirstEntrance = useRef(true);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const category = MENU_CATEGORIES.find((c) => c.id === displayCategory)!;

  // exit animation when the user picks a new category
  useEffect(() => {
    if (isFirstExit.current) {
      isFirstExit.current = false;
      return;
    }
    const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
    const tl = gsap.timeline({ onComplete: () => setDisplayCategory(activeCategory) });
    tl.to(cards, {
      y: -14,
      scale: 0.96,
      filter: "blur(8px)",
      opacity: 0,
      duration: 0.4,
      stagger: 0.04,
      ease: "power2.in",
    });
    tl.to(glowRef.current, { opacity: 0, duration: 0.3 }, "<");
    return () => {
      tl.kill();
    };
  }, [activeCategory]);

  // entrance animation whenever the displayed category (and its DOM) changes
  useEffect(() => {
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(closest-side, ${category.accent}30, transparent 75%)`;
    }
    const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
    const tl = gsap.timeline({
      scrollTrigger: isFirstEntrance.current
        ? { trigger: gridRef.current, start: "top 88%" }
        : undefined,
    });
    tl.to(glowRef.current, { opacity: 1, duration: 0.6, ease: "power2.inOut" });
    tl.fromTo(
      cards,
      { y: 26, scale: 0.94, filter: "blur(8px)", opacity: 0 },
      { y: 0, scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" },
      "<"
    );
    isFirstEntrance.current = false;
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayCategory]);

  return (
    <section id="menu" className="relative overflow-hidden px-6 py-32 md:px-10 md:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[110px]"
        />
        <CoffeeBeans variant="float" />
      </div>

      <div className="mx-auto mb-12 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5 flex items-center justify-center gap-3 text-coffee/70"
        >
          <span className="h-px w-10 bg-honey" /> The Menu <span className="h-px w-10 bg-honey" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="section-heading font-serif text-4xl leading-tight text-espresso sm:text-5xl"
        >
          {category.tagline.replace(/\.$/, "")}
          <span className="font-serif-italic text-honey-dark">.</span>
        </motion.h2>
      </div>

      <div className="mx-auto mb-10 flex max-w-6xl justify-center">
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </div>

      <div
        ref={gridRef}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {category.items.map((item) => (
          <MenuCard key={item.id} item={item} accent={category.accent} />
        ))}
      </div>
    </section>
  );
}
