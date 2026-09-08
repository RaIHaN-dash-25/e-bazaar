'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'Tk'

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <Link href={`/product/${product.id}`} className='group block w-full'>
            <div className='relative bg-ink-50 aspect-[4/5] rounded-[1.75rem] flex items-center justify-center overflow-hidden'>
                <Image width={500} height={500} className='max-h-[70%] w-auto group-hover:scale-110 transition duration-300' src={product.images[0]} alt="" />
                <span className='absolute top-3 left-3 bg-cream-50/90 backdrop-blur text-ink-700 text-xs font-semibold px-2.5 py-1 rounded-full'>
                    {currency}{product.price}
                </span>
                <span className='absolute top-3 right-3 flex items-center gap-1 bg-ink-800/80 backdrop-blur text-white text-[11px] px-2 py-1 rounded-full'>
                    <StarIcon size={10} fill="currentColor" className='text-ochre-300' />
                    {rating}
                </span>
            </div>
            <div className='pt-3'>
                <p className='text-xs uppercase tracking-wide text-ink-400'>{product.category}</p>
                <p className='text-sm text-ink-800 font-medium mt-0.5 line-clamp-1'>{product.name}</p>
            </div>
        </Link>
    )
}

export default ProductCard
