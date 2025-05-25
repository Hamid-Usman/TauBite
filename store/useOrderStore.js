import { create } from "zustand";

export const useOrderStore = create((set) =>({
    orders: [],
    error: null,
    setOrders: (orders) => set({ orders, error: null }),
    setError: (error) => set({ error }),
}))