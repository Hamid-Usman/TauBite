import useAuthStore from "@/store/useAuthStore";

const { default: axios } = require("axios");

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createOrder = async (cartItemIds) => {
    const token = useAuthStore.getState().token
    if (!token) {
        throw new Error("Undefined token")
    }
    
    try {
        const res = await axios.post(`${apiUrl}/order/`, {
            cart_item_ids: cartItemIds
        }, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
            },
        });
        
        return res.data;
    }
    
    catch (error) {
        console.error("Order creation error:", error.response?.data);
        throw error;
    }

};