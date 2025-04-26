"use client";
import { TbAdjustmentsSearch } from "react-icons/tb";
import food from "../../public/img/food.jpg";
import { MenuItem } from "@/components/menuItem";
import SpringModal from "@/framer/modal";
import { useModalStore } from "@/store/useModalStore";

export default function Page() {
    const { openModal } = useModalStore();
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
                {mockData.map((data) => (
                    <div key={data.id}>
                        <MenuItem
                            image={data.image}
                            name={data.name}
                            rating={data.rating}
                            price={data.price}
                            onClick={() => openModal(data)}
                        />
                    </div>
                ))}
            </section>
            <SpringModal />
        </div>
    );
}