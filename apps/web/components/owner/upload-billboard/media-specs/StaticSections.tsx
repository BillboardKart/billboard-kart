"use client";

import { useState } from "react";
import { useBillboardFormStore } from "@/stores/billboard-form-store";
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

  const mediaSpecs = useBillboardFormStore((s) => s.form.mediaSpecs);
  const updateField = useBillboardFormStore((s) => s.updateField);

  const safeMarginBleed = (mediaSpecs.safeMarginBleed as string) ?? "";
  const minimumResolutionDpi = (mediaSpecs.minimumResolutionDpi as string) ?? "";

  const setMediaSpec = (key: string, value: unknown) =>
    updateField("mediaSpecs", { ...mediaSpecs, [key]: value });

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
      <div className="flex gap-4 items-end">
        <Input
          label="Safe margin / bleed requirement"
          value={safeMarginBleed}
          onChange={(v) => setMediaSpec("safeMarginBleed", v)}
          placeholder="e.g. 3 inches bleed on all sides"
        />
        <Input
          label="Minimum resolution / DPI"
          value={minimumResolutionDpi}
          onChange={(v) => setMediaSpec("minimumResolutionDpi", v)}
          placeholder="e.g. 150"
          optional
        />
      </div>
      <p
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-xs text-[#737373]"
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

  const mediaSpecs = useBillboardFormStore((s) => s.form.mediaSpecs);
  const updateField = useBillboardFormStore((s) => s.updateField);

  const setMediaSpec = (key: string, value: unknown) =>
    updateField("mediaSpecs", { ...mediaSpecs, [key]: value });

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
            onClick={() => {
              setActiveMaterial(m);
              setMediaSpec("printMaterial", m);
            }}
          />
        ))}
      </Toggle>
      {activeMaterial === "Other" && (
        <div className="relative">
          <p
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-sm text-[#0a0a0a] mb-2"
          >
            Other Materials
          </p>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="w-full bg-[#fafafa] h-12 rounded-lg relative text-left cursor-pointer"
          >
            <div className="absolute inset-0 border border-[#d4d4d4] rounded-lg pointer-events-none" />
            <div className="flex items-center justify-between h-full px-3">
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className={`text-sm ${selected ? "text-[#0a0a0a]" : "text-[#737373]"}`}
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
              className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-[#e5e5e5] rounded-lg shadow-lg overflow-hidden"
              style={{ maxHeight: "320px", overflowY: "auto" }}
            >
              {["Flex", "Vinyl", "Backlit flex", "Canvas", "Mesh"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelected(opt);
                    setMediaSpec("otherMaterial", opt);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 text-sm hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}

function AcceptedArtworkFormat() {
  const mediaSpecs = useBillboardFormStore((s) => s.form.mediaSpecs);
  const updateField = useBillboardFormStore((s) => s.updateField);

  const safeMarginBleed = (mediaSpecs.safeMarginBleed as string) ?? "";
  const minimumResolutionDpi = (mediaSpecs.minimumResolutionDpi as string) ?? "";

  const setMediaSpec = (key: string, value: unknown) =>
    updateField("mediaSpecs", { ...mediaSpecs, [key]: value });

  return (
    <SectionCard>
      <SectionTitle>Accepted Artwork Format</SectionTitle>
      <div className="flex gap-4 items-end">
        <Input
          label="Safe margin / bleed requirement"
          value={safeMarginBleed}
          onChange={(v) => setMediaSpec("safeMarginBleed", v)}
          placeholder="e.g. 3 inches bleed on all sides"
        />
        <Input
          label="Minimum resolution / DPI"
          value={minimumResolutionDpi}
          onChange={(v) => setMediaSpec("minimumResolutionDpi", v)}
          placeholder="e.g. 150"
          optional
        />
      </div>
      <p
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-xs text-[#737373]"
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
