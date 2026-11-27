"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Plus, Star } from "lucide-react";
import { TopNav } from "@/components/app/TopNav";
import {
  type Listing,
  type Status,
} from "@/components/owner/inventory/types";
import Card from "@/components/owner/inventory/Card";
import ListRow from "@/components/owner/inventory/ListRow";
import GhostCard from "@/components/owner/inventory/GhostCard";
import GhostRow from "@/components/owner/inventory/GhostRow";
import ViewToggle from "@/components/owner/inventory/ViewToggle";
import SearchBar from "@/components/owner/inventory/SearchBar";
import TabBar from "@/components/owner/inventory/TabBar";
import LoadingSpinner from "@/components/owner/inventory/LoadingSpinner";
import Link from "next/link";
import {
  fetchOwnerBillboards,
  type OwnerBillboardItem,
} from "@/lib/owner-api";

function mapStatus(item: OwnerBillboardItem): Status {
  switch (item.lifecycleStatus) {
    case "draft":
      return "Draft";
    case "pending_review":
      return "Pending review";
    case "active":
      return item.quickStatus === "available" ? "Live" : "Unavailable";
    default:
      return "Unavailable";
  }
}

function toListing(item: OwnerBillboardItem): Listing {
  const price =
    item.pricePerMonth != null
      ? `₹${Number(item.pricePerMonth).toLocaleString("en-IN")}`
      : "—";

  return {
    id: item.id,
    title: item.name,
    city: item.stateRegion
      ? `${item.city}, ${item.stateRegion}`
      : item.city,
    price,
    image: item.imageUrl ?? "",
    status: mapStatus(item),
  };
}

export default function MyInventoryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"card" | "list">("card");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchOwnerBillboards();
      setListings(items.map(toListing));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load inventory",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = listings.filter((l) => {
    const matchesTab = activeTab === "All" || l.status === activeTab;
    const matchesQuery = l.title.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-white text-[#0a0a0a]">
        <main className="mx-auto w-full max-w-350 px-4 py-6 sm:px-6 lg:px-10">
          {/* Title row */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
                My Inventory
              </h1>
              <p className="text-sm text-[#737373]">
                {loading
                  ? "Loading…"
                  : `${listings.length} billboard listing${listings.length === 1 ? "" : "s"}`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <ViewToggle view={view} onChange={setView} />
              <SearchBar value={query} onChange={setQuery} />
              <button
                aria-label="Saved"
                className="flex size-10 items-center justify-center rounded-md border border-[#e5e5e5] bg-white text-[#737373] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#f5f5f5] cursor-pointer disabled:pointer-events-none"
              >
                <Star className="size-4" strokeWidth={1.8} />
              </button>
              <button className="flex h-10 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-3 text-sm text-[#0a0a0a] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#f5f5f5] cursor-pointer disabled:pointer-events-none">
                <Filter className="size-4" strokeWidth={1.5} />
                Filter
              </button>
              <Link href="/upload">
                <button className="flex h-10 items-center gap-2 rounded-md bg-[#f54900] px-3 text-sm text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#dc4200] cursor-pointer disabled:pointer-events-none">
                  <Plus className="size-4" strokeWidth={1.5} />
                  Add billboard
                </button>
              </Link>
            </div>
          </div>

          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

          {error ? (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-[#e5e5e5] bg-white px-6 py-12 text-center">
              <p className="text-sm text-[#c10007]">{error}</p>
              <button
                onClick={() => void load()}
                className="rounded-md bg-[#0a0a0a] px-4 py-2 text-sm text-white transition-colors hover:bg-[#262626] cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : loading ? (
            <div className="mt-6 flex items-center justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-dashed border-[#e5e5e5] px-6 py-16 text-center">
              <p className="text-sm font-medium text-[#0a0a0a]">
                No billboards found
              </p>
              <p className="text-sm text-[#737373]">
                {listings.length === 0
                  ? "Add your first billboard to get started."
                  : "Try a different tab or search."}
              </p>
              {listings.length === 0 && (
                <Link href="/upload">
                  <button className="mt-2 flex h-10 items-center gap-2 rounded-md bg-[#f54900] px-4 text-sm text-white transition-colors hover:bg-[#dc4200] cursor-pointer">
                    <Plus className="size-4" strokeWidth={1.5} />
                    Add billboard
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {view === "card" ? (
                <motion.div
                  key="card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filtered.map((listing) => (
                    <Card key={listing.id} listing={listing} />
                  ))}
                  <GhostCard />
                  <GhostCard />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mt-6 overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                >
                  {/* List header */}
                  <div className="flex items-center gap-4 border-b border-[#e5e5e5] bg-[#fafafa] px-4 py-2">
                    <div className="w-20 shrink-0" />
                    <div className="flex-1 text-xs font-medium uppercase tracking-wide text-[#737373]">
                      Billboard
                    </div>
                    <div className="hidden w-36 text-xs font-medium uppercase tracking-wide text-[#737373] sm:block">
                      Status
                    </div>
                    <div className="hidden w-28 shrink-0 text-right text-xs font-medium uppercase tracking-wide text-[#737373] md:block">
                      Price / mo
                    </div>
                    <div className="w-18 shrink-0" />
                  </div>
                  {filtered.map((listing) => (
                    <ListRow key={listing.id} listing={listing} />
                  ))}
                  <GhostRow />
                  <GhostRow />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>
    </>
  );
}
