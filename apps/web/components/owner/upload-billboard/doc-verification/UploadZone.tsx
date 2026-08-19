"use client";

import { FileText, Trash2, Upload } from "lucide-react";

type UploadZoneProps = {
  state?: "default" | "uploaded" | "progress";
  fileName?: string;
  fileSize?: string;
  progressPercent?: number;
  onRemoveAction?: () => void;
  className?: string;
};

export default function UploadZone({
  state = "default",
  fileName = "document_name.pdf",
  fileSize = "2.4 MB",
  progressPercent = 60,
  onRemoveAction,
  className,
}: UploadZoneProps) {
  if (state === "uploaded") {
    return (
      <div className={`relative rounded-[12px] w-full ${className ?? ""}`}>
        <div className="absolute inset-0 border border-[#e5e5e5] rounded-[12px] pointer-events-none" />
        <div className="flex items-center p-[16px] gap-[12px]">
          <FileText className="size-6 text-[#F54900] shrink-0" />
          <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="text-[14px] font-medium text-[#0a0a0a] truncate leading-[20px]"
            >
              {fileName}
            </span>
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="text-[12px] text-[#525252] leading-[16px]"
            >
              {fileSize}
            </span>
          </div>
          <button
            type="button"
            onClick={onRemoveAction}
            className="shrink-0 p-1 cursor-pointer hover:opacity-70 transition-opacity"
          >
            <Trash2 className="size-4 text-[#737373]" />
          </button>
        </div>
      </div>
    );
  }

  if (state === "progress") {
    return (
      <div className={`relative rounded-[12px] w-full ${className ?? ""}`}>
        <div className="absolute inset-0 border-2 border-[#d4d4d4] border-dashed rounded-[12px] pointer-events-none" />
        <div className="flex flex-col items-center justify-center p-[24px] gap-[12px]">
          <FileText className="size-6 text-[#F54900] shrink-0" />
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[14px] font-medium text-[#0a0a0a] text-center truncate w-full leading-[20px]"
          >
            {fileName}
          </span>
          <div className="flex flex-col items-center gap-[6px] w-full">
            <div className="w-full h-[4px] bg-[#e5e5e5] rounded-[2px] overflow-hidden">
              <div
                className="h-full bg-[#F54900] rounded-[2px]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="text-[12px] text-[#525252] text-center leading-[16px]"
            >
              {progressPercent}% uploaded
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`cursor-pointer h-[142px] relative rounded-[12px] w-full ${className ?? ""}`}
    >
      <div className="absolute inset-0 border-2 border-[#d4d4d4] border-dashed rounded-[12px] pointer-events-none" />
      <div className="flex flex-col items-center justify-center p-[26px] gap-[12px]">
        <Upload className="size-6 text-[#F54900] shrink-0" />
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[14px] text-[#0a0a0a] leading-[20px]"
        >
          Upload document
        </span>
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[12px] text-[#737373] leading-[16px]"
        >
          Accepted formats: PDF, JPG, PNG
        </span>
      </div>
    </button>
  );
}
