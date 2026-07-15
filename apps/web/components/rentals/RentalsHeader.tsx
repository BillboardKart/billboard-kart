"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarRange, MapPinned } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RentalsHeaderProps {
  readonly activeRentals: number;
  readonly completedRentals: number;
}

export default function RentalsHeader({
  activeRentals,
  completedRentals,
}: RentalsHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-4xl border border-border bg-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.06),transparent_45%)]" />

      <div className="relative flex flex-col justify-between gap-10 p-8 lg:flex-row lg:items-end lg:p-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
        >
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 font-medium"
          >
            Dashboard
          </Badge>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] lg:text-5xl">
            Your billboard rentals
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Track your active campaigns, review previous rentals and monitor
            performance from one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40">
                <MapPinned className="h-5 w-5" />
              </div>

              <div>
                <p className="text-2xl font-semibold">{activeRentals}</p>
                <p className="text-sm text-muted-foreground">
                  Active campaigns
                </p>
              </div>
            </div>

            <div className="h-12 w-px bg-border" />

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted">
                <CalendarRange className="h-5 w-5" />
              </div>

              <div>
                <p className="text-2xl font-semibold">{completedRentals}</p>

                <p className="text-sm text-muted-foreground">
                  Completed rentals
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/browse">Browse inventory</Link>
          </Button>

          <Button
            size="lg"
            asChild
            className="gap-2 bg-red-600 hover:bg-red-700"
          >
            <Link href="/browse">
              Rent another billboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
