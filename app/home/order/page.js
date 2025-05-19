"use client"
import useGetOrders from "@/app/api/getOrders";
import { OrderLog } from "@/framer/modals/orderLog";
import useAuthStore from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import { useOrderStore } from "@/store/useOrderStore";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Carts() {
    const { isOpen, openModal, modalData, closeModal} = useModalStore();
    const { setOrders } = useOrderStore();
    const { data: orders, isLoading, isError} = useGetOrders();
    const [loading, setLoading] = useState(true);
    const { user, fetchUser } = useAuthStore();
    useEffect(() => {
  
      fetchUser()
    }, [fetchUser]);
  
    useEffect(() => {
      if (orders){
        setOrders(orders)
      }
    }, [orders, setOrders])
    if (isLoading) return <p>Loading orders...</p>;
  
    return (
        <section>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold">My Orders</h3>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                  <div
                    key={order.order_id}
                    onClick={() => openModal({ food_items: order.food_items, quantity: order.quantity, status: order.status, total_sum: order.total_sum})}
                    className="sm:w-[480px] flex justify-between bg-gray-300 rounded-lg p-2 cursor-pointer"
                  >
                    <p>{order.order_id}</p>
                  </div>
                ))
                ) : <p>No orders made</p>}
            </div>
            <AnimatePresence>
            {isOpen && modalData && (
                <OrderLog
                onClick={closeModal}
                food_items={modalData.food_items}
                quantity={modalData.quantity}
                status={modalData.status}
                total_sum={modalData.total_sum}
                />
            )}
            </AnimatePresence>
        </section>
    )
}