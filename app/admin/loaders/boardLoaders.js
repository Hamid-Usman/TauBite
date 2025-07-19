import dynamic from "next/dynamic";

export const Board = dynamic(() => import("../components/board"), {
    ssr: false,
    loading: () => (
        <div className="animate-pulse flex flex-col justify-between bg-gradient-to-t text-white from-primary to-primary-fade w-full h-[150px] rounded-2xl p-3">
        <div>
            <h5 className="invisible">Loading...</h5>
            <p className="text-4xl font-bold invisible">0</p>
        </div>
        <p className="text-sm mt-auto text-cream invisible">Loading...</p>
        </div>
    )
})

export const Loader = (label) => {
    <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2">{label}</span>
    </div>
}