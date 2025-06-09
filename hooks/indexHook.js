import { useIndexStore } from "@/store/useIndexStore";
import { useEffect } from "react";

export const UseSlide = (slideCount, delay) => {
    const { nextSlide } = useIndexStore();
    useEffect(() => {
    const interval = setInterval(() => {
        nextSlide(slideCount);
    }, delay); // 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
    }, [nextSlide, slideCount, delay]);
};