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
    <div className="flex flex-wrap gap-2 mb-6 items-center justify-center">
      {selectedSpecs.map((spec) => (
        <span key={spec} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
          {spec}
          <button onClick={() => onRemoveSpec(spec)} className="ml-1 text-blue-500 hover:text-blue-700">✕</button>
        </span>
      ))}
      {selectedCategories.map((cat) => (
        <span key={cat} className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
          {cat}
          <button onClick={() => onRemoveCategory(cat)} className="ml-1 text-green-500 hover:text-green-700">✕</button>
        </span>
      ))}
      {searchTerm && (
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-1">
          "{searchTerm}"
          <button onClick={onClearSearch} className="ml-1 text-yellow-500 hover:text-yellow-700">✕</button>
        </span>
      )}
      {(selectedSpecs.length > 0 || selectedCategories.length > 0 || searchTerm) && (
        <button onClick={onClearAll} className="ml-2 text-sm text-gray-600 underline">Limpiar todos</button>
      )}
    </div>
  )
})

export default ActiveFilters
