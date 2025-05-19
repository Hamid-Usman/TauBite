import React from 'react'

import food1 from "../public/svg/food(1).svg"
import Image from 'next/image'
import { motion } from 'framer-motion'
import fadeUp from '@/framer/animations/fadeUp'

export const CardItems = ({icon, heading, description}) => {
  return (
    <motion.div
    initial={fadeUp.initial}
    whileInView={fadeUp.whileInView}
    transition={fadeUp.transition}
    className='text-start w-full sm:w-[310px] bg-primary text-white flex flex-col gap-4 h-[180px] py-7 px-5'>
        <Image src={icon} alt='' width={30} height={30}/> 
        <p className=''>{heading}</p>
        <p>{description}</p>
    </motion.div>
  )
}
