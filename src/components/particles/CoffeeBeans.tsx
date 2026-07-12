"use client";

import { useEffect, useState } from "react";

type BeanVariant = "float" | "drift" | "disappear";

const VARIANT_ANIMATION: Record<BeanVariant, string> = {
  float: "beanFloat",
  drift: "beanDrift",
  disappear: "beanDisappear",
};

const VARIANT_COUNT: Record<BeanVariant, number> = {
  float: 7,
  drift: 9,
  disappear: 6,
};

const VARIANT_DURATION: Record<BeanVariant, [number, number]> = {
  float: [5, 9],
  drift: [9, 15],
  disappear: [4, 7],
};

interface Bean {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  dx: number;
  dy: number;
  opacity: number;
}

export default function CoffeeBeans({
  variant,
  className = "",
  tone = "dark",
}: {
  variant: BeanVariant;
  className?: string;
  tone?: "dark" | "light";
}) {
  // Positions are randomized client-side only (post-mount) so the server-rendered
  // markup has nothing to mismatch against during hydration.
  const [beans, setBeans] = useState<Bean[]>([]);

  useEffect(() => {
    const count = VARIANT_COUNT[variant];
    const [min, max] = VARIANT_DURATION[variant];
    setBeans(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 5 + Math.random() * 5,
        delay: Math.random() * 4,
        duration: min + Math.random() * (max - min),
        dx: (Math.random() - 0.5) * 60,
        dy: variant === "disappear" ? -30 - Math.random() * 40 : (Math.random() - 0.5) * 70 - 20,
        opacity: 0.25 + Math.random() * 0.3,
      }))
    );
  }, [variant]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {beans.map((b, i) => (
        <span
          key={i}
          className={`absolute rounded-[50%_50%_50%_50%/60%_60%_40%_40%] ${
            tone === "light" ? "bg-honey" : "bg-coffee-dark"
          }`}
          style={
            {
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: `${b.size}px`,
              height: `${b.size * 1.4}px`,
              "--dx": `${b.dx}px`,
              "--dy": `${b.dy}px`,
              "--bean-o": b.opacity,
              animation: `${VARIANT_ANIMATION[variant]} ${b.duration}s ${b.delay}s ease-in-out infinite`,
              boxShadow: "inset 0 0 0 1px rgba(217,164,65,0.12)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
