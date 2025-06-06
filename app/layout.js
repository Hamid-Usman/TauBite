"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { useMenuStore } from "@/store/useMenu";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { slideLeft } from "@/framer/slideLeft";

// Fonts
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
    const { openMenu, isOpen, closeMenu } = useMenuStore()
    const pathname = usePathname();
    const [queryClient] = useState(() => new QueryClient());

    const renderBody = () => (
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
    );

    if (pathname.startsWith("/home") || pathname.startsWith("/cart")) {
        return (
        <html lang="en">
            <head>
            <link rel="icon" href="/favicon/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="true"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@100..900&display=swap"
                rel="stylesheet"
            />
            </head>
            <body>{renderBody()}</body>
        </html>
        );
    }

    return (
        <html lang="en">
        <body className={`${inter.variable} antialiased`}>
            <QueryClientProvider client={queryClient}>
            <header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-5 bg-primary text-cream">
                <h1 className="text-2xl">FoodieHub</h1>
                <nav>
                    
                    <CgMenuRightAlt className="md:hidden" onClick={!isOpen ? openMenu : closeMenu} />
                    <ul className="hidden md:flex gap-2">
                        <li>GitHub</li>
                        <li>GitHub</li>
                    </ul>
                </nav>
            </header>
            {isOpen && (
                <motion.ul
                initial={{y: -600}}
                animate={{y: 0}}
                exit={{y: -100}}
                transition={{ duration: 0.8, delay: 0.2 }} className="h-full px-6 text-cream bg-primary fixed w-full z-40 flex flex-col gap-2">
                    <li>GitHub</li>
                    <li>GitHub</li>
                </motion.ul>
            )}
            <main className="">
                {children}
            </main>
            <footer className="bg-primary flex gap-[24px] flex-wrap items-center justify-center"></footer>
            </QueryClientProvider>
        </body>
        </html>
    );
}
