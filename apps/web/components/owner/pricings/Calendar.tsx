"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DAY_LABELS } from "./types";
import { daysInMonth, firstDayOfMonth, dateKey } from "./calendar-utils";
import type { BlackoutRange } from "./types";

export default function Calendar({
  year,
  month,
  rangeStart,
  rangeEnd,
  hoverDay,
  blackouts,
  onDayClick,
  onDayHover,
}: {
  year: number;
  month: number;
  rangeStart: string | null;
  rangeEnd: string | null;
  hoverDay: string | null;
  blackouts: BlackoutRange[];
  onDayClick: (key: string) => void;
  onDayHover: (key: string | null) => void;
}) {
  const total = daysInMonth(year, month);
  const startDow = firstDayOfMonth(year, month);

  const effectiveEnd =
    rangeStart && !rangeEnd && hoverDay
      ? hoverDay >= rangeStart
        ? hoverDay
        : rangeStart
      : rangeEnd;
  const effectiveStart =
    rangeStart && !rangeEnd && hoverDay
      ? hoverDay < rangeStart
        ? hoverDay
        : rangeStart
      : rangeStart;

  const isSingle = effectiveStart === effectiveEnd && effectiveStart !== null;
  const inRange = (key: string) =>
    !!effectiveStart &&
    !!effectiveEnd &&
    key > effectiveStart &&
    key < effectiveEnd;
  const isStart = (key: string) => key === effectiveStart;
  const isEnd = (key: string) => key === effectiveEnd;
  const isBlackout = (key: string) =>
    blackouts.some((b) => key >= b.start && key <= b.end);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }} className="w-full">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((l, i) => (
          <div key={i} className="flex items-center justify-center h-8">
            <span className="text-[11px] font-medium text-[#767676] uppercase tracking-wider">
              {l}
            </span>
          </div>
        ))}
      </div>

      {/* Day grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7"
        >
          {rows.map((row, ri) =>
            row.map((day, ci) => {
              if (!day) return <div key={`${ri}-${ci}`} className="h-10" />;
              const key = dateKey(year, month, day);
              const bo = isBlackout(key);
              const start = isStart(key);
              const end = isEnd(key);
              const mid = inRange(key);
              const single = isSingle && start;

              const stripBg = mid ? "bg-[rgba(245,73,0,0.10)]" : "";

              let dotBg = "";
              let dotText = "text-[#0a0a0a]";
              const dotRound = "rounded-full";

              if (bo) {
                dotBg = "bg-[#efefef]";
                dotText = "text-[#b0b0b0] line-through";
              } else if (start || end || single) {
                dotBg = "bg-[#f54900]";
                dotText = "text-white";
              }

              const midText = mid ? "text-[#f54900] font-medium" : "";

              return (
                <div
                  key={`${ri}-${ci}`}
                  className={`relative h-10 flex items-center justify-center ${stripBg} ${
                    mid && ci === 0 ? "rounded-l-none" : ""
                  } ${mid && ci === 6 ? "rounded-r-none" : ""} ${
                    start && !single
                      ? "rounded-r-none bg-[rgba(245,73,0,0.10)]"
                      : ""
                  } ${end && !single ? "rounded-l-none bg-[rgba(245,73,0,0.10)]" : ""}`}
                >
                  {start && !single && (
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-[rgba(245,73,0,0.10)]" />
                  )}
                  {end && !single && (
                    <div className="absolute left-0 top-0 w-1/2 h-full bg-[rgba(245,73,0,0.10)]" />
                  )}
                  <motion.button
                    whileHover={!bo ? { scale: 1.1 } : undefined}
                    whileTap={!bo ? { scale: 0.95 } : undefined}
                    className={`relative z-10 flex items-center justify-center size-9 text-[13px] transition-all duration-100 select-none
                      ${dotRound} ${dotBg} ${dotText} ${!bo && !start && !end && !single ? midText : ""}
                      ${!bo && !start && !end && !single && !mid ? "hover:bg-[#f5f5f5]" : ""}
                      ${bo ? "cursor-default" : "cursor-pointer"}
                    `}
                    onClick={() => !bo && onDayClick(key)}
                    onMouseEnter={() => onDayHover(key)}
                    onMouseLeave={() => onDayHover(null)}
                  >
                    {day}
                  </motion.button>
                </div>
              );
            }),
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
