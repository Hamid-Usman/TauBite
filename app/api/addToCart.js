"use client";
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const addToCartApi = async (cartItem) => {
  if (typeof window === "undefined") {
    throw new Error("Must be called in the browser");
  }

  const token = useAuthStore.getState().token;
  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await axios.post(`${apiUrl}/cart/`, cartItem, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response.data;
};

export const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: addToCartApi,
  });
};
