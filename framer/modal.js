
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import Image from "next/image";
import { useCounterStore } from "@/store/useCounterStore";
import { Backdrop } from "./backdrop";
import { useState } from "react";
import { useAddToCartMutation } from "@/app/api/addToCart";
import useAuthStore from "@/store/useAuthStore";
import { useStatusStore } from "@/store/useStatusStore";
import { useSubmitStore } from "@/store/useSubmitStore";

const SpringModal = ({ data }) => {
  const { count, increment, decrement, reset } = useCounterStore();
  const { isOpen, modalData, closeModal } = useModalStore();
  const { submitting, setSubmitting } = useSubmitStore();
  const {success, setSuccess, error, setError} = useStatusStore()

  const { mutate: addItemToCart } = useAddToCartMutation();

  // Calculate total price dynamically
  const totalPrice = modalData ? modalData.price * count : 0;

  // Handle adding items to the cart (with API and state)
  const handleAddToCart = () => {
    if (!modalData) return;

    setSubmitting(true);
    setSuccess('')
    setError('')

    // Payload for adding to the cart
    const payload = {
        food_item: modalData.id, // Use modalData.id for the food item
        quantity: count, // Use the count as the quantity
      };

    // Call the API mutation
    addItemToCart(payload, {
      onSuccess: () => {
        console.log(`${modalData.name} x${count} added to cart`);
        reset();
        setSuccess( `${count} ${modalData.name} added to cart!`)
        setSubmitting(false);

      },
      onError: (err) => {
        setError("Error adding item to cart:", err);
        setSubmitting(false);
      },
    });
  };

  const handleCloseModal = (e) => {
    reset();
    setSuccess('')
    setError('')
    e.stopPropagation();
    closeModal();
  };

  const token = useAuthStore.getState().token
  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop onClick={handleCloseModal}>
          <motion.div
            initial={{ y: 50, transition: { duration: 0.5 } }}
            animate={{ y: -50, rotate: "0deg" }}
            exit={{ y: 50, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-dark p-4 h-fit rounded-lg w-[320px] md:w-[720px] shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="md:flex relative z-10 w-full">
              <div className="bg-white md:w-fit h-full mb-2 rounded-full text-3xl grid place-items-center mx-auto">
                <Image
                  src={modalData?.image}
                  alt={modalData?.name}
                  className="w-[250px] h-[250px]"
                  width={50}
                  height={50}
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-2">{modalData?.name}</h3>
                <p className="h">
                  {modalData?.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  
                  {modalData?.tags.map((tag) => (
                      <p className="p-2 rounded-md bg-gray-300" key={tag.id}>{tag}</p>
                  ))}
                </div>

                <div className="flex flex-row justify-between items-center gap-3">
                  
                  <div className="flex gap-5">
                    <h3 className="font-bold text-lg">N{totalPrice}</h3>
                    <div className="bg-gray-200 w-fit rounded-full flex gap-2 items-center">
                      <button
                        onClick={decrement}
                        type="button"
                        className="flex items-center justify-center cursor-pointer rounded-full w-8 h-8 bg-secondary text-white"
                      >
                        -
                      </button>
                      {count}
                      <button
                        onClick={increment}
                        type="button"
                        className="flex justify-center items-center cursor-pointer rounded-full w-8 h-8 bg-secondary text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={submitting}
                    className="bg-primary hover:bg-primary-fade transition duration-300 text-white hover:opacity-90 w-fit px-4 py-2 rounded-full"
                  >
                    {submitting ? "Adding..." : "Add to cart"}
                  </button>
                </div>
                {success && <p className="text-green-500">{success}</p>}
                {error && <p className="text-red-500">{error}</p>}
                  
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;