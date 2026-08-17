"use client";

export default function StepHeader({
  step,
  onBack,
}: {
  step: number;
  onBack?: () => void;
}) {
  const titles: Record<number, string> = {
    1: "Add Billboard",
    2: "Media Specs",
  };

  return (
    <div className="bg-white border-b border-[#e5e5e5] relative">
      <div className="max-w-[900px] mx-auto px-[32px] pt-[24px] pb-[16px] flex flex-col gap-[16px]">
        <div className="flex items-center gap-[16px]">
          {onBack && (
            <button
              onClick={onBack}
              className="size-[40px] flex items-center justify-center rounded-full border border-[#e5e5e5] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="#0A0A0A"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div className="flex flex-col flex-1">
            <span className="text-[18px] text-[#0a0a0a] leading-[22.5px]">
              {titles[step] || `Step ${step}`}
            </span>
            <span className="text-[14px] text-[#737373] leading-[20px]">
              Step {step} of 3
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="flex gap-[8px]">
          <div
            className={`flex-1 h-[6px] rounded-full ${step >= 1 ? "bg-[#f54900]" : "bg-[#f5f5f5]"}`}
          />
          <div
            className={`flex-1 h-[6px] rounded-full ${step >= 2 ? "bg-[#f54900]" : "bg-[#f5f5f5]"}`}
          />
          <div
            className={`flex-1 h-[6px] rounded-full ${step >= 3 ? "bg-[#f54900]" : "bg-[#f5f5f5]"}`}
          />
        </div>
      </div>
    </div>
  );
}
