"use client"

import { Smartphone, Refrigerator, Waves, Headphones, Wind, Home, Bike, Laptop } from "lucide-react"
import { useCallback, memo } from "react"
import { scrollManager, easingFunctions } from "@/utils/scroll"

interface FeaturedCategoriesProps {
  onCategorySelect: (category: string) => void
}

const categories = [
  {
    name: "Celulares",
    icon: Smartphone,
    category: "Celulares",
    color: "from-blue-500 to-blue-600",
    description: "Últimos modelos",
  },
  {
    name: "Notebooks",
    icon: Laptop,
    category: "Notebooks",
    color: "from-purple-500 to-purple-600",
    description: "Para trabajo y gaming",
  },
  {
    name: "Heladeras",
    icon: Refrigerator,
    category: "Heladeras",
    color: "from-green-500 to-green-600",
    description: "No Frost y más",
  },
  {
    name: "Lavarropas",
    icon: Waves,
    category: "Lavarropas y Secarropas",
    color: "from-cyan-500 to-cyan-600",
    description: "Carga frontal",
  },
  {
    name: "Audio",
    icon: Headphones,
    category: "Audio",
    color: "from-red-500 to-red-600",
    description: "Sonido premium",
  },
  {
    name: "Aires",
    icon: Wind,
    category: "Aires Acondicionados",
    color: "from-indigo-500 to-indigo-600",
    description: "Frío y calor",
  },
  {
    name: "Electrodomésticos",
    icon: Home,
    category: "Electrodomésticos",
    color: "from-orange-500 to-orange-600",
    description: "Para el hogar",
  },
  {
    name: "Bicicletas",
    icon: Bike,
    category: "Bicicletas",
    color: "from-pink-500 to-pink-600",
    description: "Urbanas y MTB",
  },
]

const FeaturedCategories = memo(function FeaturedCategories({ onCategorySelect }: FeaturedCategoriesProps) {
  const smoothScrollTo = useCallback(async (elementId: string) => {
    await scrollManager.smoothScrollTo(elementId, {
      duration: 1200,
      easing: easingFunctions.easeInOutCubic,
      offset: -80,
    })
  }, [])

  const handleCategoryClick = useCallback(
    async (category: string) => {
      onCategorySelect(category)
      await new Promise((resolve) => setTimeout(resolve, 100))
      await smoothScrollTo("productos")
    },
    [onCategorySelect, smoothScrollTo],
  )

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explora nuestras categorías</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra todo lo que necesitas para tu hogar y trabajo en nuestras categorías especializadas
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.category)}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${category.color} p-6 text-white`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 group-hover:scale-125 transition-transform duration-500">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
})

export default FeaturedCategories
