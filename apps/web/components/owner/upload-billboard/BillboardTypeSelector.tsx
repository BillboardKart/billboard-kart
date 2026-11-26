"use client";

import Image, { type StaticImageData } from "next/image";
import imgHoarding from "@/public/bbe2da8bf93ca0b1373387f3158256ee6dc136b6.png";
// Extracted from "Owners-App Step 1/.Toggle Button.svg" (image0_624_3136).
import imgUnipole from "@/public/950883eebaf6bf714a744fded1d05a0a7d282faf.png";
import imgGantry from "@/public/26207b9e84fa5b49c2312417f250d1ea618c65b0.png";
import imgFacade from "@/public/b556b7b77bcf8d7a0fee50110626916aec4f55cb.png";
import { Field } from "./ui";

type BillboardTypeOption = {
  label: string;
  matches: string[];
  img: StaticImageData;
  imageClassName: string;
  imageFitClassName: string;
};

const BILLBOARD_TYPES: BillboardTypeOption[] = [
  {
    label: "Hoarding",
    matches: ["hoarding"],
    img: imgHoarding,
    imageClassName: "w-[55%]",
    imageFitClassName: "object-contain",
  },
  {
    label: "Unipole",
    matches: ["unipole", "uni pole", "uni-pole"],
    img: imgUnipole,
    // Figma: 209.391 x 172px at the 373px card width, cropped from the top.
    // The max-width keeps the label readable on narrow/mobile cards.
    imageClassName: "w-[209.391px] max-w-[70%]",
    imageFitClassName: "object-cover object-top",
  },
  {
    label: "Gantry",
    matches: ["gantry"],
    img: imgGantry,
    imageClassName: "w-[55%]",
    imageFitClassName: "object-contain",
  },
  {
    label: "Building Facade\n(Wall Branding)",
    matches: ["building facade", "facade", "wall branding"],
    img: imgFacade,
    imageClassName: "w-[55%]",
    imageFitClassName: "object-contain",
  },
];

export default function BillboardTypeSelector({
  value,
  onChange,
  options,
  isLoading = false,
  error,
}: {
  value: string;
  onChange: (code: string) => void;
  options: Array<{ id: string; name: string; code: string }>;
  isLoading?: boolean;
  error?: string;
}) {
  return (
    <Field label="Billboard type" required error={error}>
      <div
        data-error={!!error}
        className="bg-[#f5f5f5] rounded-[12px] p-[8px] grid grid-cols-1 sm:grid-cols-2 gap-[8px]"
      >
        {BILLBOARD_TYPES.flatMap((t) => {
          const backendType = options.find((option) => {
            const name = option.name.toLowerCase();
            const code = option.code.toLowerCase();
            return t.matches.some(
              (match) => name.includes(match) || code.includes(match),
            );
          });
          if (!backendType) return [];
          const active = value === backendType.code;
          return (
            <button
              key={t.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(backendType.code)}
              className={`text-left rounded-[10px] px-[16px] py-[8px] flex items-start justify-between gap-[8px] h-[188px] overflow-hidden ring-1 ring-inset transition-colors cursor-pointer disabled:pointer-events-none ${
                active
                  ? "bg-[#fff0ea] ring-[#f54900]"
                  : "bg-white ring-[#e5e5e5] hover:ring-[#d4d4d4]"
              }`}
            >
              <span
                className={`text-[16px] leading-6 whitespace-pre-line ${active ? "font-bold" : "font-normal"} text-[#0a0a0a]`}
              >
                {t.label}
              </span>
              <span
                className={`relative h-full shrink-0 ${t.imageClassName}`}
              >
                <Image
                  src={t.img}
                  alt={t.label}
                  fill
                  unoptimized
                  className={t.imageFitClassName}
                />
              </span>
            </button>
          );
        })}
        {options.length === 0 && !isLoading && (
          <p className="p-3 text-sm text-[#737373] sm:col-span-2">
            Billboard types are unavailable right now.
          </p>
        )}
      </div>
    </Field>
  );
}
