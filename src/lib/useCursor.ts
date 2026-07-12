"use client";

import { useAppStore, type CursorVariant } from "@/store/useAppStore";

export function useCursor(variant: CursorVariant = "hover") {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  return {
    onMouseEnter: () => setCursorVariant(variant),
    onMouseLeave: () => setCursorVariant("default"),
  };
}
