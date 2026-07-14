"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TABLES, TIME_SLOTS } from "@/data/tables";
import { useCursor } from "@/lib/useCursor";
import Calendar from "./Calendar";
import SeatingLayout from "./SeatingLayout";
import Confetti from "./Confetti";

const MAX_PARTY = Math.max(...TABLES.map((t) => t.seats));

export default function ReservationSection() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [party, setParty] = useState(2);
  const [table, setTable] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const bookCursor = useCursor("book");
  const hoverCursor = useCursor("hover");

  const selectedTable = TABLES.find((t) => t.id === table) ?? null;

  // A table that no longer fits the party (e.g. the guest count went up) should
  // be deselected rather than silently allowed through to confirmation.
  useEffect(() => {
    if (selectedTable && selectedTable.seats < party) setTable(null);
  }, [party, selectedTable]);

  const canConfirm = date && time && selectedTable && selectedTable.seats >= party;

  const reset = () => {
    setConfirmed(false);
    setDate(null);
    setTime(null);
    setTable(null);
    setParty(2);
  };

  return (
    <section id="visit" className="relative mx-auto max-w-6xl px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5 flex items-center justify-center gap-3 text-coffee/70"
        >
          <span className="h-px w-10 bg-honey" /> Reserve a Table <span className="h-px w-10 bg-honey" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="section-heading font-serif text-4xl leading-tight text-espresso sm:text-5xl"
        >
          Come sit with us
          <span className="font-serif-italic text-honey-dark"> for a while.</span>
        </motion.h2>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {!confirmed ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              <div className="flex flex-col gap-8">
                <Calendar selected={date} onSelect={setDate} />

                <div className="glass rounded-[1.75rem] p-6">
                  <div className="mb-4 font-sans text-xs uppercase tracking-widest text-coffee/60">
                    Time
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        {...hoverCursor}
                        aria-pressed={time === slot}
                        className="rounded-full px-2 py-2 font-sans text-[11px] transition-colors"
                        style={{
                          backgroundColor: time === slot ? "#241812" : "rgba(36,24,18,0.05)",
                          color: time === slot ? "#FBF7F0" : "rgba(74,51,39,0.75)",
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-widest text-coffee/60">
                      Guests
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setParty((p) => Math.max(1, p - 1))}
                        {...hoverCursor}
                        aria-label="Decrease guests"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-espresso/20 text-espresso"
                      >
                        −
                      </button>
                      <span className="w-4 text-center font-serif text-lg text-espresso">{party}</span>
                      <button
                        onClick={() => setParty((p) => Math.min(MAX_PARTY, p + 1))}
                        {...hoverCursor}
                        aria-label="Increase guests"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-espresso/20 text-espresso"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <SeatingLayout selected={table} onSelect={setTable} party={party} />

                <button
                  disabled={!canConfirm}
                  onClick={() => setConfirmed(true)}
                  {...(canConfirm ? bookCursor : {})}
                  className="rounded-full px-8 py-4 font-sans text-[13px] uppercase tracking-widest text-cream shadow-[0_10px_30px_-8px_rgba(36,24,18,0.5)] transition-all disabled:cursor-not-allowed disabled:opacity-35"
                  style={{ backgroundColor: "#241812" }}
                >
                  {canConfirm ? "Confirm Reservation" : "Select date, time & table"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] py-24 text-center"
            >
              <motion.div
                className="absolute h-[36rem] w-[36rem] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(217,164,65,0.35) 0%, rgba(217,164,65,0.08) 45%, transparent 70%)",
                }}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <Confetti />

              <motion.svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                className="relative mb-6"
                initial="hidden"
                animate="visible"
              >
                <motion.circle
                  cx="36"
                  cy="36"
                  r="33"
                  fill="none"
                  stroke="#D9A441"
                  strokeWidth="2"
                  variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <motion.path
                  d="M22 37l10 10 18-20"
                  fill="none"
                  stroke="#241812"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 }}
                />
              </motion.svg>

              <h3 className="section-heading relative font-serif text-3xl text-espresso sm:text-4xl">
                You&rsquo;re all set.
              </h3>
              <p className="relative mt-4 max-w-sm font-sans text-coffee/70">
                Table {table} is yours on {date?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} at {time} for {party} {party === 1 ? "guest" : "guests"}.
              </p>

              <button
                onClick={reset}
                {...hoverCursor}
                className="relative mt-8 rounded-full border border-espresso/25 px-7 py-3.5 font-sans text-[12px] uppercase tracking-widest text-espresso transition-colors hover:bg-espresso/5"
              >
                Book Another Table
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
