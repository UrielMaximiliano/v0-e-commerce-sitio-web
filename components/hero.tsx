import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative bg-gray-900 h-[70vh] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-fashion.jpg')",
          filter: "brightness(0.6)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Descubre Tu Estilo</h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Nuevas colecciones que definen tendencias y expresan tu personalidad
        </p>
        <Link
          href="#productos"
          className="inline-block bg-white text-gray-900 px-8 py-3 text-lg font-medium rounded-md hover:bg-gray-100 transition-colors"
        >
          Ver Colección
        </Link>
      </div>
    </div>
  )
}
