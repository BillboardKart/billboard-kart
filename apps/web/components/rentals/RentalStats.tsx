"use client";

import { motion } from "framer-motion";
import { BadgeIndianRupee, Building2, Eye, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/card";

interface RentalStatsProps {
  readonly activeCampaigns: number;
  readonly totalSpend: number;
  readonly totalImpressions: number;
  readonly averageOccupancy: number;
}

interface StatCardProps {
  readonly title: string;
  readonly value: string;
  readonly description: string;
  readonly icon: React.ElementType;
}

function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <Card className="rounded-[28px] border-border shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-3 text-4xl font-semibold tracking-tight">
            {value}
          </h3>

          <p className="mt-3 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
          <Icon className="h-5 w-5 text-red-600" />
        </div>
      </div>
    </Card>
  );
}

export default function RentalStats({
  activeCampaigns,
  totalSpend,
  totalImpressions,
  averageOccupancy,
}: RentalStatsProps) {
  const stats = [
    {
      title: "Active Campaigns",
      value: activeCampaigns.toString(),
      description: "Currently running",
      icon: Building2,
    },
    {
      title: "Total Spend",
      value: new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(totalSpend),
      description: "Across all rentals",
      icon: BadgeIndianRupee,
    },
    {
      title: "Impressions",
      value: new Intl.NumberFormat("en-IN").format(totalImpressions),
      description: "Estimated audience reached",
      icon: Eye,
    },
    {
      title: "Occupancy",
      value: `${averageOccupancy}%`,
      description: "Average booking utilization",
      icon: TrendingUp,
    },
  ] satisfies readonly StatCardProps[];

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: index * 0.08,
            duration: 0.35,
          }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </section>
  );
}
