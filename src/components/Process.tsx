"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/process";

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-forest py-20 text-cream md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-grain-noise" />
      <div
        className="pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(217,164,65,0.35), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5 flex items-center gap-3 text-latte/70"
        >
          <span className="h-px w-10 bg-honey" /> The Craft
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="section-heading max-w-2xl font-serif text-4xl leading-tight sm:text-5xl"
        >
          From soil to cup,
          <span className="font-serif-italic text-honey"> nothing is rushed.</span>
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="font-serif text-6xl text-honey/30 transition-colors duration-500 group-hover:text-honey/70">
                {step.n}
              </div>
              <h3 className="mt-4 font-serif text-xl text-cream">{step.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-latte/70">{step.desc}</p>
              <div className="mt-6 h-px w-full origin-left scale-x-0 bg-honey/40 transition-transform duration-700 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
