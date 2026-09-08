'use client'
import Title from './Title'
import ProductRow from './ProductRow'
import { useSelector } from 'react-redux'

const BestSelling = () => {

    const displayQuantity = 6
    const products = useSelector(state => state.product.list)

    const best = products.slice().sort((a, b) => b.rating.length - a.rating.length).slice(0, displayQuantity)

    return (
        <div className='px-6 my-24 max-w-4xl mx-auto'>
            <Title title='Reader favourites' description={`Showing ${best.length} of ${products.length} products`} href='/shop' />
            {/* stacked ledger list — the structural counterpart to the rail above */}
            <div className='mt-4'>
                {best.map((product, index) => (
                    <ProductRow key={index} product={product} index={index} />
                ))}
            </div>
        </div>
    )
}

export default BestSelling
