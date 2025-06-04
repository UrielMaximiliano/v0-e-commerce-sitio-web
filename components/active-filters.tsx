"use client"

import { X } from "lucide-react"
import { memo } from "react"

interface ActiveFiltersProps {
  selectedSpecs: string[]
  selectedCategories: string[]
  searchTerm: string
  onRemoveSpec: (spec: string) => void
  onRemoveCategory: (category: string) => void
  onClearSearch: () => void
  onClearAll: () => void
}

const ActiveFilters = memo(function ActiveFilters({
  selectedSpecs,
  selectedCategories,
  searchTerm,
  onRemoveSpec,
  onRemoveCategory,
  onClearSearch,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters = selectedSpecs.length > 0 || selectedCategories.length > 0 || searchTerm.trim() !== ""

  if (!hasActiveFilters) return null

  return (
    <div className="mb-6 bg-gray-50 p-3 rounded-lg animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Filtros activos:</h3>
        <button
          onClick={onClearAll}
          className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center transition-colors duration-200"
        >
          Limpiar todos
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {searchTerm.trim() !== "" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 animate-in slide-in-from-left duration-300">
            Búsqueda: {searchTerm}
            <button
              onClick={onClearSearch}
              className="ml-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}

        {selectedCategories.map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 animate-in slide-in-from-left duration-300"
          >
            {category}
            <button
              onClick={() => onRemoveCategory(category)}
              className="ml-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {selectedSpecs.map((spec) => (
          <span
            key={spec}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 animate-in slide-in-from-left duration-300"
          >
            {spec}
            <button
              onClick={() => onRemoveSpec(spec)}
              className="ml-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
})

export default ActiveFilters
