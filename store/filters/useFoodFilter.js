import { create } from "zustand";

export const useFoodFilter = create((set) => ({
    name: "",
    tags: "",
    price: 0,
    setName: (name => set({ name })),
    setTags: (tags => set({ tags })),
    setPrice: (price => set({ price }))
}))