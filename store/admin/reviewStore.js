import { create } from "zustand";

export const useReviewDashboardStore = create((set) => ({
    reviews: [],
    setReviews: (reviews) => set({reviews})
}))