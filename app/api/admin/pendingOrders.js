import axios from "axios";
import { usePendingOrderStore } from "@/store/admin/usePendingOrdersStore";
import { useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getPendingOrders = async () => {
    try {
        const response = await axios.get(`${apiUrl}/me/latest-orders/`, {
            // headers: {
            //     Authorization: `Bearer ${token}`
            // }
        });
        console.log(response.data, "pending orders data");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const usePendingOrders = () => {
    return useQuery({
        queryKey: ['pendingOrders'],
        queryFn: getPendingOrders
    });
}