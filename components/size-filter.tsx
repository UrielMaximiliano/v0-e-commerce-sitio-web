"use client"

interface SizeFilterProps {
  availableSizes: string[]
  selectedSizes: string[]
  onSizeChange: (size: string) => void
}

export default function SizeFilter({ availableSizes, selectedSizes, onSizeChange }: SizeFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Filtrar por talle</h3>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-3 py-1 border rounded-md ${
              selectedSizes.includes(size)
                ? "bg-black text-white border-black"
                : "bg-white text-gray-800 border-gray-300 hover:border-gray-500"
            }`}
          >
            {size}
          </button>
        ))}
        {selectedSizes.length > 0 && (
          <button onClick={() => onSizeChange("clear")} className="px-3 py-1 text-sm text-gray-600 underline">
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
}
