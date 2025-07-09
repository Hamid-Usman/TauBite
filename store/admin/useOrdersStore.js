import { create } from "zustand";

export const useOrderChartStore = create((set) => ({
    orderChart: [],
    setOrderChart: (orderChart) => set({ orderChart})
}));