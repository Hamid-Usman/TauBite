"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/store/useMenu";
import { slideLeft } from "@/framer/slideLeft";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoMdAnalytics } from "react-icons/io";
import Link from "next/link";
import { TbPackages } from "react-icons/tb";

export default function Layout({ children }) {
    const { openMenu, isOpen, closeMenu } = useMenuStore();

    return (
        <div className=" p-5 w-full h-fit mx-auto flex">
            <aside className="text-dark py-2 px-3 w-[200px] h-screen fixed top-5 z-50 top-0 bg-gray_back text-white rounded-xl flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <Link href={"/home"} className="text-2xl text-dark font-bold">FoodieHub</Link>

                    {/* <CgMenuRightAlt onClick={!isOpen ? openMenu : closeMenu} /> */}
                </div>
                <div>
                    <p className="text-dark font-bold">Menu</p>
                    <ol className="flex flex-col gap-2 mt-2">
                        <li className="text-dark">Add Item</li>
                        <li className="text-dark font-bold flex gap-2 items-center">
                            <TbPackages size={24} className="text-primary"/>
                            Order Log
                        </li>
                        <li className="text-dark flex gap-2 items-center">
                            <IoMdAnalytics size={24} className="text-primary"/>
                            Reviews
                        </li>
                    </ol>
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
            
            <main className="h-screen py-2 px-3  flex flex-col gap-[32px]">
                    {children}
                    </main>
        </div>
    );
}