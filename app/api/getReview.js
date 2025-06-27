import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchOrderReviews = async (orderId) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${apiUrl}/rating/?order=${orderId}`);
    return response.data;
};

export const UseItemReview = (orderId) => {
    return useQuery({
        queryKey: ['reviews', orderId],
        queryFn: () => fetchOrderReviews(orderId),
    });
};