import food from "../../public/img/food.jpg";
import { CartItem } from "@/components/cart/cartItem";

export default function Cart() {
    const cartData = [
        {id: 1, image: food, name:"Salmon", price: 2000}
    ]
    return (
        <section>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold">My Carts (3 Items)</h3>
                {cartData.map((data) => (

                    <CartItem key={data.id} image={data.image} name={data.name} price={data.price} />
                ))}

                <div className="border-t pt-2 flex justify-between border-dashed">
                    <h4>Total: </h4>
                    <span> N2400</span>
                </div>
                <button className="py-2 w-full bg-primary active:bg-black transition duration-200 ease-in-out text-white rounded-full">Place Order</button>
            </div>
        </section>
    )
}