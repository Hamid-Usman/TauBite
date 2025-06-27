"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/store/useMenu";
import { slideLeft } from "@/framer/slideLeft";
import { CgMenuRightAlt } from "react-icons/cg";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";

export default function Layout({ children }) {
    const { openMenu, isOpen, closeMenu } = useMenuStore();
    const { user, fetchUser} = useAuthStore();

    return (
        <div className=" w-full mx-auto flex flex-col">
            <header className="py-2 px-3 sm:px-14 lg:px-28 w-full sticky z-50 top-0 bg-primary text-white flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <Link href={"/home"} onClick={closeMenu} className="text-2xl font-bold text-cream">FoodieHub</Link>

                    <CgMenuRightAlt className="sm:hidden" onClick={!isOpen ? openMenu : closeMenu} />
                    <div className="md:flex gap-3 hidden">
                        
                        <Link href="/home/cart" className="">Carts</Link>
                        <Link href="/home/order" className="">Orders</Link>

                    </div>
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
                        
                        <Link href="/home/cart" onClick={closeMenu} className="">Carts</Link>
                        <Link href="/home/order" onClick={closeMenu} className="">Orders</Link>
                    </motion.nav>
                )}
                </motion.div>
            </header>
            
            <main className=" sm:h-screen py-2 px-3 sm:px-14 lg:px-28 flex flex-col gap-[32px]">
                {children}
            </main>

            <footer className="static bottom-2 bg-primary flex py-1 gap-[24px] flex-wrap items-center justify-center">
                <p className="text-cream text-sm">
                    © By Hamid Usman
                </p>
                <ul className="flex flex-col sm:flex-row text-center gap-4 text-cream text-sm">
                    <li>Powered by: NextJS Django Tailwind FramerMotion</li>
                    <li>
                        <Link className="" href={"https://github.com/Hamid-Usman/TauBite"}>Github</Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
}