import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getFoods = async () => {

    const res = await axios.get('http://127.0.0.1:8000/food/')
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