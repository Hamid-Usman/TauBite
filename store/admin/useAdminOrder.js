import { create } from "zustand";

export const useAdminOrderStore = create((set) =>({
    orders: [],
    error: null,
    setOrders: (orders) => set({ orders, error: null }),
    setError: (error) => set({ error }),
}))