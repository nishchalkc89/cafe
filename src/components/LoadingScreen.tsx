"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAppStore } from "@/store/useAppStore";
import { respectMotionPreference } from "@/lib/prefersReducedMotion";

const MESSAGES = [
  "Roasting today's finest beans...",
  "Preparing your experience...",
  "Brewing perfection...",
  "Almost ready...",
];

interface Bean {
  id: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
}

export default function LoadingScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState(0);
  const [beans, setBeans] = useState<Bean[]>([]);
  const finishLoading = useAppStore((s) => s.finishLoading);
  const setLoadProgress = useAppStore((s) => s.setLoadProgress);

  useEffect(() => {
    setBeans(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 5,
        scale: 0.5 + Math.random() * 0.8,
      }))
    );
  }, []);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessage((m) => (m + 1) % MESSAGES.length);
    }, 950);

    const tl = respectMotionPreference(gsap.timeline());

    tl.set(glowRef.current, { scale: 0.2, opacity: 0 });
    tl.to(glowRef.current, {
      scale: 1,
      opacity: 1,
      duration: 2.6,
      ease: "power2.out",
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, filter: "blur(18px)", y: 16 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.6, ease: "power3.out" },
      0.4
    );

    const progressObj = { val: 0 };
    tl.to(
      progressObj,
      {
        val: 100,
        duration: 3.2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (barRef.current) barRef.current.style.width = `${progressObj.val}%`;
          setLoadProgress(progressObj.val);
        },
      },
      0.3
    );

    tl.call(() => clearInterval(msgInterval), [], "+=0.1");

    // exit sequence
    tl.to(logoRef.current, {
      scale: 1.08,
      duration: 0.5,
      ease: "power2.out",
    });
    tl.to(
      ".bean-particle",
      {
        y: "-=120",
        x: () => (Math.random() - 0.5) * 300,
        opacity: 0,
        duration: 0.9,
        stagger: 0.015,
        ease: "power1.in",
      },
      "<"
    );
    tl.to(
      rootRef.current,
      {
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.1,
        ease: "power2.inOut",
        onComplete: finishLoading,
      },
      "-=0.3"
    );

    return () => {
      clearInterval(msgInterval);
      tl.kill();
    };
  }, [finishLoading, setLoadProgress]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-warmblack"
    >
      {/* expanding golden glow */}
      <div
        ref={glowRef}
        className="absolute h-[60vw] w-[60vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(217,164,65,0.35) 0%, rgba(217,164,65,0.08) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* floating beans */}
      <div className="absolute inset-0">
        {beans.map((b) => (
          <div
            key={b.id}
            className="bean-particle absolute bottom-0 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-coffee-dark/70"
            style={{
              left: `${b.left}%`,
              width: `${6 * b.scale}px`,
              height: `${9 * b.scale}px`,
              animation: `drift ${b.duration}s ${b.delay}s ease-in infinite`,
              boxShadow: "inset 0 0 0 1px rgba(217,164,65,0.15)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div ref={logoRef} className="mb-8">
          <div className="mb-3 font-serif text-6xl italic tracking-tight text-cream sm:text-7xl">
            Aurora <span className="text-honey">Roast</span>
          </div>
          <div className="eyebrow text-latte/70">Every Cup Tells A Story</div>
        </div>

        <div className="h-[1px] w-64 overflow-hidden bg-cream/10 sm:w-80">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-honey/60 via-honey to-honey/60"
            style={{ width: "0%" }}
          />
        </div>

        <div className="mt-5 h-4 font-sans text-xs uppercase tracking-widest2 text-latte/60">
          {MESSAGES[message]}
        </div>
      </div>
    </div>
  );
}
