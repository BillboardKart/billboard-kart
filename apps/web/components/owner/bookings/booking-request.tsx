"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  CalendarRange,
  Check,
  Clock4,
  IndianRupee,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Printer,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RequestStatus = "pending" | "accepted" | "declined";

const bookingDetails = [
  { icon: CalendarRange, label: "Requested dates", value: "Mar 1 – May 31" },
  { icon: Clock4, label: "Duration", value: "3 months" },
  { icon: IndianRupee, label: "Monthly rate", value: "₹1,20,000/mo" },
  { icon: Printer, label: "Installation", value: "₹15,000" },
] as const;

function SectionLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      className="text-xs font-semibold uppercase leading-4 tracking-[0.05em] text-[var(--muted)]"
      id={id}
    >
      {children}
    </h2>
  );
}

function ContactRow({
  children,
  icon: Icon,
  href,
}: {
  children: ReactNode;
  icon: typeof Mail;
  href: string;
}) {
  return (
    <a
      className="group flex min-h-5 w-fit items-center gap-3 rounded-sm text-sm leading-5 text-[var(--foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
      href={href}
    >
      <Icon
        aria-hidden="true"
        className="size-4 text-[var(--muted)] transition-colors group-hover:text-[var(--foreground)]"
        strokeWidth={1.5}
      />
      <span>{children}</span>
    </a>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: (typeof bookingDetails)[number]) {
  return (
    <div className="flex min-h-5 items-center justify-between gap-5 text-sm leading-5">
      <div className="flex min-w-0 items-center gap-3 text-[var(--muted)]">
        <Icon
          aria-hidden="true"
          className="size-4 shrink-0"
          strokeWidth={1.5}
        />
        <span>{label}</span>
      </div>
      <span className="shrink-0 font-medium text-[var(--foreground)]">
        {value}
      </span>
    </div>
  );
}

export function BookingRequest() {
  const [status, setStatus] = useState<RequestStatus>("pending");

  const respondToRequest = (nextStatus: Exclude<RequestStatus, "pending">) => {
    setStatus(nextStatus);

    if (nextStatus === "accepted") {
      toast.success("Booking request accepted", {
        description:
          "Acme Advertising Co. can now be contacted to confirm the campaign.",
      });
      return;
    }

    toast("Booking request declined", {
      description: "The advertiser will be notified of your decision.",
    });
  };

  const statusLabel =
    status === "accepted"
      ? "Accepted"
      : status === "declined"
        ? "Declined"
        : "Pending";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:var(--background-translucent)] backdrop-blur-sm">
        <div className="mx-auto flex min-h-[69px] w-full max-w-[800px] items-center gap-4 px-4 py-4 sm:px-8">
          <button
            aria-label="Go back"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:size-9"
            onClick={() => window.history.back()}
            type="button"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-5"
              strokeWidth={1.75}
            />
          </button>

          <Image
            alt="Billboard Kart"
            className="size-10 shrink-0"
            height={40}
            priority
            src="/images/billboardkart-mark.svg"
            width={40}
          />

          <h1 className="truncate text-lg font-semibold leading-7 tracking-[-0.025em]">
            Booking Request
          </h1>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[800px] flex-col gap-6 px-4 pb-36 pt-6 sm:gap-8 sm:px-8 sm:pb-40 sm:pt-8">
        <section
          aria-labelledby="advertiser-title"
          className="rounded-2xl bg-[var(--card)] p-5 shadow-[var(--shadow-card)] sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--surface-muted)]">
                <Building2
                  aria-hidden="true"
                  className="size-6"
                  strokeWidth={1.75}
                />
              </div>
              <div className="min-w-0">
                <h2
                  className="truncate text-base font-semibold leading-6 tracking-[-0.025em]"
                  id="advertiser-title"
                >
                  Acme Advertising Co.
                </h2>
                <p className="text-sm leading-5 text-[var(--muted)]">
                  Advertiser
                </p>
              </div>
            </div>
            <Badge
              aria-live="polite"
              // size="md"
              // tone={
              //   status === "accepted"
              //     ? "accepted"
              //     : status === "declined"
              //       ? "declined"
              //       : "neutral"
              //}
            >
              {statusLabel}
            </Badge>
          </div>

          <div className="my-4 h-px bg-[var(--border)]" />

          <div className="flex flex-col gap-3">
            <ContactRow href="mailto:bookings@acmeads.com" icon={Mail}>
              bookings@acmeads.com
            </ContactRow>
            <ContactRow href="tel:+919228812992" icon={Phone}>
              +91 9228812992
            </ContactRow>
          </div>
        </section>

        <section
          aria-labelledby="billboard-section-title"
          className="flex flex-col gap-3"
        >
          <SectionLabel id="billboard-section-title">Billboard</SectionLabel>
          <article className="overflow-hidden rounded-2xl bg-[var(--card)] shadow-[var(--shadow-card)]">
            <div className="relative h-44 w-full overflow-hidden sm:h-56">
              <Image
                alt="Digital billboards illuminating MG Road at night"
                className="object-cover"
                fill
                priority
                sizes="(min-width: 800px) 736px, 100vw"
                src="/images/mg-road-hoarding.jpeg"
              />
            </div>

            <div className="flex flex-col gap-3 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-4">
              <div className="flex flex-col gap-1">
                <h2
                  className="text-lg font-semibold leading-7 tracking-[-0.025em]"
                  id="billboard-title"
                >
                  MG Road Hoarding #07
                </h2>
                <p className="flex items-center gap-2 text-sm leading-5 text-[var(--muted)]">
                  <MapPin
                    aria-hidden="true"
                    className="size-4 shrink-0"
                    strokeWidth={1.5}
                  />
                  MG Road, Bengaluru
                </p>
              </div>
              <div
                className="flex flex-wrap gap-2"
                aria-label="Billboard features"
              >
                <Badge>Digital LED</Badge>
                <Badge>48 × 14 ft</Badge>
                <Badge>Illuminated</Badge>
              </div>
            </div>
          </article>
        </section>

        <section
          aria-labelledby="booking-details-title"
          className="flex flex-col gap-3"
        >
          <SectionLabel id="booking-details-title">
            Booking details
          </SectionLabel>
          <div className="rounded-2xl bg-[var(--card)] p-5 shadow-[var(--shadow-card)] sm:p-6">
            <div className="flex flex-col gap-4">
              {bookingDetails.map((detail) => (
                <DetailRow {...detail} key={detail.label} />
              ))}
              <div className="h-px bg-[var(--border)]" />
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-semibold leading-6">
                  Total campaign value
                </span>
                <strong className="shrink-0 text-2xl font-bold leading-8 tracking-[-0.025em]">
                  ₹3,75,000
                </strong>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="message-title"
          className="flex flex-col gap-3"
        >
          <SectionLabel id="message-title">
            Message from advertiser
          </SectionLabel>
          <div className="flex items-start gap-4 rounded-2xl bg-[var(--message-surface)] p-5 shadow-[var(--shadow-card)] sm:p-6">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--card)]">
              <MessageSquare
                aria-hidden="true"
                className="size-4 text-[var(--muted)]"
                strokeWidth={1.5}
              />
            </div>
            <p className="min-w-0 text-sm leading-6">
              Hi Abhinav, we&apos;re launching a spring retail campaign and this
              location fits our target audience perfectly. Happy to discuss
              creative specs and scheduling. Looking forward to working with
              you.
            </p>
          </div>
        </section>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border)] bg-[color:var(--background-translucent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[800px] gap-3 px-4 py-4 sm:gap-4 sm:px-8">
          <Button
            aria-pressed={status === "declined"}
            className={cn(
              "flex-1",
              status === "declined" && "bg-[var(--surface-muted)]",
            )}
            onClick={() => respondToRequest("declined")}
            variant="outline"
          >
            <X aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
            Decline
          </Button>
          <Button
            aria-pressed={status === "accepted"}
            className="flex-1"
            onClick={() => respondToRequest("accepted")}
            variant="secondary"
          >
            <Check
              aria-hidden="true"
              className="size-[18px]"
              strokeWidth={1.75}
            />
            Accept
          </Button>
        </div>
      </footer>

      <Toaster closeButton position="top-center" richColors />
    </div>
  );
}
