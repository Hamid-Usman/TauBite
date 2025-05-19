"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const getCart = async () => {
  if (typeof window === "undefined") {
    // Prevent running on the server
    return [];
  }

  const token = useAuthStore.getState().token;
  if (!token) {
    throw new Error("No auth token found");
  }

  const res = await axios.get(`${apiUrl}/cart/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return res.data;
};

const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: typeof window !== "undefined", // ensures it only runs on client
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetCart;
