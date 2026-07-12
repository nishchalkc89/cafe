"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ABOUT_STATS } from "@/data/stats";
import AnimatedCounter from "./AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imgA = useRef<HTMLDivElement>(null);
  const imgB = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        maskRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.to(imgA.current, {
        yPercent: -16,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(imgB.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      const lines = words.current?.querySelectorAll(".reveal-line");
      if (lines) {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: words.current, start: "top 80%" },
          }
        );
      }

      gsap.fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div className="relative order-2 grid grid-cols-2 gap-4 md:order-1">
          <div ref={maskRef} className="col-span-2 overflow-hidden rounded-[2rem]">
            <div ref={imgA} className="relative aspect-[4/5] w-full">
              <Image
                src="/images/about/interior.png"
                alt="Aurora Roast café interior"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div
            ref={imgB}
            className="relative col-span-1 col-start-2 -mt-16 aspect-square w-4/5 justify-self-end overflow-hidden rounded-[1.5rem] shadow-2xl sm:w-3/4"
          >
            <Image
              src="/images/about/hands-cup.png"
              alt="Hands warming around a coffee cup"
              fill
              sizes="(min-width: 768px) 25vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-honey/20 blur-2xl" />
        </div>

        <div ref={words} className="order-1 md:order-2">
          <div className="reveal-line eyebrow mb-6 flex items-center gap-3 text-coffee/70">
            <span className="h-px w-10 bg-honey" /> More Than A Coffee Shop
          </div>
          <h2 className="reveal-line section-heading font-serif text-4xl leading-tight text-espresso sm:text-5xl">
            Coffee.
            <br />
            People.
            <br />
            <span className="font-serif-italic text-honey-dark">Moments.</span>
          </h2>
          <p className="reveal-line mt-8 max-w-md text-balance font-sans text-lg leading-relaxed text-coffee/80">
            Aurora Roast was created from a simple idea: great coffee should
            slow down time.
          </p>
          <p className="reveal-line mt-5 max-w-md text-balance font-sans text-lg leading-relaxed text-coffee/80">
            Every cup begins with carefully selected beans from sustainable
            farms. Every pastry is baked fresh every morning. Every corner of
            our café is designed to inspire conversations, creativity, and
            unforgettable memories.
          </p>
          <p className="reveal-line mt-5 max-w-md font-serif text-xl italic text-espresso">
            This is not just coffee. This is an experience.
          </p>

          <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {ABOUT_STATS.map((s) => (
              <div key={s.label} className="opacity-0">
                <div className="font-serif text-3xl text-forest">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-sans text-[11px] uppercase tracking-wider text-coffee/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
