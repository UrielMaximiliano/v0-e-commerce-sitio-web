"use client"

import type React from "react"

import { Search, X } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
  searchTerm: string
}

export default function SearchBar({ onSearch, searchTerm }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm)

  // Sincronizar el valor del input con el searchTerm externo
  useEffect(() => {
    setInputValue(searchTerm)
  }, [searchTerm])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onSearch(value)
    if (value.trim() !== "") {
      setTimeout(() => smoothScrollTo("productos"), 100)
    }
  }

  const clearSearch = () => {
    setInputValue("")
    onSearch("")
  }

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Buscar productos..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
        />
        {inputValue && (
          <button
            onClick={clearSearch}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
