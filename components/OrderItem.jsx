'use client'
import Image from "next/image";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import { useState } from "react";
import RatingModal from "./RatingModal";

const statusStyle = {
    confirmed: 'text-ochre-600 bg-ochre-100',
    delivered: 'text-moss-600 bg-moss-100',
}

// One order rendered as a "ticket" card — replaces the original table row.
const OrderItem = ({ order }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'Tk';
    const [ratingModal, setRatingModal] = useState(null);

    const { ratings } = useSelector(state => state.rating);

    return (
        <div className="border border-ink-200 rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-dashed border-ink-200">
                <div>
                    <p className="text-xs text-ink-400">Placed on {new Date(order.createdAt).toDateString()}</p>
                    <p className="text-lg font-display text-ink-800 mt-0.5">{currency}{order.total}</p>
                </div>
                <span className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium ${statusStyle[order.status.toLowerCase()] || 'text-ink-500 bg-ink-100'}`}>
                    {order.status.split('_').join(' ').toLowerCase()}
                </span>
            </div>

            <div className="flex flex-col gap-5">
                {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-16 aspect-square bg-ink-100 flex items-center justify-center rounded-xl shrink-0">
                            <Image
                                className="h-12 w-auto"
                                src={item.product.images[0]}
                                alt="product_img"
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-ink-800 truncate">{item.product.name}</p>
                            <p className="text-sm text-ink-500">{currency}{item.price} &middot; Qty {item.quantity}</p>
                        </div>
                        <div>
                            {ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId)
                                ? <Rating value={ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId).rating} />
                                : <button onClick={() => setRatingModal({ orderId: order.id, productId: item.product.id })} className={`text-sm text-clay-600 border border-clay-300 rounded-full px-3 py-1.5 hover:bg-clay-100 transition ${order.status !== "DELIVERED" && 'hidden'}`}>Rate</button>
                            }
                        </div>
                        {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
                    </div>
                ))}
            </div>

            <div className="text-sm text-ink-500 mt-6 pt-5 border-t border-dashed border-ink-200">
                <p className="text-xs uppercase tracking-[0.15em] text-ink-400 mb-1.5">Delivering to</p>
                <p>{order.address.name}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country}</p>
                <p>{order.address.phone}</p>
            </div>
        </div>
    )
}

export default OrderItem
