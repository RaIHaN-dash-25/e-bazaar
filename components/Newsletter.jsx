import React from 'react'

const Newsletter = () => {
    return (
        <div className='max-w-7xl mx-auto px-6 my-24'>
            <div className='bg-ink-800 rounded-[2.5rem] px-8 sm:px-16 py-14 grid md:grid-cols-2 gap-8 items-center'>
                <div>
                    <span className='uppercase tracking-[0.25em] text-xs font-semibold text-clay-300'>Stay in the loop</span>
                    <h2 className='font-display text-3xl sm:text-4xl text-cream-50 mt-2'>Good gear, straight to your inbox.</h2>
                    <p className='text-ink-300 text-sm mt-3 max-w-sm'>One email a week. New arrivals, honest deals, nothing else.</p>
                </div>
                <form className='flex flex-col sm:flex-row gap-3'>
                    <input className='flex-1 bg-cream-50 rounded-full px-5 py-3.5 text-sm outline-none' type="email" placeholder='Enter your email address' />
                    <button className='font-medium bg-clay-500 text-white px-7 py-3.5 rounded-full hover:bg-clay-600 active:scale-95 transition whitespace-nowrap'>Get updates</button>
                </form>
            </div>
        </div>
    )
}

export default Newsletter
