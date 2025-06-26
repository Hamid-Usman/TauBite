import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getTags = async () => {
    try {
            const res = await axios.get(`${apiUrl}/tags/`);
            console.log(res.data)
            return res.data || [];
    }
    catch (error) {
            console.error("Error fetching tags:", error);
            return []
    }
}

export const useTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: getTags,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
        retryDelay: 1000,
    });
}