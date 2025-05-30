import useAuthStore from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Admin order api call
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const getOrders = async () => {
    const token = useAuthStore.getState().token;
    try {
        const response = await axios.get(`${apiUrl}/order`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useAllOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

