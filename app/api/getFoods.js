import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const getFoods = async () => {

    const res = await axios.get(`${apiUrl}/food/`)
    return res.data;
};

const useGetFoods = () => {
    return useQuery({
        queryKey: ["foods"],
        queryFn: getFoods,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export default useGetFoods;