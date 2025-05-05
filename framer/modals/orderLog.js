import { AnimatePresence } from "framer-motion"
import { Backdrop } from "../backdrop"
import { motion } from "framer-motion"
export const OrderLog = ({ item, quantity, onClick }) => {
    return (
      <Backdrop onClick={onClick}>
        <motion.div
          className="bg-white rounded-lg p-4 shadow-lg w-[340px]  lg:w-md"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <h2 className="text-lg font-bold mb-2">Order Details</h2>
          <p>{item} (x{quantity})</p>

          <p className="mt-5">Status: <span className="font-bold">Pending</span></p>
        </motion.div>
      </Backdrop>
    );
  };
  