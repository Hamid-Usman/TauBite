"use client"
import { OrderLog } from "@/framer/modals/orderLog";
import { useModalStore } from "@/store/useModalStore";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Carts() {
    const { isOpen, openModal, modalData, closeModal} = useModalStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchOrders() {
        try {
          const res = await fetch("/api/order"); // replace with your actual API endpoint
          const data = await res.json();
          setOrders(data);
        } catch (err) {
          console.error("Failed to fetch orders:", err);
        } finally {
          setLoading(false);
        }
      }
  
      fetchOrders();
    }, []);
  
    if (loading) return <p>Loading orders...</p>;
  
    return (
        <section>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold">My Orders</h3>
                
        {orders.map((order) => (
          <div
            key={order.order_id}
            onClick={() => openModal({ food_items: order.food_items, quantity: order.quantity, status: order.status, total_sum: order.total_sum})}
            className="sm:w-[480px] flex justify-between bg-gray-300 rounded-lg p-2 cursor-pointer"
          >
            <p>{order.order_id}</p>
          </div>
        ))}
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