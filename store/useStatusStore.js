import { create } from "zustand";

export const useStatusStore = create((set) => ({
    success: "",
    error: "",
    setSuccess: (data) => set({success: data}),
    setError: (data) => set({error: data})
}))