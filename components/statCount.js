export const StatCount = ({stat, description}) => {
    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-3xl font-bold lg:text-5xl'>{stat}</h3>
            <p>{description}</p>
        </div>
    )
}