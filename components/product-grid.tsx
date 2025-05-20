import ProductCard from "./product-card"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  addToCart: (product: Product, selectedSize: string) => void
  selectedSizes: string[]
  selectedCategories: string[]
}

export default function ProductGrid({ products, addToCart, selectedSizes, selectedCategories }: ProductGridProps) {
  // Filtrar productos por talle y categoría
  const filteredProducts = products.filter((product) => {
    // Si no hay filtros activos, mostrar todos los productos
    const sizeFilterActive = selectedSizes.length > 0
    const categoryFilterActive = selectedCategories.length > 0

    // Verificar si el producto cumple con el filtro de talles
    const matchesSize = !sizeFilterActive || product.sizes.some((size) => selectedSizes.includes(size))

    // Verificar si el producto cumple con el filtro de categorías
    const matchesCategory = !categoryFilterActive || selectedCategories.includes(product.category)

    // El producto debe cumplir con ambos filtros si están activos
    return matchesSize && matchesCategory
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
