// store/useUserStore.js
"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: "auth_token",
      partialize: (state) => ({ user: state.user }), // only persist `user`
    }
  )
);

export default useUserStore;
