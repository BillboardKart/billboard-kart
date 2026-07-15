"use client";

import type { ElementType } from "react";

import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  LayoutGrid,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { RentalTab } from "../../lib/types";

interface RentalsTabsProps {
  readonly value: RentalTab;
  readonly counts: Readonly<Record<RentalTab, number>>;
  readonly onValueChange: (value: RentalTab) => void;
}

interface TabItem {
  readonly value: RentalTab;
  readonly label: string;
  readonly icon: ElementType;
}

const TAB_ITEMS: readonly TabItem[] = [
  {
    value: "all",
    label: "All",
    icon: LayoutGrid,
  },
  {
    value: "active",
    label: "Active",
    icon: Clock3,
  },
  {
    value: "scheduled",
    label: "Scheduled",
    icon: CalendarClock,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
  },
];

export default function RentalsTabs({
  value,
  counts,
  onValueChange,
}: RentalsTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(value) => onValueChange(value as RentalTab)}
    >
      <TabsList
        className="
          h-auto
          w-full
          flex-wrap
          justify-start
          gap-2
          rounded-3xl
          border
          border-border
          bg-card
          p-2
        "
      >
        {TAB_ITEMS.map((tab) => {
          const Icon = tab.icon;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="
                rounded-2xl
                px-5
                py-3
                data-[state=active]:bg-background
                data-[state=active]:shadow-sm
              "
            >
              <Icon className="mr-2 h-4 w-4" />

              {tab.label}

              <Badge variant="secondary" className="ml-2 rounded-full">
                {counts[tab.value]}
              </Badge>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
