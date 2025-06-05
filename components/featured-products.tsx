"use client"

import { ArrowRight } from "lucide-react"
import { memo, useCallback } from "react"
import ProductCard from "./product-card"
import type { Product } from "@/types/product"
import { scrollManager, easingFunctions } from "@/utils/scroll"

interface FeaturedProductsProps {
  title: string
  subtitle?: string
  products: Product[]
  addToCart: (product: Product, selectedSpec: string) => void
  onViewAll: () => void
}

const FeaturedProducts = memo(function FeaturedProducts({
  title,
  subtitle,
  products,
  addToCart,
  onViewAll,
}: FeaturedProductsProps) {
  const smoothScrollTo = useCallback(async (elementId: string) => {
    await scrollManager.smoothScrollTo(elementId, {
      duration: 1200,
      easing: easingFunctions.easeInOutCubic,
      offset: -80,
    })
  }, [])

  const handleViewAll = useCallback(async () => {
    onViewAll()
    await new Promise((resolve) => setTimeout(resolve, 100))
    await smoothScrollTo("productos")
  }, [onViewAll, smoothScrollTo])

  const featuredProductsToShow = products.slice(0, 8)

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto w-full bg-white rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold mb-2 text-center">{title}</h2>
      {subtitle && <p className="text-lg text-gray-600 mb-8 text-center">{subtitle}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} isFiltered={true} />
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleViewAll}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Ver todos los productos <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
})

export default FeaturedProducts
