"use client"
import { create } from 'zustand';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const isBrowser = typeof window !== 'undefined';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useAuthStore = create((set, get) => ({
  user: null,
  token: isBrowser ? localStorage.getItem('auth_token') : null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${apiUrl}/auth/token/login/`, { email, password });
      const { auth_token } = res.data;

      localStorage.setItem('auth_token', auth_token);
      set({ token: auth_token });

      await get().fetchUser();
      console.log('works')
    } catch (err) {
      set({ error: err.response?.data?.message || 'Login failed' });
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
      console.log('works')
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Registration failed' });
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
      localStorage.removeItem('auth_token');
      set({ user: null, token: null });
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({ user: null, token: null });
  },
}));
