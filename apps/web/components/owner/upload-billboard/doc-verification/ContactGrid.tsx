"use client";

import { Mail, Phone, User } from "lucide-react";

function FieldInput({
  icon: Icon,
  placeholder,
  className = "",
}: {
  icon: React.ElementType;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[40px] rounded-[8px] relative">
        <div className="absolute inset-0 border border-[#d4d4d4] rounded-[8px] pointer-events-none" />
        <div className="flex items-center h-full px-[12px] gap-[8px]">
          <Icon className="size-4 text-[#737373] shrink-0" />
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[14px] text-[#737373] flex-1"
          >
            {placeholder}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ContactGrid() {
  return (
    <div className="flex flex-col gap-[16px] w-full">
      <div className="flex gap-[16px]">
        <div className="flex flex-col gap-[8px] flex-1 min-w-0">
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[14px] text-[#0a0a0a] leading-[20px]"
          >
            Contact person
          </span>
          <FieldInput icon={User} placeholder="Full name" />
        </div>
        <div className="flex flex-col gap-[8px] flex-1 min-w-0">
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[14px] text-[#0a0a0a] leading-[20px]"
          >
            Phone / WhatsApp
          </span>
          <FieldInput icon={Phone} placeholder="+91 98765 43210" />
        </div>
      </div>
      <div className="flex flex-col gap-[8px] w-full">
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[14px] text-[#0a0a0a] leading-[20px]"
        >
          Email
        </span>
        <FieldInput icon={Mail} placeholder="you@company.com" />
      </div>
      <span
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-[12px] text-[#737373] leading-[16px] px-[4px]"
      >
        Your information is used only for listing verification and booking
        communications.
      </span>
    </div>
  );
}
