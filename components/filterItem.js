export const FilterItem = ({filter, onClick}) => {
    return (
        <button onClick={onClick} className="text-sm p-2 bg-gray-300 w-fit rounded-lg">
            <p>{filter}</p>
        </button>
    )
}