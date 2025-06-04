"use client"

import { useCallback } from "react"

interface SpecFilterProps {
  availableSpecs: string[]
  selectedSpecs: string[]
  onSpecChange: (spec: string) => void
  specName: string
}

export default function SpecFilter({ availableSpecs, selectedSpecs, onSpecChange, specName }: SpecFilterProps) {
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

  const handleSpecClick = useCallback(
    (spec: string) => {
      onSpecChange(spec)
      if (spec !== "clear") {
        setTimeout(() => smoothScrollTo("productos"), 100)
      }
    },
    [onSpecChange, smoothScrollTo],
  )

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Filtrar por {specName}</h3>
      <div className="flex flex-wrap gap-2">
        {availableSpecs.map((spec) => (
          <button
            key={spec}
            onClick={() => handleSpecClick(spec)}
            className={`px-3 py-1 border rounded-md transition-all duration-300 transform hover:scale-105 ${
              selectedSpecs.includes(spec)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:border-blue-500"
            }`}
          >
            {spec}
          </button>
        ))}
        {selectedSpecs.length > 0 && (
          <button onClick={() => onSpecChange("clear")} className="px-3 py-1 text-sm text-gray-600 underline">
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
}
