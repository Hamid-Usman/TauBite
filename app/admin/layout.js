"use client"
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaBox } from "react-icons/fa";
import { RiAddCircleFill } from "react-icons/ri";
import { IoFastFoodSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/store/useMenu";
import { slideLeft } from "@/framer/slideLeft";
import Link from "next/link";
import { NavLink } from "./components/navLink";

export default function Layout({ children }) {
    const { openMenu, isOpen, closeMenu } = useMenuStore();

    return (
        <div className=" p-5 w-full h-fit mx-auto flex">
            <aside className="text-dark py-2 w-[200px] h-screen fixed top-5 z-50 top-0 bg-gray_back text-white rounded-xl flex flex-col gap-5">
                <div className="px-5 flex items-center justify-between">
                    <Link href={"/home"} className="text-2xl text-dark font-bold">FoodieHub</Link>

                    {/* <CgMenuRightAlt onClick={!isOpen ? openMenu : closeMenu} /> */}
                </div> 
                <div>
                    <p className="text-dark font-bold">Menu</p>
                    <nav className="flex flex-col gap-2 mt-2">
                        
                        <NavLink 
                            to="/admin"
                            label="Dashboard"
                            icon={<TbLayoutDashboardFilled  size={24}/>}
                        />
                        <NavLink 
                            to="/admin/addProduct"
                            label="Add Product"
                            icon={<IoFastFoodSharp size={24}/>}
                        />
                        <NavLink 
                            to="/admin/orders"
                            label="Orders"
                            icon={<FaBox size={24}/>}
                        />
                        <NavLink
                            to="/admin/reviews"
                            label="reviews"
                            icon={<RiAddCircleFill size={24}/>}
                        />
                    </nav>
                </div>
                <motion.div
                initial={{ y: -30, height: "0px" }}
                animate={{ y: 0, height: isOpen ? "100vh" : "0px" }}
                exit={{ y: -30, height: "0px", delay: 1 }}
                transition={{ duration: 0.6 }}
                >
                {isOpen && (
                    <motion.nav
                    initial={slideLeft.initial}
                    animate={slideLeft.animate}
                    exit={slideLeft.exit}
                    transition={{ duration: 0.8, delay: 0.2 }} // delay to start after base div finishes
                    className="flex flex-col mt-5 gap-4 h-full"
                    >
                    <a href="/home/order" className="">Others</a>
                    </motion.nav>
                )}
                </motion.div>
            </aside>
            
            <main className="pl-[220px] w-full h-screen px-3  flex flex-col gap-[32px]">
                    {children}
                    </main>
        </div>
    );
}