"use client"

import { X } from "lucide-react"

interface ActiveFiltersProps {
  selectedSizes: string[]
  selectedCategories: string[]
  searchTerm: string
  onRemoveSize: (size: string) => void
  onRemoveCategory: (category: string) => void
  onClearSearch: () => void
  onClearAll: () => void
}

export default function ActiveFilters({
  selectedSizes,
  selectedCategories,
  searchTerm,
  onRemoveSize,
  onRemoveCategory,
  onClearSearch,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters = selectedSizes.length > 0 || selectedCategories.length > 0 || searchTerm.trim() !== ""

  if (!hasActiveFilters) return null

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Filtros activos:</h3>
        <button onClick={onClearAll} className="text-xs text-gray-500 hover:text-gray-700 underline flex items-center">
          Limpiar todos
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {searchTerm.trim() !== "" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
            Búsqueda: {searchTerm}
            <button onClick={onClearSearch} className="ml-1 text-gray-500 hover:text-gray-700">
              <X className="h-3 w-3" />
            </button>
          </span>
        )}

        {selectedCategories.map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
          >
            {category}
            <button onClick={() => onRemoveCategory(category)} className="ml-1 text-gray-500 hover:text-gray-700">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {selectedSizes.map((size) => (
          <span
            key={size}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
          >
            Talle: {size}
            <button onClick={() => onRemoveSize(size)} className="ml-1 text-gray-500 hover:text-gray-700">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
