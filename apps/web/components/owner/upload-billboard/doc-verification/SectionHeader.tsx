"use client";

export default function SectionHeader({
  title,
  optional,
}: {
  title: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-[8px] w-full">
      <span
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-[16px] text-[#0a0a0a] leading-[24px]"
      >
        {title}
      </span>
      {optional && (
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="bg-[#f5f5f5] text-[#525252] text-[12px] px-[8px] py-[2px] rounded-full leading-[16px]"
        >
          Optional
        </span>
      )}
    </div>
  );
}
