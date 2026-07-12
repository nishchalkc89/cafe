"use client";

import { ReactNode } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import { useAppStore } from "@/store/useAppStore";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as: Tag = "button",
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
}) {
  const ref = useMagnetic<HTMLElement>(strength);
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);

  const shared = {
    ref: ref as never,
    className,
    onMouseEnter: () => setCursorVariant("hover"),
    onMouseLeave: () => setCursorVariant("default"),
    onClick,
  };

  if (Tag === "a") {
    return (
      <a href={href} {...shared}>
        {children}
      </a>
    );
  }
  return <button {...shared}>{children}</button>;
}
