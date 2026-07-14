"use client";

import { motion } from "framer-motion";
import { TABLES } from "@/data/tables";
import { useCursor } from "@/lib/useCursor";

export default function SeatingLayout({
  selected,
  onSelect,
  party,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  party: number;
}) {
  const hoverCursor = useCursor("hover");

  return (
    <div className="glass relative aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] p-4">
      <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 font-sans text-[10px] uppercase tracking-widest2 text-coffee/40">
        Window Front
      </div>

      {TABLES.map((table) => {
        const isSelected = selected === table.id;
        const tooSmall = table.seats < party;
        const disabled = table.reserved || tooSmall;
        return (
          <button
            key={table.id}
            disabled={disabled}
            onClick={() => onSelect(table.id)}
            {...(!disabled ? hoverCursor : {})}
            aria-label={`Table ${table.id}, ${table.seats} seats, ${
              table.reserved ? "reserved" : tooSmall ? "too small for party size" : "available"
            }`}
            aria-pressed={isSelected}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${table.x}%`, top: `${table.y}%` }}
          >
            <motion.div
              animate={
                isSelected
                  ? { scale: 1.35 }
                  : disabled
                  ? { scale: 1 }
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                isSelected
                  ? { type: "spring", stiffness: 300, damping: 18 }
                  : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              className={`relative flex items-center justify-center text-[10px] font-semibold text-cream shadow-md ${
                table.shape === "round" ? "rounded-full" : "rounded-lg"
              } ${tooSmall && !table.reserved ? "opacity-40" : ""}`}
              style={{
                width: 20 + table.seats * 3.2,
                height: 20 + table.seats * 3.2,
                backgroundColor: disabled ? "#9C9184" : isSelected ? "#D9A441" : "#3E5240",
                boxShadow: isSelected ? "0 0 0 6px rgba(217,164,65,0.25)" : undefined,
              }}
            >
              {table.seats}
              {isSelected && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-honey"
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </motion.div>
            <span className="mt-1 font-sans text-[9px] uppercase tracking-wide text-coffee/50">
              {table.id}
            </span>
          </button>
        );
      })}

      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-4 font-sans text-[10px] uppercase tracking-wide text-coffee/55">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-forest-light" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#9C9184]" /> Reserved
        </span>
      </div>
    </div>
  );
}
