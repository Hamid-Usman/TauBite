"use client"
import useGetOrders from "@/app/api/getOrders";
import { OrderTable } from "@/components/orderTable";
import { BarLoader } from "@/framer/loader/barLoader";
import { OrderLog } from "@/framer/modals/orderLog";
import useAuthStore from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import { useOrderStore } from "@/store/useOrderStore";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
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
            id: order.id
        });
    };

    if (isLoading)
        return <div className="flex flex-col items-center justify-center h-screen">
            <Image
            width={200} height={200}
                src="/svg/list-animate.svg" alt="img" />
            <BarLoader />
            <p className="text-center">Loading foods...</p>
        </div>;
    if (isError) return <p>Error loading orders: {error?.message}</p>;

    return (
        <section>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold">My Orders</h3>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 text-left w-1/4">Order ID</th>
                                <th className="p-2 text-left w-1/4">Date</th>
                                <th className="p-2 text-left w-1/4">Total</th>
                                <th className="p-2 text-left w-1/4">Status</th>
                            </tr>
                        
                        </thead>
                        <tbody className="">
                            {orders && orders.length > 0 ? (
                                orders.map((order) => (
                                    <OrderTable
                                        key={order.id}
                                        id={order.id}
                                        order_date={order.order_date}
                                        total_sum={order.total_sum}
                                        status={order.status}
                                        onClick={() => handleOrderClick(order)}
                                    />
                                ))
                            ) : (
                                <p>No orders made yet</p>
                            )}
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