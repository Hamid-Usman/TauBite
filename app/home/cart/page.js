'use client'
import useGetCart from "@/app/api/getCart";
import food from "../../../public/img/food.jpg";
import { CartItem } from "@/components/cart/cartItem"; 
import { useCartList } from "@/store/useCartItems";
import useAuthStore from "@/store/useUserStore";
import { createOrder } from "@/app/api/createOrder";
import { useEffect } from "react";

function Cart() {

    const {data: carts, isLoading, isError} = useGetCart();
    const CartList = useCartList((state) => state.setCartList);
    const { user, token, fetchUser } = useAuthStore();
    const cartItemIds = carts?.map(item => item.id); // assuming each cart item has a unique ID

    const handlePlaceOrder = async () => {
        try {
            if (!cartItemIds || cartItemIds.length === 0) {
                alert("Your cart is empty");
                return;
            }
            
            const response = await createOrder(cartItemIds);
            console.log("Order successful:", response);
            // Maybe clear the cart or show success message
        } catch (error) {
            console.error("Order failed:", error);
            alert(`Order failed: ${error.message}`);
        }
    };

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

    if ( isError) {
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
                {carts.length > 0 ? (
                    <>
                        <h3 className="font-bold">My Carts (3 Items)</h3>
                        {Array.isArray(carts) && carts.map((data) => (
                            <CartItem key={data.id} image={data.food_item.image} name={data.food_item.name} quantity={data.quantity} price={data.food_item.price} />
                        ))}
                        <div>
                            <label>Delivery/Pickup point</label>
                            <select className="w-full p-2 border-2 border-primary rounded-md focus:outline-none focus:border-primary transition duration-500 ease-in-out">
                                <optgroup label="East Campus">
                                    <option value="east-cafeteria">Cafeteria (East)</option>
                                    <option value="east-noodles-spot">Noodles Spot (East)</option>
                                    <option value="east-boys-hostel">Boys Hostel (East)</option>
                                    <option value="east-girls-hostel">Girls Hostel (East)</option>
                                    <option value="east-clinic">Clinic (East)</option>
                                    <option value="east-staff-quarters">Staff Quarters (East)</option>
                                </optgroup>
                                <optgroup label="West Campus">
                                    <option value="west-cafeteria">Cafeteria (West)</option>
                                    <option value="west-noodles-spot">Noodles Spot (West)</option>
                                    <option value="west-boys-hostel-1">Boys Hostel 1 (West)</option>
                                    <option value="west-boys-hostel-2">Boys Hostel 2 (West)</option>
                                    <option value="west-girls-hostel-1">Girls Hostel 1 (West)</option>
                                    <option value="west-girls-hostel-2">Girls Hostel 2 (West)</option>
                                    <option value="west-management-faculty">Faculty of Management</option>
                                    <option value="west-law-faculty">Faculty of Law</option>
                                    <option value="west-clinic">Clinic (West)</option>
                                    <option value="charlet-guest-house">Guest House (Charlet)</option>
                                    <option value="west-staff-quarters">Staff Quarters (West)</option>
                                </optgroup>
                                <optgroup label="Other Locations">
                                    <option value="omc-clinic">Clinic (OMC)</option>
                                    <option value="works-center">Works Center</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="border-t pt-2 flex justify-between border-dashed">
                            <h4>Total: </h4>
                            <span> N{cartTotalPrice}</span>
                        </div>
                        <button onClick={handlePlaceOrder} className="py-2 w-full bg-primary active:bg-black transition duration-200 ease-in-out text-white rounded-full">Place Order (Payment not implemented yet)</button>
                    </>
                ) : (
                    <p>No Items added to cart yet </p>
                )}
            </div>
        </section>
    )
}

export default Cart