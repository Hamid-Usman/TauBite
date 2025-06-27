'use client'
import useGetCart from "@/app/api/getCart";
import { CartItem } from "@/components/cart/cartItem"; 
import { useCartList } from "@/store/useCartItems";
import useAuthStore from "@/store/useUserStore";
import { createOrder } from "@/app/api/createOrder";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useDeleteCartItem } from "@/app/api/deleteFromCart";
import Image from "next/image";
import { BarLoader } from "@/framer/loader/barLoader";

function Cart() {
    const {data: carts, isLoading, isError} = useGetCart();
    const CartList = useCartList((state) => state.setCartList);
    const { user, token, fetchUser } = useAuthStore();
    const { clearCart } = useCartStore();
    const cartItemIds = carts?.map(item => item.id);
    const {mutate: deleteCartItem} = useDeleteCartItem();
    const [deliveryLocation, setDeliveryLocation] = useState("");
    const [paymentInitiated, setPaymentInitiated] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState("");

    const handlePlaceOrder = async () => {
        try {
            if (!cartItemIds || cartItemIds.length === 0) {
                alert("Your cart is empty");
                return;
            }
            
            if (!deliveryLocation) {
                alert("Please select a delivery location");
                return;
            }
            
            setPaymentInitiated(true);
            const response = await createOrder(cartItemIds, deliveryLocation);
            
            if (response.payment_url) {
                setPaymentUrl(response.payment_url);
                window.open(response.payment_url, '_blank');
            } else {
                alert("Order created successfully!");
                clearCart();
            }
            
        } catch (error) {
            console.error("Order failed:", error);
            alert(`Order failed: ${error.message}`);
            setPaymentInitiated(false);
        }
    };

    const handleDelete = (id) => {
        deleteCartItem({ id})
        window.location.reload();
    }

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

    const cartTotalPrice = carts?.reduce((total, item) => {
        const price = parseFloat(item.food_item.price);
        const quantity = parseInt(item.quantity);
        return total + (price * quantity);
    }, 0) ?? 0;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Image
                width={200} height={200}
                    src="/svg/cart-animate.svg" alt="img" />
                <BarLoader />
                <p className="text-center">Loading Cart...</p>
            </div>
        )
    }

    if (isError) {
        return <div>Failed to load cart items. Please try again later.</div>;
    }
    if (!carts || carts.length === 0) {
        return <div className="flex flex-col items-center justify-center h-[85vh]">
            <Image
            width={200} height={200}
                src="/svg/empty-animate.svg" alt="img" />
            <p className="text-center">No items in your cart yet</p>
        </div>;
    }

    return (
        <section>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold">My Cart ({carts.length} Items)</h3>
                {Array.isArray(carts) && carts.map((data) => (
                    <CartItem 
                        key={data.id} 
                        id={data.id} 
                        image={data.food_item.image} 
                        name={data.food_item.name} 
                        quantity={data.quantity} 
                        price={data.food_item.price} 
                        onClick={handleDelete}
                    />
                ))}
                <div>
                    <label>Drop Zone/Delivery point</label>
                    <select 
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        className="scroll-smooth w-full p-2 border-2 border-primary rounded-md focus:outline-none focus:border-primary transition duration-500 ease-in-out"
                    >
                        <optgroup label="Off-Campus">
                            <option value="Jambulu">Jambulu</option>
                            <option value="Zango">Zango</option>
                            <option value="Danraka">Danraka</option>
                            <option value="Shika">Shika</option>
                            {/* other options... */}
                        </optgroup>
                        <optgroup label="Main Campus">
                            <option value="Suleiman Hall">Suleiman Hall</option>
                            <option value="Amina Hall">Amina Hall</option>
                            <option value="Ribadu Hall">Ribadu Hall</option>
                            <option value="Dangote Hall">Dangote Hall</option>
                            {/* other options... */}
                        </optgroup>
                        {/* other optgroups... */}
                    </select>
                </div>
                <div className="border-t pt-2 flex justify-between border-dashed">
                    <h4>Total: </h4>
                    <span> ₦{cartTotalPrice.toFixed(2)}</span>
                </div>
                <button 
                    onClick={handlePlaceOrder}
                    disabled={paymentInitiated}
                    className={`py-2 w-full bg-primary active:bg-black transition duration-200 ease-in-out text-white rounded-full ${
                        paymentInitiated ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {paymentInitiated ? 'Processing Payment...' : 'Proceed to Payment'}
                </button>
                
                {paymentUrl && (
                    <div className="text-sm text-center mt-2">
                        <p>Payment window opened in new tab. If it didnt open, <a 
                            href={paymentUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            click here.
                        </a></p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Cart;