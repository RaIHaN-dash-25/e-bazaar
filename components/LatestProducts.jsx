'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const LatestProducts = () => {

    const displayQuantity = 8
    const products = useSelector(state => state.product.list)

    const latest = products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, displayQuantity)

    return (
        <div className='px-6 my-24 max-w-7xl mx-auto'>
            <Title title='Fresh in' description={`Showing ${latest.length} of ${products.length} products`} href='/shop' />
            {/* horizontal scroll rail — deliberately not a wrapping grid */}
            <div className='mt-8 flex gap-5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory'>
                {latest.map((product, index) => (
                    <div className='snap-start w-44 sm:w-56 shrink-0' key={index}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestProducts
