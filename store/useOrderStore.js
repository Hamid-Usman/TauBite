import { create } from "zustand";

export const UseOrderStore = create((set) =>({
    orders: [],
    setOrder: (data) => set({orders: data})
}))