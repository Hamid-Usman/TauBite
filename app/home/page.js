"use client";
import { TbAdjustmentsSearch } from "react-icons/tb";
import food from "../../public/img/food.jpg";
import { MenuItem } from "@/components/menuItem";
import SpringModal from "@/framer/modal";
import { useModalStore } from "@/store/useModalStore";
import { useEffect, useState } from "react";

export default function Page() {
    const { openModal } = useModalStore();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/food/')
            .then((res) => res.json())
            .then((data) => setFoods(data))
            .catch((err) => console.error('Failed to fetch food:', err));
        }, []);
    
    // Call the fetchData function to get the data
    // fetchData().then((data) => {
        //     console.log(data);}
    const mockData = [
        { id: 1, image: food, name: "Assorted Salmon Salmon Salmon", rating: 20, price: 3000 },
        { id: 2, image: food, name: "Salmon", rating: 20, price: 3000 },
    ];
    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h3 className="text-lg">Welcome back!</h3>
                <p className="text-xl font-extralight">
                    Get the <span className="font-bold">Best Bites</span> Around TAU
                </p>
            </div>
            <div className="flex gap-2 mt-5">
                <div className="p-2 flex items-center bg-gray-300 w-fit rounded-lg">
                    <TbAdjustmentsSearch className="rotate-90 ml-auto text-black" />
                </div>
                <div className="text-sm p-2 bg-gray-300 w-fit rounded-lg">
                    <p>Salads</p>
                </div>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {foods.map((food) => (
                    <div key={food.id}>
                        <MenuItem
                            image={food.image}
                            name={food.name}
                            rating={food.description}
                            price={food.price}
                            onClick={() => openModal(food)}
                        />
                    </div>
                ))}
            </section>
            <SpringModal />
        </div>
    );
}