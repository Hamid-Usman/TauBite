import Link from "next/link";
import food from "../public/img/food.jpg";
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import { CiStar } from "react-icons/ci";

export const MenuItem = ({id, image, name, rating, price, onClick }) => {

    return (
        <div onClick={onClick} key={id} className="w-[330px] rounded-lg bg-white active:bg-primary-fade transition duration-500 ease-in-out flex gap-4 p-3">
            <Image src={image} width={120} height={300} className="w-[120px] h-[100px]" alt="food image" />
            <div>
                <h5 className="font-semibold text-wrap w-fit">{name}</h5>
                <div className="flex gap-2">
                    <p className="text-[12px] flex justify-between items-center p-[3px] bg-gray-200 rounded-full font-bold">N{price}</p>
                    <p className="text-[14px] flex gap-1 items-center"><CiStar size={15} className="text-warning"/> {rating}</p>
                </div>
            </div>
        
        </div>
        
    )
}