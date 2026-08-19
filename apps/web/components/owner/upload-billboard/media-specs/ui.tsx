"use client";

import { useState, ReactNode } from "react";

export function Input({
  label,
  placeholder,
  value,
  optional,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[6px] flex-1 min-w-0">
      <div className="flex items-center gap-[6px]">
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[12px] text-[#525252] leading-[16px]"
        >
          {label}
        </span>
        {optional && (
          <span
            className="bg-[#f2f2f2] text-[#737373] text-[12px] px-[6px] py-[2px] rounded-[6px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Optional
          </span>
        )}
      </div>
      <div className="bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[48px] rounded-[8px] relative">
        <div className="absolute inset-0 border border-[#d4d4d4] rounded-[8px] pointer-events-none" />
        <div className="flex items-center h-full px-[16px]">
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[14px] text-[#737373] flex-1"
          >
            {value || placeholder || ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export function SectionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] rounded-[16px] relative ${className}`}
    >
      <div className="absolute inset-0 border border-[#e5e5e5] rounded-[16px] pointer-events-none" />
      <div className="p-[24px] flex flex-col gap-[20px]">{children}</div>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{ fontFamily: "Inter, sans-serif" }}
      className="text-[16px] text-[#0a0a0a] leading-[24px] font-normal"
    >
      {children}
    </h2>
  );
}

export function SectionSubtitle({ children }: { children: ReactNode }) {
  return (
    <p
      style={{ fontFamily: "Inter, sans-serif" }}
      className="text-[12px] text-[#737373] leading-[16px]"
    >
      {children}
    </p>
  );
}

export type ChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};
export function Chip({ label, active, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: "Inter, sans-serif" }}
      className={`h-[30px] px-[12px] rounded-[8px] text-[14px] font-medium border transition-colors cursor-pointer ${
        active
          ? "bg-[#fff0ea] border-[#f54900] text-[#0a0a0a] font-semibold"
          : "bg-transparent border-[#e5e5e5] text-[#0a0a0a]"
      }`}
    >
      {label}
    </button>
  );
}

export function Toggle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#f5f5f5] rounded-[12px] px-[8px] py-[4px] flex gap-[8px] items-center flex-wrap ${className}`}
    >
      {children}
    </div>
  );
}

export function Switch({ on }: { on?: boolean }) {
  return (
    <div
      className={`w-[32px] h-[18px] rounded-full relative shadow-[0px_1px_1px_rgba(0,0,0,0.05)] ${on ? "bg-[#171717]" : "bg-[#e5e5e5]"}`}
    >
      <div
        className={`absolute top-[1px] w-[16px] h-[16px] bg-white rounded-full transition-all ${on ? "left-[15px]" : "left-[1px]"}`}
      />
    </div>
  );
}

export function SwitchRow({
  icon,
  label,
  on,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  on?: boolean;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className="w-full text-left cursor-pointer">
      <div className="bg-[#fafafa] rounded-[12px] relative">
        <div className="absolute inset-0 border border-[#e5e5e5] rounded-[12px] pointer-events-none" />
        <div className="flex items-center justify-between px-[13px] py-[11px]">
          <div className="flex items-center gap-[8px]">
            {icon}
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="text-[14px] text-[#262626] leading-[20px]"
            >
              {label}
            </span>
          </div>
          <Switch on={on} />
        </div>
      </div>
    </div>
  );
}

export function Select({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[6px] flex-1 min-w-0">
      <span
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-[12px] text-[#525252] leading-[16px]"
      >
        {label}
      </span>
      <div className="bg-[#fafafa] h-[48px] rounded-[8px] relative">
        <div className="absolute inset-0 border border-[#d4d4d4] rounded-[8px] pointer-events-none" />
        <div className="flex items-center justify-between h-full px-[13px]">
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[14px] text-[#0a0a0a]"
          >
            {value}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            opacity="0.5"
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
      </div>
    </div>
  );
}

export function useMultiSelect(initial: string[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set(initial));
  const toggle = (v: string) =>
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(v)) n.delete(v);
      else n.add(v);
      return n;
    });
  return { selected, toggle };
}
