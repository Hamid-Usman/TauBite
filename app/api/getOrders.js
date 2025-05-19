import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getOrders = async () => {
    const token = useAuthStore.getState().token;
    if (!token) {
        throw new Error("No tokens")
    }
    const response = await axios.get(`${apiUrl}/order/`, {
        headers: {
            Authorization: `Token ${token}`,
        }
    })
    console.log(response.data)
}

const useGetOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
        staleTime: 1000 * 60 * 5
    })
}

export default useGetOrders