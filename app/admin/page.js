import { Board } from "./components/board";

export default function Page() {
    return (
        <div className="p-3 py-5 bg-gray_back h-fit bg-gray_back flex flex-col gap-4 rounded-3xl">
            <div>
                <h2 className="text-2xl font-semi-bold">Dashboard</h2>
                <p>Lorem writing isnt working here</p>
            </div>
            <section className="flex gap-3 mt-5">
                <Board
                    header="Total Orders"
                    count="150"
                    comment="30 unattended"
                />
                <Board
                    header="Total Orders"
                    count="150"
                    comment="30 unattended"
                />
                <Board
                    header="Total Orders"
                    count="150"
                    comment="30 unattended"
                />
                <Board
                    header="Total Orders"
                    count="150"
                    comment="30 unattended"
                />
            </section>
            <section className="flex w-full gap-4">
                <div className="w-1/2 h-[210px] bg-white p-4 flex flex-col gap-2 rounded-xl">
                    <h6 className="font-semibold">Latest Review Analysis:</h6>
                    <p>Based On the reviews in the last 10 months, it seems like users really enjoy the Milky Doughnuts. While many others complain about the Pizza. Something about --- ?</p>
                </div>
                <div className="w-1/2 flex gap-4 rounded-xl">
                    <div className="p-4 bg-white w-1/2 h-full flex flex-col gap-2 rounded-xl">
                        <p className="font-bold">Top Rated</p>
                        <ol className="w-full list-disc px-4 flex flex-col gap-1">
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">4.8</span></li>
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">4.8</span></li>
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">4.8</span></li>
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">4.8</span></li>
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">4.8</span></li>
                        </ol>
                    </div>
                    
                    <div className="p-4 bg-white w-1/2 h-full flex flex-col gap-2 rounded-xl">
                        <p className="font-bold">Most Orders</p>
                        <ol className="w-full list-disc px-4 flex flex-col gap-1">
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">30</span></li>
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">30</span></li>
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">30</span></li>
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">30</span></li>
                            <li className="">Marques De La Fofayae <span className="text-success font-bold">30</span></li>
                        </ol>
                    </div>

                </div>
            </section>
            
        </div>
    )
}