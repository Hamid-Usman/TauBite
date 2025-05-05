"use client"
import { OrderLog } from "@/framer/modals/orderLog";
import { useModalStore } from "@/store/useModalStore";
import { AnimatePresence } from "framer-motion";

export default function Carts() {
    const { isOpen, openModal, modalData, closeModal} = useModalStore();

    return (
        <section>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold">My Orders</h3>
                <div 
                    onClick={() => openModal({ item: "salmon", quantity: 2 })} className="flex justify-between bg-gray-300 rounded-lg p-2">
                    <p>Cart from Restaurant</p>
                    <p>ID</p>
                </div>
            </div>
            <AnimatePresence>
            {isOpen && modalData && (
                <OrderLog
                onClick={closeModal}
                item={"ww"}
                quantity={2}
                />
            )}
            </AnimatePresence>
        </section>
    )
}