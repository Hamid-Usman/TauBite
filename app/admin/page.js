"use client"

import { GiStarsStack } from "react-icons/gi";
import { Board } from "./components/board";
import { StatPie } from "./components/statPie";
import { BaxialChart } from "./components/baxialChart";
import { useDashboard } from "../api/admin/dashboardStat";
import { useEffect } from "react";
import { useCardStore } from "@/store/admin/useCardStore";
import { useOrderChart } from "../api/admin/orderChart";

export default function Page() {
    useDashboard();
    const cards = useCardStore((state) => (state.cards));
    const { data: orderChart } = useOrderChart();

    console.log(orderChart, "dd")
    if (!cards) {
            return <p>Loading dashboard...</p>;
        }
    const reportData = [
        { product: "Marques De La Fofayae", count: 30 },
        { product: "Marques De La Fofayae", count: 30 },
        { product: "Marques De La Fofayae", count: 30 },
        { product: "Marques De La Fofayae", count: 30 },
        { product: "Marques De La Fofayae", count: 30 }
    ]

    return (
        <div className="p-3 py-5 bg-gray_back h-fit bg-gray_back flex flex-col gap-3 rounded-xl">
            <div>
                <h2 className="text-4xl font-semibold">Dashboard</h2>
                <p>Lorem writing isnt working here</p>
            </div>
            <section className="flex gap-3 mt-5">
                
                    <Board
                        header="Total orders"
                        count={cards.total_orders}
                        // comment="30 unattended"
                    />
                    <Board
                        header="Orders Completed"
                        count={cards.orders_completed}
                        // comment="30 unattended"
                    />
                    <Board
                        header="Top Ratings"
                        count={cards.top_ratings}
                        // comment="30 unattended"
                    />
                    <Board
                        header="Total Ratings"
                        count={cards.total_ratings}
                        // comment="30 unattended"
                    />

            </section>
            <div className="flex gap-3 w-full">
                
                <section className="grid w-1/2 gap-4">
                    <div className="w-full h-full bg-white p-4 flex flex-col gap-2 rounded-xl">
                        <h6 className="font-semibold">AI review analysis:</h6>
                        <p>Based On the reviews in the last 10 months, it seems like users really enjoy the Milky Doughnuts. While many others complain about the Pizza. Something about--- ?</p>
                    </div>
                    <div className="w-full h-full flex gap-4 rounded-xl">
                        <BaxialChart />
                    </div>
                </section>
                
                <section className="grid w-1/2 gap-4">
                    <div className="w-full h-fit p-4 rounded-xl bg-white">
                        <p className="font-semibold">Latest Orders</p>
                        <ol className="px-4 flex flex-col gap-1">
                            <li className="flex justify-between items-center gap-2">ID ksse-dfed-ht4q2-q245<span className="text-success font-bold">Completed</span></li>
                            <li className="flex justify-between items-center gap-2">ID ksse-dfed-ht4q2-q245<span className="text-success font-bold">Completed</span></li>
                            <li className="flex justify-between items-center gap-2">ID ksse-dfed-ht4q2-q245<span className="text-success font-bold">Completed</span></li>
                            <li className="flex justify-between items-center gap-2">ID ksse-dfed-ht4q2-q245<span className="text-success font-bold">Completed</span></li>
                            <li className="flex justify-between items-center gap-2">ID ksse-dfed-ht4q2-q245<span className="text-success font-bold">Completed</span></li>
                            <li className="flex justify-between items-center gap-2">ID ksse-dfed-ht4q2-q245<span className="text-success font-bold">Completed</span></li>
                        </ol>

                    </div>
                    <div className="flex rounded-xl gap-3">
                        <StatPie heading="Order Chart" data={orderChart} />
                    </div>
                </section>
            </div>
            
            
        </div>
    )
}