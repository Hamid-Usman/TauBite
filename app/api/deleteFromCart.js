import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const token = useAuthStore.getState().token;

const deleteCartItem = async ({id}) => {
    
    if (!token) {
        throw new Error ("No auth_token found")
    }
    const res = await axios.delete(`${apiUrl}/cart/${id}/delete_cart_item/`, {
        headers: {
            Authorization: `Token ${token}`,
        }
    })
    return res.data;
}

export const useDeleteCartItem = () => {
    return useMutation({
        mutationFn: deleteCartItem,})
}