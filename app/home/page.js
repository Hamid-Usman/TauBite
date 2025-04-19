"use client";
import Link from "next/link";
import food from "../../public/img/food.jpg";
import Image from "next/image";
import { IoIosAddCircle, } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { MenuItem } from "@/components/menuItem";
import SpringModal from "@/framer/modal";
import { useState } from "react";

export default function Page() {
    const [ modalOpen, setModalOpen ] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    }
    return (
        <div className="flex py-2 flex-col px-3 sm:px-14 lg:px-28">
            <h3 className="text-lg">Welcome back!</h3>
            <p className=" text-2xl font-extralight">Get the <span className="font-bold">Best Bites</span> Around TAU</p>

            <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            <MenuItem image={food} name="Assorted Salmon" rating={20} price={3000} isOpen={openModal}/>
            <MenuItem image={food} name="Assorted Salmon" rating={20} price={3000} isOpen={openModal}/>
            <MenuItem image={food} name="Assorted Salmon" rating={20} price={3000} isOpen={openModal}/>
            </section>
            {modalOpen && (
                SpringModal({isOpen: modalOpen, setIsOpen: setModalOpen})
            )}
        </div>
    )
}