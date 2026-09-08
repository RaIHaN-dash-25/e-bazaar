'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '' }) => {

    return (
        <div className='flex items-end justify-between gap-6 border-b border-ink-200 pb-5'>
            <div>
                <span className='uppercase tracking-[0.25em] text-[11px] text-clay-500 font-semibold'>E-Bazaar Edit</span>
                <h2 className='font-display text-3xl sm:text-4xl text-ink-800 mt-1'>{title}</h2>
                <p className='text-ink-500 text-sm mt-2 max-w-md'>{description}</p>
            </div>
            {visibleButton && (
                <Link href={href} className='shrink-0 flex items-center gap-2 text-sm text-clay-600 font-medium border-b border-clay-400 pb-0.5 hover:gap-3 transition-all'>
                    View all <ArrowRight size={14} />
                </Link>
            )}
        </div>
    )
}

export default Title
