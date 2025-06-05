"use client"

import { useState, useCallback, memo, useMemo } from "react"
import { Star, ShoppingCart, Info } from "lucide-react"
import type { Product } from "@/types/product"
import { scrollManager } from "@/utils/scroll"
import OptimizedImage from "./optimized-image"
import Image from "next/image"
import { useFinalPrice } from "@/hooks/use-final-price"

interface ProductCardProps {
  product: Product
  addToCart: (product: Product, selectedSpec: string) => void
  isFiltered: boolean
}

// Subcomponente para mostrar especificaciones principales
function ProductSpecs({ colors, storage, capacity }: { colors?: string[]; storage?: string[]; capacity?: string[] }) {
  return (
    <>
      {colors && <div className="text-xs text-gray-700 mb-1">Colores: {colors.join(", ")}</div>}
      {storage && <div className="text-xs text-gray-700 mb-1">Almacenamiento: {storage.join(", ")}</div>}
      {capacity && <div className="text-xs text-gray-700 mb-1">Capacidad: {capacity.join(", ")}</div>}
    </>
  )
}

const ProductCard = memo(function ProductCard({ product, addToCart, isFiltered }: ProductCardProps) {
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({})
  const [showSpecError, setShowSpecError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Usar hook para obtener el precio final
  const finalPrice = useFinalPrice(product.price, product.discount)

  // Manejar selección de chips
  const handleChipSelect = useCallback((key: string, value: string) => {
    setSelectedSpecs((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Validar selección antes de agregar al carrito
  const handleAddToCart = useCallback(() => {
    // Solo cuenta los tipos de especificaciones que existen
    const requiredKeys = [
      product.specs.colors && product.specs.colors.length > 0 ? "colors" : null,
      product.specs.storage && product.specs.storage.length > 0 ? "storage" : null,
      product.specs.processor && product.specs.processor.length > 0 ? "processor" : null,
      product.specs.size && product.specs.size.length > 0 ? "size" : null,
      product.specs.capacity && product.specs.capacity.length > 0 ? "capacity" : null,
      product.specs.power && product.specs.power.length > 0 ? "power" : null,
      product.specs.features && product.specs.features.length > 0 ? "features" : null,
    ].filter(Boolean) as string[]
    const hasAll = requiredKeys.every((key) => selectedSpecs[key])
    if (!hasAll) {
      setShowSpecError(true)
      setTimeout(() => setShowSpecError(false), 2000)
      return
    }
    const selectedSpec = requiredKeys.map((key) => selectedSpecs[key]).join(" - ")
    addToCart(product, selectedSpec)
  }, [product, addToCart, selectedSpecs])

  const renderSpecSelector = useCallback(
    (key: string, options: string[] | undefined, label: string) => {
      if (!options || options.length === 0) return null

      return (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <select
            value={selectedSpecs[key] || ""}
            onChange={(e) => setSelectedSpecs((prev) => ({ ...prev, [key]: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar {label.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    },
    [selectedSpecs],
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
        <Image
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          width={300}
          height={300}
          className={`object-contain p-4 transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
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
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14">{product.name}</h3>
        {/* Chips interactivos para cada especificación */}
        {product.specs.colors && (
          <div className="mb-1">
            <span className="text-xs font-medium text-gray-700">Colores disponibles:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.specs.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChipSelect("colors", color)}
                  className={`px-2 py-1 rounded text-xs border transition-colors duration-200 ${selectedSpecs.colors === color ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}
        {product.specs.storage && (
          <div className="mb-1">
            <span className="text-xs font-medium text-gray-700">Almacenamiento:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.specs.storage.map((storage) => (
                <button
                  key={storage}
                  type="button"
                  onClick={() => handleChipSelect("storage", storage)}
                  className={`px-2 py-1 rounded text-xs border transition-colors duration-200 ${selectedSpecs.storage === storage ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"}`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
        )}
        {product.specs.processor && (
          <div className="mb-1">
            <span className="text-xs font-medium text-gray-700">Procesador:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.specs.processor.map((proc) => (
                <button
                  key={proc}
                  type="button"
                  onClick={() => handleChipSelect("processor", proc)}
                  className={`px-2 py-1 rounded text-xs border transition-colors duration-200 ${selectedSpecs.processor === proc ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"}`}
                >
                  {proc}
                </button>
              ))}
            </div>
          </div>
        )}
        {product.specs.size && (
          <div className="mb-1">
            <span className="text-xs font-medium text-gray-700">Tamaño:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.specs.size.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleChipSelect("size", size)}
                  className={`px-2 py-1 rounded text-xs border transition-colors duration-200 ${selectedSpecs.size === size ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        {product.specs.capacity && (
          <div className="mb-1">
            <span className="text-xs font-medium text-gray-700">Capacidad:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.specs.capacity.map((cap) => (
                <button
                  key={cap}
                  type="button"
                  onClick={() => handleChipSelect("capacity", cap)}
                  className={`px-2 py-1 rounded text-xs border transition-colors duration-200 ${selectedSpecs.capacity === cap ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"}`}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>
        )}
        {product.specs.power && (
          <div className="mb-1">
            <span className="text-xs font-medium text-gray-700">Potencia:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.specs.power.map((power) => (
                <button
                  key={power}
                  type="button"
                  onClick={() => handleChipSelect("power", power)}
                  className={`px-2 py-1 rounded text-xs border transition-colors duration-200 ${selectedSpecs.power === power ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"}`}
                >
                  {power}
                </button>
              ))}
            </div>
          </div>
        )}
        {product.specs.features && (
          <div className="mb-3">
            <span className="text-xs font-medium text-gray-700">Características:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.specs.features.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => handleChipSelect("features", feature)}
                  className={`px-2 py-1 rounded text-xs border transition-colors duration-200 ${selectedSpecs.features === feature ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"}`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        )}

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
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-600">{Array.isArray(value) ? value.join(", ") : value}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Spec selectors */}
        <div className="space-y-2">
          {renderSpecSelector("processor", product.specs.processor, "Procesador")}
          {renderSpecSelector("size", product.specs.size, "Tamaño")}
          {renderSpecSelector("capacity", product.specs.capacity, "Capacidad")}
          {renderSpecSelector("power", product.specs.power, "Potencia")}
          {renderSpecSelector("features", product.specs.features, "Características")}
        </div>

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
