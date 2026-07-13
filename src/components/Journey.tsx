"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { JOURNEY_STEPS } from "@/data/journey";
import JourneyIcon from "./JourneyIcon";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      const getDistance = () => track.scrollWidth - wrapper.offsetWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${Math.max(getDistance(), 1)}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={wrapperRef} className="relative overflow-hidden bg-beige">
      <div className="flex h-screen items-center">
        <div ref={trackRef} className="flex items-center gap-8 px-[6vw] will-change-transform">
          <div className="w-[70vw] shrink-0 sm:w-[40vw] lg:w-[26vw]">
            <div className="eyebrow mb-5 flex items-center gap-3 text-coffee/70">
              <span className="h-px w-10 bg-honey" /> Our Coffee Journey
            </div>
            <h2 className="section-heading font-serif text-4xl leading-tight text-espresso sm:text-5xl">
              From soil
              <br />
              <span className="font-serif-italic text-honey-dark">to your hands.</span>
            </h2>
            <p className="mt-6 max-w-xs font-sans text-coffee/70">
              Scroll to follow a single bean through five deliberate stages.
            </p>
          </div>

          {JOURNEY_STEPS.map((step) => (
            <div
              key={step.n}
              className="group relative h-[26rem] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] border border-espresso/10 shadow-[0_20px_60px_-30px_rgba(74,51,39,0.3)] sm:w-[42vw] lg:w-[24vw]"
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 42vw, 78vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
              <div className="relative flex h-full flex-col justify-between p-9">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-6xl text-cream/60">{step.n}</span>
                  <JourneyIcon kind={step.kind} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-cream">{step.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-cream/80">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
