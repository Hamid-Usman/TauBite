import { create } from "zustand";

export const useOrderStore = create((set) =>({
    orders: [],
    setOrder: (data) => set({orders: data})
}))