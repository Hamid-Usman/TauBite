import Image from "next/image";

export const CartItem = ({ image, name, price, quantity }) => {
  return (
    <div className="flex h-full gap-3 border-dashed border-dark border rounded-lg p-2">
      <Image src={image} width={130} height={200} alt={name} />
      <div className="flex flex-col justify-between text-[13px]">
        <span>
          <h3 className="text">{name}</h3>
          <p>{quantity}x</p>
        </span>
        <p className="text-primary font-bold">N{price}</p>
      </div>
    </div>
  );
};