"use client";

import { BillboardCard } from "@/components/app/BillboardCard";
import { MapView } from "@/components/app/MapView";
import { TopNav } from "@/components/app/TopNav";
import { getRoleHomePath } from "@/lib/auth/role-redirect";
import {
  fetchAdvertiserBillboardsPage,
  AdvertiserApiError,
} from "@/lib/advertiser-api";
import type {
  BillboardsPageResult,
  PaginationMeta,
} from "@/lib/billboard-api";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";
import {
  ChevronLeft,
  ChevronRight,
  List,
  Map as MapIcon,
  MapPin,
  Star,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function BrowsePage() {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const isUserLoading = useUserStore((state) => state.isLoading);

  const [filter, setFilter] = useState<string>("All");

  const [result, setResult] = useState<BillboardsPageResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const [activeId, setActiveId] = useState<string>("");
  const [view, setView] = useState<"list" | "map">("map");

  const isAdvertiser =
    user?.authenticated === true &&
    user.isOnboarded === true &&
    user.primaryRole === "advertiser";

  // Role gate: advertisers only. Unauthenticated users go to login,
  // other roles go to their own home. The API enforces this again
  // server-side — this is only a UX redirect.
  useEffect(() => {
    if (isUserLoading) return;

    if (!user?.authenticated || !user.isOnboarded) {
      router.replace("/login");
      return;
    }

    if (user.primaryRole !== "advertiser") {
      router.replace(getRoleHomePath(user.primaryRole));
    }
  }, [isUserLoading, user, router]);

  const loadPage = useCallback(
    async (targetPage: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAdvertiserBillboardsPage(targetPage);
        setResult(data);
        setActiveId(data.billboards[0]?.id ?? "");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setResult(null);
        if (err instanceof AdvertiserApiError && err.status === 401) {
          router.replace("/login");
          return;
        }
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load billboards. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  useEffect(() => {
    if (isAdvertiser) {
      loadPage(page);
    }
  }, [isAdvertiser, loadPage, page]);

  const billboards = useMemo(() => result?.billboards ?? [], [result]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const b of billboards) if (b.category) set.add(b.category);
    return [...set];
  }, [billboards]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? billboards
        : billboards.filter((b) => b.category === filter),
    [billboards, filter],
  );

  const active = filtered.find((b) => b.id === activeId) ?? filtered[0];

  const pagination = result?.pagination;
  const headingCity = billboards[0]?.city;

  // While the session/role is resolving, show a neutral loading state.
  if (isUserLoading || (!isAdvertiser && user?.authenticated)) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="mx-auto w-full max-w-350 px-4 py-6 sm:px-6 lg:px-10">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-secondary" />
          <div className="mt-6 h-10 w-full animate-pulse rounded-xl bg-secondary" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="mx-auto w-full max-w-350 px-4 py-6 sm:px-6 lg:px-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
              {headingCity
                ? `Billboards in ${headingCity}`
                : "Browse Billboards"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {pagination
                ? `${pagination.total} available spaces · Showing on map`
                : "Loading billboards..."}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-xl border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition",
                view === "list"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <List className="h-4 w-4" /> List
            </button>
            <button
              type="button"
              onClick={() => setView("map")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition",
                view === "map"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <MapIcon className="h-4 w-4" /> Map
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <span className="flex items-center gap-2">
              <TriangleAlert className="h-4 w-4 shrink-0" />
              {error}
            </span>
            <button
              type="button"
              onClick={() => loadPage(page)}
              className="shrink-0 rounded-lg border border-red-300 bg-background px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(["All", ...categories] as string[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                filter === c
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-gray-300 bg-card text-foreground hover:border-foreground/20",
              )}
            >
              {c}
            </button>
          ))}
          <div className="mx-2 hidden h-6 w-px bg-gray-300 sm:block" />
          {["$ Price", "⤢ Size", "✓ Available"].map((label) => (
            <button
              key={label}
              type="button"
              className="shrink-0 rounded-full border border-gray-300 bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/20"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Split view */}
        <div
          className={cn(
            "mt-6 grid gap-6",
            view === "map"
              ? "lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]"
              : "lg:grid-cols-2",
          )}
        >
          {/* Cards */}
          <div className="flex flex-col gap-3">
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="grid w-full grid-cols-[112px_minmax(0,1fr)] gap-3 rounded-2xl border bg-card p-3 sm:gap-4"
                >
                  <div className="min-h-24 rounded-xl bg-secondary animate-pulse" />
                  <div className="flex flex-col justify-between py-0.5">
                    <div className="h-4 w-3/4 rounded bg-secondary animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-secondary animate-pulse" />
                    <div className="h-3 w-1/3 rounded bg-secondary animate-pulse" />
                  </div>
                </div>
              ))}

            {!isLoading && !error && filtered.length === 0 && (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground">
                  No billboards found
                </p>
                <p className="text-xs text-muted-foreground">
                  {filter === "All"
                    ? "There are no published billboards available right now. Check back later."
                    : `No billboards match the "${filter}" filter on this page.`}
                </p>
                {filter !== "All" && (
                  <button
                    type="button"
                    onClick={() => setFilter("All")}
                    className="mt-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-secondary"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            )}

            {!isLoading &&
              !error &&
              filtered.map((b) => (
                <BillboardCard
                  key={b.id}
                  billboard={b}
                  active={b.id === activeId}
                  onClick={() => {
                    setActiveId(b.id);
                    if (window.innerWidth < 1024)
                      router.push(`/billboard/${b.id}`);
                  }}
                />
              ))}

            {!isLoading && !error && pagination && filtered.length > 0 && (
              <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3">
                <button
                  type="button"
                  disabled={!pagination.hasPrev}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground transition enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:text-muted-foreground/50"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>

                <p className="text-sm text-muted-foreground">
                  Page{" "}
                  <span className="font-semibold text-foreground">
                    {pagination.page}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {pagination.totalPages}
                  </span>
                </p>

                <button
                  type="button"
                  disabled={!pagination.hasNext}
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground transition enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:text-muted-foreground/50"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Map */}
          {view === "map" && (
            <div className="relative isolate z-0 w-full h-120 sm:h-150 lg:h-180 overflow-hidden rounded-3xl border border-border bg-secondary shadow-sm">
              {/* Legend */}
              <div className="pointer-events-none absolute left-3 top-3 sm:left-4 sm:top-4 z-1000 flex flex-wrap items-center gap-2 sm:gap-4 rounded-full bg-background/90 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-medium shadow-sm backdrop-blur">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />{" "}
                  Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />{" "}
                  Booked
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />{" "}
                  Maintenance
                </span>
              </div>

              <MapView
                billboards={filtered}
                activeId={activeId}
                onSelect={setActiveId}
              />

              {/* Preview Card */}
              {active && (
                /* Kept mobile properties identical. Optimized max-height/padding for mobile screens */
                <div className="pointer-events-auto absolute inset-x-2 bottom-2 sm:inset-x-4 sm:bottom-4 z-1000 rounded-xl border border-border bg-card p-2.5 sm:p-3 shadow-xl md:p-5 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5 sm:gap-3 md:grid md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center md:gap-4">
                    <div className="flex items-center gap-2 sm:gap-4 md:block">
                      <Image
                        src={active.image}
                        alt={active.name}
                        width={120}
                        height={96}
                        unoptimized
                        className="h-12 w-14 shrink-0 rounded-lg object-cover sm:h-14 sm:w-16 md:h-24 md:w-full md:rounded-xl"
                      />
                      {/* Mobile Title View: Unchanged */}
                      <div className="min-w-0 md:hidden">
                        <h3 className="truncate text-xs font-bold text-foreground sm:text-sm">
                          {active.name}
                        </h3>
                        <span className="inline-block mt-0.5 rounded-sm bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-800 ring-1 ring-emerald-200">
                          Available
                        </span>
                      </div>
                    </div>

                    {/* Main Metadata Text Stack */}
                    <div className="min-w-0 md:flex md:h-24 md:flex-col md:justify-between">
                      <div>
                        <div className="hidden items-center gap-2 md:flex">
                          <h3 className="truncate text-base font-bold text-foreground">
                            {active.name}
                          </h3>
                          <span className="rounded-xs bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-800 ring-1 ring-emerald-200">
                            Available
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground sm:text-xs md:mt-1">
                          <MapPin className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                          <span className="truncate">
                            {active.address}, {active.neighborhood} ·{" "}
                            {active.city}
                          </span>
                        </div>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-1.5 md:mt-0">
                        <span className="rounded border border-border bg-background px-1 py-0.5 text-[9px] font-medium sm:px-1.5 sm:text-[10px] md:rounded-md">
                          {active.size}
                        </span>
                        <span className="rounded border border-border bg-background px-1 py-0.5 text-[9px] font-medium sm:px-1.5 sm:text-[10px] md:rounded-md">
                          {active.type}
                        </span>
                        <span className="flex items-center gap-0.5 text-[10px] font-medium sm:text-[11px]">
                          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400 sm:h-3 sm:w-3" />
                          {active.rating} ({active.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Pricing and CTAs Container */}
                    <div className="col-span-2 flex flex-row items-center justify-between gap-2 border-t border-border/60 pt-2 sm:gap-4 sm:pt-3 md:col-span-1 md:flex-col md:items-end md:justify-center md:border-none md:pt-0">
                      <div className="text-left md:text-right">
                        <span className="text-base font-black text-red-600 sm:text-lg md:text-xl">
                          ${active.monthlyPrice.toLocaleString()}
                        </span>
                        <span className="ml-1 text-[10px] text-muted-foreground sm:text-xs md:inline-block md:ml-1">
                          /month
                        </span>
                      </div>

                      <div className="flex w-full max-w-45 items-center gap-1.5 sm:max-w-55 sm:gap-2 md:max-w-none">
                        <Link
                          href={`/billboard/${active.id}`}
                          className="inline-flex h-8 w-full items-center justify-center whitespace-nowrap rounded-sm border border-border bg-background px-2 text-xs font-semibold text-foreground transition hover:bg-secondary/60 sm:h-9 sm:px-3 sm:text-sm md:w-28"
                        >
                          View Details
                        </Link>

                        <Link
                          href={`/billboard/${active.id}`}
                          className="inline-flex h-8 w-full items-center justify-center whitespace-nowrap rounded-sm bg-red-600 px-2 text-xs font-bold text-primary-foreground transition hover:bg-red-500 sm:h-9 sm:px-3 sm:text-sm md:w-28"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
