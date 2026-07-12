"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Testimonial } from "@/data/testimonials";
import { useTilt } from "@/lib/useTilt";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="glass flex w-[22rem] shrink-0 flex-col rounded-[1.75rem] p-7 shadow-[0_20px_50px_-28px_rgba(74,51,39,0.4)]"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
          {t.verified && (
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-forest text-[10px] text-cream ring-2 ring-cream">
              ✓
            </span>
          )}
        </div>
        <div>
          <div className="font-sans text-sm font-semibold text-espresso">{t.name}</div>
          <div className="font-sans text-xs text-coffee/55">{t.role}</div>
        </div>
      </div>

      <div className="mb-3 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="text-sm text-honey"
            style={{ opacity: i < Math.round(t.rating) ? 1 : 0.25 }}
          >
            ★
          </span>
        ))}
      </div>

      <p className="font-serif text-base italic leading-relaxed text-espresso/85">&ldquo;{t.quote}&rdquo;</p>
    </motion.div>
  );
}
