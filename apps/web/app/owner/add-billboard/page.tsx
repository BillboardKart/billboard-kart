"use client";

import { useRef, useState } from "react";
import { BillboardFormState } from "@/types/owner";
import UploadBIllboardSelector from "@/components/owner/upload-billboard/add-billboard";
import { Field, TextInput } from "@/components/owner/upload-billboard/ui";
import BillboardTypeSelector from "@/components/owner/upload-billboard/BillboardTypeSelector";
import CitySelector from "@/components/owner/upload-billboard/CitySelector";
import LocationFields from "@/components/owner/upload-billboard/LocationFields";
import DimensionsSection from "@/components/owner/upload-billboard/DimensionsSection";
import IlluminationTrafficSide from "@/components/owner/upload-billboard/IlluminationTrafficSide";
import FacingDirectionSection from "@/components/owner/upload-billboard/FacingDirectionSection";
import RoadTypeSection from "@/components/owner/upload-billboard/RoadTypeSection";
import TrafficEstimateSection from "@/components/owner/upload-billboard/TrafficEstimateSection";
import VisibilityNotesSection from "@/components/owner/upload-billboard/VisibilityNotesSection";
import PhotoUploadSection from "@/components/owner/upload-billboard/PhotoUploadSection";
import PricingSection from "@/components/owner/upload-billboard/PricingSection";
import StepHeader from "@/components/owner/upload-billboard/StepHeader";
import WizardFooter from "@/components/owner/upload-billboard/WizardFooter";
import FormatTypeCard from "@/components/owner/upload-billboard/media-specs/FormatTypeCard";
import PhysicalSize from "@/components/owner/upload-billboard/media-specs/PhysicalSize";
import StaticSections from "@/components/owner/upload-billboard/media-specs/StaticSections";
import DigitalSections from "@/components/owner/upload-billboard/media-specs/DigitalSections";
import DocumentVerificationStep from "@/components/owner/upload-billboard/doc-verification";

type Errors = Record<string, string>;
type Step = "details" | "mediaspecs" | "docverification";
type FormatType = "static" | "digital";

