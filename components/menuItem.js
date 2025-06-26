import Image from "next/image";
import { CiStar } from "react-icons/ci";

export const MenuItem = ({id, image, name, icons, average_rating, description, price, onClick, tags}) => {

    return (
        <div onClick={onClick} key={id} className="p-2 pb-4 flex flex-col gap-3 border-gray-300 border w-[190px] rounded-lg bg-white active:bg-primary-fade transition duration-500 ease-in-out">
            {image ? (
                <Image src={image} width={120} height={300} className="rounded-md w-full h-[100px]" alt="food image" />
            ) : null}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center gap-2">
                    
                    <h5 className="font-semibold text-wrap w-fit">{name}</h5>
                    <p className="text-xs">{icons}</p>
                </div>
                <div className=" gap-2">
                    <p className="text-[12px] text-gray-500 hidden">{description}</p>
                    {tags.map((tag) => (
                        <p className="hidden" key={tag.id}>{tag}</p>
                        ))
                    }
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[12px] flex justify-between items-center p-[3px] text-secondary rounded-full w-fit px-2 py-1 font-bold"
                        >
                        N{price}
                    </p>
                    <p className="flex items-center gap-1"><CiStar className="text-yellow-500" /> {average_rating}</p>
                </div>
            </div>
        
        </div>
        
    )
}