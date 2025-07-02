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
        <section className='py-2 px-3 sm:px-14 lg:px-28 flex flex-col justify-center items-center gap-[6px]'>
            {/* <Image src={food}  alt="food" width={50} height={50} className="absolute animate-bounce top-16 sm:top-32 right-10 md:right-60"/>
            <Image src={food1} alt="food" width={50} height={50} className="absolute top-12 ease-in-out transition-all duration-1000 md:top-32 left-10 md:left-60"/>
            <Image src={food2} alt="food" width={50} height={50} className="absolute bottom-16 md:bottom-32 left-10 md:left-60"/>
            <Image src={food3} alt="food" width={50} height={50} className="absolute bottom-32 ease-in-out transition-all duration-1000  md:bottom-40 right-10 md:right-60"/> */}
            <motion.div 
                initial={fadeDown.initial}
                whileInView={fadeDown.whileInView}
                exit={{y:50, opacity: 0}}
                transition={fadeDown.transition}
                className='md:w-[659px] flex flex-col items-center gap-2 pt-5 text-center'>
                <p className='border w-fit px-3 py-[2px] rounded-full transition-all flex items-center'><BsLightningChargeFill className='text-primary animate-pulse' /> Product Under Development</p>
                <h1 className='text-3xl md:text-5xl font-bold'>Food Delivery Service <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[5px] after:bg-primary">All In One Place
                    </span>
                </h1>
                <p className='md:text-md py-4 text-gray '>Craving something fancy? Light? Or rejuvenating? We got what you need. We ensure quality food provided to you. One order at a time
                </p>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} className='flex gap-2'>
                <Link href={'/auth/login'}  className='text-white text-center border-black border-2 bg-primary hover:bg-primary-fade rounded-lg hover:rounded-3xl px-9 py-3 transition-all duration-300'>Login</Link>
                <Link href={'/auth/register'} className='text-center border-black border-2 hover:bg-secondary rounded-lg hover:rounded-2xl px-9 py-3 transition-all duration-300'>Register</Link>
                
            </motion.div>
            <Image src={heroImg} alt='' width={50} height={50} className='w-[400px]'/>
        </section>

        <section className='py-28 px-3 sm:px-8 lg:px-16 flex flex-col items-center gap-[32px]'>
            <p className='border font-bold w-fit px-3 py-[2px] rounded-full transition-all flex items-center'><BsLightningChargeFill className='text-primary animate-pulse' />Features</p>
            <motion.div
                initial={fadeDown.initial}
                whileInView={fadeDown.whileInView}
                exit={{y:50, opacity: 0}}
                transition={fadeDown.transition}
                className='max-w-[700px]'>
                <h1 className='text-2xl md:text-4xl text-center font-semibold'><span className='text-primary'>Amazing Food And Drinks, </span>Just For You</h1>
                <p className='text-center py-4 text-gray'>
                    With FoddieHub, you can order whatever you crave from our menu and we'll have it delivered to you. With us, your satisfaction is assured</p>
            </motion.div>
            <div className='w-full grid md:grid-cols-2 gap-8'>
                <CardItems icon={food1} heading="Secured Payment" description="With the use of Paystack, We ensure safe and seamless transactions with end-to-end encryption for all your payments" />
                <CardItems icon={food1} heading="Wide Range Of Options" description="Easily find exactly what you crave with our advanced filters - search by dietary needs, price range, cuisine type, or special tags." />
                <CardItems icon={food1} heading="Easy to Follow Design" description="With a simplistic design, there's no stress in navigating your way through the app. I won't lie to you, bro" />
            </div>
        </section>

        <section className="px-4 sm:px-20 pb-32 flex flex-col items-center">
            <motion.div
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                transition={fadeUp.transition}
                
                className={`${sectionLayout}flex flex-col gap-4`}>
                <h1 className='text-4xl font-bold'>&quot;</h1>
                <h3 className=' md:text-2xl text-gray italic'>
                    &quot;Thank you for trying out FoodieHub. This was a project I've been on for a while now. I'll be honest, it's not easy juggling through the frontend and backend. But it is oddly enjoyable nonetheless. The core functions for the a precentable delivery system are functional, but I am looking to do more, especially with AI integration which I have been building on the backend. I appreciat you time and i hope my work so far to be sufficient for some praise : (The landing page could use some improvements tho) &quot;</h3>
                <p className='font-bold italic text-primary'>- Hamid Usman</p>
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