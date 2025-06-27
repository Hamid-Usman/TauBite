// components/orderLog.tsx
"use client";
import { Backdrop } from "../backdrop";
import { motion } from "framer-motion";
import { ReviewModal } from "./reviewModal";
import { useReviewModalStore } from "@/useReviewModalStore";
import useAuthStore from "@/store/useAuthStore";

import { useUpdateOrderStatus } from "@/app/api/orderStatus";
import { useAdminOrderStore } from "@/store/admin/useAdminOrder";
import { useEffect, useState } from "react";
import { UseItemReview } from "@/app/api/getReview";
import { useReviewStore } from "@/store/useReviewStore";

export const OrderLog = ({ food_items, total_sum,
  status, id, onClick }) => {
  const { formOpen, openForm } = useReviewModalStore();
  const { mutate: updateOrderStatus } = useUpdateOrderStatus();
  const [localStatus, setLocalStatus] = useState(status);
  const { data: fetchedReviews } = UseItemReview(id)
  const { reviews, setReviews } = useReviewStore()

  useEffect(() => {
    if (fetchedReviews) {
      setReviews(fetchedReviews)
    }}
  , [fetchedReviews, setReviews])

  console.log(reviews)

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
  food_items.map((item) => {
    const review = reviews.find((r) => r.order_item === item.order_item_id);

    return (
      <div key={item.order_item_id} className={`flex gap-1 mb-3 border-b pb-2 ${review ? "flex-col" : " items-center justify-between"}`}>
        <p>
          {item.name} x {item.quantity} (${item.price_at_order})
        </p>

        {review ? (
          <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
            <p className="font-medium text-gray-700">✓ Reviewed</p>
            <p className="text-xs">Comment: {review.comment}</p>
            <p className="text-xs">Rating: {review.rating} / 5</p>
          </div>
        ) : (
          user?.is_staff &&
          localStatus === "Completed" && (
            <button
              className="mt-1 px-3 py-1 text-sm bg-primary text-white rounded"
              onClick={() =>
                openForm({
                  item,
                  id,
                })
              }
            >
              Leave a Review
            </button>
          )
        )}
      </div>
    );
  })}



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
