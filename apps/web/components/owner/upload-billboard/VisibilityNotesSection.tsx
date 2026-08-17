"use client";

import { Field } from "./ui";

export default function VisibilityNotesSection({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label="Visibility notes">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe visibility, viewing distance, obstructions, etc."
        className="w-full min-h-[96px] rounded-[8px] border border-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-[13px] py-[9px] text-[14px] text-[#0a0a0a] placeholder:text-[#737373] outline-none focus:border-[#f54900] resize-y"
      />
    </Field>
  );
}
