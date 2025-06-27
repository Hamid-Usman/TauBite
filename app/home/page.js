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
import { useRouter } from "next/navigation";
import { BarLoader } from "@/framer/loader/barLoader";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import { useTags } from "../api/getTags";

export default function Page() {
    const { openModal } = useModalStore();
    const { data: tagData = [], isLoading: isTagLoading, isError: isTagError } = useTags();
    const { data: foods, isLoading, isError } = useGetFoods();
    const setFood = useFoodsStore((state) => state.setFood);
    const { user, fetchUser} = useAuthStore();
    const token = useAuthStore.getState().token
    const { name, setName, tags, setTags, price, setPrice, resetTag } = useFoodFilter();
    const [debouncedName] = useDebounce(name, 500); // Debounce search input for 500ms
    const [clickedTag, setClickedTag] = useState("");
    const router = useRouter();

    // Handle tag selection
    const handleTagToggle = (tagValue) => {
        setClickedTag((prev) => {
            const isActive = prev === tagValue;
            if (isActive) {
                resetTag()
                return "";
            }
            else {
                setTags(tagValue);
                return tagValue;
            }
        });
    };

    useEffect(() => {
        fetchUser(); // Fetch user data when component mounts
    }, [fetchUser]);

    useEffect(() => {
        if (foods) {
            setFood(foods);
        }
    }, [foods, setFood]);

    // if(user.is_staff) {
    //     router.push("/admin/order")
    // }

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center h-screen">
            <Image
            width={200} height={200}
                src="/svg/hamburger-animate.svg" alt="img" />
            <BarLoader />
            <p className="text-center">Loading foods...</p>
        </div>;
    }

    if (isError) {
        return <div className="flex flex-col items-center justify-center h-screen">
            <Image
            width={200} height={200}
            src={"/svg/sorry-animate.svg"} alt="img" />
            <p className="text-center">Couldn&apos; t load our foods chief, Please try again later.</p>
        </div>;
    }
    
    return (
        (token ? 
            
        <div className=" flex flex-col">
            <div className="flex flex-col">
                <h3 className="text-lg">
                    Welcome back{user ? `, ${user.email}` : ""}!
                </h3>
                <p className="text-xl font-extralight">
                    Get the <span className="font-bold">Best Bites</span> Around Town
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-5">
                {/* <div className="p-2 flex items-center bg-gray-300 w-fit rounded-lg">
                    <TbAdjustmentsSearch className="rotate-90 ml-auto text-black" />
                    
                    <input
                        placeholder="Search name..."
                        value={name || ""}
                        onChange={
                            (e) => {
                                setName(e.target.value)
                            }}
                        className="p-2 border rounded"
                    />
                </div> */}
                <div className="flex flex-col gap-1">
                    
                    <p className="font-semibold">Filter by: </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {tagData?.map((tag) => (
                                <div key={tag.id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`tag-${tag.id}`}
                                        name="food-tags"
                                        checked={clickedTag === tag.id.toString()}
                                        onChange={() => handleTagToggle(tag.id.toString())}
                                        className={`text-sm p-2 w-fit rounded-lg transition-all duration-500 ${
                                            clickedTag === tag.id.toString()
                                                ? "bg-primary text-white"
                                                : "bg-gray-300"
                                        }`}
                                    />
                                    <label htmlFor={`tag-${tag.id}`}>{tag.tag}</label>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold">Max Price (N):</label>
                    <select className="bg-gray-300 w-[180px] py-3 px-2 rounded-lg">
                        <option className="bg-primary text-white" onClick={() => setPrice("")}>{price ? `${price} (clear) `  : "-"}</option>
                        <option onClick={() => setPrice("500")}>500</option>
                        <option onClick={() => setPrice("1000")}>1000</option>
                        <option onClick={() => setPrice("1500")}>1500</option>
                        <option onClick={() => setPrice("2000")}>2000</option>
                    </select>
                </div>
            </div>
            <section className="flex flex-wrap gap-6 mt-5">
                {foods?.map((food) => (
                    <div key={food.id}>
                        <MenuItem
                            image={food.image}
                            name={food.name}
                            icons={food.tags ? food.tags.map(tag => tag[0]) : []}
                            average_rating={food.average_rating}
                            rating_count={food.rating_count}
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
        <div className="flex flex-col items-center justify-center h-screen">
            <Image width={300} height={300} src="/svg/401-animate.svg" alt="img" />
            <p className="text-center font-bold">Unauthorized access. Click <Link href={'auth/login'} className="text-secondary" >here</Link> to login</p>
        </div>
        )
    );
}
