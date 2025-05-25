import { create } from 'zustand';

export const useReviewModalStore = create((set) => ({
    formOpen: false,
    formData: null,
    openForm: (data) => set({ formOpen: true, formData: data }),
    closeForm: () => set({ formOpen: false, formData: null }),
}));