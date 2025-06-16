import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { buildQuery } from "../utils/buildQuery";
import { useFoodFilter } from "@/store/filters/useFoodFilter";
import { useDebounce } from "use-debounce";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getFoods = async (filters) => {
    const query = buildQuery(filters)
    const res = await axios.get(`${apiUrl}/food/?${query}`)
    return res.data;
};

const useGetFoods = () => {
    const { name, tags, price } = useFoodFilter()
    const [debouncedName] = useDebounce(name, 500);
    return useQuery({
        queryKey: ["foods", name, tags, price],
        queryFn: () => getFoods({
            name: debouncedName,
            tags,
            price }),
        // staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export default useGetFoods;