"use client";

import { useState } from "react";
import {
  SectionCard,
  SectionTitle,
  SectionSubtitle,
  Input,
  Chip,
  Toggle,
} from "./ui";

function AcceptedArtworkFormats() {
  const [activeFormat, setActiveFormat] = useState("CDR");
  const fmts = ["CDR", "JPEG", "PNG", "PDF", "AI", "EPS"];
  return (
    <SectionCard>
      <div>
        <SectionTitle>Accepted Artwork Formats</SectionTitle>
        <SectionSubtitle>
          Select all formats your billboard accepts from advertisers.
        </SectionSubtitle>
      </div>
      <Toggle className="w-fit">
        {fmts.map((f) => (
          <Chip
            key={f}
            label={f}
            active={activeFormat === f}
            onClick={() => setActiveFormat(f)}
          />
        ))}
      </Toggle>
      <div className="flex gap-[16px] items-end">
        <Input
          label="Safe margin / bleed requirement"
          value="3 inches bleed on all sides"
        />
        <Input
          label="Minimum resolution / DPI"
          placeholder="e.g. 150"
          optional
        />
      </div>
      <p
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-[12px] text-[#737373]"
      >
        Leave blank if not specified
      </p>
    </SectionCard>
  );
}

function PrintMaterial() {
  const [activeMaterial, setActiveMaterial] = useState<string>("Other");
  const mats = ["Flex", "Vinyl", "Backlit flex", "Other"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SectionCard>
      <div>
        <SectionTitle>Print Material</SectionTitle>
        <SectionSubtitle>
          Select all materials this billboard supports.
        </SectionSubtitle>
      </div>
      <Toggle className="w-fit">
        {mats.map((m) => (
          <Chip
            key={m}
            label={m}
            active={activeMaterial === m}
            onClick={() => setActiveMaterial(m)}
          />
        ))}
      </Toggle>
      {activeMaterial === "Other" && (
        <div className="relative">
          <p
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[14px] text-[#0a0a0a] mb-[8px]"
          >
            Other Materials
          </p>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="w-full bg-[#fafafa] h-[48px] rounded-[8px] relative text-left cursor-pointer"
          >
            <div className="absolute inset-0 border border-[#d4d4d4] rounded-[8px] pointer-events-none" />
            <div className="flex items-center justify-between h-full px-[13px]">
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className={`text-[14px] ${selected ? "text-[#0a0a0a]" : "text-[#737373]"}`}
              >
                {selected ?? "Select"}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.15s ease",
                  opacity: 0.5,
                }}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="#0A0A0A"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
          {dropdownOpen && (
            <div
              className="absolute z-50 left-0 right-0 top-full mt-[4px]"
              style={{ maxHeight: "320px", overflowY: "auto" }}
            >
              {/**
              <DropdownMenuExpanded
                selected={selected}
                onSelect={(label) => {
                  setSelected(label);
                  setDropdownOpen(false);
                }}
              />
              */}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}

function AcceptedArtworkFormat() {
  return (
    <SectionCard>
      <SectionTitle>Accepted Artwork Format</SectionTitle>
      <div className="flex gap-[16px] items-end">
        <Input
          label="Safe margin / bleed requirement"
          value="3 inches bleed on all sides"
        />
        <Input
          label="Minimum resolution / DPI"
          placeholder="e.g. 150"
          optional
        />
      </div>
      <p
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-[12px] text-[#737373]"
      >
        Leave blank if not specified
      </p>
    </SectionCard>
  );
}

export default function StaticSections() {
  return (
    <>
      <AcceptedArtworkFormats />
      <PrintMaterial />
      <AcceptedArtworkFormat />
    </>
  );
}
