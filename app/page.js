"use client"
 
import React from 'react'
import { BsLightningChargeFill } from "react-icons/bs";
import food from "../public/svg/food.svg"
import food1 from "../public/svg/food(1).svg"
import food2 from "../public/svg/food(2).svg"
import food3 from "../public/svg/food(3).svg"
import heroImg from "../public/svg/Take-away-cuate.svg"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CardItems } from '@/components/cardItems';
import { fadeDown } from '@/framer/animations/fadeDown';
import { StatCount } from '@/components/statCount';
import fadeUp from '@/framer/animations/fadeUp';
import Link from 'next/link';
const page = () => {
    const sectionLayout = "py-28 px-3 sm:px-14 lg:px-28 text-center flex flex-col items-center gap-[32px]"
  return (
    <div>
        <section className='py-2 px-3 sm:px-14 lg:px-28 flex flex-col justify-center items-center gap-[10px] h-screen'>
            {/* <Image src={food}  alt="food" width={50} height={50} className="absolute animate-bounce top-16 sm:top-32 right-10 md:right-60"/>
            <Image src={food1} alt="food" width={50} height={50} className="absolute top-12 ease-in-out transition-all duration-1000 md:top-32 left-10 md:left-60"/>
            <Image src={food2} alt="food" width={50} height={50} className="absolute bottom-16 md:bottom-32 left-10 md:left-60"/>
            <Image src={food3} alt="food" width={50} height={50} className="absolute bottom-32 ease-in-out transition-all duration-1000  md:bottom-40 right-10 md:right-60"/> */}
            <motion.div 
                initial={fadeDown.initial}
                whileInView={fadeDown.whileInView}
                exit={{y:50, opacity: 0}}
                transition={fadeDown.transition}
                className='md:w-[659px] flex flex-col items-center gap-2 text-center'>
                <p className='border w-fit px-3 py-[2px] rounded-full transition-all flex items-center'><BsLightningChargeFill className='text-primary animate-pulse' /> Product Under Development</p>
                <h1 className='text-2xl md:text-4xl font-bold'>Food Delivery Service <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[5px] after:bg-primary">All In One Place
                    </span>
                </h1>
                <p className='py-4 md:text-[16px] '>Lorem
                    ipsum dolor sit amet consectetur adipisicing elit
                    . Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                </p>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} className='flex gap-2'>
                <Link href={'/auth/login'}  className='text-white text-center border-black border-2 bg-primary hover:bg-primary-fade rounded-lg hover:rounded-3xl px-9 py-3 transition-all duration-300'>Login</Link>
                <Link href={'/auth/register'} className='text-center border-black border-2 hover:bg-secondary rounded-lg hover:rounded-2xl px-9 py-3 transition-all duration-300'>Register</Link>
                
            </motion.div>
            <Image src={heroImg} alt='' height={350} className=' '/>
        </section>

        <section className='bg-gray-200 py-28 px-3 sm:px-14 lg:px-28 text-center flex flex-col items-center gap-[32px]'>
            <p className='border w-fit px-3 py-[2px] rounded-full transition-all flex items-center font-bold text-secondary'><BsLightningChargeFill className='text-primary animate-pulse' />Designed For You</p>
                <motion.div
                    initial={fadeDown.initial}
                    whileInView={fadeDown.whileInView}
                    exit={{y:50, opacity: 0}}
                    transition={fadeDown.transition}
                    className='max-w-[900px]'>
                    <h1 className='text-xl md:text-3xl font-bold'><span className='text-primary'>Advanced Technologies</span> For A Smooth Workflow</h1>
                    <p className=''>Lorem
                        ipsum dolor sit amet consectetur adipisicing elit
                        . Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    </p>
                </motion.div>
                <div className='w-full flex flex-wrap justify-center gap-5'>
                    <CardItems icon={food1} heading="Secured Payment Integration" description="Lorem text over here" />
                    <CardItems icon={food1} heading="Simplied User Interface" description="Lorem text over here" />
                    <CardItems icon={food1} heading="`" description="Lorem text over here" />
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
                <h1 className='text-6xl text-primary'>&quot;</h1>
                <h3 className='text-2xl text-primary italic'>
                    &quot; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur. Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.&quot;
                </h3>
                <p className='font-bold italic'>- Hamid Usman</p>
            </motion.div>
            <motion.div
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                transition={fadeUp.transition}
                
                className='flex flex-col gap-24 md:flex-row justify-evenly items-center text-center py-10 text-primary rounded-lg w-[350px] md:w-full bg-secondary'>
                <StatCount stat="200" description="Orders Made" />
                <StatCount stat="98%" description="Completed" />
                <StatCount stat="120" description="5-Star Ratings" />
            </motion.div>
        </section>
    </div>
  )
}

export default page