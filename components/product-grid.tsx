import { memo } from "react"
import ProductCard from "./product-card"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  addToCart: (product: Product, selectedSpec: string) => void
  selectedSpecs: string[]
  selectedCategories: string[]
  selectedSubcategories?: string[]
  searchTerm: string
  priceRange: { min: number; max: number }
}

const ProductGrid = memo(function ProductGrid({
  products,
  addToCart,
  selectedSpecs,
  selectedCategories,
  selectedSubcategories = [],
  searchTerm,
}: ProductGridProps) {
  // Normalizar el término de búsqueda (minúsculas y sin espacios extra)
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  // Filtrar productos por especificaciones, categoría, subcategoría y término de búsqueda
  const filteredProducts = products.filter((product) => {
    // Si no hay filtros activos, mostrar todos los productos
    const specFilterActive = selectedSpecs.length > 0
    const categoryFilterActive = selectedCategories.length > 0
    const subcategoryFilterActive = selectedSubcategories.length > 0
    const searchFilterActive = normalizedSearchTerm !== ""

    // Verificar si el producto cumple con el filtro de especificaciones
    const matchesSpec =
      !specFilterActive ||
      Object.values(product.specs).some((specArray) => {
        if (Array.isArray(specArray)) {
          return specArray.some((spec) => selectedSpecs.includes(spec))
        }
        return false
      })

    // Verificar si el producto cumple con el filtro de categorías
    const matchesCategory = !categoryFilterActive || selectedCategories.includes(product.category)

    // Verificar si el producto cumple con el filtro de subcategorías
    const matchesSubcategory =
      !subcategoryFilterActive || (product.subcategory && selectedSubcategories.includes(product.subcategory))

    // Verificar si el producto cumple con el filtro de búsqueda
    const matchesSearch = !searchFilterActive || product.name.toLowerCase().includes(normalizedSearchTerm)

    // El producto debe cumplir con todos los filtros activos
    return matchesSpec && matchesCategory && matchesSubcategory && matchesSearch
  })

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No se encontraron productos con los filtros seleccionados.</p>
          <p className="text-gray-500">Intenta con otros filtros o elimina algunos para ver más productos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} isFiltered={true} />
          ))}
        </div>
      )}
    </>
  )
})

export default ProductGrid
