"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NAV_LINKS } from "@/data/nav";
import { useAppStore } from "@/store/useAppStore";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const hasEntered = useAppStore((s) => s.hasEntered);
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  const lastScroll = useRef(0);

  useEffect(() => {
    if (!hasEntered) return;
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.15 }
    );
  }, [hasEntered]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!navRef.current) return;
      if (y > lastScroll.current && y > 160) {
        gsap.to(navRef.current, { y: -120, duration: 0.5, ease: "power3.inOut" });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.5, ease: "power3.out" });
      }
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={navRef}
        className="fixed left-1/2 top-6 z-[900] w-[94%] max-w-5xl -translate-x-1/2 opacity-0"
      >
        <nav className="glass flex items-center justify-between rounded-full px-6 py-3 shadow-[0_8px_40px_-12px_rgba(74,51,39,0.25)]">
          <a
            href="#top"
            className="group flex items-center gap-2 font-serif text-lg italic text-espresso"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <span className="relative inline-block h-2 w-2 rounded-full bg-honey transition-transform duration-500 group-hover:scale-150" />
            Aurora Roast
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative font-sans text-[13px] uppercase tracking-widest text-espresso/80 transition-colors hover:text-espresso"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-honey transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-espresso/70 transition-colors hover:bg-espresso/5 hover:text-espresso sm:flex"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <MagneticButton
              as="a"
              href="#visit"
              className="hidden rounded-full bg-forest px-5 py-2.5 font-sans text-[12px] uppercase tracking-widest text-cream shadow-[0_6px_20px_-6px_rgba(44,59,46,0.5)] transition-colors hover:bg-forest-dark sm:inline-block"
              strength={0.25}
            >
              Reserve
            </MagneticButton>

            <button
              aria-label="Menu"
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full transition-colors hover:bg-espresso/5 md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span
                className={`h-px w-4 bg-espresso transition-transform duration-300 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-espresso transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="glass mt-3 rounded-3xl p-6 md:hidden">
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-2xl italic text-espresso"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
