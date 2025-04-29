import { create } from "zustand";

export const useMenuStore = create((set) => ({
    isOpen: false,
    menuData: null,
    openMenu: (data) => set({ isOpen: true, menuData: data }),
    closeMenu: () => set({ isOpen: false, menuData: null }),
}))