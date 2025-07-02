import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

export const CreateProduct = async (formData) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = useAuthStore.getState().token;
    
    if (!token) {
        throw new Error("Undefined token");
    }

    try {

        const response = await axios.post(`http://127.0.0.1:8000/food/`, formData, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};