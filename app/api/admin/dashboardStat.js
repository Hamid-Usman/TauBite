import { useCardStore } from "@/store/admin/useCardStore";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const token = useAuthStore.getState().token;

const getDashboardStat = async () => {
    try {
        const response = await axios.get(`${apiUrl}/me/dashboard/`, {
        });
        // console.log(response.data())
        return response.data;
        
    }
    catch (error) {
        throw error;
    };
}

export const useDashboard = () => {

    return useQuery({
        queryKey: ['board'],
        queryFn: getDashboardStat
        
    })
}
