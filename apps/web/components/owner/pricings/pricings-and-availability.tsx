"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingHeader from "./PricingHeader";
import PricingCard from "./PricingCard";
import AvailabilityCard from "./AvailabilityCard";
import BookingRulesCard from "./BookingRulesCard";
import type { BlackoutRange } from "./types";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

export default function PricingAndAvailability() {
  // Pricing state
  const [monthlyPrice, setMonthlyPrice] = useState("1,45,000");
  const [weeklyEnabled, setWeeklyEnabled] = useState(false);
  const [mountingFee, setMountingFee] = useState("8,000");

  // Calendar state
  const [calYear, setCalYear] = useState(2025);
  const [calMonth, setCalMonth] = useState(2);
  const [rangeStart, setRangeStart] = useState<string | null>("2025-03-13");
  const [rangeEnd, setRangeEnd] = useState<string | null>("2025-03-16");
  const [hoverDay, setHoverDay] = useState<string | null>(null);

  // Blackout dates
  const [blackouts, setBlackouts] = useState<BlackoutRange[]>([
    { id: 1, start: "2024-12-24", end: "2025-01-02" },
    { id: 2, start: "2025-07-04", end: "2025-07-07" },
  ]);
  const [nextBlackoutId, setNextBlackoutId] = useState(3);

  // Booking duration
  const [minDuration, setMinDuration] = useState("1 Week");

  // Lead time
  const [leadDays, setLeadDays] = useState(7);

  const handleDayClick = (key: string) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(key);
      setRangeEnd(null);
    } else {
      if (key < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(key);
      } else {
        setRangeEnd(key);
      }
    }
  };

  const handleMarkBlackout = () => {
    if (!rangeStart || !rangeEnd) return;
    setBlackouts((prev) => [
      ...prev,
      { id: nextBlackoutId, start: rangeStart, end: rangeEnd },
    ]);
    setNextBlackoutId((n) => n + 1);
    setRangeStart(null);
    setRangeEnd(null);
  };

  const removeBlackout = (id: number) => {
    setBlackouts((prev) => prev.filter((b) => b.id !== id));
  };

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else setCalMonth((m) => m + 1);
  };

  return (
    <div
      className="bg-white min-h-screen w-full"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <PricingHeader />

      <div className="max-w-250 mx-auto px-8 py-8 flex flex-col gap-8">
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <PricingCard
            monthlyPrice={monthlyPrice}
            onMonthlyPriceChangeAction={setMonthlyPrice}
            weeklyEnabled={weeklyEnabled}
            onWeeklyToggleAction={() => setWeeklyEnabled(!weeklyEnabled)}
            mountingFee={mountingFee}
            onMountingFeeChangeAction={setMountingFee}
          />
        </motion.div>

        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <AvailabilityCard
            calYear={calYear}
            calMonth={calMonth}
            onPrevMonthAction={prevMonth}
            onNextMonthAction={nextMonth}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            hoverDay={hoverDay}
            blackouts={blackouts}
            onDayClickAction={handleDayClick}
            onDayHoverAction={setHoverDay}
            onMarkBlackoutAction={handleMarkBlackout}
            onRemoveBlackoutAction={removeBlackout}
          />
        </motion.div>

        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <BookingRulesCard
            minDuration={minDuration}
            onMinDurationChangeAction={setMinDuration}
            leadDays={leadDays}
            onLeadDaysChangeAction={setLeadDays}
          />
        </motion.div>

        {/* Bottom actions */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between pb-8"
        >
          <Button variant="outline" className="gap-2 rounded-sm h-10">
            <SettingsIcon size={18} />
            Go To Advance Setting
          </Button>
          <Button className="rounded-sm h-10 px-4 bg-[#f54900] hover:bg-[#d93e00] text-white">
            Save
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
