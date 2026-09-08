import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import AddressModal from './AddressModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/lib/features/cart/cartSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'Tk';

    const router = useRouter();

    const dispatch = useDispatch();
   const [addressList, setAddressList] = useState([]);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');

   const handleCouponCode = async (event) => {
    event.preventDefault();

    if (!couponCodeInput.trim()) {
        throw new Error("Please enter a coupon code");
    }

    const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code: couponCodeInput,
        }),
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Invalid coupon code");
    }

    setCoupon(data.coupon);
    setCouponCodeInput("");

    return data;
}
const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!selectedAddress) {
        throw new Error("Please select an address");
    }

    if (!items || items.length === 0) {
        throw new Error("Cart is empty");
    }

    const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
    }));

    const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: orderItems,
            addressId: selectedAddress.id,
            paymentMethod,
            coupon: coupon || null,
        }),
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to place order");
    }

    dispatch(clearCart());

    router.push("/orders");

    return data;
}

const fetchAddresses = async () => {
    try {
        const res = await fetch("/api/addresses", {
            cache: "no-store",
        });

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message || "Failed to fetch addresses");
        }

        setAddressList(data.addresses);

        if (data.addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(data.addresses[0]);
        }
    } catch (error) {
        console.error("FETCH_ADDRESSES_ERROR:", error);
        toast.error(error.message || "Failed to fetch addresses");
    }
};

    useEffect(() => {
        fetchAddresses();
    }, []);

    return (
        <div className='w-full max-w-lg lg:max-w-[340px] bg-cream-50 border border-ink-200 text-ink-500 text-sm rounded-[2rem] p-7 lg:sticky lg:top-28'>
            <p className='text-xs uppercase tracking-[0.2em] text-clay-500 font-semibold'>Checkout</p>
            <h2 className='font-display text-xl text-ink-800 mt-1'>Order summary</h2>
            <p className='text-ink-400 text-xs mt-5 mb-2'>Payment method</p>
            <div className='flex gap-2 items-center'>
                <input type="radio" id="COD" onChange={() => setPaymentMethod('COD')} checked={paymentMethod === 'COD'} className='accent-ink-500' />
                <label htmlFor="COD" className='cursor-pointer'>COD</label>
            </div>
            <div className='flex gap-2 items-center mt-1'>
                <input type="radio" id="STRIPE" name='payment' onChange={() => setPaymentMethod('STRIPE')} checked={paymentMethod === 'STRIPE'} className='accent-ink-500' />
                <label htmlFor="STRIPE" className='cursor-pointer'>Stripe Payment</label>
            </div>
            <div className='my-4 py-4 border-y border-dashed border-ink-200 text-ink-400'>
                <p>Address</p>
                {
                    selectedAddress ? (
                        <div className='flex gap-2 items-center'>
                            <p>{selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}</p>
                            <SquarePenIcon onClick={() => setSelectedAddress(null)} className='cursor-pointer' size={18} />
                        </div>
                    ) : (
                        <div>
                            {
                                addressList.length > 0 && (
                                    <select className='border border-ink-400 p-2 w-full my-3 outline-none rounded' onChange={(e) => setSelectedAddress(addressList[e.target.value])} >
                                        <option value="">Select Address</option>
                                        {
                                            addressList.map((address, index) => (
                                                <option key={index} value={index}>{address.name}, {address.city}, {address.state}, {address.zip}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                            <button className='flex items-center gap-1 text-ink-600 mt-1' onClick={() => setShowAddressModal(true)} >Add Address <PlusIcon size={18} /></button>
                        </div>
                    )
                }
            </div>
            <div className='pb-4 border-b border-dashed border-ink-200'>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1 text-ink-400'>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        {coupon && <p>Coupon:</p>}
                    </div>
                    <div className='flex flex-col gap-1 font-medium text-right'>
                        <p>{currency}{totalPrice.toLocaleString()}</p>
                        <p>Free</p>
                        {coupon && <p>{`-${currency}${(coupon.discount / 100 * totalPrice).toFixed(2)}`}</p>}
                    </div>
                </div>
                {
                    !coupon ? (
                        <form
    onSubmit={e =>
        toast.promise(handleCouponCode(e), {
            loading: "Checking coupon...",
            success: "Coupon applied successfully!",
            error: (err) => err.message || "Invalid coupon code",
        })
    }
    className='flex justify-center gap-3 mt-3'
>
                            <input onChange={(e) => setCouponCodeInput(e.target.value)} value={couponCodeInput} type="text" placeholder='Coupon Code' className='border border-ink-400 p-1.5 rounded w-full outline-none' />
                            <button className='bg-clay-500 text-white px-3 rounded-full hover:bg-clay-600 active:scale-95 transition-all'>Apply</button>
                        </form>
                    ) : (
                        <div className='w-full flex items-center justify-center gap-2 text-xs mt-2'>
                            <p>Code: <span className='font-semibold ml-1'>{coupon.code.toUpperCase()}</span></p>
                            <p>{coupon.description}</p>
                            <XIcon size={18} onClick={() => setCoupon('')} className='hover:text-rust-600 transition cursor-pointer' />
                        </div>
                    )
                }
            </div>
            <div className='flex justify-between py-4'>
                <p>Total:</p>
                <p className='font-medium text-right'>{currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}</p>
            </div>
            <button
    onClick={e =>
        toast.promise(handlePlaceOrder(e), {
            loading: "Placing order...",
            success: "Order placed successfully!",
            error: (err) => err.message || "Failed to place order",
        })
    }
    className='w-full bg-ink-800 text-white py-2.5 rounded-full hover:bg-clay-600 active:scale-95 transition-all'
>
    Place Order
</button>

           {showAddressModal && (
    <AddressModal
        setShowAddressModal={setShowAddressModal}
        onAddressAdded={(newAddress) => {
            setAddressList((prev) => [newAddress, ...prev]);
            setSelectedAddress(newAddress);
        }}
    />
)}

        </div>
    )
}

export default OrderSummary