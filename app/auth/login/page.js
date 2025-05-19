"use client"
import Image from "next/image";
import eating from "../../../public/svg/eating.svg"
import { SpotlightButton } from "@/framer/spotlight";
import Link from "next/link";
import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
export default function Home() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, loading, error } = useAuthStore()
    const router = useRouter() 

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
        if (useAuthStore.getState().token && !useAuthStore.getState().error) {
            router.push("/home")
        }
    }
    return (
        <div className="flex px-3 sm:px-14 lg:px-28 min-h-screen justify-center items-center">

            <form onSubmit={handleSubmit} className="flex flex-col p-5 rounded-lg items-center w-fit bg-white container">
                <Image src={eating} alt="eating" width={210} height={210} className=""/>
                <div>
                <h1 className="text-3xl font-bold text-center">Welcome to TAU Bites</h1>
                <p className="text-center">Login to continue from where you stopped</p>
                <div className="flex flex-col gap-4 mt-5">
                    <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-primary rounded-md p-2 focus:outline-none focus:border-primary transition duration-500 ease-in-out"
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 border-primary rounded-md p-2 focus:outline-none focus:border-primary transition duration-500 ease-in-out"
                    />
                    <button type="submit" className="px-6 py-2 font-semibold bg-primary hover:bg-primary-fade active:bg-primary-fade text-white  transition-all duration-500 ease-in-out shadow-[3px_3px_0px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]">
                    {loading ? "Validating..." : "Log in" }
                    </button>
                    { error ? <p className="text-error-500 font-semibold">{error}</p>: "" }
                    <p>No account? <Link href={"/"} className="text-primary font-semibold">Sign up</Link> </p>
                </div>
                </div>
            </form>
        </div>
    );
}
