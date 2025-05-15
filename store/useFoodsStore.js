import { create } from "zustand";

export const useFoodsStore = create((set) => ({
    foods: [],
    setFood: (data) => set({ foods: data }),
}));