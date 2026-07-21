"use client";

// import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleSignOut } from "@/lib/google-oauth/login";
import { cn } from "@/lib/utils";
import {
  Bell,
  FileText,
  LogOut,
  MapPin,
  Search,
  SlidersHorizontal,
  Upload,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";

const items = [
  { to: "/browse", label: "Browse", icon: MapPin },
  { to: "/rentals", label: "My Rentals", icon: FileText },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/account", label: "Account", icon: User },
] as const;

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Inside TopNav()
  const user = useUserStore((state) => state.user);

  const avatar =
    user?.avatarUrl ||
    "https://ui-avatars.com/api/?name=User&background=ececec&color=555";

  const firstName = user?.fullName?.trim().split(" ")[0] || "User";

  async function onSignOut() {
    await handleSignOut();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-40 mt-2 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-350 items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-red-600 text-primary-foreground shadow-sm">
            <MapPin className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">
            BillboardKart
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
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-gray-300 bg-background text-muted-foreground transition hover:text-foreground cursor-pointer disabled:pointer-events-none"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>
          <div className="flex items-center gap-2.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-muted cursor-pointer"
                  type="button"
                >
                  <Image
                    src={avatar}
                    alt={firstName}
                    width={40}
                    height={40}
                    unoptimized
                    className="h-10 w-10 rounded-full border border-border object-cover"
                  />

                  <div className="hidden text-left sm:block">
                    <p className="text-xs text-muted-foreground">Hello,</p>
                    <p className="text-sm font-semibold leading-none">
                      {firstName}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <div className="px-3 py-2">
                  <p className="font-medium">{user?.fullName ?? "User"}</p>

                  <p className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={onSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
