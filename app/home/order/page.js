"use client"
import useGetOrders from "@/app/api/getOrders";
import { OrderLog } from "@/framer/modals/orderLog";
import useAuthStore from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import { useOrderStore } from "@/store/useOrderStore";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Carts() {
    const { isOpen, openModal, modalData, closeModal } = useModalStore();
    const orders = useOrderStore((state) => state.orders);  // Get orders from store
    const setOrders = useOrderStore((state) => state.setOrders);  // Get setter function
    const { data: fetchedOrders, isLoading, error, isError } = useGetOrders();
    const { user, fetchUser } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        if (fetchedOrders) {
            setOrders(fetchedOrders);  // Update store when data is fetched
        }
    }, [fetchedOrders, setOrders]);

    const handleOrderClick = (order) => {
        openModal({
            food_items: order.food_items,
            status: order.status,
            total_sum: order.total_sum,
            order_id: order.order_id
        });
    };

    if (isLoading) return <p>Loading orders...</p>;
    if (isError) return <p>Error loading orders: {error?.message}</p>;

    return (
        <section>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold">My Orders</h3>
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order.order_id}
                            onClick={() => handleOrderClick(order)}
                            className="sm:w-[480px] flex justify-between bg-gray-300 rounded-lg p-2 cursor-pointer"
                        >
                            <p>{order.order_id}</p>
                            <p>Total: ₦{order.total_sum.toFixed(2)}</p>
                            <p>Status: {order.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No orders made yet</p>
                )}
            </div>
            
            <AnimatePresence>
                {isOpen && modalData && (
                    <OrderLog
                        onClick={closeModal}
                        food_items={modalData.food_items}
                        status={modalData.status}
                        total_sum={modalData.total_sum}
                        order_id={modalData.order_id}
                        
                    />
                )}
            </AnimatePresence>
        </section>
    )
}