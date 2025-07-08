import { create } from "zustand";

export const useCardStore = create((set) => ({
    cards: null,
    setCards: (cards) => set({cards})
}))