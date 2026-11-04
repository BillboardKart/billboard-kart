"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useBillboardFormStore } from "@/stores/billboard-form-store";
import { createClient } from "@/lib/supabase/client";
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

const BILLBOARD_TYPE_MAP: Record<string, string> = {
  Hoarding: "hoarding",
  Unipole: "unipole",
  Gantry: "gantry",
  "Building Facade\n(Wall Branding)": "building_facade",
};

export default function AddBillboardPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useBillboardFormStore((s) => s.form);
  const step = useBillboardFormStore((s) => s.step);
  const showForm = useBillboardFormStore((s) => s.showForm);
  const errors = useBillboardFormStore((s) => s.errors);
  const isSubmitting = useBillboardFormStore((s) => s.isSubmitting);
  const submitError = useBillboardFormStore((s) => s.submitError);

  const updateField = useBillboardFormStore((s) => s.updateField);
  const addPhotos = useBillboardFormStore((s) => s.addPhotos);
  const removePhoto = useBillboardFormStore((s) => s.removePhoto);
  const setStep = useBillboardFormStore((s) => s.setStep);
  const setShowForm = useBillboardFormStore((s) => s.setShowForm);
  const setErrors = useBillboardFormStore((s) => s.setErrors);
  const clearError = useBillboardFormStore((s) => s.clearError);
  const setSubmitting = useBillboardFormStore((s) => s.setSubmitting);
  const setSubmitError = useBillboardFormStore((s) => s.setSubmitError);
  const reset = useBillboardFormStore((s) => s.reset);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.billboardName.trim()) next.name = "Billboard name is required.";
    if (!form.city.trim() && !form.cityChip)
      next.city = "Please select or search a city.";
    if (!form.area.trim()) next.area = "Area / Locality is required.";
    if (!form.landmark.trim())
      next.landmark = "Landmark is required to help renters locate the site.";
    if (!form.billboardType) next.type = "Select a billboard type.";
    if (!form.width.trim()) next.width = "Width is required.";
    if (!form.height.trim()) next.height = "Height is required.";
    if (form.photos.length < 3) {
      const remaining = 3 - form.photos.length;
      next.photos = `Add ${remaining} more photo${remaining > 1 ? "s" : ""} to continue.`;
    }
    if (!form.monthlyRate.trim()) next.monthlyRate = "Monthly rate is required.";
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

  const handleSaveDocVerification = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setSubmitError("Not authenticated. Please log in again.");
        setSubmitting(false);
        return;
      }

      const fd = new FormData();

      // Step 1 — text fields
      fd.append("billboardName", form.billboardName);
      fd.append(
        "billboardTypeCode",
        BILLBOARD_TYPE_MAP[form.billboardType] || "hoarding",
      );
      fd.append("cityId", form.city);
      fd.append("area", form.area);
      fd.append("landmark", form.landmark);
      fd.append("mapsLink", form.mapsLink);
      fd.append("latitude", form.latitude);
      fd.append("longitude", form.longitude);
      fd.append("widthFt", form.width);
      fd.append("heightFt", form.height);
      fd.append("illumination", form.illumination);
      fd.append("trafficSide", form.trafficSide);
      fd.append("facingDirection", form.facingDirection);
      fd.append("roadType", form.roadType);
      fd.append("dailyReach", form.dailyTraffic);
      fd.append("peakHours", form.peakHours);
      fd.append("vehiclePedestrianMix", form.vehiclePedestrianMix);
      fd.append("visibilityNotes", form.visibilityNotes);
      fd.append("monthlyRate", form.monthlyRate);
      fd.append("minBookingDuration", form.minBookingDuration);
      fd.append("printingCost", form.printingCost);
      fd.append("isAvailable", String(form.isAvailable));

      // Step 2
      fd.append("formatType", form.formatType);
      fd.append("mediaSpecs", JSON.stringify(form.mediaSpecs));

      // Step 3 — text fields
      fd.append("propertyOwnerDetails", form.propertyOwnerDetails);
      fd.append("licenseNumber", form.licenseNumber);
      fd.append("licenseExpiryDate", form.licenseExpiryDate);
      fd.append("structuralCertificateExpiry", form.structuralCertificateExpiry);
      fd.append("gstNumber", form.gstNumber);
      fd.append("businessAddress", form.businessAddress);
      fd.append("contactPersonName", form.contactPersonName);
      fd.append("contactPhone", form.contactPhone);
      fd.append("contactEmail", form.contactEmail);

      // Step 3 — files
      form.photoFiles.forEach((f) => fd.append("photos", f));
      if (form.municipalLicense)
        fd.append("municipalLicense", form.municipalLicense);
      if (form.proofOfOwnership)
        fd.append("proofOfOwnership", form.proofOfOwnership);
      if (form.nocCertificate) fd.append("nocCertificate", form.nocCertificate);
      if (form.structuralCertificate)
        fd.append("structuralCertificate", form.structuralCertificate);
      if (form.gstCertificate)
        fd.append("gstCertificate", form.gstCertificate);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/billboards`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: fd,
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.message || `Submit failed (${res.status})`);
      }

      reset();
      router.push("/owner/my-inventory");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
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
                      value={form.billboardType}
                      onChange={(label) => {
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
                      chip={form.cityChip}
                      onChipChange={(chip) => updateField("cityChip", chip)}
                      error={errors.city}
                    />

                    <LocationFields
                      form={form}
                      updateField={updateField}
                      errors={errors}
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
                  <FacingDirectionSection
                    value={form.facingDirection}
                    onChange={(v) => updateField("facingDirection", v)}
                  />
                  <RoadTypeSection
                    value={form.roadType}
                    onChange={(v) => updateField("roadType", v)}
                  />
                  <TrafficEstimateSection
                    dailyTraffic={form.dailyTraffic}
                    onDailyTrafficChange={(v) =>
                      updateField("dailyTraffic", v)
                    }
                    peakHours={form.peakHours}
                    onPeakHoursChange={(v) => updateField("peakHours", v)}
                    mix={form.vehiclePedestrianMix}
                    onMixChange={(v) =>
                      updateField("vehiclePedestrianMix", v)
                    }
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
                    minDuration={form.minBookingDuration}
                    onMinDurationChange={(v) =>
                      updateField("minBookingDuration", v)
                    }
                    printingCost={form.printingCost}
                    onPrintingCostChange={(v) =>
                      updateField("printingCost", v)
                    }
                    monthlyRateError={errors.monthlyRate}
                  />
                </>
              )}

              {/* Step 2: Media Specs */}
              {step === "mediaspecs" && (
                <>
                  <div className="flex flex-col gap-2">
                    <h1
                      style={{ fontFamily: "Inter, sans-serif" }}
                      className="text-[30px] text-[#0a0a0a] tracking-[-0.75px] leading-9"
                    >
                      Media specifications
                    </h1>
                    <p
                      style={{ fontFamily: "Inter, sans-serif" }}
                      className="text-base text-[#737373] leading-6"
                    >
                      Tell advertisers about your billboard&apos;s technical
                      details.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    <FormatTypeCard
                      format={form.formatType}
                      onChange={(v) => updateField("formatType", v)}
                    />
                    <PhysicalSize />

                    <div
                      style={{
                        display: form.formatType === "static" ? "flex" : "none",
                        flexDirection: "column",
                        gap: "24px",
                      }}
                    >
                      <StaticSections />
                    </div>
                    <div
                      style={{
                        display:
                          form.formatType === "digital" ? "flex" : "none",
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
                  ? undefined
                  : step === "mediaspecs"
                    ? undefined
                    : () => {
                        handleSaveDocVerification();
                      }
              }
              onContinueAction={
                step === "details"
                  ? handleContinueToMediaSpecs
                  : step === "mediaspecs"
                    ? handleSaveMediaSpecs
                    : handleSaveDocVerification
              }
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          </>
        )}
      </div>
    </>
  );
}
