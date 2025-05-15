"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Fonts
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <QueryClientProvider client={queryClient}>
            <main className="py-2 px-3 sm:px-14 lg:px-28 flex flex-col gap-[32px]">
                {children}
            </main>
            <footer className="bg-primary flex gap-[24px] flex-wrap items-center justify-center"></footer>
            </QueryClientProvider>
        </body>
        </html>
    );
}
