"use client";

import { RefObject } from "react";
import Image from "next/image";
import svgPaths from "@/public/svg-oqrko3yzyk";
import { Field } from "./ui";

export default function PhotoUploadSection({
  photos,
  onRemove,
  error,
  fileRef,
  onAddClick,
  onFilesChange,
}: {
  photos: string[];
  onRemove: (idx: number) => void;
  error?: string;
  fileRef: RefObject<HTMLInputElement | null>;
  onAddClick: () => void;
  onFilesChange: (files: FileList | null) => void;
}) {
  return (
    <Field label="Photos" required error={error}>
      <div data-error={!!error} className="flex flex-col gap-[12px]">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onFilesChange(e.target.files)}
        />
        <button
          type="button"
          onClick={onAddClick}
          className="w-full rounded-[16px] border-2 border-dashed border-[#e5e5e5] hover:border-[#f54900] transition-colors flex flex-col items-center justify-center gap-[8px] p-[50px] cursor-pointer disabled:pointer-events-none"
        >
          <span className="size-[48px] rounded-full bg-[#f5f5f5] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2.5V12.5"
                stroke="#737373"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.66667"
              />
              <path
                d={svgPaths.p320a7e80}
                stroke="#737373"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.66667"
              />
              <path
                d={svgPaths.p2f601280}
                stroke="#737373"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.66667"
              />
            </svg>
          </span>
          <span className="text-[14px] text-[#0a0a0a]">Upload photos</span>
          <span className="text-[12px] text-[#737373]">
            Add at least 3 photos
          </span>
        </button>

        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-[12px]">
            {photos.map((src, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-[12px] border border-[#e5e5e5] overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Billboard photo ${idx + 1}`}
                  fill
                  unoptimized
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemove(idx)}
                  className="absolute top-[7px] right-[7px] size-[24px] rounded-full bg-[rgba(10,10,10,0.7)] flex items-center justify-center"
                  aria-label="Remove photo"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M10.5 3.5L3.5 10.5"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.16667"
                    />
                    <path
                      d="M3.5 3.5L10.5 10.5"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.16667"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={onAddClick}
              className="aspect-square rounded-[12px] border-2 border-dashed border-[#e5e5e5] hover:border-[#f54900] transition-colors flex items-center justify-center"
              aria-label="Add photo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19"
                  stroke="#737373"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M12 5V19"
                  stroke="#737373"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </Field>
  );
}
