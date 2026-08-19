"use client";

import {
  CalendarArrowDownIcon,
  CalendarPlusIcon,
  ChevronLeftIcon,
  CircleChevronLeft,
  PlusIcon,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Calendar from "./Calendar";
import { MONTH_NAMES } from "./types";
import { formatRange, formatBlackoutLabel } from "./calendar-utils";
import type { BlackoutRange } from "./types";

export default function AvailabilityCard({
  calYear,
  calMonth,
  onPrevMonthAction,
  onNextMonthAction,
  rangeStart,
  rangeEnd,
  hoverDay,
  blackouts,
  onDayClickAction,
  onDayHoverAction,
  onMarkBlackoutAction,
  onRemoveBlackoutAction,
}: {
  calYear: number;
  calMonth: number;
  onPrevMonthAction: () => void;
  onNextMonthAction: () => void;
  rangeStart: string | null;
  rangeEnd: string | null;
  hoverDay: string | null;
  blackouts: BlackoutRange[];
  onDayClickAction: (key: string) => void;
  onDayHoverAction: (key: string | null) => void;
  onMarkBlackoutAction: () => void;
  onRemoveBlackoutAction: (id: number) => void;
}) {
  return (
    <Card className="overflow-hidden rounded-md">
      <CardContent className="p-0">
        {/* Card header */}
        <div className="flex items-center gap-2 px-6 pt-6 pb-5">
          <div className="flex items-center justify-center size-8 rounded-xl bg-[rgba(245,73,0,0.12)]">
            <CalendarPlusIcon size={16} color="#F54900" />
          </div>
          <span className="text-[18px] text-[#0a0a0a] leading-7">
            Availability
          </span>
        </div>

        <Separator className="mx-6" />

        {/* Calendar section */}
        <div className="px-6 pt-5 pb-4">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[15px] font-medium text-[#0a0a0a]">
                {MONTH_NAMES[calMonth]}
              </span>
              <span className="text-[15px] text-[#767676] ml-1.5">
                {calYear}
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onPrevMonthAction}
                aria-label="Previous month"
              >
                <ChevronLeftIcon size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onNextMonthAction}
                aria-label="Next month"
              >
                <CircleChevronLeft size={16} />
              </Button>
            </div>
          </div>

          <Calendar
            year={calYear}
            month={calMonth}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            hoverDay={hoverDay}
            blackouts={blackouts}
            onDayClick={onDayClickAction}
            onDayHover={onDayHoverAction}
          />
        </div>

        {/* Selected range action bar */}
        <div className="mx-6 mb-5 mt-1 rounded-2xl border border-[#f0f0f0] bg-[#fafafa] flex items-center gap-3 px-4 py-2.5">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="size-1.5 rounded-full bg-[#f54900] shrink-0" />
            <span className="text-[13px] text-[#737373]">Selected range</span>
            {(rangeStart || rangeEnd) && (
              <span className="text-[13px] font-medium text-[#0a0a0a] ml-1 truncate">
                {formatRange(rangeStart, rangeEnd)}
              </span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkBlackoutAction}
            disabled={!rangeStart || !rangeEnd}
            className="rounded-xl h-9 text-[12px]"
          >
            Mark As Blackout
          </Button>
        </div>

        <Separator className="mx-6" />

        {/* Blackout dates */}
        <div className="px-6 pt-5 pb-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CalendarArrowDownIcon size={15} color="#737373" />
            <span className="text-[13px] font-medium text-[#737373] uppercase tracking-wide">
              Blackout dates
            </span>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <AnimatePresence mode="popLayout">
              {blackouts.map((b) => (
                <motion.div
                  key={b.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#fafafa] border border-[#ebebeb] rounded-full h-8 flex items-center gap-1.5 pl-3 pr-1.5 group hover:border-[#d5d5d5] transition-colors"
                >
                  <span className="text-[13px] text-[#0a0a0a] leading-5">
                    {formatBlackoutLabel(b)}
                  </span>
                  <button
                    onClick={() => onRemoveBlackoutAction(b.id)}
                    aria-label={`Remove blackout ${formatBlackoutLabel(b)}`}
                    className="flex items-center justify-center size-6 rounded-full hover:bg-[#e5e5e5] transition-colors focus-visible:outline-2 focus-visible:outline-[#f54900]"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-8 border-dashed text-[13px] text-[#737373]"
            >
              <PlusIcon size={14} />
              Add blackout dates
            </Button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-[#f54900]" />
              <span className="text-[11px] text-[#767676]">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-[rgba(245,73,0,0.15)]" />
              <span className="text-[11px] text-[#767676]">In range</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-[#efefef]" />
              <span className="text-[11px] text-[#767676]">Blacked out</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
