"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/lib/useCursor";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const hoverCursor = useCursor("hover");

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const changeMonth = (delta: number) => {
    setViewDate(new Date(year, month + delta, 1));
  };

  return (
    <div className="glass rounded-[1.75rem] p-6">
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          {...hoverCursor}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-espresso/60 transition-colors hover:bg-espresso/5"
        >
          ←
        </button>
        <div className="font-serif text-lg text-espresso">
          {MONTH_NAMES[month]} {year}
        </div>
        <button
          onClick={() => changeMonth(1)}
          {...hoverCursor}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-espresso/60 transition-colors hover:bg-espresso/5"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="py-1 font-sans text-[11px] uppercase tracking-wide text-coffee/45">
            {d}
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const isPast = date < today;
          const isSelected = selected && date.toDateString() === selected.toDateString();
          const isToday = date.toDateString() === today.toDateString();

          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => onSelect(date)}
              {...(!isPast ? hoverCursor : {})}
              aria-label={date.toDateString()}
              aria-pressed={!!isSelected}
              className="relative flex aspect-square items-center justify-center"
            >
              {isSelected && (
                <motion.span
                  layoutId="calendar-selected"
                  className="absolute inset-1 rounded-full bg-honey shadow-[0_0_0_4px_rgba(217,164,65,0.25)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative font-sans text-sm ${
                  isPast
                    ? "text-coffee/20"
                    : isSelected
                    ? "font-semibold text-espresso"
                    : isToday
                    ? "font-semibold text-honey-dark"
                    : "text-coffee/75"
                }`}
              >
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
