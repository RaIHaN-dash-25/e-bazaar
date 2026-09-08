'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'Tk';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter()

    const [mainImage, setMainImage] = useState(product.images[0]);

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const averageRating = product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length;

    return (
        <div className="grid lg:grid-cols-[1.3fr_0.9fr] gap-10 items-start">
            {/* Full-width image on top, horizontal thumbnail strip below */}
            <div>
                <div className="flex justify-center items-center h-96 sm:h-[28rem] bg-ink-50 rounded-[2rem]">
                    <Image src={mainImage} alt="" width={320} height={320} />
                </div>
                <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
                    {product.images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImage(product.images[index])}
                            className={`bg-ink-50 flex items-center justify-center size-20 shrink-0 rounded-2xl border-2 transition ${mainImage === image ? 'border-clay-400' : 'border-transparent'}`}
                        >
                            <Image src={image} className="max-h-10 w-auto" alt="" width={45} height={45} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Purchase ticket — a bordered card instead of a plain info stack */}
            <div className="border border-ink-200 rounded-[2rem] p-7 lg:sticky lg:top-28">
                <p className="text-xs uppercase tracking-[0.2em] text-clay-500 font-semibold">{product.category}</p>
                <h1 className="font-display text-2xl sm:text-3xl text-ink-800 mt-1">{product.name}</h1>

                <div className='flex items-center gap-2 mt-3'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon key={index} size={14} className='text-transparent' fill={averageRating >= index + 1 ? "#6A8944" : "#E0CDA8"} />
                    ))}
                    <p className="text-xs text-ink-500">{product.rating.length} reviews</p>
                </div>

                <div className="flex items-baseline gap-3 mt-5">
                    <p className="font-display text-3xl text-ink-800">{currency}{product.price}</p>
                    <p className="text-ink-400 line-through">{currency}{product.mrp}</p>
                </div>
                <div className="flex items-center gap-2 text-moss-600 text-sm mt-1">
                    <TagIcon size={13} />
                    <p>Save {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% right now</p>
                </div>

                <div className="mt-6">
                    {cart[productId] && (
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-ink-600 font-medium">Quantity</p>
                            <Counter productId={productId} />
                        </div>
                    )}
                    <button onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} className="w-full bg-ink-800 text-white py-3.5 text-sm font-medium rounded-full hover:bg-clay-600 active:scale-95 transition">
                        {!cart[productId] ? 'Add to cart' : 'View cart'}
                    </button>
                </div>

                <div className="flex flex-col gap-3 text-sm text-ink-500 mt-7 pt-6 border-t border-dashed border-ink-200">
                    <p className="flex gap-3 items-center"> <EarthIcon size={16} className="text-clay-400" /> Free shipping worldwide </p>
                    <p className="flex gap-3 items-center"> <CreditCardIcon size={16} className="text-clay-400" /> 100% secured payment </p>
                    <p className="flex gap-3 items-center"> <UserIcon size={16} className="text-clay-400" /> Trusted by top brands </p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
