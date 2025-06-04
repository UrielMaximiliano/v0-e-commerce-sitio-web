"use client"

import { useCallback } from "react"

interface SubcategoryFilterProps {
  availableSubcategories: string[]
  selectedSubcategories: string[]
  onSubcategoryChange: (subcategory: string) => void
  categoryName: string
}

export default function SubcategoryFilter({
  availableSubcategories,
  selectedSubcategories,
  onSubcategoryChange,
  categoryName,
}: SubcategoryFilterProps) {
  const smoothScrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }, [])

  const handleSubcategoryClick = useCallback(
    (subcategory: string) => {
      onSubcategoryChange(subcategory)
      if (subcategory !== "clear") {
        setTimeout(() => smoothScrollTo("productos"), 100)
      }
    },
    [onSubcategoryChange, smoothScrollTo],
  )

  if (availableSubcategories.length === 0) return null

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Filtrar por tipo de {categoryName}</h3>
      <div className="flex flex-wrap gap-2">
        {availableSubcategories.map((subcategory) => (
          <button
            key={subcategory}
            onClick={() => handleSubcategoryClick(subcategory)}
            className={`px-3 py-1 border rounded-md transition-all duration-300 transform hover:scale-105 ${
              selectedSubcategories.includes(subcategory)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:border-blue-500"
            }`}
          >
            {subcategory}
          </button>
        ))}
        {selectedSubcategories.length > 0 && (
          <button onClick={() => handleSubcategoryClick("clear")} className="px-3 py-1 text-sm text-gray-600 underline">
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
}
