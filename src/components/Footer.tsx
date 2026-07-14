"use client";

import { useState } from "react";
import { useCursor } from "@/lib/useCursor";
import CoffeeBeans from "@/components/particles/CoffeeBeans";
import Steam from "@/components/particles/Steam";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "#about" },
      { label: "Coffee", href: "#menu" },
      { label: "Bakery", href: "#bakery" },
      { label: "Journey", href: "#journey" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Location", href: "#location" },
      { label: "Reservations", href: "#visit" },
      { label: "Private Events", href: "#" },
      { label: "Wholesale", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Gallery", href: "#gallery" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const SOCIALS = ["IG", "FB", "X"];

export default function Footer() {
  const hoverCursor = useCursor("hover");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-warmblack via-warmblack to-[#0a0806] px-6 pb-10 pt-28 text-cream md:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-grain-noise" />
      <CoffeeBeans variant="disappear" tone="light" className="opacity-60" />
      <Steam intensity={0.4} wispCount={2} className="left-1/2 top-8 -translate-x-1/2" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center gap-6 border-b border-cream/10 pb-16 text-center">
          <div className="font-serif text-4xl italic text-cream sm:text-5xl">Aurora Roast</div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-latte/60">
            The story continues with every cup.
          </p>

          <form onSubmit={handleSubscribe} className="mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              aria-label="Email address"
              className="w-full rounded-full border border-cream/15 bg-cream/5 px-5 py-3 font-sans text-sm text-cream placeholder:text-cream/35 focus:border-honey/60 focus:outline-none"
            />
            <button
              type="submit"
              {...hoverCursor}
              className="shrink-0 rounded-full bg-honey px-6 py-3 font-sans text-[12px] uppercase tracking-widest text-espresso transition-transform hover:-translate-y-0.5"
            >
              {subscribed ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-14 border-b border-cream/10 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-honey/80">Aurora Roast</div>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-latte/60">
              Small batch coffee, roasted with patience and poured with intention.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  {...hoverCursor}
                  aria-label={`Aurora Roast on ${s}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 font-sans text-[11px] text-cream/70 transition-colors hover:border-honey/50 hover:text-honey"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="font-sans text-xs uppercase tracking-widest text-honey/80">{col.title}</div>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...hoverCursor}
                      className="font-sans text-sm text-latte/70 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-sans text-xs text-latte/40 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Aurora Roast. All rights reserved.</span>
          <span>Crafted with care, poured with patience.</span>
        </div>
      </div>
    </footer>
  );
}
