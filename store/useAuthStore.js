"use client";
export const dynamic = "force-dynamic";
import { create } from "zustand";
import axios from "axios";

const isBrowser = typeof window !== "undefined"; // Check if in the browser
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useAuthStore = create((set, get) => ({
  user: null, // Access localStorage only in the browser
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

      if (isBrowser) {
        window.localStorage.setItem("auth_token", auth_token); // Access localStorage only in the browser
      }

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
    const { token } = get();
    if (!token) return;

    try {
      const res = await axios.get(`${apiUrl}/auth/users/me/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      set({ user: res.data });
    } catch (err) {
      if (isBrowser) {
         window.localStorage.removeItem("auth_token"); // Access localStorage only in the browser
      }
      set({ user: null, token: null });
    }
  },

  logout: () => {
    if (isBrowser) {
       window.localStorage.removeItem("auth_token"); // Access localStorage only in the browser
    }
    set({ user: null, token: null });
  },
}));

export default useAuthStore