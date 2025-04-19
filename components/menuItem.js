import Link from "next/link";
import food from "../public/img/food.jpg";
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import { CiStar } from "react-icons/ci";

export const MenuItem = ({ name, image, rating, price, isOpen }) => {
    return (
        
        <div className="rounded-lg bg-white active:bg-primary-fade transition duration-500 ease-in-out w-[160px] flex flex-col gap-2 p-3">
            <Image src={image} alt="food image" />
            <h5 className="font-bold">{name}</h5>
            <p className="text-[14px] flex gap-1 items-center"><CiStar size={15} className="text-warning"/> {rating}</p>
            <p className="text-[12px] font-light flex justify-between items-center">N{price} <IoIosAddCircle size={24} onClick={isOpen} className="text-primary"/></p>
        </div>
        
    )
}