
const ContentLoader = () => {

    return (
        <div className='w-full p-4'>
            <div className='flex flex-row gap-4'>
                <div className='w-16 h-16 bg-stone-400 rounded animate-pulse'/>
                <div className='flex flex-col gap-2 flex-1'>
                    <div className='w-full h-4 bg-stone-400 rounded animate-pulse'/>
                    <div className='w-3/4 h-4 bg-stone-400 rounded animate-pulse'/>
                    <div className='w-1/2 h-4 bg-stone-400 rounded animate-pulse'/>
                    <div className='w-2/3 h-4 bg-stone-400 rounded animate-pulse'/>
                </div>
            </div>
        </div>
    )
}

export default ContentLoader;