"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.8,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration,
      ease: "power2.out",
      onUpdate: () => setDisplay(Number(obj.val.toFixed(decimals))),
    });
  }, [inView, value, duration, decimals]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
