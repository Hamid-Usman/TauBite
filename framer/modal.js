"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import Image from "next/image";
import { useCounterStore } from "@/store/useCounterStore";
import { CiStar } from "react-icons/ci";
import useCartStore from "@/store/useCartState";


const SpringModal = ({data}) => {
    const { count, increment, decrement } = useCounterStore()
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
        closeModal(); // Optional: close after adding
    };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="bg-slate-900/20 backdrop-blur px-4 pt-20 fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ y: 50, transition: { duration: 0.5 } }}
            animate={{ y: -50, rotate: "0deg" }}
            exit={{ y: 50, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-dark p-4 h-fit rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="bg-white w-fit h-fit mb-2 rounded-full text-3xl grid place-items-center mx-auto">
                
              <Image
                    src={modalData.image.src}
                    alt={modalData.name}
                    className=""
                    width={500}
                    height={100}
                  />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {modalData.name}
              </h3>
              <p className=" mb-6">
                lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
              </p>
              <div className="flex items-center">
                <CiStar size={15} className="text-warning"/>
                {modalData.rating}
              </div>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;