"use client";

import Link from "next/link";
import { useState } from "react";

type Option = "single" | "bulk";

function BackIcon() {
  return (
    <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="#0A0A0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
    </svg>
  );
}

function CheckBadge() {
  return (
    <div className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-full bg-[#f54900]">
      <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
        <path
          // d={svgPaths.p39be50}
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.33333"
        />
      </svg>
    </div>
  );
}

function SingleIcon() {
  return (
    <svg fill="none" height="28" viewBox="0 0 28 28" width="28">
      <path
        // d={svgPaths.pf321200}
        stroke="#F54900"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.33333"
      />
      <path
        // d={svgPaths.p13443200}
        stroke="#F54900"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.33333"
      />
    </svg>
  );
}

function BulkIcon() {
  return (
    <svg fill="none" height="28" viewBox="0 0 28 28" width="28">
      <path
        d="M14 15.166V24.4993"
        stroke="#F54900"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.33333"
      />
      <path
        // d={svgPaths.p189546e8}
        stroke="#F54900"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.33333"
      />
      <path
        // d={svgPaths.p4a19780}
        stroke="#F54900"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.33333"
      />
    </svg>
  );
}

interface UploadBillboardsSelectorProps {
  onContinue?: () => void;
}

interface CardProps {
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function OptionCard({
  selected,
  onSelect,
  icon,
  title,
  description,
}: CardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`relative flex flex-1 min-w-px flex-col items-start gap-4 rounded-md p-6 text-left transition-colors duration-200 ${
        selected
          ? "bg-white border border-[#f5f5f5] shadow-sm"
          : "bg-[#f5f5f5] border border-transparent hover:bg-[#efefef] cursor-pointer disabled:pointer-events-none"
      }`}
    >
      {selected && <CheckBadge />}
      <div className="flex size-14 items-center justify-center rounded-2xl bg-[rgba(245,73,0,0.12)]">
        {icon}
      </div>
      <div className="flex flex-col items-start">
        <p className="text-[18px] leading-7 text-[#0a0a0a]">{title}</p>
        <p className="text-[14px] leading-[22.75px] text-[#737373]">
          {description}
        </p>
      </div>
    </button>
  );
}

export default function UploadBillboardsSelector({
  onContinue,
}: UploadBillboardsSelectorProps) {
  const [selected, setSelected] = useState<Option>("single");

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white px-12 pt-12 pb-32">
      <div className="flex w-200 max-w-full flex-col gap-8">
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full hover:bg-[#f5f5f5] cursor-pointer disabled:pointer-events-none"
          >
            <Link href={"/owner/my-inventory"}>
              <BackIcon />
            </Link>
          </button>
          <h1 className="text-[20px] leading-7 text-[#0a0a0a]">
            Add Billboard
          </h1>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full hover:bg-[#f5f5f5]"
          >
            {/** <HelpIcon /> */}
          </button>
        </div>

        <p className="w-full text-center text-[16px] leading-6 text-[#737373]">
          Choose how you&apos;d like to add your billboard inventory.
        </p>

        {/* Options */}
        <div className="flex w-full items-stretch justify-center gap-6">
          <OptionCard
            selected={selected === "single"}
            onSelect={() => setSelected("single")}
            icon={<SingleIcon />}
            title="Add one billboard manually"
            description="Best for a single site. Walk through billboard details, photos, and pricing step by step."
          />
          <OptionCard
            selected={selected === "bulk"}
            onSelect={() => setSelected("bulk")}
            icon={<BulkIcon />}
            title="Bulk upload billboards"
            description="Best for many sites at once. Upload a CSV or XLSX spreadsheet and add images afterward."
          />
        </div>

        {/* Contextual note */}
        <div className="flex w-full items-start gap-4 rounded-2xl bg-[#f5f5f5] p-6">
          <div className="pt-0.5">{/** <InfoIcon /> */}</div>
          <p className="text-[14px] leading-[22.75px] text-[#737373]">
            {selected === "single"
              ? "Manually added billboards let you complete every detail up front — images, documents, pricing, and media specs — before publishing."
              : "Bulk-uploaded billboards are created as drafts first. They become ready for review once images, documents, pricing, and media specs are complete."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col items-center gap-4">
          <button
            type="button"
            onClick={onContinue}
            className="flex h-12 w-100 max-w-full items-center justify-center rounded-sm bg-[#f54900] px-4 text-[16px] text-white shadow-sm transition-opacity hover:opacity-90 cursor-pointer disabled:pointer-events-none"
          >
            Continue
          </button>
          <Link href={"/owner/my-inventory"}>
            <button
              type="button"
              className="text-[14px] leading-5 text-[#737373] hover:text-[#0a0a0a] cursor-pointer disabled:pointer-events-none"
            >
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
