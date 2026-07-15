import { CheckCircle2, MapPin, Star } from "lucide-react";
import type { Billboard } from "@/lib/billboards";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BillboardCardProps {
  billboard: Billboard;
  active?: boolean;
  onClick?: () => void;
}

const statusStyle: Record<Billboard["status"], string> = {
  available: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  booked: "bg-secondary text-muted-foreground ring-border",
  premium: "bg-amber-50 text-amber-700 ring-amber-200",
};

const statusLabel: Record<Billboard["status"], string> = {
  available: "Available",
  booked: "Booked",
  premium: "Premium",
};

export function BillboardCard({
  billboard,
  active,
  onClick,
}: BillboardCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group grid w-full grid-cols-[112px_minmax(0,1fr)] gap-3 rounded-2xl border bg-card p-3 text-left transition sm:gap-4",
        active
          ? "border-red-600 shadow-[0_0_0_1px_var(--primary)]"
          : "border-border hover:border-foreground/20 hover:shadow-sm",
      )}
    >
      <div className="relative h-full min-h-24 overflow-hidden rounded-xl bg-secondary">
        <Image
          src={billboard.image}
          alt={billboard.name}
          fill
          unoptimized
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-[15px] font-semibold leading-tight">
            {billboard.name}
          </h3>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-xs px-2 py-0.5 text-[11px] font-medium ring-1",
              statusStyle[billboard.status],
            )}
          >
            {billboard.status === "available" && (
              <CheckCircle2 className="h-3 w-3" />
            )}
            {statusLabel[billboard.status]}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {billboard.address}, {billboard.neighborhood}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-md border border-gray-300 bg-gray-100 px-2 py-0.5 text-[11px] font-medium">
            {billboard.size}
          </span>
          <span className="rounded-md border border-gray-300 bg-gray-100 px-2 py-0.5 text-[11px] font-medium">
            {billboard.type}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="text-[15px] font-bold text-red-600">
            ${billboard.weeklyPrice.toLocaleString()}
            <span className="text-xs font-medium text-muted-foreground">
              /week
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {billboard.rating}
          </div>
        </div>
      </div>
    </button>
  );
}
