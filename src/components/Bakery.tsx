"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BAKERY_ITEMS } from "@/data/bakery";
import { useAppStore } from "@/store/useAppStore";

export default function Bakery() {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);

  return (
    <section id="bakery" className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40">
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-5 flex items-center gap-3 text-coffee/70"
          >
            <span className="h-px w-10 bg-honey" /> The Bakery
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="section-heading max-w-xl font-serif text-4xl leading-tight text-espresso sm:text-5xl"
          >
            Fresh from
            <span className="font-serif-italic text-honey-dark"> the oven.</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-sm font-sans text-coffee/70"
        >
          Baked before sunrise, every single day — nothing sits longer than a
          morning.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {BAKERY_ITEMS.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: (i % 5) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setCursorVariant("view")}
            onMouseLeave={() => setCursorVariant("default")}
            className="group relative"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-[0_16px_40px_-22px_rgba(74,51,39,0.4)] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-24px_rgba(74,51,39,0.5)]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40 bg-grain-noise" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 40px rgba(240,198,116,0.5)" }} />

              {/* steam wisp on hover */}
              <span className="absolute left-1/2 top-2 h-6 w-1 -translate-x-1/2 rounded-full bg-white/0 opacity-0 blur-[2px] transition-all duration-700 group-hover:-top-6 group-hover:bg-white/50 group-hover:opacity-70" />
            </div>
            <div className="mt-3 text-center font-sans text-[12px] uppercase tracking-wide text-coffee/75">
              {item.name}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
