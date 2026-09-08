'use client'
import { ArrowRight, ChevronDownIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {

    // accordion instead of tabs — sections expand in place
    const [openSection, setOpenSection] = useState('Description')

    const toggle = (section) => setOpenSection(prev => prev === section ? null : section)

    return (
        <div className="my-16 text-sm text-ink-600 max-w-3xl">

            {/* Description */}
            <div className="border-b border-ink-200">
                <button onClick={() => toggle('Description')} className="w-full flex items-center justify-between py-4 text-left">
                    <span className="font-medium text-ink-800">Description</span>
                    <ChevronDownIcon size={18} className={`transition-transform ${openSection === 'Description' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'Description' && (
                    <p className="pb-6 max-w-xl">{product.description}</p>
                )}
            </div>

            {/* Reviews */}
            <div className="border-b border-ink-200">
                <button onClick={() => toggle('Reviews')} className="w-full flex items-center justify-between py-4 text-left">
                    <span className="font-medium text-ink-800">Reviews ({product.rating.length})</span>
                    <ChevronDownIcon size={18} className={`transition-transform ${openSection === 'Reviews' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'Reviews' && (
                    <div className="flex flex-col gap-3 pb-8">
                        {product.rating.map((item, index) => (
                            <div key={index} className="flex gap-5 mb-6">
                                <Image src={item.user.image} alt="" className="size-10 rounded-full" width={100} height={100} />
                                <div>
                                    <div className="flex items-center" >
                                        {Array(5).fill('').map((_, index) => (
                                            <StarIcon key={index} size={16} className='text-transparent' fill={item.rating >= index + 1 ? "#6A8944" : "#E0CDA8"} />
                                        ))}
                                    </div>
                                    <p className="text-sm max-w-lg my-3">{item.review}</p>
                                    <p className="font-medium text-ink-800">{item.user.name}</p>
                                    <p className="mt-1 text-ink-400">{new Date(item.createdAt).toDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Store */}
            <div className="flex items-center gap-3 mt-8">
                <Image src={product.store.logo} alt="" className="size-11 rounded-full ring ring-ink-200" width={100} height={100} />
                <div>
                    <p className="font-medium text-ink-700">Sold by {product.store.name}</p>
                    <Link href={`/shop/${product.store.username}`} className="flex items-center gap-1.5 text-clay-600 text-sm"> Visit store <ArrowRight size={13} /></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription
