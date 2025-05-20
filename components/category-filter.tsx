"use client"

interface CategoryFilterProps {
  availableCategories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({
  availableCategories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Filtrar por categoría</h3>
      <div className="flex flex-wrap gap-2">
        {availableCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 border rounded-md ${
              selectedCategories.includes(category)
                ? "bg-black text-white border-black"
                : "bg-white text-gray-800 border-gray-300 hover:border-gray-500"
            }`}
          >
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
}
