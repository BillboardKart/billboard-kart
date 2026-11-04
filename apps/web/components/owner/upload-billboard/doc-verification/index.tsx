"use client";

import { Textarea } from "@/components/ui/textarea";
import { useBillboardFormStore } from "@/stores/billboard-form-store";
import DocVerificationCard from "./DocVerificationCard";
import SectionHeader from "./SectionHeader";
import UploadZone from "./UploadZone";
import DateInput from "./DateInput";
import InfoBanner from "./InfoBanner";
import ContactGrid from "./ContactGrid";

function LabeledTextarea({
  label,
  placeholder,
  value,
  onValueChangeAction,
}: {
  label: string;
  placeholder: string;
  value: string;
  onValueChangeAction: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-sm text-[#0a0a0a] leading-5"
      >
        {label}
      </span>
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChangeAction(e.target.value)}
        className="h-20 rounded-xl border-[#e5e5e5] resize-none"
      />
    </div>
  );
}

function LabeledInput({
  label,
  placeholder,
  value,
  onValueChangeAction,
  helpText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onValueChangeAction: (v: string) => void;
  helpText?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-sm text-[#0a0a0a] leading-5"
      >
        {label}
      </span>
      <div className="bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-10 rounded-xl relative">
        <div className="absolute inset-0 border border-[#d4d4d4] rounded-xl pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChangeAction(e.target.value)}
          placeholder={placeholder}
          className="relative z-10 flex items-center h-full px-3 w-full bg-transparent text-sm text-[#0a0a0a] font-['Inter',sans-serif] outline-none placeholder:text-[#737373]"
        />
      </div>
      {helpText && (
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-xs text-[#737373] leading-4"
        >
          {helpText}
        </span>
      )}
    </div>
  );
}

export default function DocumentVerificationStep() {
  const form = useBillboardFormStore((s) => s.form);
  const updateField = useBillboardFormStore((s) => s.updateField);

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-2xl text-[#0a0a0a] tracking-[-0.6px] leading-8"
        >
          Documentation
        </h1>
        <p
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-base text-[#737373] leading-6"
        >
          Upload documents to get your listing verified. You can submit now and
          add documents later.
        </p>
      </div>

      <InfoBanner>
        Missing documents? You can still submit. Your listing will appear as{" "}
        <span className="font-medium">Pending</span> Verification until
        documents are approved.
      </InfoBanner>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Left column */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <DocVerificationCard>
            <SectionHeader title="Municipal Permissions" />
            <div className="flex flex-col gap-2 w-full">
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-sm text-[#0a0a0a] leading-5"
              >
                Municipal license
              </span>
              <UploadZone
                file={form.municipalLicense}
                onFileChangeAction={(f) => updateField("municipalLicense", f)}
              />
            </div>
            <LabeledInput
              label="License number"
              placeholder="e.g. MUN-2024-00123"
              value={form.licenseNumber}
              onValueChangeAction={(v) => updateField("licenseNumber", v)}
              helpText="As printed on your municipal license"
            />
            <DateInput
              label="License expiry date"
              value={form.licenseExpiryDate}
              onDateChangeAction={(v) => updateField("licenseExpiryDate", v)}
            />
          </DocVerificationCard>

          <DocVerificationCard>
            <SectionHeader title="Ownership & Authorization" />
            <div className="flex flex-col gap-2 w-full">
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-sm text-[#0a0a0a] leading-5"
              >
                Proof of Ownership / Authorisation letter
              </span>
              <UploadZone
                file={form.proofOfOwnership}
                onFileChangeAction={(f) => updateField("proofOfOwnership", f)}
              />
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-xs text-[#737373] leading-4"
              >
                Upload a signed authorisation or ownership document
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2">
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="text-sm text-[#0a0a0a] leading-5"
                >
                  NOC — No Objection Certificate
                </span>
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="text-xs text-[#525252] px-2 py-0.5 bg-[#f5f5f5] rounded-full leading-4"
                >
                  Optional
                </span>
              </div>
              <UploadZone
                file={form.nocCertificate}
                onFileChangeAction={(f) => updateField("nocCertificate", f)}
              />
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-xs text-[#737373] leading-4"
              >
                If applicable
              </span>
            </div>
            <LabeledTextarea
              label="Property owner details"
              placeholder="Name, contact, or relationship to property owner"
              value={form.propertyOwnerDetails}
              onValueChangeAction={(v) =>
                updateField("propertyOwnerDetails", v)
              }
            />
          </DocVerificationCard>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <DocVerificationCard>
            <SectionHeader title="Safety Documents" />
            <div className="flex flex-col gap-2 w-full">
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-sm text-[#0a0a0a] leading-5"
              >
                Structural certificate
              </span>
              <UploadZone
                file={form.structuralCertificate}
                onFileChangeAction={(f) =>
                  updateField("structuralCertificate", f)
                }
              />
            </div>
            <DateInput
              label="Structural certificate expiry date"
              value={form.structuralCertificateExpiry}
              onDateChangeAction={(v) =>
                updateField("structuralCertificateExpiry", v)
              }
              optional
            />
          </DocVerificationCard>

          <DocVerificationCard>
            <SectionHeader title="Business Details" />
            <LabeledInput
              label="Company / Owner name"
              placeholder="Skyline Media Partners"
              value={form.contactPersonName}
              onValueChangeAction={(v) => updateField("contactPersonName", v)}
            />
            <LabeledInput
              label="GST number"
              placeholder="e.g. 29ABCDE1234F1Z5"
              value={form.gstNumber}
              onValueChangeAction={(v) => updateField("gstNumber", v)}
            />
            <div className="flex flex-col gap-2 w-full">
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-sm text-[#0a0a0a] leading-5"
              >
                GST Certificate
              </span>
              <UploadZone
                file={form.gstCertificate}
                onFileChangeAction={(f) => updateField("gstCertificate", f)}
              />
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-xs text-[#737373] leading-4"
              >
                Upload a copy of your companies GST Certificate
              </span>
            </div>
            <LabeledTextarea
              label="Business address"
              placeholder="Street, city, state, postal code"
              value={form.businessAddress}
              onValueChangeAction={(v) => updateField("businessAddress", v)}
            />
            <ContactGrid
              contactPersonName={form.contactPersonName}
              onContactPersonNameChangeAction={(v) =>
                updateField("contactPersonName", v)
              }
              contactPhone={form.contactPhone}
              onContactPhoneChangeAction={(v) =>
                updateField("contactPhone", v)
              }
              contactEmail={form.contactEmail}
              onContactEmailChangeAction={(v) =>
                updateField("contactEmail", v)
              }
            />
          </DocVerificationCard>
        </div>
      </div>
    </div>
  );
}
