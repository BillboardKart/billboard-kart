"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Calendar, Check, MapPin, Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopNav } from "@/components/app/TopNav";
import { Stepper } from "@/components/app/Stepper";
import { getBillboard } from "@/lib/billboards";
import { useSelection } from "@/lib/selection";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Select Billboards" },
  { label: "Choose Dates" },
  { label: "Upload Artwork" },
  { label: "Review Contract" },
];

const TAX_RATE = 0.085;

export default function ReviewClient() {
  const router = useRouter();
  const params = useParams();
  const selection = useSelection();

  // Safely extract an ID from the URL if this page is nested dynamically
  const urlBillboardId = params?.id as string | undefined;

  const items =
    selection.items.length > 0
      ? selection.items
      : [
          {
            id: urlBillboardId || "sunset-blvd-digital",
            startDate: "",
            endDate: "",
          },
          { id: "downtown-led-hub", startDate: "", endDate: "" },
        ];

  const billboards = items
    .map((it) => getBillboard(it.id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const subtotal = billboards.reduce((sum, b) => sum + b.weeklyPrice, 0);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = subtotal + tax;

  const [confirming, setConfirming] = useState(false);
  const [selectedCard, setSelectedCard] = useState<"visa" | "new">("visa");

  const confirm = () => {
    setConfirming(true);
    setTimeout(() => {
      selection.clear();
      router.push("/browse"); // Replaced TanStack navigate with Next.js router.push
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/*
      <div className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-350 px-4 py-6 sm:px-6 lg:px-10">
          <Stepper steps={STEPS} current={4} />
        </div>
      </div>
      */}

      <main className="mx-auto grid w-full max-w-350 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-10">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Review &amp; Sign Contract
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Please review the details before confirming
          </p>

          {/* Rental Summary */}
          <div className="mt-8 overflow-hidden rounded-3xl bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Rental Summary</h2>
              <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium">
                {billboards.length} Billboards
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {billboards.map((b) => (
                <div
                  key={b.id}
                  className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-card p-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">
                      {b.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {b.city} · {b.size}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    ${b.weeklyPrice.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-card p-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Mar 15 – Apr 14, 2025
              </div>
              <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium">
                30 days
              </span>
            </div>

            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">${subtotal.toLocaleString()}.00</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Tax (8.5%)</dt>
                <dd className="font-medium">${tax.toFixed(2)}</dd>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <dt className="text-base font-bold">Total</dt>
                <dd className="text-2xl font-bold text-red-600">
                  $
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </dd>
              </div>
            </dl>
          </div>

          {/* Contract terms */}
          <div className="mt-8">
            <h2 className="text-lg font-bold">Contract Terms</h2>
            <div className="mt-4 space-y-4 rounded-2xl border border-gray-300 bg-card p-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">
                  1. Rental Agreement.
                </span>{" "}
                This agreement is made between the Advertiser and the Billboard
                Owner for the rental of advertising space as specified above.
                The rental period begins on the agreed start date and concludes
                on the end date listed in the Rental Summary.
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  2. Payment Terms.
                </span>{" "}
                Full payment is due upon signing this contract. All payments are
                non-refundable after the campaign start date. Late payments may
                incur additional fees of 5% per week.
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  3. Content Policy.
                </span>{" "}
                All artwork must comply with BillboardRent&apos;s content
                guidelines and local advertising regulations. We reserve the
                right to reject creative that violates these standards.
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl border border-gray-300 bg-amber-50/20 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Payment Method</h2>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80"
              >
                <Plus className="h-3.5 w-3.5" /> Add new
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCard("visa")}
              className={cn(
                "mt-4 grid w-full grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-3 text-left transition",
                selectedCard === "visa"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-foreground/20",
              )}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-foreground text-[10px] font-bold text-background">
                VISA
              </span>
              <div>
                <div className="text-sm font-semibold">Visa ending in 4242</div>
                <div className="text-xs text-muted-foreground">
                  Expires 08/27
                </div>
              </div>
              <span
                className={cn(
                  "grid h-6 w-6 place-items-center rounded-full",
                  selectedCard === "visa"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border",
                )}
              >
                {selectedCard === "visa" && (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCard("new")}
              className={cn(
                "mt-3 grid w-full grid-cols-[44px_minmax(0,1fr)] items-center gap-3 rounded-2xl border-2 border-dashed p-3 text-left transition",
                selectedCard === "new"
                  ? "border-primary"
                  : "border-gray-300 hover:border-foreground/25",
              )}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-muted-foreground">
                <Plus className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm font-semibold">Add new card</div>
                <div className="text-xs text-muted-foreground">
                  Credit or debit
                </div>
              </div>
            </button>
          </div>

          <Button
            type="button"
            disabled={confirming}
            onClick={confirm}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-red-600 hover:bg-red-600/80 px-4 py-4 text-sm font-semibold text-white shadow-sm transition disabled:opacity-70 h-11 sm:h-12 md:h-12"
          >
            <Shield className="h-4 w-4" />
            {confirming ? "Activating..." : "Confirm & Activate Contract"}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            You will receive a confirmation email once processed
          </p>
        </aside>
      </main>
    </div>
  );
}
