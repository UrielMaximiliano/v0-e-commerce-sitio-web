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
    <section id="destacados" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { number: "500+", label: "Productos disponibles" },
            { number: "98%", label: "Clientes satisfechos" },
            { number: "24/7", label: "Soporte técnico" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProductsToShow.map((product) => (
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
      </div>
    </section>
  )
})

export default FeaturedProducts
