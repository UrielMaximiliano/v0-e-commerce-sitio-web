import { useMemo } from "react"
import type { Product } from "@/types/product"


/**
 * Hook para filtrar productos por especificaciones, categoría, subcategoría y término de búsqueda.
 * Cumple con SRP y DIP, facilitando la reutilización y el testeo.
 */
export function useFilteredProducts(
  products: Product[],
  selectedSpecs: string[],
  selectedCategories: string[],
  selectedSubcategories: string[] = [],
  searchTerm: string
): Product[] {
  return useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase()
    return products.filter((product) => {
      const specFilterActive = selectedSpecs.length > 0
      const categoryFilterActive = selectedCategories.length > 0
      const subcategoryFilterActive = selectedSubcategories.length > 0
      const searchFilterActive = normalizedSearchTerm !== ""

      const matchesSpec =
        !specFilterActive ||
        Object.values(product.specs).some((specArray) => {
          if (Array.isArray(specArray)) {
            return specArray.some((spec) => selectedSpecs.includes(spec))
          }
          return false
        })

      const matchesCategory = !categoryFilterActive || selectedCategories.includes(product.category)
      const matchesSubcategory =
        !subcategoryFilterActive || (product.subcategory && selectedSubcategories.includes(product.subcategory))
      const matchesSearch = !searchFilterActive || product.name.toLowerCase().includes(normalizedSearchTerm)

      return matchesSpec && matchesCategory && matchesSubcategory && matchesSearch
    })
  }, [products, selectedSpecs, selectedCategories, selectedSubcategories, searchTerm])
} 