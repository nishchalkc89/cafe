"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAppStore } from "@/store/useAppStore";
import { STATS } from "@/data/stats";
import { respectMotionPreference } from "@/lib/prefersReducedMotion";
import AnimatedCounter from "./AnimatedCounter";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const hasEntered = useAppStore((s) => s.hasEntered);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);
  const ctas = useRef<HTMLDivElement>(null);
  const eyebrow = useRef<HTMLDivElement>(null);
  const stats = useRef<HTMLDivElement>(null);
  const sceneWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasEntered) return;
    const tl = respectMotionPreference(gsap.timeline({ delay: 0.2 }));

    tl.fromTo(eyebrow.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });

    tl.fromTo(
      sceneWrap.current,
      { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 1.6, ease: "power3.out" },
      "-=0.3"
    );

    [line1, line2].forEach((l, i) => {
      tl.fromTo(
        l.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
        0.35 + i * 0.12
      );
    });

    tl.fromTo(
      desc.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(
      ctas.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(
      stats.current?.children ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
      "-=0.5"
    );
  }, [hasEntered]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-10">
        {/* LEFT */}
        <div className="relative z-10 order-2 md:order-1">
          <div ref={eyebrow} className="eyebrow mb-6 flex items-center gap-3 text-coffee/70 opacity-0">
            <span className="text-honey">★</span>
            Premium Specialty Coffee Since 2015
          </div>

          <h1 className="section-heading overflow-hidden font-serif text-5xl leading-[1.05] text-espresso sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span ref={line1} className="inline-block">
                Crafted With Passion.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={line2} className="inline-block font-serif-italic text-honey-dark">
                Served With Soul.
              </span>
            </span>
          </h1>

          <p ref={desc} className="mt-7 max-w-md text-balance font-sans text-lg leading-relaxed text-coffee/80 opacity-0">
            Discover handcrafted specialty coffee, freshly baked pastries, and
            unforgettable moments inside Aurora Roast. Every bean is ethically
            sourced, every recipe perfected, and every visit designed to
            become a memory.
          </p>

          <div ref={ctas} className="mt-10 flex flex-wrap items-center gap-5 opacity-0">
            <MagneticButton
              as="a"
              href="#menu"
              className="rounded-full bg-espresso px-8 py-4 font-sans text-[13px] uppercase tracking-widest text-cream shadow-[0_10px_30px_-8px_rgba(36,24,18,0.5)] transition-transform hover:-translate-y-0.5"
            >
              Explore Our Coffee
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#visit"
              className="group flex items-center gap-2 font-sans text-[13px] uppercase tracking-widest text-espresso"
            >
              Reserve a Table
              <span className="inline-block h-8 w-8 rounded-full border border-espresso/30 text-center leading-8 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </MagneticButton>
          </div>

          <div ref={stats} className="mt-16 grid max-w-lg grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="opacity-0">
                <div className="font-serif text-3xl text-forest">
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="mt-1 font-sans text-[11px] uppercase tracking-wider text-coffee/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div
          ref={sceneWrap}
          aria-hidden="true"
          className="relative order-1 mx-auto aspect-square w-full max-w-[560px] md:order-2 opacity-0"
        >
          {/* organic circular backdrop */}
          <div
            className="absolute inset-[6%] rounded-full animate-breathe"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, rgba(240,198,116,0.45) 0%, rgba(217,164,65,0.22) 35%, rgba(74,51,39,0.08) 70%, transparent 100%)",
              filter: "blur(2px)",
            }}
          />
          <div className="absolute inset-[14%] rounded-full border border-honey/25" />

          {/* main photo */}
          <div className="absolute inset-[10%] overflow-hidden rounded-[40%_60%_55%_45%/50%_45%_55%_50%] shadow-[0_30px_60px_-15px_rgba(36,24,18,0.45)]">
            <Image
              src="/images/hero/latte-rosette.png"
              alt="Cappuccino with latte art rosette"
              fill
              priority
              sizes="(min-width: 768px) 480px, 90vw"
              className="object-cover"
            />
          </div>

          {/* floating bean macro shot */}
          <div className="absolute -bottom-2 -left-4 h-28 w-28 overflow-hidden rounded-full border-4 border-cream shadow-[0_15px_30px_-8px_rgba(36,24,18,0.5)] animate-float sm:h-36 sm:w-36">
            <Image
              src="/images/hero/coffee-beans.png"
              alt="Freshly roasted coffee beans"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>

          {/* floating pour shot */}
          <div className="absolute -top-4 -right-2 h-24 w-24 overflow-hidden rounded-full border-4 border-cream shadow-[0_15px_30px_-8px_rgba(36,24,18,0.5)] animate-float-slow sm:h-32 sm:w-32">
            <Image
              src="/images/hero/latte-pour.png"
              alt="Barista pouring latte art"
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-coffee/50 sm:flex">
        <span className="font-sans text-[10px] uppercase tracking-widest2">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-coffee/30" />
      </div>
    </section>
  );
}
