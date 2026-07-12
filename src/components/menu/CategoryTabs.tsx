"use client";

import { MENU_CATEGORIES } from "@/data/menuCategories";
import { useCursor } from "@/lib/useCursor";

export default function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const hoverCursor = useCursor("hover");

  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="no-scrollbar flex gap-2 overflow-x-auto pb-2"
    >
      {MENU_CATEGORIES.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            {...hoverCursor}
            className="relative shrink-0 rounded-full px-5 py-2.5 font-sans text-[12px] uppercase tracking-widest transition-colors duration-500"
            style={{
              color: isActive ? "#FBF7F0" : "rgba(74,51,39,0.7)",
              backgroundColor: isActive ? cat.accent : "transparent",
              border: `1px solid ${isActive ? cat.accent : "rgba(74,51,39,0.18)"}`,
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
