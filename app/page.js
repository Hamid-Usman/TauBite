import React from 'react'
import { BsLightningChargeFill } from "react-icons/bs";
import food from "../public/svg/food.svg"
import Image from 'next/image';
const page = () => {
  return (
    <div>
        <div className=' py-2 px-3 sm:px-14 lg:px-28 flex flex-col justify-center items-center gap-[32px] h-screen'>
            <Image src={food} alt="food" width={50} height={50} className="absolute top-16 sm:top-32 right-10 md:right-60"/>
            <Image src={food} alt="food" width={50} height={50} className="absolute top-12 ease-in-out transition-all duration-1000 md:top-32 left-10 md:left-60"/>
            <Image src={food} alt="food" width={50} height={50} className="absolute bottom-16 md:bottom-32 left-10 md:left-60"/>
            <Image src={food} alt="food" width={50} height={50} className="absolute bottom-32 ease-in-out transition-all duration-1000  md:bottom-40 right-10 md:right-60"/>
            <div className='md:w-[659px] flex flex-col items-center gap-2 text-center'>
                <p className='border w-fit px-3 py-[2px] rounded-full transition-all flex items-center'><BsLightningChargeFill className='text-primary animate-pulse' /> Product Under Development</p>
                <h1 className='text-4xl md:text-5xl font-bold'>Food Delivery Service <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[5px] after:bg-primary">All In One Place
                    </span>
                </h1>
                <p className=''>Lorem
                    ipsum dolor sit amet consectetur adipisicing elit
                    . Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                </p>
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
                
                <button className='text-white bg-primary hover:bg-sky rounded-xl hover:rounded-3xl px-9 py-3 transition-all duration-300'>Login</button>
                <button className='hover:text-white border-black border-2 hover:bg-primary-fade rounded-xl hover:rounded-3xl px-9 py-3 transition-all duration-300'>Login</button>

            </div>
        </div>

        <div>
            
        </div>
    </div>
  )
}

export default page