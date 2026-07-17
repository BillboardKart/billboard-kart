"use client";

import {
  MiniStatProps,
  QuickActionProps,
  Rental,
  StatCardProps,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export function StatCard({
  label,
  value,
  pill,
  footer,
  progress,
  progressTone,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium",
            pill.tone === "success"
              ? "bg-success/15 text-success"
              : "bg-primary/10 text-primary",
          )}
        >
          {pill.text}
        </span>
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      <div className="mt-4">{footer}</div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            progressTone === "success" ? "bg-success" : "bg-foreground",
          )}
        />
      </div>
    </div>
  );
}

export function RentalCard({ rental }: { rental: Rental }) {
  const statusStyles: Record<Rental["status"], string> = {
    Live: "bg-success/15 text-success",
    "Ends soon": "bg-primary/10 text-primary",
    Pending: "bg-secondary text-muted-foreground",
  };

  const artworkOk = rental.artwork === "Approved";
  const artworkWarn = rental.artwork === "Needs update";

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={rental.image}
          alt={rental.name}
          className="h-16 w-16 shrink-0 rounded-2xl object-cover sm:h-20 sm:w-20"
        />
        <div className="min-w-0">
          <h4 className="truncate text-base font-semibold sm:text-lg">
            {rental.name}
          </h4>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{rental.city}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
              {rental.type}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
              {rental.size}
            </span>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-sm px-2.5 py-1 text-[11px] font-medium",
            statusStyles[rental.status],
          )}
        >
          {rental.status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        <MiniStat label="Ends" value={rental.ends} />
        <MiniStat label="Spend" value={rental.spend} />
        <MiniStat label="Reach" value={rental.reach} />
      </div>

      <div className="mt-3 flex items-center justify-between rounded-sm border border-border px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Artwork</p>
          <p className="mt-0.5 truncate text-sm font-medium">
            {rental.artwork}
          </p>
        </div>
        {artworkOk ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
        ) : artworkWarn ? (
          <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />
        ) : (
          <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
        {rental.artwork === "Needs update" ? (
          <Link
            href="/upload"
            className="rounded-sm bg-foreground py-3 text-center text-sm font-medium text-background transition hover:opacity-90"
          >
            Upload artwork
          </Link>
        ) : (
          <Link
            href={`/billboard/${rental.id}`}
            className="rounded-sm bg-foreground py-3 text-center text-sm font-medium text-background transition hover:opacity-90"
          >
            View details
          </Link>
        )}
        <button
          type="button"
          className="rounded-sm border border-border px-5 py-3 text-sm font-medium transition hover:bg-secondary"
        >
          {rental.artwork === "Needs update" ? "Extend" : "Renew"}
        </button>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: MiniStatProps) {
  return (
    <div className="rounded-2xl bg-secondary/70 px-3 py-2.5">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-semibold sm:text-base">{value}</p>
    </div>
  );
}

export function QuickAction({ icon: Icon, title, sub }: QuickActionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-left transition hover:bg-secondary"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
    </motion.button>
  );
}
