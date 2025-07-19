"use client"
import dynamic from "next/dynamic";
import { GiStarsStack } from "react-icons/gi";
// import { Board } from "./components/board";
import { StatPie } from "./components/statPie";
import { BaxialChart } from "./components/baxialChart";
import { useDashboard } from "../api/admin/dashboardStat";
import { react, Suspense, useEffect } from "react";
import { useCardStore } from "@/store/admin/useCardStore";
import { useOrderChart } from "../api/admin/orderChart";
import { useReviewDashboard } from "../api/admin/reviewDashboard";
import { useGetAnalysis } from "../api/admin/getAnalysis";
import { usePendingOrders } from "../api/admin/pendingOrders";
import { Board } from "./loaders/boardLoaders";
import { Loader } from "./loaders/loader";

const PendingOrder = dynamic(
    () => import('./components/pendingOrders'), // Create this component
    {
        loading: () => (
        <li className="flex w-full justify-between items-center gap-40 h-[50px] animate-pulse bg-secondary">
            <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
        </li>
        ),
        ssr: false
    }
);


export default function Page() {
    useDashboard();
    const { data: cards, isLoading: cardLoading } = useDashboard();
    const { data: orderChart, isLoading: orderLoading } = useOrderChart();
    const { data: ratings, isLoading: ratingsLoading } = useReviewDashboard()
    const { data: analysis, isLoading } = useGetAnalysis()
    const { data: pendingOrders, isLoading: ordersLoading } = usePendingOrders()
    // if (cardLoading) {
    //     return <div className="flex items-center justify-center h-screen">Loading...</div>
    // }
    return (
        <div className="p-3 py-5 bg-gray_back h-fit bg-gray_back flex flex-col gap-3 rounded-xl">
            <div>
                <h2 className="text-4xl font-semibold">Dashboard</h2>
                <p>Lorem writing isnt working here</p>
            </div>
            <section className="flex gap-3 mt-5">
              <Board
                header="Total orders"
                count={cards?.total_orders}
              />
              <Board
                header="Orders Completed"
                count={cards?.orders_completed}
              />
              <Board
                header="Top Ratings"
                count={cards?.top_ratings}
              />
              <Board
                header="Total Ratings"
                count={cards?.total_ratings}
              />
        
      

            </section>
            <div className="flex gap-3 w-full">
                
                <section className="grid w-1/2 gap-4">
                    <div className="w-full h-full bg-white p-4 flex flex-col gap-2 rounded-xl">
                        <h6 className="font-semibold">AI review analysis:</h6>
                        {isLoading ? (
                          <Loader label="Loading analysis"/>
                        ) :
                        (
                          <p>{analysis.analysis}</p>
                        )}
                    </div>
                    <div className="w-full h-full flex gap-4 rounded-xl">
                        <BaxialChart />
                    </div>
                </section>
                
                <section className="grid w-1/2 gap-4 h-fit">
                    <div className="w-full p-4 rounded-xl bg-white">
                        <p className="font-semibold">Latest Orders</p>
                        <ol className="px-4 flex flex-col gap-1">
                            {Array.isArray(pendingOrders) && pendingOrders.map((order, index) => (
                            <PendingOrder
                                key={order.id}
                                order_id={order.id}
                                status={order.status}
                            />
                            ))}
                            { ordersLoading && (
                                <li className="flex w-full justify-between items-center gap-40 h-[50px] animate-pulse">Loading...</li>
                            )
                            }
                        </ol>
                    </div>
                    <div className="w-full flex rounded-xl gap-3">
                      {orderLoading ? (
                        <div className="w-1/2 h-full bg-white p-4 flex items-center justify-center rounded-xl">
                          <Loader label="Loading Order Chart..."/>
                        </div>
                      ) : (
                        <StatPie heading="Order Chart" data={orderChart} dataKey={"count"} />
                      )}
                      {ratingsLoading ? 
                        <div className="w-1/2 h-full bg-white p-4 flex items-center justify-center rounded-xl">
                          <Loader label="Loading Top Rated..."/>
                        </div>
                      :
                        <StatPie heading="Top Rated Products" data={ratings} dataKey={"average_rating"}/>
                      }
                    </div>
                </section>
            </div>
            
            
        </div>
    )
}