"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import Image from "next/image";
import { useCounterStore } from "@/store/useCounterStore";
import { CiStar } from "react-icons/ci";
import useCartStore from "@/store/useCartState";
import { Backdrop } from "./backdrop";


const SpringModal = ({data}) => {
    const { count, increment, decrement, reset } = useCounterStore()
    const { isOpen, modalData, closeModal } = useModalStore()
    const { addToCart } = useCartStore()
    const totalPrice = (modalData?.price ?? 0) * count
    
    
    const handleAddToCart = () => {
        if (!modalData) return;

        for (let i = 0; i < count; i++) {
            addToCart({
              id: modalData.id,
              name: modalData.name,
              price: modalData.price,
              image: modalData.image,
            });
          }

        console.log(`${modalData.name} x${count} added to cart`);
        reset()
        closeModal(); // Optional: close after adding
    };

    const handleCloseModal = (e) => {
        reset()
        e.stopPropagation()
        closeModal()
    }

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop onClick={handleCloseModal}>
          <motion.div
            initial={{ y: 50, transition: { duration: 0.5 } }}
            animate={{ y: -50, rotate: "0deg" }}
            exit={{ y: 50, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-dark p-4 h-fit rounded-lg w-[320px] max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="bg-white w-full h-full mb-2 rounded-full text-3xl grid place-items-center mx-auto">
                
              <Image
                    src={modalData.image}
                    alt={modalData.name}
                    className="w-full h-[250px]"
                    width={50}
                    height={50}
                  />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {modalData.name}
              </h3>
              <p className=" mb-6">
                lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
              </p>
              {/*
              <div className="flex items-center">
                <CiStar size={15} className="text-warning"/>
                {modalData.rating}
              </div>
              **/}
              <div className="my-2 flex items-center gap-5">
                <h3 className="font-bold text-lg">N{totalPrice}</h3>
                <div className="bg-gray-200 w-fit rounded-full flex gap-2 items-center">
                  <button onClick={decrement} type="button" className="flex items-center justify-center cursor-pointer rounded-full w-8 h-8 bg-dark text-white">-</button>
                    {count}
                  <button onClick={increment} type="button" className="cursor-pointer rounded-full w-8 h-8 bg-dark text-white">+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-primary-fade transition duration-300 text-white hover:opacity-90 w-full py-2 rounded-full"
                >
                  Add to cart
                </button>
              </div>
              <div className="flex gap-2">
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;