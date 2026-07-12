"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { INSTAGRAM_POSTS, INSTAGRAM_PROFILE } from "@/data/instagram";
import { useCursor } from "@/lib/useCursor";

const LOOP = [...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS];

export default function InstagramStrip() {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const viewCursor = useCursor("view");
  const hoverCursor = useCursor("hover");

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="relative overflow-hidden py-32 md:py-40">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col items-center gap-6 px-6 text-center md:px-10">
        <div className="eyebrow flex items-center justify-center gap-3 text-coffee/70">
          <span className="h-px w-10 bg-honey" /> Follow Along <span className="h-px w-10 bg-honey" />
        </div>
        <h2 className="section-heading font-serif text-4xl leading-tight text-espresso sm:text-5xl">
          Life inside
          <span className="font-serif-italic text-honey-dark"> the roastery.</span>
        </h2>

        <div className="glass mt-2 flex items-center gap-4 rounded-full px-5 py-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-honey to-coffee font-serif text-cream">
            A
          </div>
          <div className="text-left">
            <div className="font-sans text-sm font-semibold text-espresso">{INSTAGRAM_PROFILE.handle}</div>
            <div className="font-sans text-xs text-coffee/55">{INSTAGRAM_PROFILE.followers} followers</div>
          </div>
          <button
            {...hoverCursor}
            className="ml-2 rounded-full bg-espresso px-4 py-2 font-sans text-[11px] uppercase tracking-widest text-cream"
          >
            Follow
          </button>
        </div>
      </div>

      <div className="mask-fade-edges relative w-full overflow-hidden">
        <div className="flex w-max animate-[marquee_50s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
          {LOOP.map((post, i) => {
            const isLiked = liked.has(post.id * 1000 + i);
            return (
              <div
                key={`${post.id}-${i}`}
                {...viewCursor}
                className="group relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-56"
              >
                <Image src={post.image} alt={post.caption} fill sizes="224px" className="object-cover" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 50px rgba(0,0,0,0.4)" }} />

                <div className="absolute inset-0 flex translate-y-3 flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-sans text-xs text-white">{post.caption}</span>
                  <div className="mt-2 flex items-center gap-2">
                    <motion.button
                      onClick={() => toggleLike(post.id * 1000 + i)}
                      whileTap={{ scale: 1.4 }}
                      aria-label="Like photo"
                      className="text-sm"
                      style={{ color: isLiked ? "#D9A441" : "#ffffff" }}
                    >
                      {isLiked ? "♥" : "♡"}
                    </motion.button>
                    <span className="font-sans text-[11px] text-white/80">
                      {post.likes + (isLiked ? 1 : 0)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
