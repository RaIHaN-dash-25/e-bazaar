'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, SendIcon, TagIcon, HeadsetIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'Tk'

    const stats = [
        { icon: SendIcon, label: 'Free shipping', detail: `On orders above ${currency}50` },
        { icon: TagIcon, label: '20% off today', detail: 'Storewide, no code needed' },
        { icon: HeadsetIcon, label: 'Real humans', detail: '24/7 customer support' },
    ]

    return (
        <div>
            {/* Full-bleed split band, no card container */}
            <div className='max-w-7xl mx-auto px-6 pt-10 sm:pt-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center'>
                <div>
                    <span className='inline-block uppercase tracking-[0.25em] text-xs font-semibold text-clay-500 mb-4'>New season, honest prices</span>
                    <h1 className='font-display text-4xl sm:text-6xl leading-[1.08] text-ink-800'>
                        Gadgets you'll <span className='text-clay-500 italic'>love.</span><br />
                        Prices you'll <span className='text-moss-500 italic'>trust.</span>
                    </h1>
                    <p className='text-ink-500 mt-6 max-w-md'>
                        A small, carefully-stocked marketplace of tech that earns its shelf space — picked over, tested, and priced fairly.
                    </p>
                    <div className='flex items-center gap-6 mt-8'>
                        <button className='bg-ink-800 text-white text-sm font-medium py-3.5 px-9 rounded-full hover:bg-clay-600 active:scale-95 transition'>
                            Start browsing
                        </button>
                        <div className='text-sm text-ink-600'>
                            <p className='text-ink-400'>Starting from</p>
                            <p className='font-display text-2xl text-ink-800'>{currency}4.90</p>
                        </div>
                    </div>
                </div>

                <div className='relative'>
                    <div className='absolute -inset-6 rounded-[3rem] bg-moss-200/60 -rotate-3' />
                    <Image className='relative w-full max-w-md mx-auto' src={assets.hero_model_img} alt="" />
                    <div className='absolute top-4 right-2 sm:right-8 bg-cream-50 border border-ink-200 rounded-2xl p-2 pr-4 flex items-center gap-2 shadow-sm'>
                        <Image className='size-10 rounded-full object-cover' src={assets.hero_product_img1} alt="" />
                        <p className='text-xs text-ink-600 font-medium'>Best sellers<br/>restocked</p>
                    </div>
                    <div className='absolute bottom-6 left-0 sm:-left-6 bg-cream-50 border border-ink-200 rounded-2xl p-2 pr-4 flex items-center gap-2 shadow-sm'>
                        <Image className='size-10 rounded-full object-cover' src={assets.hero_product_img2} alt="" />
                        <p className='text-xs text-ink-600 font-medium'>20% off<br/>this week</p>
                    </div>
                </div>
            </div>

            {/* Stat ticker replaces the old three-panel promo cards */}
            <div className='max-w-7xl mx-auto px-6 mt-14 sm:mt-20'>
                <div className='grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink-200 border-y border-ink-200'>
                    {stats.map((stat) => (
                        <div key={stat.label} className='flex items-center gap-3 py-5 sm:px-6'>
                            <stat.icon className='text-clay-500 shrink-0' size={22} />
                            <div>
                                <p className='text-sm font-medium text-ink-800'>{stat.label}</p>
                                <p className='text-xs text-ink-500'>{stat.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-6 mt-12 sm:mt-16'>
                <p className='text-xs uppercase tracking-[0.2em] text-ink-400 mb-4'>Shop by category</p>
                <CategoriesMarquee />
            </div>
        </div>

    )
}

export default Hero
