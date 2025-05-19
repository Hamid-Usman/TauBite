"use client"

import React from 'react'
import { BsLightningChargeFill } from "react-icons/bs";
import food from "../public/svg/food.svg"
import food1 from "../public/svg/food(1).svg"
import food2 from "../public/svg/food(2).svg"
import food3 from "../public/svg/food(3).svg"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CardItems } from '@/components/cardItems';
import { fadeDown } from '@/framer/animations/fadeDown';
import { StatCount } from '@/components/statCount';
import fadeUp from '@/framer/animations/fadeUp';
const page = () => {
    const sectionLayout = "py-28 px-3 sm:px-14 lg:px-28 text-center flex flex-col items-center gap-[32px]"
  return (
    <div>
        <section className=' py-2 px-3 sm:px-14 lg:px-28 flex flex-col justify-center items-center gap-[32px] h-screen'>
            <Image src={food}  alt="food" width={50} height={50} className="absolute animate-bounce top-16 sm:top-32 right-10 md:right-60"/>
            <Image src={food1} alt="food" width={50} height={50} className="absolute top-12 ease-in-out transition-all duration-1000 md:top-32 left-10 md:left-60"/>
            <Image src={food2} alt="food" width={50} height={50} className="absolute bottom-16 md:bottom-32 left-10 md:left-60"/>
            <Image src={food3} alt="food" width={50} height={50} className="absolute bottom-32 ease-in-out transition-all duration-1000  md:bottom-40 right-10 md:right-60"/>
            <motion.div 
                initial={fadeDown.initial}
                whileInView={fadeDown.whileInView}
                exit={{y:50, opacity: 0}}
                transition={fadeDown.transition}
                className='md:w-[659px] flex flex-col items-center gap-2 text-center'>
                <p className='border w-fit px-3 py-[2px] rounded-full transition-all flex items-center'><BsLightningChargeFill className='text-primary animate-pulse' /> Product Under Development</p>
                <h1 className='text-4xl md:text-5xl font-bold'>Food Delivery Service <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[5px] after:bg-primary">All In One Place
                    </span>
                </h1>
                <p className=''>Lorem
                    ipsum dolor sit amet consectetur adipisicing elit
                    . Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                </p>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} className='flex flex-col md:flex-row gap-2'>
                
                <button className='text-white bg-primary hover:bg-sky rounded-xl hover:rounded-3xl px-9 py-3 transition-all duration-300'>Login</button>
                <button className='hover:text-white border-black border-2 hover:bg-primary-fade rounded-xl hover:rounded-3xl px-9 py-3 transition-all duration-300'>Login</button>

            </motion.div>
        </section>

        <section className='h-fit bg-gray-300 py-28 px-3 sm:px-14 lg:px-28 text-center flex flex-col items-center gap-[32px]'>
            <p className='border w-fit px-3 py-[2px] rounded-full transition-all flex items-center'><BsLightningChargeFill className='text-primary animate-pulse' />Features</p>
                <motion.div
                    initial={fadeDown.initial}
                    whileInView={fadeDown.whileInView}
                    exit={{y:50, opacity: 0}}
                    transition={fadeDown.transition}
                    className='max-w-[900px]'>
                    <h1 className='text-2xl md:text-4xl font-bold'>Advanced Technologies For A Smooth Workflow</h1>
                    <p className=''>Lorem
                        ipsum dolor sit amet consectetur adipisicing elit
                        . Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    </p>
                </motion.div>
                <div className='w-full flex flex-wrap justify-center gap-5'>
                    <CardItems icon={food1} heading="Fast Response" description="Lorem text over here" />
                    <CardItems icon={food1} heading="Fast Response" description="Lorem text over here" />
                    <CardItems icon={food1} heading="Fast Response" description="Lorem text over here" />
                    <CardItems icon={food1} heading="Fast Response" description="Lorem text over here" />
                    <CardItems icon={food1} heading="Fast Response" description="Lorem text over here" />
                </div>
        </section>

        <section className="px-4 sm:px-20 pb-32 flex flex-col items-center">
            <motion.div
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                transition={fadeUp.transition}
                
                className={`${sectionLayout}flex flex-col gap-4`}>
                <h1 className='text-6xl'>&quot;</h1>
                <h3 className='text-2xl'>
                uot;Loremaipnmcascm adf madfioaspd afdoipasmc adaodmasmdafafczxcsa fadfc asdfcsaf aefcasdfafasefc faf afasd a.m afdkasd&quot;</h3>
                <p>- Ahmad Sardauna Maiyaki</p>
            </motion.div>
            <motion.div
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                transition={fadeUp.transition}
                
                className='flex flex-col gap-24 md:flex-row justify-evenly items-center text-center py-10 text-black rounded-lg w-[350px] md:w-full bg-gray-300'>
                <StatCount stat="2020" description="Lorem count" />
                <StatCount stat="2020" description="Lorem count" />
                <StatCount stat="2020" description="Lorem count" />
            </motion.div>
        </section>
    </div>
  )
}

export default page