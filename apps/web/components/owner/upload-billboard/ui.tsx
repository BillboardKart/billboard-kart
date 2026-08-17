"use client";

import { type ReactNode } from "react";
import svgPaths from "@/public/svg-oqrko3yzyk";

const ERROR = "#e7000b";

export function ErrorText({ message }: { message: string }) {
  return (
    <div className="flex gap-1.5 items-center">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="shrink-0"
      >
        <path
          d={svgPaths.pc3ebf00}
          stroke={ERROR}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.16667"
        />
        <path
          d="M7 4.66667V7"
          stroke={ERROR}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.16667"
        />
        <path
          d="M7 9.33333H7.00583"
          stroke={ERROR}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.16667"
        />
      </svg>
      <p className="text-[14px] leading-5 text-[#e7000b]">{message}</p>
    </div>
  );
}

export function Field({
  label,
  hint,
  required,
  optional,
  error,
  children,
  className = "",
}: {
  label: ReactNode;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[14px] leading-5 text-[#0a0a0a]">
            {label}
            {required && <span className="text-[#e7000b]"> *</span>}
          </span>
          {optional && (
            <span className="bg-[#f2f2f2] text-[#737373] text-[12px] rounded-[6px] px-2 py-1">
              Optional
            </span>
          )}
        </div>
        {hint && (
          <p className="text-[14px] leading-[20px] text-[#737373]">{hint}</p>
        )}
      </div>
      {children}
      {error && <ErrorText message={error} />}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  invalid,
  prefix,
  rounded = "rounded-[12px]",
  boxClass = "h-[48px] px-[12px]",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  invalid?: boolean;
  prefix?: string;
  rounded?: string;
  boxClass?: string;
}) {
  return (
    <div
      className={`flex items-center gap-[4px] ${boxClass} w-full bg-[#f5f5f5] ${rounded} border shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors ${
        invalid
          ? "border-[#e7000b]"
          : "border-[#e5e5e5] focus-within:border-[#f54900]"
      }`}
    >
      {prefix && <span className="text-[14px] text-[#666]">{prefix}</span>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none text-[14px] text-[#0a0a0a] placeholder:text-[#737373]"
      />
    </div>
  );
}

export function Segmented({
  options,
  value,
  onChange,
  wrap,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  wrap?: boolean;
}) {
  return (
    <div
      className={`bg-[#f5f5f5] rounded-[12px] px-[8px] py-[4px] flex gap-[8px] ${wrap ? "flex-wrap" : ""} ${wrap ? "w-full" : "w-fit"}`}
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`h-[29px] px-[12px] rounded-[8px] border text-[14px] whitespace-nowrap transition-colors cursor-pointer disabled:pointer-events-none ${
              active
                ? "bg-[#fff0ea] border-[#f54900] font-bold text-[#0a0a0a]"
                : "border-[#e5e5e5] font-medium text-[#0a0a0a] hover:bg-white"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
