import Image from "next/image";
import { TiTrash } from "react-icons/ti";

export const CartItem = ({ id, image, name, price, quantity, onClick}) => {
  return (
    <div className="flex  h-full gap-3 border-dashed border-dark border rounded-lg p-2">
      <Image src={image} width={130} height={200} alt={name} />
      <div className="flex flex-col justify-between text-[13px]">
        <span>
          <h3 className="text">{name}</h3>
          <p>{quantity}x</p> <p className="hidden">{id}</p>
        </span>
        <p className="text-primary font-bold">N{price}</p>
      </div>
      <div className="ml-auto flex items-start justify-center">
        <button onClick={() => onClick(id)} className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary transition duration-300">
          <TiTrash size={25}/>
        </button>
      </div>
    </div>
  );
};