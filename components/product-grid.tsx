import ProductCard from "./product-card"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  addToCart: (product: Product, selectedSize: string) => void
  selectedSizes: string[]
  selectedCategories: string[]
  searchTerm: string
}

export default function ProductGrid({
  products,
  addToCart,
  selectedSizes,
  selectedCategories,
  searchTerm,
}: ProductGridProps) {
  // Normalizar el término de búsqueda (minúsculas y sin espacios extra)
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  // Filtrar productos por talle, categoría y término de búsqueda
  const filteredProducts = products.filter((product) => {
    // Si no hay filtros activos, mostrar todos los productos
    const sizeFilterActive = selectedSizes.length > 0
    const categoryFilterActive = selectedCategories.length > 0
    const searchFilterActive = normalizedSearchTerm !== ""

    // Verificar si el producto cumple con el filtro de talles
    const matchesSize = !sizeFilterActive || product.sizes.some((size) => selectedSizes.includes(size))

    // Verificar si el producto cumple con el filtro de categorías
    const matchesCategory = !categoryFilterActive || selectedCategories.includes(product.category)

    // Verificar si el producto cumple con el filtro de búsqueda
    const matchesSearch = !searchFilterActive || product.name.toLowerCase().includes(normalizedSearchTerm)

    // El producto debe cumplir con todos los filtros activos
    return matchesSize && matchesCategory && matchesSearch
  })

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No se encontraron productos con los filtros seleccionados.</p>
          <p className="text-gray-500">Intenta con otros filtros o elimina algunos para ver más productos.</p>
        </div>
      ) : (
        <div id="productos" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} isFiltered={true} />
          ))}
        </div>
      )}
    </>
  )
}
