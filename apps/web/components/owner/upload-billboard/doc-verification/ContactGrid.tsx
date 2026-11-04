"use client";

import { Mail, Phone, User } from "lucide-react";

function FieldInput({
  icon: Icon,
  placeholder,
  value,
  onValueChangeAction,
  className = "",
}: {
  icon: React.ElementType;
  placeholder: string;
  value: string;
  onValueChangeAction: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-10 rounded-lg relative">
        <div className="absolute inset-0 border border-[#d4d4d4] rounded-lg pointer-events-none" />
        <div className="flex items-center h-full px-3 gap-2">
          <Icon className="size-4 text-[#737373] shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => onValueChangeAction(e.target.value)}
            placeholder={placeholder}
            className="relative z-10 flex-1 bg-transparent text-sm text-[#0a0a0a] font-['Inter',sans-serif] outline-none placeholder:text-[#737373]"
          />
        </div>
      </div>
    </div>
  );
}

export default function ContactGrid({
  contactPersonName,
  onContactPersonNameChangeAction,
  contactPhone,
  onContactPhoneChangeAction,
  contactEmail,
  onContactEmailChangeAction,
}: {
  contactPersonName: string;
  onContactPersonNameChangeAction: (v: string) => void;
  contactPhone: string;
  onContactPhoneChangeAction: (v: string) => void;
  contactEmail: string;
  onContactEmailChangeAction: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-sm text-[#0a0a0a] leading-5"
          >
            Contact person
          </span>
          <FieldInput
            icon={User}
            placeholder="Full name"
            value={contactPersonName}
            onValueChangeAction={onContactPersonNameChangeAction}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-sm text-[#0a0a0a] leading-5"
          >
            Phone / WhatsApp
          </span>
          <FieldInput
            icon={Phone}
            placeholder="+91 98765 43210"
            value={contactPhone}
            onValueChangeAction={onContactPhoneChangeAction}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-sm text-[#0a0a0a] leading-5"
        >
          Email
        </span>
        <FieldInput
          icon={Mail}
          placeholder="you@company.com"
          value={contactEmail}
          onValueChangeAction={onContactEmailChangeAction}
        />
      </div>
      <span
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-xs text-[#737373] leading-4 px-1"
      >
        Your information is used only for listing verification and booking
        communications.
      </span>
    </div>
  );
}
