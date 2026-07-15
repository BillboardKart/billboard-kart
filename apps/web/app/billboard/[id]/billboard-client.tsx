"use client";

import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Eye,
  Heart,
  Maximize2,
  Monitor,
  Share2,
  Sparkles,
  Star,
  Users,
  CalendarDaysIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { TopNav } from "@/components/app/TopNav";
import { Button } from "@/components/ui/button";
import type { Billboard } from "@/lib/billboards";
import { useSelection } from "@/lib/selection";
import { cn } from "@/lib/utils";

interface DateBoxProps {
  label: string;
  day: number | string;
  year?: string;
}

interface MiniCalendarProps {
  startDay: number;
  endDay: number;
  setStartDay: (day: number) => void;
  setEndDay: (day: number) => void;
}

export default function BillboardClient({ billboard }: { billboard: Billboard; }) {
  const router = useRouter();
  const selection = useSelection();

  const [startDay, setStartDay] = useState<number>(12);
  const [endDay, setEndDay] = useState<number>(26);

  const daysSelected = Math.max(1, endDay - startDay);
  const total = Math.round((billboard.weeklyPrice / 7) * daysSelected);

  const iso = (day: number) => new Date(Date.UTC(2025, 2, day)).toISOString();

  const addToSelection = () => {
    selection.add({
      id: billboard.id,
      startDate: iso(startDay),
      endDate: iso(endDay),
    });
  };

  const bookNow = () => {
    addToSelection();
    router.push(`${billboard.id}/upload`); // Replaced useNavigate
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto grid w-full max-w-350 gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-10">
        <div className="min-w-0">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            {/* Replaced 'to' with 'href' */}
            <Link href="/browse" className="hover:text-foreground">
              Browse
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{billboard.category}</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate text-foreground">{billboard.name}</span>
          </nav>

          {/* Hero image */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary aspect-16/10">
            {/* Swapped standard img for Next.js Image for better performance */}
            <Image
              src={billboard.image}
              alt={billboard.name}
              fill
              unoptimized // Added to prevent Next.js image optimization errors with dummy external URLs
              className="object-cover"
            />
            {billboard.status === "premium" && (
              <span className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background">
                <Sparkles className="h-3.5 w-3.5" /> Premium Spot
              </span>
            )}
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                type="button"
                aria-label="Save"
                className="grid h-10 w-10 place-items-center rounded-full bg-background/90 backdrop-blur transition hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Share"
                className="grid h-10 w-10 place-items-center rounded-full bg-background/90 backdrop-blur transition hover:bg-background"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {billboard.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {billboard.address}, {billboard.city} · {billboard.neighborhood}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {billboard.rating}
              <span className="text-muted-foreground">
                ({billboard.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {billboard.tags.map((t: string) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-6 grid gap-3 rounded-2xl bg-surface p-4 sm:grid-cols-2 sm:p-6">
            <Spec
              icon={<Maximize2 className="h-4 w-4" />}
              label="Size"
              value={billboard.size}
            />
            <Spec
              icon={<Monitor className="h-4 w-4" />}
              label="Type"
              value={billboard.type}
            />
            <Spec
              icon={<Eye className="h-4 w-4" />}
              label="Visibility"
              value={billboard.visibility}
            />
            <Spec
              icon={<Users className="h-4 w-4" />}
              label="Daily Reach"
              value={`~${(billboard.dailyReach / 1000).toFixed(0)}K`}
            />
          </div>

          {/* Pricing */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">Pricing</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-sm text-muted-foreground">Weekly</div>
                <div className="mt-2 text-3xl font-bold">
                  ${billboard.weeklyPrice.toLocaleString()}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">/ week</div>
              </div>
              <div className="relative rounded-2xl border border-border bg-card p-5">
                <span className="absolute right-4 top-4 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold text-background">
                  −15%
                </span>
                <div className="text-sm text-muted-foreground">Monthly</div>
                <div className="mt-2 text-3xl font-bold">
                  ${billboard.monthlyPrice.toLocaleString()}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  / month
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">Design Guidelines</h3>
                <p className="text-xs text-muted-foreground">
                  Specs for best quality artwork
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-3">
              {[
                { t: "Resolution", d: "Minimum 300 DPI at full size" },
                {
                  t: "Aspect Ratio",
                  d: "Match billboard ratio (e.g. 7:24 for 14×48 ft)",
                },
                { t: "File Size", d: "Max 50MB per file — RGB color mode" },
              ].map((g) => (
                <li key={g.t} className="flex items-start gap-3">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    ✓
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{g.t}</div>
                    <div className="text-xs text-muted-foreground">{g.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rental sidebar */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl border border-gray-300 bg-amber-50/20 p-5 shadow-sm">
            <h2 className="text-xl font-bold">Select Rental Period</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose your campaign dates
            </p>

            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-2xl bg-surface p-2.5">
              <DateBox label="Start Date" day={startDay} />
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <DateBox label="End Date" day={endDay} />
            </div>

            <MiniCalendar 
              startDay={startDay} 
              endDay={endDay} 
              setStartDay={setStartDay} 
              setEndDay={setEndDay} 
            />

            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">
                  {daysSelected} days selected
                </div>
                <div className="text-xs text-muted-foreground">
                  Mar {startDay} — Mar {endDay}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-600">
                  ${total.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">total</div>
              </div>
            </div>

            <div className="mt-5 grid gap-2">
              <Button
                type="button"
                onClick={addToSelection}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 h-11 sm:h-12 md:h-12"
              >
                + Add to Selection
              </Button>
              <Button
                type="button"
                onClick={bookNow}
                className="w-full gap-2 rounded-sm bg-red-600 hover:bg-red-600/80 text-sm font-semibold text-white transition h-11 sm:h-12 md:h-12"
              >
                <Sparkles className="h-4 w-4" /> Book Now
              </Button>
            </div>
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-secondary">
              ✓
            </span>
            Secure booking · Cancel within 24h
          </p>
        </aside>
      </main>
    </div>
  );
}

// -----------------------------------------------------
// Internal Components (Spec, DateBox, MiniCalendar)
// -----------------------------------------------------
function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-card p-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

function DateBox({ label, day, year = "25" }: DateBoxProps) {
  return (
    <div className="min-w-0 rounded-xl bg-background p-2 sm:p-2.5">
      <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80">
        {label}
      </div>
      {/* Side-by-side flex container for layout alignment */}
      <div className="mt-0.5 flex items-center gap-1.5 min-w-0">
        <CalendarDaysIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate text-xs font-semibold tracking-tight text-foreground">
          Mar {day}, {"'"}{year}
        </span>
      </div>
    </div>
  );
}

function MiniCalendar({
  startDay,
  endDay,
  setStartDay,
  setEndDay,
}: MiniCalendarProps) {
  // Generates days from 3 to 30 matching your original 28-day setup
  const days = useMemo(() => Array.from({ length: 28 }, (_, i) => i + 3), []);

  // Internal selection handler that overrides rigid sequence bugs
  const handleDayClick = (day: number) => {
    // 1. If no start day is set, or user clicks a day BEFORE the current start day, reset start day
    if (!startDay || day < startDay) {
      setStartDay(day);
      if (endDay && day >= endDay) {
        setEndDay(0); // Safely reset invalid end day states
      }
      return;
    }

    // 2. If clicking the current start day again, treat it as a reset anchor
    if (day === startDay) {
      setStartDay(day);
      return;
    }

    // 3. If clicking a day after the start day, finalize or modify the end day range
    if (day > startDay) {
      setEndDay(day);
    }
  };

  return (
    <div className="mt-5 rounded-2xl border border-border p-3 bg-card">
      {/* Weekday Labels Header */}
      <div className="grid grid-cols-7 text-center text-[11px] font-medium text-muted-foreground">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((d) => {
          const isStart = d === startDay;
          const isEnd = d === endDay;
          const inRange = startDay > 0 && endDay > 0 && d > startDay && d < endDay;

          return (
            <Button
              key={d}
              type="button"
              variant="ghost" // Prevents default shadcn primary background styling from stepping on your classes
              onClick={() => handleDayClick(d)}
              className={cn(
                "grid h-8 w-full place-items-center rounded-md text-xs font-medium transition-all duration-150 p-0", // Added p-0 to clear default button padding
                // Active start or end dates anchor styling
                (isStart || isEnd) && "bg-foreground text-background font-semibold shadow-sm hover:bg-foreground hover:text-background",
                // Mid-range date sequence styling
                inRange && "bg-secondary text-foreground rounded-none first-of-type:rounded-l-md last-of-type:rounded-r-md hover:bg-secondary",
                // Unselected default interactive states
                !isStart &&
                  !isEnd &&
                  !inRange &&
                  "text-foreground/80 hover:bg-secondary/70",
              )}
            >
              {d}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
