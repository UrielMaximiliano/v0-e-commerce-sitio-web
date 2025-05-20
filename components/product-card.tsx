"use client"

import Image from "next/image"
import { useState } from "react"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  addToCart: (product: Product, selectedSize: string) => void
  isFiltered: boolean
}

export default function ProductCard({ product, addToCart, isFiltered }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [showSizeError, setShowSizeError] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true)
      return
    }

    setShowSizeError(false)
    addToCart(product, selectedSize)
    setSelectedSize("") // Reset selected size after adding to cart
  }

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${isFiltered ? "opacity-100" : "opacity-100"}`}
    >
      <div className="relative h-64 w-full">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">{product.category}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-xl font-bold mb-3">${product.price.toLocaleString()}</p>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Talle:</label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size)
                  setShowSizeError(false)
                }}
                className={`px-3 py-1 border rounded-md ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-800 border-gray-300 hover:border-gray-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {showSizeError && <p className="text-red-500 text-sm mt-1">Por favor selecciona un talle</p>}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}
