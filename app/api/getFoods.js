import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { buildQuery } from "../utils/buildQuery";
import { useFoodFilter } from "@/store/filters/useFoodFilter";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getFoods = async (filters) => {
    const query = buildQuery(filters)
    const res = await axios.get(`${apiUrl}/food/?${query}`)
    return res.data;
};

const useGetFoods = () => {
    const { name, tags, price } = useFoodFilter()
    return useQuery({
        queryKey: ["foods", name, tags, price],
        queryFn: () => getFoods({ name, tags, price }),
        // staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export default useGetFoods;