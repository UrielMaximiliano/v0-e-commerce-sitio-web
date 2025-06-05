import { memo } from "react"
import ProductCard from "./product-card"
import type { Product } from "@/types/product"
import { useFilteredProducts } from "@/hooks/use-filtered-products"

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
  // Usar hook utilitario para filtrar productos (DIP, SRP)
  const filteredProducts = useFilteredProducts(products, selectedSpecs, selectedCategories, selectedSubcategories, searchTerm)

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No se encontraron productos con los filtros seleccionados.</p>
        <p className="text-gray-500">Intenta con otros filtros o elimina algunos para ver más productos.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} isFiltered={true} />
      ))}
    </div>
  )
})

export default ProductGrid
