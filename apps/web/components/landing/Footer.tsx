"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

const productLinks = [
  {
    label: "Marketplace",
    href: "/browse",
  },
  {
    label: "AI Studio",
    href: "#ai",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Locations",
    href: "#locations",
  },
] as const;

const companyLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const;

const legalLinks = [
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <div className="text-lg font-semibold tracking-tight">
                  BillboardRent
                </div>

                <div className="text-sm text-muted-foreground">
                  YC Backed Outdoor Advertising Platform
                </div>
              </div>
            </Link>

            <p className="mt-8 max-w-md leading-8 text-muted-foreground">
              BillboardRent helps brands discover, book and launch outdoor
              advertising campaigns through a modern marketplace powered by AI.
            </p>

            <div className="mt-10 inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

              <span className="text-sm font-medium">
                YC S25 • Building the future of outdoor advertising
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Product
              </h3>

              <ul className="mt-6 space-y-4">
                {productLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Company
              </h3>

              <ul className="mt-6 space-y-4">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Legal
              </h3>

              <ul className="mt-6 space-y-4">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 BillboardRent, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Made in India 🇮🇳</span>
            <span>YC S25</span>
            <span>Version 1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
