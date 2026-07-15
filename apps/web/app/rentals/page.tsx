"use client";

import { useMemo, useState } from "react";

import RentalsFilters from "@/components/rentals/RentalsFilters";
import RentalsHeader from "@/components/rentals/RentalsHeader";
import RentalStats from "@/components/rentals/RentalStats";
import RentalTimeline, {
  TimelineItem,
} from "@/components/rentals/RentalTimeline";
import RentalsTabs from "@/components/rentals/RentalsTabs";
import RentalCard from "@/components/rentals/RentalCard";
import EmptyState from "@/components/rentals/EmptyState";

import type { RentalCardProps } from "@/components/rentals/RentalCard";
import type { RentalTab } from "@/lib/types";
import { TopNav } from "@/components/app/TopNav";

const RENTALS: readonly RentalCardProps[] = [
  {
    id: "blr-techpark-01",
    billboardName: "Outer Ring Road Tech Park",
    city: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
    status: "active",
    startDate: "01 Jul 2026",
    endDate: "31 Jul 2026",
    bookedOn: "18 Jun 2026",
    budget: 185000,
    impressions: 2940000,
    occupancy: 100,
    progress: 48,
    dailyReach: 112000,
    duration: "31 Days",
  },
  {
    id: "mum-airport-01",
    billboardName: "Mumbai Airport Highway",
    city: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80&auto=format&fit=crop",
    status: "scheduled",
    startDate: "15 Aug 2026",
    endDate: "15 Sep 2026",
    bookedOn: "02 Jul 2026",
    budget: 245000,
    impressions: 3810000,
    occupancy: 100,
    progress: 0,
    dailyReach: 132000,
    duration: "30 Days",
  },
  {
    id: "hyd-metro-01",
    billboardName: "Hitech City Metro",
    city: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&auto=format&fit=crop",
    status: "completed",
    startDate: "01 Apr 2026",
    endDate: "30 Apr 2026",
    bookedOn: "12 Mar 2026",
    budget: 162000,
    impressions: 2410000,
    occupancy: 100,
    progress: 100,
    dailyReach: 94000,
    duration: "30 Days",
  },
];

const TIMELINE: readonly TimelineItem[] = [
  {
    id: "1",
    title: "Booking Confirmed",
    description:
      "Your booking has been confirmed and the contract has been digitally signed.",
    date: "18 Jun 2026",
    status: "completed",
  },
  {
    id: "2",
    title: "Artwork Approved",
    description:
      "AI creative review successfully verified dimensions, quality and compliance.",
    date: "20 Jun 2026",
    status: "completed",
  },
  {
    id: "3",
    title: "Campaign Live",
    description:
      "Your billboard is currently displaying the campaign across the selected location.",
    date: "01 Jul 2026",
    status: "current",
  },
  {
    id: "4",
    title: "Performance Report",
    description:
      "Campaign analytics and invoice will be generated automatically after completion.",
    date: "31 Jul 2026",
    status: "upcoming",
  },
];

export default function RentalsPage() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<RentalTab>("all");

  const [city, setCity] = useState("all");

  const filteredRentals = useMemo(() => {
    return RENTALS.filter((rental) => {
      const matchesSearch =
        rental.billboardName.toLowerCase().includes(search.toLowerCase()) ||
        rental.city.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "all" || rental.status === status;

      const matchesCity = city === "all" || rental.city.toLowerCase() === city;

      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [city, search, status]);

  const counts = useMemo<Record<RentalTab, number>>(
    () => ({
      all: RENTALS.length,

      active: RENTALS.filter((rental) => rental.status === "active").length,

      scheduled: RENTALS.filter((rental) => rental.status === "scheduled")
        .length,

      completed: RENTALS.filter((rental) => rental.status === "completed")
        .length,

      cancelled: RENTALS.filter((rental) => rental.status === "cancelled")
        .length,
    }),
    [],
  );

  const stats = useMemo(() => {
    const activeCampaigns = RENTALS.filter(
      (rental) => rental.status === "active",
    ).length;

    const totalSpend = RENTALS.reduce((sum, rental) => sum + rental.budget, 0);

    const totalImpressions = RENTALS.reduce(
      (sum, rental) => sum + rental.impressions,
      0,
    );

    const averageOccupancy = Math.round(
      RENTALS.reduce((sum, rental) => sum + rental.occupancy, 0) /
        RENTALS.length,
    );

    return {
      activeCampaigns,
      totalSpend,
      totalImpressions,
      averageOccupancy,
    };
  }, []);
  return (
    <main className="min-h-screen bg-background">
      <TopNav />
      <div className="mx-auto max-w-[1600px] space-y-8 px-6 py-10 lg:px-10">
        <RentalsHeader
          activeRentals={counts.active}
          completedRentals={counts.completed}
        />

        <RentalStats
          activeCampaigns={stats.activeCampaigns}
          totalSpend={stats.totalSpend}
          totalImpressions={stats.totalImpressions}
          averageOccupancy={stats.averageOccupancy}
        />

        <RentalsFilters
          search={search}
          status={status}
          city={city}
          onSearchChange={setSearch}
          onStatusChange={(value) => setStatus(value as RentalTab)}
          onCityChange={setCity}
        />

        {/* Campaigns */}
        <section className="space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Campaigns
              </h2>

              <p className="mt-2 text-muted-foreground">
                Browse every billboard campaign you&apos;ve booked, both current
                and previous.
              </p>
            </div>

            <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredRentals.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {RENTALS.length}
              </span>{" "}
              rentals
            </div>
          </div>

          {filteredRentals.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-8">
              {filteredRentals.map((rental) => (
                <RentalCard key={rental.id} {...rental} />
              ))}
            </div>
          )}
        </section>

        {/* ------------------------------------------------ */}
        {/* Timeline                                         */}
        {/* ------------------------------------------------ */}

        <RentalTimeline items={TIMELINE} />
      </div>
    </main>
  );
}
