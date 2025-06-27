import { create } from "zustand";

export const useSubmitStore = create((set) => ({
    submitting: false,
    setSubmitting: (data) => set({submitting: data})
}))