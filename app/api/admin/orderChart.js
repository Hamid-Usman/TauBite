import { useOrderChartStore } from "@/store/admin/useOrdersStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getOrderChart = async () => {
    try {
        const response = await axios.get(`${apiUrl}/me/order-chart/`, {
            // headers: {
            //     Authorization: `Bearer ${token}`
            // }
        });
        console.log(response.data, "order chart data");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const useOrderChart = () => {
    const { orderChart, setOrderChart } = useOrderChartStore();
    return useQuery({
        queryKey: ['orderChart'],
        queryFn: async () => {
            const data = await getOrderChart();
            setOrderChart(data);
            console.log(data, "order chart data");
            return data;
        },
        initialData: orderChart
    });
};
