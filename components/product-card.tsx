"use client"

import { useState, useCallback, memo } from "react"
import { Star, ShoppingCart, Info } from "lucide-react"
import type { Product } from "@/types/product"
import { scrollManager } from "@/utils/scroll"
import OptimizedImage from "./optimized-image"

interface ProductCardProps {
  product: Product
  addToCart: (product: Product, selectedSpec: string) => void
  isFiltered: boolean
}

const ProductCard = memo(function ProductCard({ product, addToCart, isFiltered }: ProductCardProps) {
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({})
  const [showSpecError, setShowSpecError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleSpecChange = useCallback((specType: string, value: string) => {
    setSelectedSpecs((prev) => ({ ...prev, [specType]: value }))
    setShowSpecError(false)
  }, [])

  const handleAddToCart = useCallback(async () => {
    const specs = Object.values(selectedSpecs).filter(Boolean)
    const selectedSpec = specs.join(" - ")

    const hasRequiredSpecs = Object.values(product.specs).some(
      (specArray) => Array.isArray(specArray) && specArray.length > 0,
    )

    if (hasRequiredSpecs && !selectedSpec) {
      setShowSpecError(true)
      return
    }

    setShowSpecError(false)
    addToCart(product, selectedSpec)
    setSelectedSpecs({})

    // Smooth scroll to cart with animation
    await scrollManager.smoothScrollTo("header", { duration: 800, offset: 0 })
  }, [selectedSpecs, product, addToCart])

  const finalPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price

  const renderSpecSelector = useCallback(
    (specType: string, specs: string[], label: string) => {
      if (!specs || specs.length === 0) return null

      return (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}:</label>
          <div className="flex flex-wrap gap-2">
            {specs.map((spec) => (
              <button
                key={spec}
                onClick={() => handleSpecChange(specType, spec)}
                className={`px-3 py-1 border rounded-md text-sm transition-all duration-200 ${
                  selectedSpecs[specType] === spec
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300 hover:border-blue-500"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      )
    },
    [selectedSpecs, handleSpecChange],
  )

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
        isFiltered ? "opacity-100" : "opacity-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <OptimizedImage
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          fill
          className={`object-contain p-4 transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={product.featured}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
              -{product.discount}%
            </span>
          )}
          {product.new && <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NUEVO</span>}
        </div>

        <div className="absolute top-2 right-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <Info className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < product.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">{product.name}</h3>

        <div className="mb-3">
          {product.discount ? (
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-blue-600">${finalPrice.toLocaleString()}</p>
              <p className="text-sm text-gray-500 line-through">${product.price.toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-xl font-bold text-blue-600">${product.price.toLocaleString()}</p>
          )}
        </div>

        {/* Detailed specifications */}
        {showDetails && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-xs animate-in slide-in-from-top duration-300">
            <h4 className="font-semibold mb-2">Especificaciones:</h4>
            <div className="space-y-1">
              {Object.entries(product.detailedSpecs)
                .slice(0, 4)
                .map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium">{key}:</span>{" "}
                    <span className="text-gray-600">{Array.isArray(value) ? value.join(", ") : value}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Spec selectors */}
        {renderSpecSelector("colors", product.specs.colors, "Colores disponibles")}
        {renderSpecSelector("storage", product.specs.storage, "Almacenamiento")}
        {renderSpecSelector("processor", product.specs.processor, "Procesador")}
        {renderSpecSelector("size", product.specs.size, "Tamaño")}
        {renderSpecSelector("capacity", product.specs.capacity, "Capacidad")}
        {renderSpecSelector("gpu", product.specs.gpu, "Tarjeta gráfica")}
        {renderSpecSelector("power", product.specs.power, "Potencia")}
        {renderSpecSelector("features", product.specs.features, "Características")}

        {showSpecError && (
          <p className="text-red-500 text-xs mb-3 animate-pulse">Por favor selecciona todas las opciones disponibles</p>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
        >
          <ShoppingCart className="h-4 w-4" />
          Agregar al carrito
        </button>

        {/* Payment info */}
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-600">💳 Aceptamos todas las tarjetas</p>
          <p className="text-xs text-blue-600">🏪 Retiro en sucursal disponible</p>
        </div>
      </div>
    </div>
  )
})

export default ProductCard
