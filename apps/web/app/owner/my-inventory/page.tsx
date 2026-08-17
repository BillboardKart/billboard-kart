"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Plus, Star } from "lucide-react";
import { TopNav } from "@/components/app/TopNav";
import { type Listing } from "@/components/owner/inventory/types";
import Card from "@/components/owner/inventory/Card";
import ListRow from "@/components/owner/inventory/ListRow";
import GhostCard from "@/components/owner/inventory/GhostCard";
import GhostRow from "@/components/owner/inventory/GhostRow";
import ViewToggle from "@/components/owner/inventory/ViewToggle";
import SearchBar from "@/components/owner/inventory/SearchBar";
import TabBar from "@/components/owner/inventory/TabBar";
import LoadingSpinner from "@/components/owner/inventory/LoadingSpinner";
import Link from "next/link";

const listings: Listing[] = [
  {
    id: "1",
    title: "Western Express Highway Billboard",
    city: "Mumbai, MH",
    price: "₹90,000",
    status: "Live",
    image:
      "https://images.unsplash.com/photo-1784724195624-970e3414390b?w=800&h=440&fit=crop&auto=format",
  },
  {
    id: "2",
    title: "Pune City Center Tower",
    city: "Pune, MH",
    price: "₹2,85,000",
    status: "Pending review",
    image:
      "https://images.unsplash.com/photo-1760180139823-527522243bae?w=800&h=440&fit=crop&auto=format",
  },
  {
    id: "3",
    title: "Marine Drive Rooftop Panel",
    city: "Mumbai, MH",
    price: "₹1,80,000",
    status: "Needs documents",
    image:
      "https://images.unsplash.com/photo-1768364288406-e3cb34c28b0c?w=800&h=440&fit=crop&auto=format",
  },
  {
    id: "4",
    title: "Koregaon Park Street Board",
    city: "Pune, MH",
    price: "₹4,20,000",
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1774274012575-100d75753e99?w=800&h=440&fit=crop&auto=format",
  },
  {
    id: "5",
    title: "Viman Nagar Transit Shelter",
    city: "Pune, MH",
    price: "₹73,500",
    status: "Unavailable",
    image:
      "https://images.unsplash.com/photo-1784101832763-d1ff32764751?w=800&h=440&fit=crop&auto=format",
  },
];

export default function MyInventoryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"card" | "list">("card");

  const filtered = listings.filter((l) => {
    const matchesTab = activeTab === "All" || l.status === activeTab;
    const matchesQuery = l.title.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-white text-[#0a0a0a]">
        <main className="mx-auto max-w-7xl px-12 py-8">
          {/* Title row */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
                My Inventory
              </h1>
              <p className="text-sm text-[#737373]">8 billboard listings</p>
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
              <Link href={"/owner/add-billboard"}>
                <button className="flex h-10 items-center gap-2 rounded-md bg-[#f54900] px-3 text-sm text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#dc4200] cursor-pointer disabled:pointer-events-none">
                  <Plus className="size-4" strokeWidth={1.5} />
                  Add billboard
                </button>
              </Link>
            </div>
          </div>

          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Listings */}
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

          <LoadingSpinner />
        </main>
      </div>
    </>
  );
}
