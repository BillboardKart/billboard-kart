"use client";

import { useRef, useState } from "react";
import { TopNav } from "@/components/app/TopNav";
import { BillboardFormState, emptyBillboardForm } from "@/types/owner";
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
import FormFooter from "@/components/owner/upload-billboard/FormFooter";

type Errors = Record<string, string>;

export default function AddBillboardPage() {
  const [form, setForm] = useState<BillboardFormState>({
    ...emptyBillboardForm,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showForm, setShowForm] = useState(false);

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
    const newFiles = Array.from(files);
    const urls = newFiles.map((f) => URL.createObjectURL(f));
    updateField("photos", [...form.photos, ...urls]);
    updateField("photoFiles", [...form.photoFiles, ...newFiles]);
    clearError("photos");
  };

  const removePhoto = (idx: number) => {
    updateField(
      "photos",
      form.photos.filter((_, i) => i !== idx),
    );
    updateField(
      "photoFiles",
      form.photoFiles.filter((_, i) => i !== idx),
    );
  };

  const handleContinue = () => {
    const next: Errors = {};
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

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <TopNav />
      <div className="bg-white min-h-screen flex flex-col items-center font-['Inter',sans-serif]">
        {!showForm && (
          <UploadBIllboardSelector onContinue={() => setShowForm(true)} />
        )}

        {showForm && (
          <>
            <div className="w-full max-w-255 px-6 sm:px-8 py-8 flex flex-col gap-8">
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
                onDailyTrafficChange={(v) => updateField("dailyTraffic", v)}
                peakHours={form.peakHours}
                onPeakHoursChange={(v) => updateField("peakHours", v)}
                mix={form.vehiclePedestrianMix}
                onMixChange={(v) => updateField("vehiclePedestrianMix", v)}
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
                onPrintingCostChange={(v) => updateField("printingCost", v)}
                monthlyRateError={errors.monthlyRate}
              />

              <FormFooter onContinueAction={handleContinue} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
