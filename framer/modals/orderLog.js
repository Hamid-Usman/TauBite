// components/orderLog.tsx
"use client";
import { Backdrop } from "../backdrop";
import { motion } from "framer-motion";
import { ReviewModal } from "./reviewModal";
import { useReviewModalStore } from "@/useReviewModalStore";
import useAuthStore from "@/store/useAuthStore";

import { useUpdateOrderStatus } from "@/app/api/orderStatus";
import { useAdminOrderStore } from "@/store/admin/useAdminOrder";
import { useState } from "react";

export const OrderLog = ({ food_items, total_sum,
  status, id, onClick }) => {
  const { formOpen, openForm } = useReviewModalStore();
  const { mutate: updateOrderStatus } = useUpdateOrderStatus();
  const [localStatus, setLocalStatus] = useState(status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setLocalStatus(newStatus)
    updateOrderStatus({ id, status: newStatus });
  };
  const user = useAuthStore((state) => state.user);
  return (
    <Backdrop onClick={onClick}>
      <motion.div
        className="bg-white rounded-lg p-4 shadow-lg w-[340px] lg:w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-2">Order #{id} Details</h2>

        {Array.isArray(food_items) &&
          food_items.map((item) => (
            <div key={item.id} className="flex items-center gap-2 mb-3 border-b pb-2">
              <p>
                {item.name} x {item.quantity} (${item.price_at_order})
              </p>
              {!user.is_staff && (
                
                <button
                  className={`mt-1 px-3 py-1 text-sm bg-blue-500 text-white rounded ${item.status !== "delivered" ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() =>
                    openForm({
                      item,
                      id,
                    })
                  }
                >
                  Leave a Review
                </button>
              )}
            </div>
          ))}

        <p>Total Price: ₦{total_sum}</p>
        <p className="mt-5">
          Package Status: {!user.is_staff ? <span>{status}</span> :
          
          <select value={status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivering">Delivering</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
          </select>
          }
        </p>

        {formOpen && <ReviewModal />}
      </motion.div>
    </Backdrop>
  );
};
