"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(`${apiUrl}/auth/token/login/`, {
            email,
            password,
          });
          const { auth_token } = res.data;
          console.log("Login successful", auth_token);

          set({ token: auth_token });

          await get().fetchUser();
        } catch (err) {
          set({ error: err.response?.data?.detail || "Login failed" });
        } finally {
          set({ loading: false });
        }
      },

      register: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(`${apiUrl}/auth/users/`, {
            email,
            password,
            re_password: password,
          });
          return res.data;
        } catch (err) {
          set({ error: err.response?.data?.detail || "Registration failed" });
        } finally {
          set({ loading: false });
        }
      },

      fetchUser: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const res = await axios.get(`${apiUrl}/auth/users/me/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          set({ user: res.data });
        } catch (err) {
          set({ user: null, token: null });
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", 
      partialize: (state) => ({ token: state.token }), // only persist token
    }
  )
);

export default useAuthStore;
