"use client"

import { useCallback } from "react"

export default function Brands() {
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

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Nuestras Marcas</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Estas serían imágenes de logos de marcas */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center justify-center h-16 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-gray-400 font-bold">MARCA {i}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