export default function AddBillboardPage() {
  const [form, setForm] = useState<BillboardFormState>({
    billboardName: "",
    city: "",
    area: "",
    landmark: "",
    latitude: "19.0760",
    longitude: "72.8777",
    billboardType: "",
    width: "",
    height: "",
    illumination: "Yes",
    trafficSide: "Left",
    visibilityNotes: "",
    photos: [],
    monthlyRate: "",
    isAvailable: true,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [cityChip, setCityChip] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [type, setType] = useState("");
  const [facing, setFacing] = useState("North");
  const [roadType, setRoadType] = useState("Highway");
  const [dailyTraffic, setDailyTraffic] = useState("");
  const [peakHours, setPeakHours] = useState("");
  const [mix, setMix] = useState("");
  const [minDuration, setMinDuration] = useState("1 month");
  const [printingCost, setPrintingCost] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<Step>("details");
  const [format, setFormat] = useState<FormatType>("static");

  const fileRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof BillboardFormState>(
    key: K,
    value: BillboardFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const addPhotos = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    updateField("photos", [...form.photos, ...urls]);
    clearError("photos");
  };

  const removePhoto = (idx: number) =>
    updateField(
      "photos",
      form.photos.filter((_, i) => i !== idx),
    );

  // WARNING: validate data when passing forward (utilize this when adding API endpoint)
  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.billboardName.trim()) next.name = "Billboard name is required.";
    if (!form.city.trim() && !cityChip)
      next.city = "Please select or search a city.";
    if (!form.area.trim()) next.area = "Area / Locality is required.";
    if (!form.landmark.trim())
      next.landmark = "Landmark is required to help renters locate the site.";
    if (!type) next.type = "Select a billboard type.";
    if (!form.width.trim()) next.width = "Width is required.";
    if (!form.height.trim()) next.height = "Height is required.";
    if (form.photos.length < 3) {
      const remaining = 3 - form.photos.length;
      next.photos = `Add ${remaining} more photo${remaining > 1 ? "s" : ""} to continue.`;
    }
    if (!form.monthlyRate.trim())
      next.monthlyRate = "Monthly rate is required.";
    return next;
  };

  const handleContinueToMediaSpecs = () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStep("mediaspecs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveMediaSpecs = () => {
    setStep("docverification");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveDocVerification = () => {
    window.alert("Documents submitted for review — billboard published!");
  };

  return (
    <>
      <div className="bg-white min-h-screen flex flex-col items-center font-['Inter',sans-serif]">
        {!showForm && (
          <UploadBIllboardSelector onContinue={() => setShowForm(true)} />
        )}

        {showForm && (
          <>
            {step === "details" && <StepHeader step={1} />}
            {step === "mediaspecs" && (
              <StepHeader step={2} onBackAction={() => setStep("details")} />
            )}
            {step === "docverification" && (
              <StepHeader step={3} onBackAction={() => setStep("mediaspecs")} />
            )}

            <div className="w-full max-w-255 px-6 sm:px-8 py-8 flex flex-col gap-8 flex-1">
              {/* Step 1: Billboard Details */}
              {step === "details" && (
                <>
                  {/* Location block */}
                  <div className="flex flex-col gap-6">
                    <Field label="Billboard Name" required error={errors.name}>
                      <div data-error={!!errors.name}>
                        <TextInput
                          value={form.billboardName}
                          onChange={(v) => {
                            updateField("billboardName", v);
                            clearError("name");
                          }}
                          placeholder="e.g. MG Road Digital Hoarding"
                          invalid={!!errors.name}
                        />
                      </div>
                    </Field>

                    <BillboardTypeSelector
                      value={type}
                      onChange={(label) => {
                        setType(label);
                        updateField("billboardType", label);
                        clearError("type");
                      }}
                      error={errors.type}
                    />

                    <CitySelector
                      value={form.city}
                      onChange={(v) => {
                        updateField("city", v);
                        clearError("city");
                      }}
                      chip={cityChip}
                      onChipChange={setCityChip}
                      error={errors.city}
                    />

                    <LocationFields
                      form={form}
                      updateField={updateField}
                      errors={errors}
                      mapsLink={mapsLink}
                      setMapsLink={setMapsLink}
                    />
                  </div>
                  <DimensionsSection
                    width={form.width}
                    height={form.height}
                    onWidthChange={(v) => {
                      updateField("width", v);
                      clearError("width");
                    }}
                    onHeightChange={(v) => {
                      updateField("height", v);
                      clearError("height");
                    }}
                    widthError={errors.width}
                    heightError={errors.height}
                  />
                  <IlluminationTrafficSide
                    illumination={form.illumination}
                    onIlluminationChange={(v) =>
                      updateField("illumination", v as "Yes" | "No")
                    }
                    trafficSide={form.trafficSide}
                    onTrafficSideChange={(v) =>
                      updateField(
                        "trafficSide",
                        v as "Left" | "Right" | "Not Applicable",
                      )
                    }
                  />
                  <FacingDirectionSection value={facing} onChange={setFacing} />
                  <RoadTypeSection value={roadType} onChange={setRoadType} />
                  <TrafficEstimateSection
                    dailyTraffic={dailyTraffic}
                    onDailyTrafficChange={setDailyTraffic}
                    peakHours={peakHours}
                    onPeakHoursChange={setPeakHours}
                    mix={mix}
                    onMixChange={setMix}
                  />
                  <VisibilityNotesSection
                    value={form.visibilityNotes}
                    onChange={(v) => updateField("visibilityNotes", v)}
                  />
                  <PhotoUploadSection
                    photos={form.photos}
                    onRemove={removePhoto}
                    error={errors.photos}
                    fileRef={fileRef}
                    onAddClick={() => fileRef.current?.click()}
                    onFilesChange={addPhotos}
                  />
                  <PricingSection
                    monthlyRate={form.monthlyRate}
                    onMonthlyRateChange={(v) => {
                      updateField("monthlyRate", v);
                      clearError("monthlyRate");
                    }}
                    isAvailable={form.isAvailable}
                    onToggleAvailability={() =>
                      updateField("isAvailable", !form.isAvailable)
                    }
                    minDuration={minDuration}
                    onMinDurationChange={setMinDuration}
                    printingCost={printingCost}
                    onPrintingCostChange={setPrintingCost}
                    monthlyRateError={errors.monthlyRate}
                  />
                </>
              )}

              {/* Step 2: Media Specs */}
              {step === "mediaspecs" && (
                <>
                  <div className="flex flex-col gap-[8px]">
                    <h1
                      style={{ fontFamily: "Inter, sans-serif" }}
                      className="text-[30px] text-[#0a0a0a] tracking-[-0.75px] leading-[36px]"
                    >
                      Media specifications
                    </h1>
                    <p
                      style={{ fontFamily: "Inter, sans-serif" }}
                      className="text-[16px] text-[#737373] leading-[24px]"
                    >
                      Tell advertisers about your billboard&apos;s technical
                      details.
                    </p>
                  </div>

                  <div className="flex flex-col gap-[24px]">
                    <FormatTypeCard format={format} onChange={setFormat} />
                    <PhysicalSize />

                    <div
                      style={{
                        display: format === "static" ? "flex" : "none",
                        flexDirection: "column",
                        gap: "24px",
                      }}
                    >
                      <StaticSections />
                    </div>
                    <div
                      style={{
                        display: format === "digital" ? "flex" : "none",
                        flexDirection: "column",
                        gap: "24px",
                      }}
                    >
                      <DigitalSections />
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Document Verification */}
              {step === "docverification" && <DocumentVerificationStep />}
            </div>

            <WizardFooter
              step={step === "details" ? 1 : step === "mediaspecs" ? 2 : 3}
              onBackAction={
                step === "mediaspecs"
                  ? () => setStep("details")
                  : step === "docverification"
                    ? () => setStep("mediaspecs")
                    : undefined
              }
              onSkipAction={
                step === "details"
                  ? () => window.alert("Saved as draft")
                  : step === "mediaspecs"
                    ? () => window.alert("Skipped media specs")
                    : () => window.alert("Skipped document verification")
              }
              onContinueAction={
                step === "details"
                  ? handleContinueToMediaSpecs
                  : step === "mediaspecs"
                    ? handleSaveMediaSpecs
                    : handleSaveDocVerification
              }
            />
          </>
        )}
      </div>
    </>
  );
}
