'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Horizontal "ledger row" card — the structural counterpart to ProductCard,
// used where products read better as a list than a grid (e.g. Best Selling).
const ProductRow = ({ product, index }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'Tk'
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <Link href={`/product/${product.id}`} className='group flex items-center gap-5 py-5 border-b border-ink-200 last:border-b-0'>
            <span className='font-display text-2xl text-ink-300 w-8 shrink-0'>{String(index + 1).padStart(2, '0')}</span>
            <div className='bg-ink-50 rounded-2xl size-20 sm:size-24 flex items-center justify-center shrink-0 overflow-hidden'>
                <Image width={200} height={200} className='max-h-[70%] w-auto group-hover:scale-110 transition duration-300' src={product.images[0]} alt="" />
            </div>
            <div className='flex-1 min-w-0'>
                <p className='text-xs uppercase tracking-wide text-ink-400'>{product.category}</p>
                <p className='text-ink-800 font-medium truncate'>{product.name}</p>
                <div className='flex items-center gap-1 mt-1'>
                    {Array(5).fill('').map((_, i) => (
                        <StarIcon key={i} size={12} className='text-transparent' fill={rating >= i + 1 ? "#6A8944" : "#E0CDA8"} />
                    ))}
                </div>
            </div>
            <p className='font-display text-lg text-ink-800 shrink-0'>{currency}{product.price}</p>
        </Link>
    )
}

export default ProductRow
