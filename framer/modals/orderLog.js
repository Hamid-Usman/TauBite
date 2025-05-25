// components/orderLog.tsx
"use client";
import { Backdrop } from "../backdrop";
import { motion } from "framer-motion";
import { ReviewModal } from "./reviewModal";
import { useReviewModalStore } from "@/useReviewModalStore";

export const OrderLog = ({ food_items, status, total_sum, order_id, onClick }) => {
  const { formOpen, openForm } = useReviewModalStore();

  return (
    <Backdrop onClick={onClick}>
      <motion.div
        className="bg-white rounded-lg p-4 shadow-lg w-[340px] lg:w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-2">Order Details</h2>

        {Array.isArray(food_items) &&
          food_items.map((item) => (
            <div key={item.id} className="flex items-center gap-2 mb-3 border-b pb-2">
              <p>
                {item.name} x {item.quantity} (${item.price_at_order})
              </p>
              <button
                className="mt-1 px-3 py-1 text-sm bg-blue-500 text-white rounded"
                onClick={() =>
                  openForm({
                    item,
                    order_id,
                  })
                }
              >
                Leave a Review
              </button>
            </div>
          ))}

        <p>Total Price: ₦{total_sum}</p>
        <p className="mt-5">
          Status: <span className="font-bold">{status}</span>
        </p>

        {formOpen && <ReviewModal />}
      </motion.div>
    </Backdrop>
  );
};
