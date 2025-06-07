import { animate, motion } from "framer-motion";

const variants = {
    initial: {
        scaleY: 0.5,
        opacity: 1
    },
    animate: {
        scaleY: 1,
        opacity: 1,
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: .4,
            ease: "circIn"
        }
    }
}

export const BarLoader = () => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.25 }}
            className="flex gap-2"
        >
            <motion.div variants={variants} className="h-12 w-2 bg-primary"></motion.div>
            <motion.div variants={variants} className="h-12 w-2 bg-primary"></motion.div>
            <motion.div variants={variants} className="h-12 w-2 bg-primary"></motion.div>
        </motion.div>
    );
}