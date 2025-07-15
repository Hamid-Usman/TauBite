import { create } from "zustand";

export const usePendingOrderStore = create((set) => ({
    pendingOrders: [],
    setPendingOrders: (orders) => set({ pendingOrders: orders })
}))