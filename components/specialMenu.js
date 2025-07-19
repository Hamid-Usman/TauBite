import Image from "next/image"
import { motion } from "framer-motion"
import fadeUp from "@/framer/animations/fadeUp"
export const SpecialMenu = ({image, product, tags, price}) => {
    return (
        <motion.div 
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            transition={fadeUp.transition}
            className='flex items-center gap-2 border-b-2 border-dashed w-full md:w-[380px] mb-4 pb-3'>
            <Image src={image} alt="food" className='w-[80px] h-[60px] object-cover rounded-lg' />
            <div>
                <p className='text-lg font-semibold'>{product}</p>
                <p className='text-gray'>{tags}</p>
            </div>
            <p className='ml-auto text-primary font-semibold'>{price}</p>
        </motion.div>
    )
}