"use client";

import { motion } from "framer-motion";
import { WHY_CHOOSE_US } from "@/data/whyChooseUs";
import WhyCard from "./WhyCard";

export default function WhyChooseUs() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5 flex items-center justify-center gap-3 text-coffee/70"
        >
          <span className="h-px w-10 bg-honey" /> Why Aurora Roast <span className="h-px w-10 bg-honey" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="section-heading font-serif text-4xl leading-tight text-espresso sm:text-5xl"
        >
          A café built on
          <span className="font-serif-italic text-honey-dark"> quiet details.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_CHOOSE_US.map((card, i) => (
          <WhyCard key={card.title} {...card} index={i} />
        ))}
      </div>
    </section>
  );
}
