"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RentalsFiltersProps {
  readonly search: string;
  readonly status: string;
  readonly city: string;

  readonly onSearchChange: (value: string) => void;
  readonly onStatusChange: (value: string) => void;
  readonly onCityChange: (value: string) => void;
}

export default function RentalsFilters({
  search,
  status,
  city,
  onSearchChange,
  onStatusChange,
  onCityChange,
}: RentalsFiltersProps) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by campaign or location..."
            className="h-12 rounded-xl border-border pl-11 shadow-none"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="h-12 w-full rounded-xl sm:w-45">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All campaigns</SelectItem>

              <SelectItem value="active">Active</SelectItem>

              <SelectItem value="scheduled">Scheduled</SelectItem>

              <SelectItem value="completed">Completed</SelectItem>

              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={city} onValueChange={onCityChange}>
            <SelectTrigger className="h-12 w-full rounded-xl sm:w-45">
              <SelectValue placeholder="City" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All cities</SelectItem>

              <SelectItem value="mumbai">Mumbai</SelectItem>

              <SelectItem value="pune">Pune</SelectItem>

              <SelectItem value="delhi">Delhi</SelectItem>

              <SelectItem value="bangalore">Bengaluru</SelectItem>

              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-12 rounded-xl">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>
    </section>
  );
}
