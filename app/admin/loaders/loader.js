export const Loader = ({label}) => {
    return (
        <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-2">{label}</span>
        </div>
    )
}