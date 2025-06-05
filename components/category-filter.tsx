"use client"

import type React from "react"
import { useCallback, memo } from "react"

import { Smartphone, Laptop, Refrigerator, Waves, Headphones, Wind, Home, Bike } from "lucide-react"

interface CategoryFilterProps {
  availableCategories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string) => void
}

// Mapping de categorías a iconos
const categoryIcons: Record<string, React.ReactNode> = {
  Celulares: <Smartphone className="h-5 w-5" />,
  Notebooks: <Laptop className="h-5 w-5" />,
  Heladeras: <Refrigerator className="h-5 w-5" />,
  "Lavarropas y Secarropas": <Waves className="h-5 w-5" />,
  Audio: <Headphones className="h-5 w-5" />,
  "Aires Acondicionados": <Wind className="h-5 w-5" />,
  Electrodomésticos: <Home className="h-5 w-5" />,
  Bicicletas: <Bike className="h-5 w-5" />,
}

const CategoryFilter = memo(function CategoryFilter({
  availableCategories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
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

  const handleCategoryClick = useCallback(
    (category: string) => {
      onCategoryChange(category)
      if (category !== "clear") {
        setTimeout(() => smoothScrollTo("productos"), 100)
      }
    },
    [onCategoryChange, smoothScrollTo],
  )

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Filtrar por categoría</h3>
      <div className="flex flex-wrap gap-2">
        {availableCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 border rounded-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
              selectedCategories.includes(category)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:border-blue-500"
            }`}
          >
            {categoryIcons[category] || null}
            {category}
          </button>
        ))}
        {selectedCategories.length > 0 && (
          <button onClick={() => onCategoryChange("clear")} className="px-3 py-1 text-sm text-gray-600 underline">
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
})

export default CategoryFilter
