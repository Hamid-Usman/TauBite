import useAuthStore from "@/store/useAuthStore"
import { useMutation } from "@tanstack/react-query";
import axios from "axios"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const RateItem = async (data) => {
    const token = useAuthStore.getState().token;
    if (!token) {
        throw new Error("Undefined token")
    }
    
    try {
        
        const res = await axios.post(`${apiUrl}/rating/`, data, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return res.data;
    }
    catch (error) {
        console.error("Couldnt submit review: ", error);
        throw error;
        
    }
};

export const useRateItemMutation = () => {
    return useMutation({
        mutationFn: (data) => RateItem(data)
    })
}