import { motion } from "framer-motion";

export const Backdrop = ({ children, onClick }) => (
  <motion.div
    className="fixed w-screen inset-0 bg-slate-900/70 bg-opacity-50 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClick}
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </motion.div>
);