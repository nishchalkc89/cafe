import type gsap from "gsap";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fast-forwards a GSAP timeline for users who asked for reduced motion, without touching every duration by hand. */
export function respectMotionPreference<T extends gsap.core.Timeline>(tl: T): T {
  if (prefersReducedMotion()) tl.timeScale(6);
  return tl;
}
