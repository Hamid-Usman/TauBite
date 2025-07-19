export default function Board({header, count, comment}) {
    return (
        <div className="flex flex-col justify-between bg-gradient-to-t text-white from-primary to-primary-fade w-full h-[150px] rounded-2xl p-3">
            <div>
                <h5 className="">{header}</h5>
                <p className="text-4xl font-bold">{count}</p>
            </div>
            <p className="text-sm mt-auto text-cream">{comment}</p>

        </div>
    )
}