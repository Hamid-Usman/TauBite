"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/store/useMenu";
import { slideLeft } from "@/framer/slideLeft";
import { CgMenuRightAlt } from "react-icons/cg";

export default function Layout({ children }) {
    const { openMenu, isOpen, closeMenu } = useMenuStore();

    return (
        <div className=" w-full mx-auto flex flex-col">
            <header className="py-2 px-3 sm:px-14 lg:px-28 w-full sticky z-50 top-0 bg-primary text-white flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My App</h1>

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
                    <a href="" className="">Orders</a>
                    <a href="/cart" className="">Carts</a>
                    <a href="#" className="">Contact</a>
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