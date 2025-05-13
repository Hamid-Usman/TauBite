'use client'
import useGetCart from "@/app/api/getCart";
import food from "../../../public/img/food.jpg";
import { CartItem } from "@/components/cart/cartItem"; 
import { useCartList } from "@/store/useCartItems";
import useAuthStore from "@/store/useUserStore";
import { useEffect } from "react";

function Cart() {

    const {data: carts, isLoading, isError} = useGetCart();
    const CartList = useCartList((state) => state.setCartList);
    const { user, token, fetchUser } = useAuthStore();

    useEffect(() => {
        if (token && !user) {
            fetchUser();
        }
    }, [token, user, fetchUser]);

    useEffect(() => {
        if (carts) {
            CartList(carts);
        }
    }, [carts, CartList]);

    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to load foods. Please try again later.</div>;
    }

    const cartTotalPrice = carts?.reduce((total, item) => {
        const price = parseFloat(item.food_item.price);
        const quantity = parseInt(item.quantity);
        return total + (price * quantity);
    }, 0) ?? 0;
    return (
        <section>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold">My Carts (3 Items)</h3>
                {Array.isArray(carts) && carts.map((data) => (
  <CartItem key={data.id} image={data.food_item.image} name={data.food_item.name} quantity={data.quantity} price={data.food_item.price} />
))}
                <div className="border-t pt-2 flex justify-between border-dashed">
                    <h4>Total: </h4>
                    <span> N{cartTotalPrice}</span>
                </div>
                <button className="py-2 w-full bg-primary active:bg-black transition duration-200 ease-in-out text-white rounded-full">Place Order</button>
            </div>
        </section>
    )
}

export default Cart