// stores/billboard-form-store.ts
import { create } from "zustand";
import {
  type BillboardFormState,
  type Step,
  emptyBillboardForm,
} from "@/types/owner";

type Errors = Record<string, string>;

type BillboardFormStore = {
  form: BillboardFormState;
  step: Step;
  showForm: boolean;
  errors: Errors;
  isSubmitting: boolean;
  submitError: string | null;

  // Field updates
  updateField: <K extends keyof BillboardFormState>(
    key: K,
    value: BillboardFormState[K],
  ) => void;
  setForm: (patch: Partial<BillboardFormState>) => void;

  // Photo helpers
  addPhotos: (files: FileList | null) => void;
  removePhoto: (idx: number) => void;

  // Step navigation
  setStep: (step: Step) => void;
  setShowForm: (show: boolean) => void;

  // Validation
  setErrors: (errors: Errors) => void;
  clearError: (key: string) => void;

  // Submission
  setSubmitting: (submitting: boolean) => void;
  setSubmitError: (error: string | null) => void;

  // Reset
  reset: () => void;
};

export const useBillboardFormStore = create<BillboardFormStore>(
  (set) => ({
    form: { ...emptyBillboardForm },
    step: "details",
    showForm: false,
    errors: {},
    isSubmitting: false,
    submitError: null,

    updateField: (key, value) =>
      set((state) => ({
        form: { ...state.form, [key]: value },
      })),

    setForm: (patch) =>
      set((state) => ({
        form: { ...state.form, ...patch },
      })),

    addPhotos: (files) => {
      if (!files || files.length === 0) return;
      const newFiles = Array.from(files);
      const urls = newFiles.map((f) => URL.createObjectURL(f));
      set((state) => ({
        form: {
          ...state.form,
          photos: [...state.form.photos, ...urls],
          photoFiles: [...state.form.photoFiles, ...newFiles],
        },
        errors: (() => {
          const next = { ...state.errors };
          delete next.photos;
          return next;
        })(),
      }));
    },

    removePhoto: (idx) =>
      set((state) => ({
        form: {
          ...state.form,
          photos: state.form.photos.filter((_, i) => i !== idx),
          photoFiles: state.form.photoFiles.filter((_, i) => i !== idx),
        },
      })),

    setStep: (step) => set({ step }),
    setShowForm: (showForm) => set({ showForm }),

    setErrors: (errors) => set({ errors }),
    clearError: (key) =>
      set((state) => {
        if (!state.errors[key]) return state;
        const next = { ...state.errors };
        delete next[key];
        return { errors: next };
      }),

    setSubmitting: (isSubmitting) => set({ isSubmitting }),
    setSubmitError: (submitError) => set({ submitError }),

    reset: () =>
      set({
        form: { ...emptyBillboardForm },
        step: "details",
        showForm: true,
        errors: {},
        isSubmitting: false,
        submitError: null,
      }),
  }),
);
