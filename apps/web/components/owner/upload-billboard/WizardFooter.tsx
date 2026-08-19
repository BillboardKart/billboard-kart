"use client";

export default function WizardFooter({
  step,
  onBackAction,
  onSkipAction,
  onContinueAction,
}: {
  step: number;
  onBackAction?: () => void;
  onSkipAction?: () => void;
  onContinueAction: () => void;
}) {
  return (
    <div className="bg-white border-t border-[#e5e5e5] sticky bottom-0 w-full">
      <div className="max-w-255 mx-auto px-6 sm:px-8 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {onBackAction ? (
            <button
              onClick={onBackAction}
              style={{ fontFamily: "Inter, sans-serif" }}
              className="h-10 px-4 rounded-sm border border-[#e5e5e5] text-[14px] font-medium text-[#0a0a0a] bg-white cursor-pointer hover:bg-[#f5f5f5] transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-3">
            {onSkipAction && (
              <button
                onClick={onSkipAction}
                style={{ fontFamily: "Inter, sans-serif" }}
                className="h-10 px-4 rounded-sm border border-[#e5e5e5] text-[14px] font-medium text-[#0a0a0a] bg-white cursor-pointer hover:bg-[#f5f5f5] transition-colors"
              >
                Skip for now
              </button>
            )}
            <button
              onClick={onContinueAction}
              style={{ fontFamily: "Inter, sans-serif" }}
              className="h-10 px-5 rounded-sm bg-[#f54900] text-[14px] font-medium text-white cursor-pointer hover:bg-[#d93f00] transition-colors"
            >
              {step === 1
                ? "Continue to Media Specs"
                : step === 2
                  ? "Continue to Documents"
                  : "Save & Submit for Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
