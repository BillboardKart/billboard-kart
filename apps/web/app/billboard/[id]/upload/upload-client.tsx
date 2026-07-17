"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Edit3,
  FileImage,
  Film,
  Folder,
  MapPin,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { TopNav } from "@/components/app/TopNav";
// import { Stepper } from "@/components/app/Stepper";
import { getBillboard } from "@/lib/billboards";
import { useSelection } from "@/lib/selection";
import { Button } from "@/components/ui/button";

// const STEPS = [
//   { label: "Select Billboards" },
//   { label: "Choose Dates" },
//   { label: "Upload Artwork" },
//   { label: "Review Contract" },
// ];

const TAX_RATE = 0.085;
const SERVICE_FEE = 120;

const staticPhoto =
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80";

export default function UploadClient() {
  const router = useRouter();
  const params = useParams(); // 2. Grab the dynamic parameters from the URL path
  const urlBillboardId = params.id as string; // This will equal 'xyz-billboard'

  const selection = useSelection();
  const inputRef = useRef<HTMLInputElement>(null);

  const items =
    selection.items.length > 0
      ? selection.items
      : [{ id: urlBillboardId, startDate: "", endDate: "" }];

  const billboards = items
    .map((it) => getBillboard(it.id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const subtotal = billboards.reduce((sum, b) => sum + b.weeklyPrice, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + (billboards.length ? SERVICE_FEE : 0);

  const [file, setFile] = useState<{ name: string; size: number } | null>(
    selection.artworkName
      ? { name: selection.artworkName, size: 4_200_000 }
      : null,
  );

  const onFile = (f: File) => {
    setFile({ name: f.name, size: f.size });
    selection.setArtwork(f.name);
  };

  const goReview = () => {
    if (!file) {
      setFile({ name: "summer_campaign.jpg", size: 4_200_000 });
      selection.setArtwork("summer_campaign.jpg");
    }
    router.push(`/billboard/${urlBillboardId}/review`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      {/*
      <div className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-350 px-4 py-6 sm:px-6 lg:px-10">
          <Stepper steps={STEPS} current={3} />
        </div>
      </div>
      */}
      <main className="mx-auto grid w-full max-w-350 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-10">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Upload Your Artwork
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Make sure your file matches the billboard dimensions and specs
          </p>

          {/* Selected billboards */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                Selected Billboards ({billboards.length})
              </h2>
              <Link
                href="/browse"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80"
              >
                <Edit3 className="h-3.5 w-3.5" /> Edit
              </Link>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {billboards.map((b) => (
                <div
                  key={b.id}
                  className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border bg-card p-3"
                >
                  <div className="relative h-14 w-16 overflow-hidden rounded-xl">
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">
                      {b.name}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{b.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload dropzone */}
          <label
            htmlFor="artwork-input"
            className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border bg-surface/50 px-6 py-14 text-center transition hover:border-primary/50 hover:bg-surface"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <UploadCloud className="h-6 w-6" />
            </span>
            <div>
              <div className="text-base font-semibold">
                Drag &amp; drop or click to upload
              </div>
              <div className="text-xs text-muted-foreground">
                JPG, PNG, MP4 — Max 50MB
              </div>
            </div>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
                <FileImage className="h-3 w-3" /> JPG
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
                <FileImage className="h-3 w-3" /> PNG
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
                <Film className="h-3 w-3" /> MP4
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                inputRef.current?.click();
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium hover:border-foreground/20"
            >
              <Folder className="h-3.5 w-3.5" /> Browse Files
            </button>
            <input
              id="artwork-input"
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,video/mp4"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFile(f);
              }}
            />
          </label>

          {/* Preview */}
          {file && (
            <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-primary" /> Preview
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                  <CheckCircle2 className="h-3 w-3" /> Looks good
                </span>
              </div>
              <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                <Image
                  src={staticPhoto}
                  alt="Artwork preview"
                  fill
                  priority // Loads the top preview asset faster
                  sizes="(max-w-1400px) 100vw, 1000px"
                  className="object-cover"
                />
                <div className="absolute left-4 bottom-4 z-10 rounded-lg bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur">
                  <div className="font-semibold">
                    {billboards[0]?.name ?? "Preview"}
                  </div>
                  <div className="text-white/70">{file.name}</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <FileImage className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{file.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Uploaded just now
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {(file.size / 1_000_000).toFixed(1)} MB
                  <button
                    type="button"
                    aria-label="Remove"
                    onClick={() => {
                      setFile(null);
                      selection.setArtwork(null);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border transition hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Guidelines */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">Design Guidelines</h3>
                <p className="text-xs text-muted-foreground">
                  Specs for best quality
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {[
                { t: "Resolution", d: "Minimum 300 DPI at full size" },
                {
                  t: "Aspect Ratio",
                  d: "Match billboard ratio (e.g. 7:24 for 14×48 ft)",
                },
                { t: "File Size", d: "Max 50MB per file — RGB color mode" },
              ].map((g) => (
                <li key={g.t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    ✓
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{g.t}</div>
                    <div className="text-xs text-muted-foreground">{g.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl border border-gray-300 bg-amber-50/20 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium">
                {billboards.length} Billboards
              </span>
            </div>

            <div className="mt-4 space-y-3 border-t border-border pt-4">
              {billboards.map((b) => (
                <div
                  key={b.id}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="flex min-w-0 items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">
                        {b.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {b.city} · {b.size}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-semibold">
                    ${b.weeklyPrice.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/60 p-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Rental Period
                  </div>
                  <div className="text-sm font-semibold">
                    Mar 12 – Mar 26, 2025
                  </div>
                </div>
              </div>
              <span className="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] font-medium">
                14 days
              </span>
            </div>

            <dl className="mt-4 space-y-2 text-sm">
              <SummaryRow
                label="Subtotal"
                value={`$${subtotal.toLocaleString()}.00`}
              />
              <SummaryRow
                label="Tax (8.5%)"
                value={`$${tax.toLocaleString()}.00`}
              />
              <SummaryRow
                label="Service fee"
                value={`$${SERVICE_FEE.toLocaleString()}.00`}
              />
              <div className="my-2 h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-base font-bold">Total</span>
                <span className="text-lg font-bold text-red-600">
                  ${total.toLocaleString()}.00
                </span>
              </div>
            </dl>

            <Button
              type="button"
              onClick={goReview}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-red-600 hover:bg-red-600/80 px-4 py-3 text-sm font-semibold text-white transition h-11 sm:h-12 md:h-12"
            >
              Continue to Contract <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              By continuing you agree to our content policy
            </p>
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Secure checkout · Cancel anytime before approval
          </p>
        </aside>
      </main>
    </div>
  );
}

// Extracted internal subcomponent for code cleanliness & readability
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
