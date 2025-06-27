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
    className='rounded-xl bg-secondary text-white flex flex-col gap-4 h-[230px] py-7 px-5'>
        <Image src={icon} alt='' width={30} height={30}/> 
        <div className='flex flex-col gap-2'>
          <p className=' text-xl md:text-2xl font-semibold'>{heading}</p>
          <p>{description}</p>
        </div>
    </motion.div>
  )
}
