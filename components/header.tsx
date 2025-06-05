"use client"

import type React from "react"
import { ShoppingBag, Menu, X, Search } from "lucide-react"
import { useState, useCallback, memo } from "react"
import { scrollManager, easingFunctions } from "@/utils/scroll"

interface HeaderProps {
  cartCount: number
  toggleCart: () => void
  onSearch: (searchTerm: string) => void
  onCategorySelect: (category: string) => void
  searchTerm: string
}

const Header = memo(function Header({
  cartCount,
  toggleCart,
  onSearch,
  onCategorySelect,
  searchTerm,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  const smoothScrollTo = useCallback(async (elementId: string) => {
    await scrollManager.smoothScrollTo(elementId, {
      duration: 1200,
      easing: easingFunctions.easeInOutCubic,
      offset: -80,
    })
  }, [])

  const handleSearchSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      onSearch(localSearchTerm)
      await smoothScrollTo("productos")
    },
    [localSearchTerm, onSearch, smoothScrollTo],
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setLocalSearchTerm(value)
      onSearch(value)
    },
    [onSearch],
  )

  const handleCategoryClick = useCallback(
    async (category: string) => {
      onCategorySelect(category)
      setIsMenuOpen(false)
      await smoothScrollTo("productos")
    },
    [onCategorySelect, smoothScrollTo],
  )

  const handleNavClick = useCallback(
    async (sectionId: string) => {
      setIsMenuOpen(false)
      await smoothScrollTo(sectionId)
    },
    [smoothScrollTo],
  )

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick("inicio")}
              className="font-bold text-2xl flex items-center hover:text-blue-400 transition-colors duration-300"
            >
              <span className="text-white font-extrabold uppercase">LA ROCKA</span>
              <span className="text-blue-500 font-extrabold uppercase ml-1">SHOP</span>
            </button>
          </div>

          {/* Search bar (desktop) */}
          <div className="hidden md:block flex-1 max-w-md mx-auto px-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={localSearchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => handleNavClick("inicio")}
              className="text-zinc-300 hover:text-white px-2 py-2 text-sm font-medium transition-colors duration-300"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick("productos")}
              className="text-zinc-300 hover:text-white px-2 py-2 text-sm font-medium transition-colors duration-300"
            >
              Productos
            </button>
            <button
              onClick={() => handleNavClick("destacados")}
              className="text-zinc-300 hover:text-white px-2 py-2 text-sm font-medium transition-colors duration-300"
            >
              Destacados
            </button>
            <button
              onClick={() => handleNavClick("contacto")}
              className="text-zinc-300 hover:text-white px-2 py-2 text-sm font-medium transition-colors duration-300"
            >
              Contacto
            </button>
          </nav>

          {/* Cart and Mobile Menu Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-zinc-300 hover:text-white transition-colors duration-300"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile search button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors duration-300"
              aria-label={isSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors duration-300"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 p-3 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              value={localSearchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => handleNavClick("inicio")}
              className="block w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors duration-300"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick("productos")}
              className="block w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors duration-300"
            >
              Productos
            </button>
            <button
              onClick={() => handleNavClick("destacados")}
              className="block w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors duration-300"
            >
              Destacados
            </button>
            <button
              onClick={() => handleNavClick("contacto")}
              className="block w-full text-left px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors duration-300"
            >
              Contacto
            </button>
          </div>
        </div>
      )}

      {/* Categories Navigation */}
      <div className="bg-zinc-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-2 overflow-x-auto">
            {[
              "Celulares",
              "Notebooks",
              "Heladeras",
              "Lavarropas y Secarropas",
              "Audio",
              "Aires Acondicionados",
              "Electrodomésticos",
              "Bicicletas",
            ].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="text-zinc-300 hover:text-white text-sm font-medium whitespace-nowrap transition-colors duration-300 hover:scale-105 transform"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
})

export default Header
