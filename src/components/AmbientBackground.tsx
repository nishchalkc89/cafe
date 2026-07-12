"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AmbientBackground() {
  const goldenRef = useRef<HTMLDivElement>(null);
  const eveningRef = useRef<HTMLDivElement>(null);
  const duskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
      // Morning -> Golden Hour -> Evening -> Dusk, purely tonal (never fully dark)
      tl.to(goldenRef.current, { opacity: 0.55, duration: 1 }, 0.15)
        .to(eveningRef.current, { opacity: 0.55, duration: 1 }, 0.45)
        .to(duskRef.current, { opacity: 0.6, duration: 1 }, 0.75);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ivory" aria-hidden="true">
      {/* base layered gradient (morning) */}
      <div
        className="absolute inset-0 animated-gradient"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 15% 10%, rgba(217,164,65,0.16) 0%, transparent 60%), radial-gradient(50% 45% at 85% 20%, rgba(44,59,46,0.10) 0%, transparent 60%), radial-gradient(70% 60% at 50% 100%, rgba(74,51,39,0.10) 0%, transparent 65%), linear-gradient(180deg, #FBF7F0 0%, #F7F2EA 45%, #EFE6D8 100%)",
        }}
      />

      {/* atmosphere tint layers: golden hour -> evening -> dusk */}
      <div
        ref={goldenRef}
        className="absolute inset-0 opacity-0 mix-blend-multiply"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(240,198,116,0.16) 0%, rgba(217,164,65,0.10) 50%, rgba(198,139,79,0.14) 100%)",
        }}
      />
      <div
        ref={eveningRef}
        className="absolute inset-0 opacity-0 mix-blend-multiply"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(198,139,79,0.14) 0%, rgba(122,91,71,0.16) 55%, rgba(74,51,39,0.18) 100%)",
        }}
      />
      <div
        ref={duskRef}
        className="absolute inset-0 opacity-0 mix-blend-multiply"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(74,51,39,0.12) 0%, rgba(44,59,46,0.16) 50%, rgba(36,24,18,0.2) 100%)",
        }}
      />

      {/* organic blobs */}
      <div className="absolute -left-40 top-[10%] h-[38rem] w-[38rem] rounded-full bg-honey/10 blur-[110px] animate-float-slow" />
      <div className="absolute -right-32 top-[45%] h-[30rem] w-[30rem] rounded-full bg-forest/10 blur-[100px] animate-float-slow [animation-delay:-4s]" />
      <div className="absolute left-1/3 bottom-[-10%] h-[34rem] w-[34rem] rounded-full bg-coffee/10 blur-[120px] animate-float-slow [animation-delay:-8s]" />

      {/* grain */}
      <div className="grain" />
      {/* vignette */}
      <div className="vignette" />
    </div>
  );
}
