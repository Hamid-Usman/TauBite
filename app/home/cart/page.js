'use client'
import useGetCart from "@/app/api/getCart";
import { CartItem } from "@/components/cart/cartItem"; 
import { useCartList } from "@/store/useCartItems";
import useAuthStore from "@/store/useUserStore";
import { createOrder } from "@/app/api/createOrder";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useDeleteCartItem } from "@/app/api/deleteFromCart";

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
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to load cart items. Please try again later.</div>;
    }

    return (
        <section>
            <div className="flex flex-col gap-3">
                {carts.length > 0 ? (
                    <>
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
                            <label>Delivery/Pickup point</label>
                            <select 
                                value={deliveryLocation}
                                onChange={(e) => setDeliveryLocation(e.target.value)}
                                className="w-full p-2 border-2 border-primary rounded-md focus:outline-none focus:border-primary transition duration-500 ease-in-out"
                            >
                                <option value="">Select location</option>
                                <optgroup label="East Campus">
                                    <option value="east-cafeteria">Cafeteria (East)</option>
                                    {/* other options... */}
                                </optgroup>
                                <optgroup label="Campuses">
                                    <option value="east-campus">East Campus</option>
                                    <option value="west-campus">West Campus</option>
                                </optgroup>
                                
                                {/* Cafeterias */}
                                <optgroup label="Cafeterias">
                                    <option value="east-cafeteria">East Cafeteria (Per Spoon)</option>
                                    <option value="west-cafeteria">West Cafeteria (Per Spoon)</option>
                                </optgroup>
                                
                                {/* Noodle Spots */}
                                <optgroup label="Noodle Spots">
                                    <option value="east-noodles">East Noodles (Per Wrap)</option>
                                    <option value="west-noodles">West Noodles (Per Wrap)</option>
                                </optgroup>
                                
                                {/* Hostels */}
                                <optgroup label="Hostels - East Campus">
                                    <option value="east-male-hostel">Male Hostel</option>
                                    <option value="east-female-hostel">Female Hostel</option>
                                </optgroup>
                                
                                <optgroup label="Hostels - West Campus">
                                    <option value="west-male-hostel-1">Male Hostel 1</option>
                                    <option value="west-male-hostel-2">Male Hostel 2</option>
                                    <option value="west-female-hostel-1">Female Hostel 1</option>
                                    <option value="west-female-hostel-2">Female Hostel 2</option>
                                </optgroup>
                                
                                {/* Faculties */}
                                <optgroup label="Faculties - West Campus">
                                    <option value="management">Management</option>
                                    <option value="law">Law</option>
                                </optgroup>
                                {/* Clinics */}
                                <optgroup label="Clinics">
                                    <option value="east-clinic">East Campus Clinic</option>
                                    <option value="west-clinic">West Campus Clinic</option>
                                    <option value="omc">OMC</option>
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
                                    click here
                                </a>.</p>
                            </div>
                        )}
                    </>
                ) : (
                    <p>No items in your cart yet</p>
                )}
            </div>
        </section>
    )
}

export default Cart;