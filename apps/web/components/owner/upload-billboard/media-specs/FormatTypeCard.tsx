"use client";

type FormatType = "static" | "digital";

export default function FormatTypeCard({
  format,
  onChange,
}: {
  format: FormatType;
  onChange: (f: FormatType) => void;
}) {
  return (
    <div className="bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] rounded-[16px] relative">
      <div className="absolute inset-0 border border-[#e5e5e5] rounded-[16px] pointer-events-none" />
      <div className="p-[24px] flex flex-col gap-[12px]">
        <h2
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[16px] text-[#0a0a0a] leading-[24px]"
        >
          Format Type
        </h2>
        <div className="bg-[#f5f5f5] rounded-[12px] px-[8px] py-[4px] flex gap-[8px] w-fit">
          <button
            onClick={() => onChange("static")}
            style={{ fontFamily: "Inter, sans-serif" }}
            className={`h-[36px] px-[16px] py-[8px] rounded-[10px] flex items-center gap-[8px] text-[16px] border transition-all cursor-pointer ${
              format === "static"
                ? "bg-[#fff0ea] border-[#f54900] font-semibold text-[#0a0a0a]"
                : "bg-transparent border-[#e5e5e5] font-medium text-[#0a0a0a]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {/** <path d={svgPaths.p31741240} fill="black" /> */}
            </svg>
            Static
          </button>
          <button
            onClick={() => onChange("digital")}
            style={{ fontFamily: "Inter, sans-serif" }}
            className={`h-[36px] px-[16px] py-[8px] rounded-[10px] flex items-center gap-[8px] text-[16px] border transition-all cursor-pointer ${
              format === "digital"
                ? "bg-[#fff0ea] border-[#f54900] font-semibold text-[#0a0a0a]"
                : "bg-transparent border-[#e5e5e5] font-medium text-[#0a0a0a]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                // d={svgPaths.p26498f00}
                fill="black"
              />
            </svg>
            Digital
          </button>
        </div>
        <div
          style={{
            overflow: "hidden",
            maxHeight: format === "digital" ? "80px" : "0px",
            opacity: format === "digital" ? 1 : 0,
            transition: "max-height 0.2s ease, opacity 0.2s ease",
          }}
        >
          <div className="bg-[#fff1eb] rounded-[8px] relative">
            <div className="absolute inset-0 border border-[rgba(0,0,0,0.01)] rounded-[8px] pointer-events-none" />
            <div className="flex items-center gap-[8px] px-[12px] py-[8px]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  // d={svgPaths.pc3ebf00}
                  stroke="#F54900"
                  strokeWidth="1.17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 9.33333V7"
                  stroke="#F54900"
                  strokeWidth="1.17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 4.66667H7.00583"
                  stroke="#F54900"
                  strokeWidth="1.17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-[12px] text-[#a63c06] leading-[16px]"
              >
                You are filling in digital-specific questions. Switch to Static
                to see static billboard fields instead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
