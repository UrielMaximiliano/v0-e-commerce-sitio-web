"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X, Search } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  cartCount: number
  toggleCart: () => void
}

export default function Header({ cartCount, toggleCart }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-2xl">
              MODA<span className="text-gray-500">STYLE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium">
              Inicio
            </Link>
            <Link href="#productos" className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium">
              Productos
            </Link>
            <Link href="#categorias" className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium">
              Categorías
            </Link>
            <Link href="#contacto" className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium">
              Contacto
            </Link>
          </nav>

          {/* Cart and Mobile Menu Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-gray-900"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile search button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
              aria-label={isSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              onChange={(e) => {
                // Aquí podrías implementar una búsqueda rápida o redirigir a la página de productos
                console.log("Búsqueda móvil:", e.target.value)
              }}
            />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="#productos"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="#categorias"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Categorías
            </Link>
            <Link
              href="#contacto"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
