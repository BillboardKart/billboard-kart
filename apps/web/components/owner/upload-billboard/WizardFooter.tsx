"use client";

export default function WizardFooter({
  step,
  onBack,
  onSkip,
  onContinue,
}: {
  step: number;
  onBack?: () => void;
  onSkip?: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="bg-white border-t border-[#e5e5e5] sticky bottom-0">
      <div className="max-w-225 mx-auto px-8 py-4 flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            style={{ fontFamily: "Inter, sans-serif" }}
            className="h-10 px-4 rounded-sm border border-[#e5e5e5] text-[14px] font-medium text-[#0a0a0a] bg-white cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        <div className="flex gap-3">
          {onSkip && (
            <button
              onClick={onSkip}
              style={{ fontFamily: "Inter, sans-serif" }}
              className="h-10 px-4 rounded-sm border border-[#e5e5e5] text-[14px] font-medium text-[#0a0a0a] bg-white cursor-pointer hover:bg-[#f5f5f5] transition-colors"
            >
              Skip for now
            </button>
          )}
          <button
            onClick={onContinue}
            style={{ fontFamily: "Inter, sans-serif" }}
            className="h-10 px-5 rounded-sm bg-[#f54900] text-[14px] font-medium text-white cursor-pointer hover:bg-[#d93f00] transition-colors"
          >
            {step === 1 ? "Continue to Media Specs" : "Save Media Specs"}
          </button>
        </div>
      </div>
    </div>
  );
}
