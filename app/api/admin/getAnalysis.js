import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAnalysis = async () => {
        const response = await axios.get(`${apiUrl}/me/ai-analysis/`); 
        return response.data;
}

export const useGetAnalysis = () => {
    return useQuery({
        queryKey: ["analysis"],
        queryFn: getAnalysis,
    });
}