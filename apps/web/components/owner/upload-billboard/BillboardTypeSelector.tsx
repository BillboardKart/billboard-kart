"use client";

import Image from "next/image";
import imgHoarding from "@/public/bbe2da8bf93ca0b1373387f3158256ee6dc136b6.png";
import imgUnipole from "@/public/950883eebaf6bf714a744fded1d05a0a7d282faf.png";
import imgGantry from "@/public/26207b9e84fa5b49c2312417f250d1ea618c65b0.png";
import imgFacade from "@/public/b556b7b77bcf8d7a0fee50110626916aec4f55cb.png";
import { Field } from "./ui";

const BILLBOARD_TYPES = [
  { label: "Hoarding", img: imgHoarding },
  { label: "Unipole", img: imgUnipole },
  { label: "Gantry", img: imgGantry },
  { label: "Building Facade\n(Wall Branding)", img: imgFacade },
];

export default function BillboardTypeSelector({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (label: string) => void;
  error?: string;
}) {
  return (
    <Field label="Billboard type" required error={error}>
      <div
        data-error={!!error}
        className="bg-[#f5f5f5] rounded-[12px] p-[8px] grid grid-cols-1 sm:grid-cols-2 gap-[8px]"
      >
        {BILLBOARD_TYPES.map((t) => {
          const active = value === t.label;
          return (
            <button
              key={t.label}
              type="button"
              onClick={() => onChange(t.label)}
              className={`text-left rounded-[10px] border px-[16px] py-[8px] flex items-start justify-between gap-[8px] h-[184px] overflow-hidden transition-colors cursor-pointer disabled:pointer-events-none ${
                active
                  ? "bg-[#fff0ea] border-[#f54900]"
                  : "bg-white border-[#e5e5e5] hover:border-[#d4d4d4]"
              }`}
            >
              <span
                className={`text-[16px] whitespace-pre-line ${active ? "font-bold" : "font-medium"} text-[#0a0a0a]`}
              >
                {t.label}
              </span>
              <span className="relative h-full w-[55%] shrink-0">
                <Image
                  src={t.img}
                  alt={t.label}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </span>
            </button>
          );
        })}
      </div>
    </Field>
  );
}
