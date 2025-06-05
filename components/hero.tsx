"use client"

import { useCallback, memo } from "react"
import { scrollManager, easingFunctions } from "@/utils/scroll"

interface HeroProps {
  onNavigateToProducts: () => void
  onNavigateToFeatured: () => void
}

const Hero = memo(function Hero({ onNavigateToProducts, onNavigateToFeatured }: HeroProps) {
  const smoothScrollTo = useCallback(async (elementId: string) => {
    await scrollManager.smoothScrollTo(elementId, {
      duration: 1400,
      easing: easingFunctions.easeInOutQuint,
      offset: -80,
    })
  }, [])

  const handleProductsClick = useCallback(async () => {
    onNavigateToProducts()
    await smoothScrollTo("productos")
  }, [onNavigateToProducts, smoothScrollTo])

  const handleFeaturedClick = useCallback(async () => {
    onNavigateToFeatured()
    await smoothScrollTo("destacados")
  }, [onNavigateToFeatured, smoothScrollTo])

  return (
    <section id="inicio" className="relative bg-black h-[80vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-tech.png')",
          filter: "brightness(0.6)",
        }}
      />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="text-left md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-left duration-1000">
            <span className="block">Todo lo que</span>
            <span className="text-blue-500">necesitás</span>
            <span className="block">en un solo lugar</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-left duration-1000 delay-300">
            Descubrí los mejores productos para tu hogar y trabajo, con la mejor calidad y precios competitivos.
          </p>
          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-left duration-1000 delay-500">
            <button
              onClick={handleProductsClick}
              className="inline-block bg-blue-600 text-white px-8 py-4 text-lg font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Ver productos
            </button>
            <button
              onClick={handleFeaturedClick}
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Productos destacados
            </button>
          </div>
        </div>

        {/* Hero features */}
        <div className="md:w-1/2 hidden md:block animate-in fade-in slide-in-from-right duration-1000 delay-700">
          <div className="grid grid-cols-2 gap-4 text-white">
            {[
              { number: "500+", label: "Productos" },
              { number: "8", label: "Categorías" },
              { number: "24/7", label: "Soporte" },
              { number: "💳", label: "Todas las tarjetas" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div className="text-2xl font-bold text-blue-400">{item.number}</div>
                <div className="text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated tech particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
      </div>
    </section>
  )
})

export default Hero
