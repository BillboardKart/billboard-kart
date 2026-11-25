"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TopNav } from "@/components/app/TopNav";
import { BillboardFormState } from "@/types/owner";
import { useBillboardFormStore } from "@/stores/billboard-form-store";
import UploadBIllboardSelector from "@/components/owner/upload-billboard/add-billboard";
import { Field, TextInput } from "@/components/owner/upload-billboard/ui";
import BillboardTypeSelector from "@/components/owner/upload-billboard/BillboardTypeSelector";
import CitySelector, {
  type BillboardCityOption,
} from "@/components/owner/upload-billboard/CitySelector";
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
import StaticSections from "@/components/owner/upload-billboard/media-specs/StaticSections";
import DigitalSections from "@/components/owner/upload-billboard/media-specs/DigitalSections";
import DocumentVerificationStep from "@/components/owner/upload-billboard/doc-verification";
import { createClient } from "@/lib/supabase/client";

type ApiBillboardType = { id: string; name: string; code: string };
type FieldErrors = Record<string, string>;
type CreateResponse = {
  success: boolean;
  error?: string;
  details?: Record<string, string>;
  billboard?: { id: string; name: string; lifecycleStatus: string };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const API_ERROR_FIELDS: Record<string, string> = {
  billboardTypeCode: "billboardType",
  cityId: "city",
  widthFt: "width",
  heightFt: "height",
};

function mapApiErrors(details: Record<string, string>): FieldErrors {
  return Object.fromEntries(
    Object.entries(details).map(([field, message]) => [
      API_ERROR_FIELDS[field] ?? field,
      message,
    ]),
  );
}

// The backend billboard scope returns only Pune and Mumbai (IN). Mumbai is
// displayed to the owner as "Bombay" per the product requirement, but the
// submitted value is always the backend city id (see CitySelector.onSelect).
const CITY_LABELS: Record<string, string> = {
  pune: "Pune",
  mumbai: "Bombay",
  bombay: "Bombay",
};

export default function AddBillboardPage() {
  const form = useBillboardFormStore((state) => state.form);
  const step = useBillboardFormStore((state) => state.step);
  const showForm = useBillboardFormStore((state) => state.showForm);
  const errors = useBillboardFormStore((state) => state.errors);
  const isSubmitting = useBillboardFormStore((state) => state.isSubmitting);
  const submitError = useBillboardFormStore((state) => state.submitError);
  const updateField = useBillboardFormStore((state) => state.updateField);
  const setStep = useBillboardFormStore((state) => state.setStep);
  const setShowForm = useBillboardFormStore((state) => state.setShowForm);
  const setErrors = useBillboardFormStore((state) => state.setErrors);
  const clearError = useBillboardFormStore((state) => state.clearError);
  const addPhotos = useBillboardFormStore((state) => state.addPhotos);
  const removePhoto = useBillboardFormStore((state) => state.removePhoto);
  const setSubmitting = useBillboardFormStore((state) => state.setSubmitting);
  const setSubmitError = useBillboardFormStore((state) => state.setSubmitError);
  const reset = useBillboardFormStore((state) => state.reset);

  const [cities, setCities] = useState<BillboardCityOption[]>([]);
  const [billboardTypes, setBillboardTypes] = useState<ApiBillboardType[]>([]);
  const [lookupError, setLookupError] = useState("");
  const [createdName, setCreatedName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!API_URL) {
      setLookupError("The API URL is not configured.");
      return;
    }

    let cancelled = false;
    const loadOptions = async () => {
      try {
        const [cityResponse, typeResponse] = await Promise.all([
          fetch(`${API_URL}/api/v1/cities?scope=billboard`, {
            credentials: "include",
          }),
          fetch(`${API_URL}/api/v1/billboards/types`, {
            credentials: "include",
          }),
        ]);
        if (!cityResponse.ok || !typeResponse.ok) {
          throw new Error("Could not load billboard options.");
        }
        const cityRows: Array<BillboardCityOption> = await cityResponse.json();
        const typeRows: ApiBillboardType[] = await typeResponse.json();
        if (cancelled) return;
        setCities(
          cityRows.map((city) => ({
            ...city,
            label: CITY_LABELS[city.name.toLowerCase()] ?? city.name,
          })),
        );
        setBillboardTypes(typeRows);
      } catch {
        if (!cancelled)
          setLookupError(
            "Unable to load cities or billboard types. Please refresh and try again.",
          );
      }
    };
    void loadOptions();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCity = useMemo(
    () => cities.find((city) => city.id === form.cityId),
    [cities, form.cityId],
  );

  const update = <K extends keyof BillboardFormState>(
    key: K,
    value: BillboardFormState[K],
  ) => {
    updateField(key, value);
    clearError(String(key));
  };

  const handlePhotoSelection = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files);
    const validFiles = selected.filter(
      (file) =>
        ALLOWED_PHOTO_TYPES.has(file.type) && file.size <= MAX_PHOTO_SIZE,
    );
    const invalidFiles = selected.length - validFiles.length;
    if (validFiles.length) addPhotos(validFiles);
    if (invalidFiles) {
      setErrors({
        ...useBillboardFormStore.getState().errors,
        photos: "Photos must be JPEG, PNG, or WebP files up to 5 MB each.",
      });
    }
  };

  const validateDetails = () => {
    const next: FieldErrors = {};
    const isNumeric = (value: string) =>
      Number.isFinite(Number(value.replace(/[₹,\s]/g, "")));
    if (!form.billboardName.trim())
      next.billboardName = "Billboard name is required.";
    if (!form.cityId) next.city = "Choose Pune or Bombay.";
    if (!form.area.trim()) next.area = "Area / Locality is required.";
    if (!form.landmark.trim()) next.landmark = "Landmark is required.";
    if (!form.billboardType) next.billboardType = "Select a billboard type.";
    if (!form.width.trim()) next.width = "Width is required.";
    else if (!isNumeric(form.width)) next.width = "Enter a valid width.";
    if (!form.height.trim()) next.height = "Height is required.";
    else if (!isNumeric(form.height)) next.height = "Enter a valid height.";
    if (form.photoFiles.length < 3)
      next.photos = `Add ${3 - form.photoFiles.length} more photo${form.photoFiles.length === 2 ? "" : "s"} to continue.`;
    if (!form.monthlyRate.trim())
      next.monthlyRate = "Monthly rate is required.";
    else if (!isNumeric(form.monthlyRate))
      next.monthlyRate = "Enter a valid monthly rate.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!API_URL) {
      setSubmitError("The API URL is not configured.");
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      const {
        data: { session },
      } = await createClient().auth.getSession();
      if (!session?.access_token)
        throw new Error("Your session expired. Please sign in again.");

      const payload = new FormData();
      const textFields: Record<string, string> = {
        billboardName: form.billboardName,
        billboardTypeCode: form.billboardType,
        cityId: form.cityId,
        area: form.area,
        landmark: form.landmark,
        mapsLink: form.mapsLink,
        latitude: form.latitude,
        longitude: form.longitude,
        widthFt: form.width,
        heightFt: form.height,
        illumination: String(form.illumination === "Yes"),
        trafficSide: form.trafficSide,
        facingDirection: form.facingDirection,
        roadType: form.roadType,
        dailyReach: form.dailyTraffic,
        peakHours: form.peakHours,
        vehiclePedestrianMix: form.vehiclePedestrianMix,
        visibilityNotes: form.visibilityNotes,
        monthlyRate: form.monthlyRate,
        minBookingDuration: form.minBookingDuration,
        printingCost: form.printingCost,
        isAvailable: String(form.isAvailable),
        formatType: form.formatType,
        mediaSpecs: JSON.stringify({
          ...form.mediaSpecs,
          formatType: form.formatType,
        }),
        propertyOwnerDetails: form.propertyOwnerDetails,
        licenseNumber: form.licenseNumber,
        licenseExpiryDate: form.licenseExpiryDate,
        structuralCertificateExpiry: form.structuralCertificateExpiry,
        gstNumber: form.gstNumber,
        businessAddress: form.businessAddress,
        contactPersonName: form.contactPersonName,
        contactPhone: form.contactPhone,
        contactEmail: form.contactEmail,
      };
      Object.entries(textFields).forEach(([key, value]) =>
        payload.append(key, value),
      );
      form.photoFiles.forEach((file) => payload.append("photos", file));
      const documents: Array<[string, File | null]> = [
        ["municipalLicense", form.municipalLicense],
        ["proofOfOwnership", form.proofOfOwnership],
        ["nocCertificate", form.nocCertificate],
        ["structuralCertificate", form.structuralCertificate],
        ["gstCertificate", form.gstCertificate],
      ];
      documents.forEach(([key, file]) => file && payload.append(key, file));

      const response = await fetch(`${API_URL}/api/v1/billboards`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: payload,
      });
      const result: CreateResponse = await response.json();
      if (!response.ok || !result.success || !result.billboard) {
        if (result.details) setErrors(mapApiErrors(result.details));
        throw new Error(result.error ?? "Could not create the billboard.");
      }
      setCreatedName(result.billboard.name);
      reset();
      setShowForm(false);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not create the billboard.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const continueStep = () => {
    if (step === "details") {
      if (validateDetails()) setStep("mediaspecs");
      return;
    }
    if (step === "mediaspecs") {
      setStep("docverification");
      return;
    }
    void submit();
  };

  const stepNumber = step === "details" ? 1 : step === "mediaspecs" ? 2 : 3;
  const goBack = () =>
    step === "docverification"
      ? setStep("mediaspecs")
      : step === "mediaspecs"
        ? setStep("details")
        : setShowForm(false);

  if (createdName) {
    return (
      <>
        <TopNav />
        <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-semibold">Billboard is live</h1>
          <p className="text-[#737373]">
            {createdName} is now listed for advertisers.
          </p>
          <button
            className="rounded-xl bg-[#f54900] px-5 py-3 text-white"
            onClick={() => {
              setCreatedName("");
              reset();
              setShowForm(false);
            }}
          >
            Add another billboard
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-white font-['Inter',sans-serif]">
        {!showForm ? (
          <UploadBIllboardSelector onContinue={() => setShowForm(true)} />
        ) : (
          <>
            <StepHeader step={stepNumber} onBackAction={goBack} />
            <main className="mx-auto flex w-full max-w-200 flex-col gap-8 px-6 py-8 sm:px-8">
              {lookupError && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  {lookupError}
                </p>
              )}
              {step === "details" && (
                <>
                  <div className="flex flex-col gap-6">
                    <Field
                      label="Billboard Name"
                      required
                      error={errors.billboardName}
                    >
                      <div data-error={!!errors.billboardName}>
                        <TextInput
                          value={form.billboardName}
                          onChange={(v) => update("billboardName", v)}
                          placeholder="e.g. MG Road Digital Hoarding"
                          invalid={!!errors.billboardName}
                        />
                      </div>
                    </Field>
                    <BillboardTypeSelector
                      value={form.billboardType}
                      onChange={(v) => update("billboardType", v)}
                      options={billboardTypes}
                      isLoading={!billboardTypes.length && !lookupError}
                      error={errors.billboardType}
                    />
                    <CitySelector
                      value={selectedCity?.label ?? ""}
                      options={cities}
                      selectedId={form.cityId}
                      onSelect={(city) => {
                        update("city", city.label);
                        update("cityId", city.id);
                        update(
                          "latitude",
                          city.latitude === null ? "" : String(city.latitude),
                        );
                        update(
                          "longitude",
                          city.longitude === null ? "" : String(city.longitude),
                        );
                        clearError("city");
                      }}
                      isLoading={!cities.length && !lookupError}
                      error={errors.city}
                    />
                    <LocationFields
                      form={form}
                      updateField={update}
                      errors={errors}
                    />
                  </div>
                  <DimensionsSection
                    width={form.width}
                    height={form.height}
                    onWidthChange={(v) => update("width", v)}
                    onHeightChange={(v) => update("height", v)}
                    widthError={errors.width}
                    heightError={errors.height}
                  />
                  <IlluminationTrafficSide
                    illumination={form.illumination}
                    onIlluminationChange={(v) =>
                      update("illumination", v as "Yes" | "No")
                    }
                    trafficSide={form.trafficSide}
                    onTrafficSideChange={(v) =>
                      update(
                        "trafficSide",
                        v as BillboardFormState["trafficSide"],
                      )
                    }
                  />
                  <FacingDirectionSection
                    value={form.facingDirection}
                    onChange={(v) => update("facingDirection", v)}
                  />
                  <RoadTypeSection
                    value={form.roadType}
                    onChange={(v) => update("roadType", v)}
                  />
                  <TrafficEstimateSection
                    dailyTraffic={form.dailyTraffic}
                    onDailyTrafficChange={(v) => update("dailyTraffic", v)}
                    peakHours={form.peakHours}
                    onPeakHoursChange={(v) => update("peakHours", v)}
                    mix={form.vehiclePedestrianMix}
                    onMixChange={(v) => update("vehiclePedestrianMix", v)}
                  />
                  <VisibilityNotesSection
                    value={form.visibilityNotes}
                    onChange={(v) => update("visibilityNotes", v)}
                  />
                  <PhotoUploadSection
                    photos={form.photos}
                    onRemove={removePhoto}
                    error={errors.photos}
                    fileRef={fileRef}
                    onAddClick={() => fileRef.current?.click()}
                    onFilesChange={handlePhotoSelection}
                  />
                  <PricingSection
                    monthlyRate={form.monthlyRate}
                    onMonthlyRateChange={(v) => update("monthlyRate", v)}
                    isAvailable={form.isAvailable}
                    onToggleAvailability={() =>
                      update("isAvailable", !form.isAvailable)
                    }
                    minDuration={form.minBookingDuration}
                    onMinDurationChange={(v) => update("minBookingDuration", v)}
                    printingCost={form.printingCost}
                    onPrintingCostChange={(v) => update("printingCost", v)}
                    monthlyRateError={errors.monthlyRate}
                  />
                </>
              )}
              {step === "mediaspecs" && (
                <>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl leading-8">Media Specs</h1>
                    <p className="text-base text-[#737373]">
                      Share the creative requirements for this billboard.
                    </p>
                  </div>
                  <FormatTypeCard
                    format={form.formatType}
                    onChange={(v) => update("formatType", v)}
                  />
                  {form.formatType === "static" ? (
                    <StaticSections />
                  ) : (
                    <DigitalSections />
                  )}
                </>
              )}
              {step === "docverification" && <DocumentVerificationStep />}
            </main>
            <WizardFooter
              step={stepNumber}
              onBackAction={goBack}
              onSkipAction={
                step === "docverification" ? continueStep : undefined
              }
              onContinueAction={continueStep}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          </>
        )}
      </div>
    </>
  );
}
