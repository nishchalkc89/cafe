"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/data/nav";
import { MENU_CATEGORIES } from "@/data/menuCategories";
import { useAppStore } from "@/store/useAppStore";
import { useProductModal } from "@/store/useProductModal";
import MagneticButton from "./MagneticButton";

const ALL_MENU_ITEMS = MENU_CATEGORIES.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.label }))
);

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const hasEntered = useAppStore((s) => s.hasEntered);
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  const openQuickView = useProductModal((s) => s.open);
  const lastScroll = useRef(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_MENU_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.story.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const selectResult = (item: (typeof ALL_MENU_ITEMS)[number]) => {
    openQuickView(item);
    setSearchOpen(false);
    setQuery("");
  };

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
              onClick={() => setSearchOpen(true)}
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

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="glass mt-3 rounded-3xl p-6">
                <ul className="flex flex-col gap-4">
                  {NAV_LINKS.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                    >
                      <a
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-serif text-2xl italic text-espresso"
                      >
                        {l.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[1100] flex items-start justify-center p-6 pt-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-warmblack/70 backdrop-blur-md"
              onClick={() => setSearchOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass relative w-full max-w-xl overflow-hidden rounded-[1.75rem] p-3"
            >
              <div className="flex items-center gap-3 px-3 py-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-espresso/50">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the menu…"
                  aria-label="Search the menu"
                  className="w-full bg-transparent font-sans text-sm text-espresso placeholder:text-espresso/40 focus:outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="shrink-0 rounded-full p-1 text-espresso/50 transition-colors hover:bg-espresso/5 hover:text-espresso"
                >
                  ✕
                </button>
              </div>

              {query.trim() && (
                <div className="mt-1 max-h-80 overflow-y-auto border-t border-espresso/10 pt-2">
                  {results.length === 0 ? (
                    <p className="px-3 py-4 font-sans text-sm text-coffee/60">
                      No matches for &ldquo;{query}&rdquo;.
                    </p>
                  ) : (
                    results.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => selectResult(item)}
                        className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-espresso/5"
                      >
                        <span>
                          <span className="block font-serif text-base text-espresso">{item.name}</span>
                          <span className="block font-sans text-xs uppercase tracking-wide text-coffee/50">
                            {item.category}
                          </span>
                        </span>
                        <span className="shrink-0 font-serif text-sm text-forest">${item.price.toFixed(2)}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
