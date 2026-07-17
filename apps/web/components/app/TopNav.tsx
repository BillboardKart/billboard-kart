"use client";

import { cn } from "@/lib/utils";
import {
  Bell,
  FileText,
  MapPin,
  Search,
  SlidersHorizontal,
  Upload,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { to: "/browse", label: "Browse", icon: MapPin },
  { to: "/rentals", label: "My Rentals", icon: FileText },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/account", label: "Account", icon: User },
] as const;

const profilephoto =
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&h=100&q=80";

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 mt-2 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-350 items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-red-600 text-primary-foreground shadow-sm">
            <MapPin className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">
            BillboardRent
          </span>
        </Link>

        <div className="relative hidden min-w-0 flex-1 md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search locations, billboards, or campaigns"
            className="h-11 w-full rounded-xl border border-border bg-secondary/60 pl-11 pr-12 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background"
          />
          <button
            type="button"
            aria-label="Filters"
            className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition hover:text-foreground"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>
          <div className="flex items-center gap-2.5">
            <Image
              src={profilephoto}
              alt="You"
              width={36}
              height={36}
              unoptimized
              className="rounded-full object-cover"
            />
            <span className="hidden text-sm font-medium sm:block">
              Hello, Alex
            </span>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex w-full max-w-350 items-center gap-1 overflow-x-auto px-4 scrollbar-hide sm:px-6 lg:px-10">
        {items.map((item) => {
          // Adding optional chaining to pathname just in case it is null during SSR
          const active =
            item.to === "/browse"
              ? pathname === "/browse" || pathname?.startsWith("/billboard")
              : pathname === item.to ||
                (item.to === "/upload" && pathname === "/review");

          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "relative flex shrink-0 items-center gap-2 px-3 py-3 text-sm font-medium transition sm:px-4",
                active
                  ? "text-red-600"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {active && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary sm:inset-x-3" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
