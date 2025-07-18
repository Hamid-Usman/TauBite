"use client"
import { useAllOrders } from "@/app/api/admin/allOrders";
import { OrderLog } from "@/framer/modals/orderLog";
import useAuthStore from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import { useAdminOrderStore } from "@/store/admin/useAdminOrder";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { OrderTable } from "@/components/orderTable";

export default function Carts() {
    const { isOpen, openModal, modalData, closeModal } = useModalStore();
    const { orders, setOrders } = useOrderStore();  // Get setter function
    const { data: fetchedOrders, isLoading, error, isError } = useAllOrders();
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
            id: order.id
        });
    };

    if (isLoading) return <p>Loading orders...</p>;
    if (isError) return <p>Error loading orders: {error?.message}</p>;

    return (
        <section>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold">My Orders</h3>
                    <table className="w-full">
                        <thead className="w-full">
                            <tr className="w-full bg-gray-200">
                                <th className="p-2 text-left w-1/4">Order ID</th>
                                <th className="p-2 text-left w-1/4">Date</th>
                                <th className="p-2 text-left w-1/4">Time</th>
                                <th className="p-2 text-left w-1/4">Total</th>
                                <th className="p-2 text-left w-1/4">Status</th>
                            </tr>
                        
                        </thead>
                        <tbody className="">
                            {orders.map((order) => (
                                <OrderTable
                                    key={order.id}
                                    id={order.id}
                                    total_sum={order.total_sum}
                                    status={order.status}
                                    onClick={() => handleOrderClick(order)}
                                />
                            ))}
                        </tbody>
                    </table>
            </div>
            
            <AnimatePresence>
                {isOpen && modalData && (
                    <OrderLog
                        onClick={closeModal}
                        food_items={modalData.food_items}
                        status={modalData.status}
                        total_sum={modalData.total_sum}
                        id={modalData.id}
                        
                    />
                )}
            </AnimatePresence>
        </section>
    )
}