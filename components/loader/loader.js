import { BarLoader } from "@/framer/loader/barLoader"
import Image from "next/image"

export const Loader = (src, text) => {
    <div className="flex flex-col items-center justify-center h-screen">
        <Image
        width={200} height={200}
            src={src} alt="img" />
        <BarLoader />
        <p className="text-center">{text}</p>
    </div>
}