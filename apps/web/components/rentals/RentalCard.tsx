"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Eye,
  MapPin,
  MoreHorizontal,
  RadioTower,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type RentalStatus = "active" | "scheduled" | "completed" | "cancelled";

export interface RentalCardProps {
  readonly id: string;
  readonly billboardName: string;
  readonly city: string;
  readonly image: string;
  readonly status: RentalStatus;
  readonly startDate: string;
  readonly endDate: string;
  readonly bookedOn: string;
  readonly budget: number;
  readonly impressions: number;
  readonly occupancy: number;
  readonly progress: number;
  readonly dailyReach: number;
  readonly duration: string;
}

const STATUS_VARIANTS: Record<
  RentalStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  active: "default",
  scheduled: "secondary",
  completed: "outline",
  cancelled: "destructive",
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function RentalCard({
  id,
  billboardName,
  city,
  image,
  status,
  startDate,
  endDate,
  bookedOn,
  budget,
  impressions,
  occupancy,
  progress,
  duration,
  dailyReach,
}: RentalCardProps) {
  return (
    <motion.div
      layout
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card className="overflow-hidden rounded-4xl border-border py-0 shadow-sm transition-shadow hover:shadow-xl">
        <div className="grid lg:grid-cols-[360px_1fr]">
          {/* ------------------------------------------------ */}
          {/* Billboard Image                                 */}
          {/* ------------------------------------------------ */}

          <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto">
            <Image
              src={image}
              alt={billboardName}
              fill
              unoptimized
              className="object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute left-5 top-5">
              <Badge
                variant={STATUS_VARIANTS[status]}
                className="rounded-full capitalize"
              >
                {status}
              </Badge>
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-lg">
                <MapPin className="h-4 w-4 text-white" />

                <span className="text-sm text-white">{city}</span>
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white">
                {billboardName}
              </h2>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* Content                                          */}
          {/* ------------------------------------------------ */}

          <div className="flex flex-col p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Campaign
                </div>

                <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                  Summer Product Launch
                </h3>

                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Your campaign is currently running across one premium
                  billboard location with live AI powered performance
                  monitoring.
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>

                  <DropdownMenuItem>Download Invoice</DropdownMenuItem>

                  <DropdownMenuItem>Contact Support</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* -------------------------------------------- */}
            {/* Metrics                                      */}
            {/* -------------------------------------------- */}

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-red-600" />

                  <span className="text-sm font-medium">Campaign Dates</span>
                </div>

                <p className="mt-5 text-lg font-semibold">{startDate}</p>

                <p className="text-muted-foreground">{endDate}</p>
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-red-600" />

                  <span className="text-sm font-medium">Duration</span>
                </div>

                <p className="mt-5 text-2xl font-semibold">{duration}</p>

                <p className="text-muted-foreground">Booked {bookedOn}</p>
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-red-600" />

                  <span className="text-sm font-medium">Budget</span>
                </div>

                <p className="mt-5 text-2xl font-semibold">
                  {formatCurrency(budget)}
                </p>

                <p className="text-muted-foreground">Campaign spend</p>
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-red-600" />

                  <span className="text-sm font-medium">Impressions</span>
                </div>

                <p className="mt-5 text-2xl font-semibold">
                  {formatNumber(impressions)}
                </p>

                <p className="text-muted-foreground">Estimated views</p>
              </div>
            </div>

            {/* Remaining part:
               - Progress Section
               - Live Analytics
               - Daily Reach
               - Occupancy
               - Footer Actions
               - View Campaign CTA
               - AI Insights Card
            */}
            {/* -------------------------------------------- */}
            {/* Campaign Progress                            */}
            {/* -------------------------------------------- */}

            <div className="mt-10 rounded-3xl border border-border bg-muted/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Campaign Progress
                  </p>

                  <p className="mt-1 text-3xl font-semibold">{progress}%</p>
                </div>

                <Badge variant="outline" className="rounded-full">
                  {status === "active"
                    ? "Running"
                    : status === "scheduled"
                      ? "Scheduled"
                      : status === "completed"
                        ? "Completed"
                        : "Cancelled"}
                </Badge>
              </div>

              <Progress value={progress} className="mt-6 h-2" />

              <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                <span>{startDate}</span>

                <span>{endDate}</span>
              </div>
            </div>

            {/* -------------------------------------------- */}
            {/* Live Analytics                               */}
            {/* -------------------------------------------- */}

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <Card className="rounded-3xl border-border shadow-none">
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40">
                      <RadioTower className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Daily Reach
                      </p>

                      <p className="text-2xl font-semibold">
                        {formatNumber(dailyReach)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estimated people reached
                      </p>

                      <p className="mt-2 text-sm font-medium text-green-600">
                        ↑ 12.4% from forecast
                      </p>
                    </div>

                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="rounded-3xl border-border shadow-none">
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                      <Eye className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Billboard Occupancy
                      </p>

                      <p className="text-2xl font-semibold">{occupancy}%</p>
                    </div>
                  </div>

                  <Progress value={occupancy} className="mt-8 h-2" />

                  <p className="mt-4 text-sm text-muted-foreground">
                    Reserved for your campaign duration.
                  </p>
                </div>
              </Card>
            </div>

            {/* -------------------------------------------- */}
            {/* AI Insights                                  */}
            {/* -------------------------------------------- */}

            <Card className="mt-8 rounded-3xl border-red-200/50 bg-red-50/40 shadow-none dark:border-red-900 dark:bg-red-950/10">
              <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white">
                  <TrendingUp className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-semibold">AI Campaign Insight</h4>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    Based on current visibility trends, your campaign is
                    expected to exceed its projected impressions by
                    approximately <strong>18%</strong>. Extending the booking by
                    another week could significantly improve brand recall while
                    maintaining a low CPM.
                  </p>
                </div>
              </div>
            </Card>

            {/* -------------------------------------------- */}
            {/* Footer                                       */}
            {/* -------------------------------------------- */}

            <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="rounded-full px-4 py-1">
                  AI Optimized
                </Badge>

                <Badge variant="secondary" className="rounded-full px-4 py-1">
                  Premium Billboard
                </Badge>

                <Badge variant="secondary" className="rounded-full px-4 py-1">
                  Verified Location
                </Badge>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" size="lg">
                  Download Invoice
                </Button>

                <Button
                  size="lg"
                  asChild
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Link href={`/rentals/${id}`}>
                    View Campaign
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
