"use client";

import { Textarea } from "@/components/ui/textarea";
import DocVerificationCard from "./DocVerificationCard";
import SectionHeader from "./SectionHeader";
import UploadZone from "./UploadZone";
import DateInput from "./DateInput";
import InfoBanner from "./InfoBanner";
import ContactGrid from "./ContactGrid";

function FieldInput({
  placeholder,
  helpText,
}: {
  placeholder: string;
  helpText?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-10 rounded-xl relative">
        <div className="absolute inset-0 border border-[#d4d4d4] rounded-xl pointer-events-none" />
        <div className="flex items-center h-full px-3">
          <span
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-[14px] text-[#737373]"
          >
            {placeholder}
          </span>
        </div>
      </div>
      {helpText && (
        <span
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[12px] text-[#737373] leading-4"
        >
          {helpText}
        </span>
      )}
    </div>
  );
}

function LabelField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-[14px] text-[#0a0a0a] leading-5"
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function LabeledTextarea({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-[14px] text-[#0a0a0a] leading-5"
      >
        {label}
      </span>
      <Textarea
        placeholder={placeholder}
        className="h-20 rounded-xl border-[#e5e5e5] resize-none"
      />
    </div>
  );
}

export default function DocumentVerificationStep() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[24px] text-[#0a0a0a] tracking-[-0.6px] leading-8"
        >
          Documentation
        </h1>
        <p
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-[16px] text-[#737373] leading-6"
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
            <LabelField label="Municipal license">
              <UploadZone />
            </LabelField>
            <LabelField label="License number">
              <FieldInput
                placeholder="e.g. MUN-2024-00123"
                helpText="As printed on your municipal license"
              />
            </LabelField>
            <DateInput label="License expiry date" placeholder="DD/MM/YYYY" />
          </DocVerificationCard>

          <DocVerificationCard>
            <SectionHeader title="Ownership & Authorization" />
            <LabelField label="Proof of Ownership / Authorisation letter">
              <UploadZone />
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-[12px] text-[#737373] leading-4"
              >
                Upload a signed authorisation or ownership document
              </span>
            </LabelField>
            <LabelField label="NOC — No Objection Certificate">
              <div className="flex items-center gap-2">
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="text-[12px] text-[#525252] px-2 py-0.5 bg-[#f5f5f5] rounded-full leading-4"
                >
                  Optional
                </span>
              </div>
              <UploadZone />
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-[12px] text-[#737373] leading-4"
              >
                If applicable
              </span>
            </LabelField>
            <LabeledTextarea
              label="Property owner details"
              placeholder="Name, contact, or relationship to property owner"
            />
          </DocVerificationCard>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <DocVerificationCard>
            <SectionHeader title="Safety Documents" />
            <LabelField label="Structural certificate">
              <UploadZone />
            </LabelField>
            <DateInput
              label="Structural certificate expiry date"
              placeholder="DD/MM/YYYY"
              optional
            />
          </DocVerificationCard>

          <DocVerificationCard>
            <SectionHeader title="Business Details" />
            <LabelField label="Company / Owner name">
              <FieldInput placeholder="Skyline Media Partners" />
            </LabelField>
            <LabelField label="GST number">
              <FieldInput placeholder="e.g. 29ABCDE1234F1Z5" />
            </LabelField>
            <LabelField label="GST Certificate">
              <UploadZone />
              <span
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-[12px] text-[#737373] leading-4"
              >
                Upload a copy of your companies GST Certificate
              </span>
            </LabelField>
            <LabeledTextarea
              label="Business address"
              placeholder="Street, city, state, postal code"
            />
            <ContactGrid />
          </DocVerificationCard>
        </div>
      </div>
    </div>
  );
}
