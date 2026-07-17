"use client";

import { TopNav } from "@/components/app/TopNav";
import {
  QuickAction,
  RentalCard,
  StatCard,
} from "@/components/rentals/RentalsCard";
import { Rental } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type Variants, motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// dummy data
const RENTALS: Rental[] = [
  {
    id: "times-square-plaza",
    name: "Times Square Plaza",
    city: "Manhattan, NY",
    type: "Digital",
    size: "48×14 ft",
    status: "Live",
    ends: "Aug 12",
    spend: "$4,200",
    reach: "1.2M",
    artwork: "Approved",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=240&h=240&q=80",
  },
  {
    id: "i95-northbound",
    name: "I-95 Northbound Exit 12",
    city: "Brooklyn, NY",
    type: "Static",
    size: "60×20 ft",
    status: "Ends soon",
    ends: "Jul 28",
    spend: "$2,900",
    reach: "860K",
    artwork: "Needs update",
    image:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=240&h=240&q=80",
  },
];

const OVERVIEW = [
  { label: "Active rentals", value: "12", icon: null, tint: "" },
  { label: "Due this week", value: "4", icon: Clock, tint: "text-primary" },
  {
    label: "Awaiting approval",
    value: "2",
    icon: ShieldCheck,
    tint: "text-success",
  },
];

// Animation Variants

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function RentalsClient() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto w-full max-w-350 px-4 py-6 sm:px-6 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Hero dark card */}
            <motion.section
              variants={itemVariants}
              className="relative overflow-hidden rounded-3xl bg-foreground p-6 text-background sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-background/90">
                  <Calendar className="h-3.5 w-3.5" />
                  Active rentals
                </span>
                <button
                  type="button"
                  aria-label="Layout"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-background transition hover:bg-white/15"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>

              <h2 className="mt-5 max-w-xl text-2xl font-bold leading-tight sm:text-3xl">
                Keep every billboard on track
              </h2>
              <p className="mt-2 max-w-lg text-sm text-background/70">
                Monitor dates, payments, artwork status, and renewal
                opportunities from one place.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { label: "Live", value: "12" },
                  { label: "Ending soon", value: "3" },
                  { label: "Pending", value: "2" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 sm:p-4"
                  >
                    <p className="text-[11px] text-background/60 sm:text-xs">
                      {s.label}
                    </p>
                    <p className="mt-1 text-xl font-bold sm:text-2xl">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Two mini stat cards */}
            <motion.section
              variants={itemVariants}
              className="grid gap-4 sm:grid-cols-2"
            >
              <StatCard
                label="Next payment"
                value="$8,400"
                pill={{ text: "Due in 4 days", tone: "success" }}
                footer={
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="h-3.5 w-3.5" />
                    Auto-pay enabled
                  </div>
                }
                progress={62}
                progressTone="foreground"
              />
              <StatCard
                label="Artwork status"
                value="9/10"
                pill={{ text: "1 review", tone: "warning" }}
                footer={
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ImageIcon className="h-3.5 w-3.5" />
                    Ready to publish
                  </div>
                }
                progress={90}
                progressTone="success"
              />
            </motion.section>

            {/* Current rentals */}
            <motion.section variants={itemVariants}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold sm:text-xl">
                  Current rentals
                </h3>
                <button
                  type="button"
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  See all
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {RENTALS.map((r) => (
                  <RentalCard key={r.id} rental={r} />
                ))}
              </div>
            </motion.section>

            {/* Quick actions */}
            <motion.section
              variants={itemVariants}
              className="rounded-3xl border border-border bg-card p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Quick actions</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Stay ahead of renewals and approvals
                  </p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <QuickAction
                  icon={RefreshCw}
                  title="Renewals"
                  sub="3 due soon"
                />
                <QuickAction
                  icon={FileText}
                  title="Contracts"
                  sub="View terms"
                />
                <QuickAction
                  icon={ImageIcon}
                  title="Artwork"
                  sub="Replace files"
                />
                <QuickAction
                  icon={MessageSquare}
                  title="Support"
                  sub="Talk to team"
                />
              </div>
            </motion.section>
          </div>

          {/* RIGHT COLUMN */}
          {/* Added self-start and a larger top offset (top-32) to clear the navbar */}
          <motion.aside
            variants={itemVariants}
            className="sticky top-32 self-start flex flex-col gap-4"
          >
            {/* Removed sticky positioning from this inner div */}
            <div className="rounded-3xl border p-5 sm:p-6 border-gray-300 bg-amber-50/20 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Overview
              </p>
              <h3 className="mt-1 text-xl font-bold">
                Rental health at a glance
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Track active inventory, upcoming deadlines, and the next actions
                that need your attention.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {OVERVIEW.map((o) => {
                  const Icon = o.icon;
                  return (
                    <div
                      key={o.label}
                      className="flex items-center justify-between rounded-sm bg-secondary/70 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs text-muted-foreground">
                          {o.label}
                        </p>
                        <p className="mt-0.5 text-xl font-bold">{o.value}</p>
                      </div>
                      {Icon && (
                        <span
                          className={cn(
                            "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-background",
                            o.tint,
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="mt-5 w-full rounded-sm bg-red-600 hover:bg-red-600/80 py-3 text-sm font-medium text-background transition"
              >
                Review all rentals
              </motion.button>
            </div>
          </motion.aside>
        </motion.div>
      </main>
    </div>
  );
}
