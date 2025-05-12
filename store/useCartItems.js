import { create } from "zustand";

export const useCartList = create((set) => ({
    cartList: [],
    setCartList: (data) => set({cartList: data})
}))