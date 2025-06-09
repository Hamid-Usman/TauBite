"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/store/useMenu";
import { slideLeft } from "@/framer/slideLeft";
import { CgMenuRightAlt } from "react-icons/cg";
import Link from "next/link";

export default function Layout({ children }) {
    const { openMenu, isOpen, closeMenu } = useMenuStore();

    return (
        <div className=" w-full mx-auto flex flex-col">
            <header className="py-2 px-3 sm:px-14 lg:px-28 w-full sticky z-50 top-0 bg-primary text-white flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <Link href={"/home"} className="text-2xl font-bold text-cream">FoodieHub</Link>

                    <CgMenuRightAlt onClick={!isOpen ? openMenu : closeMenu} />
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
                    <a href="/home/order" className="">Orders</a>
                    <a href="/home/cart" className="">Carts</a>
                    </motion.nav>
                )}
                </motion.div>
            </header>
            
            <main className="py-2 px-3 sm:px-14 lg:px-28 flex flex-col gap-[32px]">
                    {children}
                    </main>
        </div>
    );
}