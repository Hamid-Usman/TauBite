import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getCart = async () => {
    const res = await axios.get('http://127.0.0.1:8000/cart/', {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    console.log(res.data)
    return res.data
}

const useGetCart = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
        staleTime: 1000 * 60 * 5
    })
}

export default useGetCart;