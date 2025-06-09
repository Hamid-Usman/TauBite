"use client"
import Image from "next/image";
import eating from "../../../public/svg/eating.svg"
import { SpotlightButton } from "@/framer/spotlight";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import eyes  from "../../../public/svg/Eyes-bro.svg";
import welcome  from "../../../public/svg/Welcome-bro.svg"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useIndexStore } from "@/store/useIndexStore";
import { UseSlide } from "@/hooks/indexHook";
import { useAuthForm } from "@/schemas/resolvers/authResolver";
// import * as yup from "yup"
// import useForm from "react-form-hook"
// import { yupResolver } from "@yu"
const slides = [
  {
    id: 1,
    icon: eyes,
    content: "Hmm. A user, huh?",
    // bgColor: "bg-blue-500",
  },
  {
    id: 2,
    icon: welcome,
    content: "Welcome to FoodieHub",
    // bgColor: "bg-blue-500",
  }
];
export default function Home() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { register, loading, error, fieldErrors } = useAuthStore()
    const { register: reg, handleSubmit, formState: { errors } } = useAuthForm()

    const router = useRouter()
    const { currentIndex, nextSlide, setCurrentIndex } = useIndexStore()
    
    UseSlide(slides.length, 4000); // Auto-advance every 5 seconds
  
    // Auto-advance every 5 seconds
    const onSubmit = async (data) => {
        const result = await register(data.email, data.password)
        if (result) {
            router.push("/auth/login")
        }
    }
    return (
        <div className="flex h-[90vh] px-3 sm:px-14 lg:px-28 justify-center items-center">
            <div className="hidden h-[480px] md:flex w-[30%] bg-primary justify-center items-end pb-28">
                <motion.div
                    key={slides[currentIndex].id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">
                        <Image alt="Icon" width={200} src={slides[currentIndex].icon} />
                        </h1>
                        <p className="text-cream">{slides[currentIndex].content}</p>
                    </div>
                </motion.div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=" md:w-[70%] lg:w-[30%] flex flex-col py-10 gap-10 justify-center p-5 rounded-lg text-center items-center container">
                <h1 className="font-bold text-xl text-primary">FoodieHub</h1>
                <div>
                    <h1 className="text-2xl font-bold text-center">Welcome To FoodieHub</h1>
                    <p className="text-center">Register to get started!</p>
                </div>
                <div className="w-[280px] mx-auto flex flex-col gap-4 mt-5">
                    <div className="flex flex-col ">
                        <label className="text-start text-dark font-semibold">Email</label>
                        <input
                            {...reg("email")}
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={` ${errors.email ? "border-2 rounded-md" : " border-b"} text-dark border-primary p-1 focus:outline-none focus:border-primary transition duration-500 ease-in-out`}
                        />
                        <p className="text-start text-red-500">{errors.email?.message}</p>
                        {fieldErrors?.email && (
                            <p className="text-start text-red-500">
                            {Array.isArray(fieldErrors.email) 
                                ? fieldErrors.email.join(" ") 
                                : fieldErrors.email}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-start text-dark font-semibold">Password</label>
                        <input
                            {...reg("password")}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={` ${errors.password ? "border-2 rounded-md" : " border-b"} text-dark border-primary p-1 focus:outline-none focus:border-primary transition duration-500 ease-in-out `}
                        />
                        <p className="text-start text-red-500">{errors.password?.message}</p>
                    </div>
                    
                    <button type="submit" className="px-12 w-fit p-2 font-semibold active:rounded-xl hover:rounded-xl mx-auto bg-primary hover:bg-primary-fade active:bg-primary-fade text-white transition-all duration-500 ease-in-out shadow-[3px_3px_0px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]">
                    {loading ? "Creating account..." : "Submit"}
                    </button>
                    { error && <p className="text-red-500 font-semibold">{error}</p> }
                </div>
                <p>Already have an account? <Link href={"/auth/login"} className="text-primary font-semibold">Login</Link> </p>
            </form>
        </div>
    );
}
