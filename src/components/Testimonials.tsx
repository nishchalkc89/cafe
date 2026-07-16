"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";

const LOOP = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto mb-16 max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5 flex items-center justify-center gap-3 text-coffee/70"
        >
          <span className="h-px w-10 bg-honey" /> In Their Words <span className="h-px w-10 bg-honey" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="section-heading font-serif text-4xl leading-tight text-espresso sm:text-5xl"
        >
          Loved by regulars,
          <span className="font-serif-italic text-honey-dark"> one cup at a time.</span>
        </motion.h2>
      </div>

      <div className="mask-fade-edges relative w-full overflow-hidden">
        <div className="flex w-max animate-[marquee_42s_linear_infinite] gap-6 py-2 hover:[animation-play-state:paused]">
          {LOOP.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
