import { create } from "zustand";

export const useProductCreateStore = create((set) => ({
    form: {
        name: '',
        description: '',
        price: '',
        tags: [],
        image: File | null,
    },
    setForm: (field, value) =>
        set((state) => ({ form: { ...state.form, [field]: value } })),
}))