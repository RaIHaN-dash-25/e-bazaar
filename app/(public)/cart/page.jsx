'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'Tk';

    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);

    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        setTotalPrice(0);
        const cartArray = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                cartArray.push({
                    ...product,
                    quantity: value,
                });
                setTotalPrice(prev => prev + product.price * value);
            }
        }
        setCartArray(cartArray);
    }

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({ productId }))
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    return cartArray.length > 0 ? (
        <div className="min-h-screen px-6 text-ink-800">

            <div className="max-w-7xl mx-auto pt-8">
                <PageTitle heading="My cart" text={`${cartArray.length} item${cartArray.length > 1 ? 's' : ''} in your cart`} linkText="Add more" />

                <div className="flex items-start justify-between gap-10 max-lg:flex-col">

                    {/* Stacked item list — no table markup */}
                    <div className="w-full max-w-4xl divide-y divide-ink-200">
                        {cartArray.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 py-5">
                                <div className="flex items-center justify-center bg-ink-100 size-20 rounded-2xl shrink-0">
                                    <Image src={item.images[0]} className="h-14 w-auto" alt="" width={45} height={45} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate">{item.name}</p>
                                    <p className="text-xs text-ink-500">{item.category}</p>
                                    <p className="text-sm mt-1">{currency}{item.price}</p>
                                </div>
                                <Counter productId={item.id} />
                                <p className="w-20 text-right font-medium hidden sm:block">{currency}{(item.price * item.quantity).toLocaleString()}</p>
                                <button onClick={() => handleDeleteItemFromCart(item.id)} className="text-rust-500 hover:bg-rust-100 p-2.5 rounded-full active:scale-95 transition-all shrink-0">
                                    <Trash2Icon size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <OrderSummary totalPrice={totalPrice} items={cartArray} />
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] px-6 flex items-center justify-center text-ink-400">
            <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
        </div>
    )
}
