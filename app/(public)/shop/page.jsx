'use client'
import { Suspense, useMemo, useState } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

 function ShopContent() {

    // get query params ?search=abc
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)

    const [activeCategory, setActiveCategory] = useState('All')

    // categories derived purely from the already-fetched product list —
    // no new endpoint, just a client-side view over existing data
    const categories = useMemo(() => {
        const unique = Array.from(new Set(products.map(p => p.category))).filter(Boolean)
        return ['All', ...unique]
    }, [products])

    const searchFiltered = search
        ? products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        : products;

    const filteredProducts = activeCategory === 'All'
        ? searchFiltered
        : searchFiltered.filter(p => p.category === activeCategory)

    return (
        <div className="min-h-[70vh] px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between gap-6 border-b border-ink-200 pb-5 mb-8 mt-8">
                    <div>
                        {search && (
                            <button onClick={() => router.push('/shop')} className="flex items-center gap-1.5 text-xs text-clay-600 mb-2">
                                <MoveLeftIcon size={14} /> Clear search
                            </button>
                        )}
                        <h1 className="font-display text-3xl text-ink-800">The full shelf</h1>
                        <p className="text-ink-500 text-sm mt-1">{filteredProducts.length} products{search ? ` matching "${search}"` : ''}</p>
                    </div>
                </div>

                {/* Category filter rail — client-side only, same product data */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`shrink-0 px-4 py-2 rounded-full text-sm border transition ${
                                activeCategory === category
                                    ? 'bg-ink-800 text-white border-ink-800'
                                    : 'border-ink-200 text-ink-600 hover:border-clay-400'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 mb-32">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="min-h-[40vh] flex items-center justify-center text-ink-400">
                        <h2 className="text-2xl font-medium">No products found</h2>
                    </div>
                )}
            </div>
        </div>
    )
}


export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
