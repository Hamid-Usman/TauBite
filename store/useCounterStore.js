import { create } from "zustand";

export const useCounterStore = create((set) => ({
    count: 1,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: Math.max(state.count - 1, 1) })),
    reset: () => set({ count: 1 }),
}))