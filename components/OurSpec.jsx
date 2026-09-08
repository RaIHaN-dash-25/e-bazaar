import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {

    return (
        <div className='px-6 my-24 max-w-4xl mx-auto'>
            <Title visibleButton={false} title='Why shop here' description="We keep the experience simple, honest, and worth coming back to." />

            <div className='mt-4'>
                {ourSpecsData.map((spec, index) => (
                    <div key={index} className='flex items-center gap-6 py-6 border-b border-ink-200 last:border-b-0'>
                        <span className='font-display text-2xl text-ink-300 w-8 shrink-0'>{String(index + 1).padStart(2, '0')}</span>
                        <div className='size-11 rounded-full flex items-center justify-center text-white shrink-0' style={{ backgroundColor: spec.accent }}>
                            <spec.icon size={18} />
                        </div>
                        <div>
                            <h3 className='text-ink-800 font-medium'>{spec.title}</h3>
                            <p className='text-sm text-ink-500 mt-1'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OurSpecs
