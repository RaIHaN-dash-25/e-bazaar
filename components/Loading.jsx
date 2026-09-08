'use client'

const Loading = () => {

    return (
        <div className='flex flex-col items-center justify-center gap-3 h-screen'>
            <div className='flex items-center gap-2'>
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className='size-3 rounded-full bg-clay-500 animate-bounce'
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>
            <p className='text-xs uppercase tracking-[0.2em] text-ink-400'>Loading</p>
        </div>
    )
}

export default Loading
