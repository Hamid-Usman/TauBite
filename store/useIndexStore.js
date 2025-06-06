import { create } from 'zustand';

export const useIndexStore = create((set) => ({
    currentIndex: 0,
    setCurrentIndex: (index) => set({ currentIndex: index }),
    nextSlide: () => set((state) => ({
        currentIndex: (state.currentIndex + 1) % 2 // Assuming there are 2 slides
    })),
    prevSlide: () => set((state) => ({
        currentIndex: (state.currentIndex - 1 + 2) % 2 // Wrap around for previous slide
    }))
}))