import Image from "next/image";
import { CiStar } from "react-icons/ci";

export const MenuItem = ({id, image, name, description, price, onClick }) => {

    return (
        <div onClick={onClick} key={id} className="w-[330px] rounded-lg bg-white active:bg-primary-fade transition duration-500 ease-in-out flex gap-4 p-3">
            {image ? (
                <Image src={image} width={120} height={300} className="w-[120px] h-[100px]" alt="food image" />
            ) : null}
            <div>
                <h5 className="font-semibold text-wrap w-fit">{name}</h5>
                <div className="flex gap-2">
                    {/* <CiStar className="text-yellow-500" /> */}
                    <p className="text-[12px] text-gray-500 hidden">{description}</p>
                    <p className="text-[12px] flex justify-between items-center p-[3px] bg-gray-200 rounded-full font-bold">N{price}</p>
                </div>
            </div>
        
        </div>
        
    )
}