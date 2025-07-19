import { useReviewDashboardStore } from "@/store/admin/reviewStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getReviewDashboard = async () => {
    try {
        const response = await axios.get(`${apiUrl}/me/top-rated/`, {
            // headers: {
            //     Authorization: `Bearer ${token}`
            // }
        });
        console.log(response.data, "reviews");
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const useReviewDashboard = () => {
    return useQuery({
        queryKey: ["ReviewDashboard"],
        queryFn: getReviewDashboard,
    })
}