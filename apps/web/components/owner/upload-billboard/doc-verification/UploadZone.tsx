"use client";

import { useRef } from "react";
import { FileText, Trash2, Upload } from "lucide-react";

type UploadZoneProps = {
  file?: File | null;
  onFileChangeAction?: (file: File | null) => void;
  className?: string;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadZone({
  file,
  onFileChangeAction,
  className,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onFileChangeAction?.(selected);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChangeAction?.(null);
  };

  if (file) {
    return (
      <div className={`relative rounded-2xl w-full ${className ?? ""}`}>
        <div className="absolute inset-0 border border-[#e5e5e5] rounded-2xl pointer-events-none" />
        <div className="flex items-center p-4 gap-3">
          <FileText className="size-6 text-[#F54900] shrink-0" />
          <div className="flex flex-col flex-1 min-w-0 gap-0.5">
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="text-sm font-medium text-[#0a0a0a] truncate leading-5"
            >
              {file.name}
            </span>
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="text-xs text-[#525252] leading-4"
            >
              {formatFileSize(file.size)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 p-1 cursor-pointer hover:opacity-70 transition-opacity"
          >
            <Trash2 className="size-4 text-[#737373]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,image/jpeg,image/png"
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleClick}
        className={`cursor-pointer h-35.5 relative rounded-2xl w-full ${className ?? ""}`}
      >
        <div className="absolute inset-0 border-2 border-[#d4d4d4] border-dashed rounded-2xl pointer-events-none" />
        <div className="flex flex-col items-center justify-center p-6.5 gap-3">
          <Upload className="size-6 text-[#F54900] shrink-0" />
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-sm text-[#0a0a0a] leading-5"
          >
            Upload document
          </span>
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-xs text-[#737373] leading-4"
          >
            Accepted formats: PDF, JPG, PNG
          </span>
        </div>
      </button>
    </>
  );
}
