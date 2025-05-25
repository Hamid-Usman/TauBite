'use client'
import { useEffect, useState } from "react";
import { TbAdjustmentsSearch } from "react-icons/tb";
import { MenuItem } from "@/components/menuItem";
import SpringModal from "@/framer/modal";
import { useModalStore } from "@/store/useModalStore";
import { useFoodsStore } from "@/store/useFoodsStore";
import useGetFoods from "../api/getFoods";
import useUserStore from "@/store/useUserStore";
import useAuthStore from "@/store/useAuthStore";
import { useFoodFilter } from "@/store/filters/useFoodFilter";

export default function Page() {
    const { openModal } = useModalStore();
    const { data: foods, isLoading, isError } = useGetFoods();
    const setFood = useFoodsStore((state) => state.setFood);
    const { user, fetchUser} = useAuthStore();
    const token = useAuthStore.getState().token
    const { name, setName, tags, setTags, price, setPrice } = useFoodFilter();
    const [ clicked, setClicked ] = useState()
    const [clickedTag, setClickedTag] = useState("");


    const handleTagToggle = (tagValue, setTagState, setClickedState) => {
        setClickedState((prev) => {
            const newClicked = !(prev === tagValue);
            setTagState(newClicked ? tagValue : "");
            return newClicked ? tagValue : ""; // clicked state reflects active tag
        });
    };
    const brainFuel = () => {
        handleTagToggle("8", setTags, setClickedTag);
    };
    const energyBoost = () => {
        handleTagToggle("9", setTags, setClickedTag);
    };
    const handlePastry = () => {
        handleTagToggle("5", setTags, setClickedTag);
    };

    useEffect(() => {
        fetchUser(); // Fetch user data when component mounts
    }, [fetchUser]);

    useEffect(() => {
        if (foods) {
            setFood(foods);
        }
    }, [foods, setFood]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to load foods. Please try again later.</div>;
    }
    
    return (
        (token ? 
            
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h3 className="text-lg">
                    Welcome back{user ? `, ${user.email}` : ""}!
                </h3>
                <p className="text-xl font-extralight">
                    Get the <span className="font-bold">Best Bites</span> Around TAU
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-5">
                {/* <div className="p-2 flex items-center bg-gray-300 w-fit rounded-lg">
                    <TbAdjustmentsSearch className="rotate-90 ml-auto text-black" />
                    
                    <input
                        placeholder="Search name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div> */}
                <div className="flex flex-col gap-1">
                    
                    <p className="font-semibold">Filter by: </p>
                    <div className="sm:flex gap-3">
                        <div className="flex items-center gap-2">
                            <input type="radio"
                            checked={clickedTag === "8"}
                            onChange={() => {}}
                            onClick={brainFuel}
                            className={ `text-sm p-2 w-fit rounded-lg transition-all duration-500 ${clicked === true ? "bg-primary text-white" :"bg-gray-300"} `}
                        />
                            <label>Salads</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio"
                                checked={clickedTag === "9"}
                                onChange={() => {}}
                                onClick={energyBoost}
                                className={ `text-sm p-2 w-fit rounded-lg transition-all duration-500`}
                            />
                            <label>Soda</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" checked={clickedTag === "5"} onChange={() => {}} onClick={handlePastry} className={ `text-sm p-2 w-fit rounded-lg transition-all duration-500`} />
                            <label>Pastry</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold">Max Price:</label>
                    <select className="bg-gray-300 w-[180px] py-3 px-2 rounded-lg">
                        <option onClick={() => setPrice("")}>-</option>
                        <option onClick={() => setPrice("1000")}>1000</option>
                        <option onClick={() => setPrice("1500")}>1500</option>
                        <option onClick={() => setPrice("2000")}>2000</option>
                    </select>
                </div>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {foods?.map((food) => (
                    <div key={food.id}>
                        <MenuItem
                            image={food.image}
                            name={food.name}
                            average_rating={food.average_rating}
                            description={food.description}
                            tags={food.tags}
                            price={food.price}
                            onClick={() => openModal(food)}
                            // starClicked={}
                        />
                    </div>
                ))}
            </section>
            <SpringModal />
        </div>
        :
        <p>Unauthorized access</p>
        )
    );
}
