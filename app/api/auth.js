import axiosInstance from "@/app/lib/axios";

export const login = async ({email, password}) => {
    const res = await axiosInstance.post("/auth/token/login/", {
        email,
        password,
    });
    return res.data
} 