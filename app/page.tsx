"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ProductGrid from "@/components/product-grid"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import Cart from "@/components/cart"
import SizeFilter from "@/components/size-filter"
import CategoryFilter from "@/components/category-filter"
import type { Product } from "@/types/product"

export default function Home() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  })

  // Productos de ejemplo con categorías e imágenes reales
  const products: Product[] = useMemo(
    () => [
      {
        id: 1,
        name: "Camiseta Básica",
        price: 2500,
        image: "/images/camiseta-basica.jpg",
        quantity: 0,
        sizes: ["S", "M", "L", "XL"],
        category: "Ropa",
      },
      {
        id: 2,
        name: "Pantalón Jogger",
        price: 4500,
        image: "/images/pantalon-jogger.jpg",
        quantity: 0,
        sizes: ["S", "M", "L", "XL", "XXL"],
        category: "Ropa",
      },
      {
        id: 3,
        name: "Chaqueta Denim",
        price: 7900,
        image: "/images/chaqueta-denim.jpg",
        quantity: 0,
        sizes: ["M", "L", "XL"],
        category: "Ropa",
      },
      {
        id: 4,
        name: "Vestido Casual",
        price: 5500,
        image: "/images/vestido-casual.jpg",
        quantity: 0,
        sizes: ["XS", "S", "M", "L"],
        category: "Ropa",
      },
      {
        id: 5,
        name: "Zapatillas Running",
        price: 8900,
        image: "/images/zapatillas-running.jpg",
        quantity: 0,
        sizes: ["38", "39", "40", "41", "42", "43"],
        category: "Zapatillas",
      },
      {
        id: 6,
        name: "Zapatillas Urbanas",
        price: 7500,
        image: "/images/zapatillas-urbanas.jpg",
        quantity: 0,
        sizes: ["36", "37", "38", "39", "40", "41"],
        category: "Zapatillas",
      },
      {
        id: 7,
        name: "Gorra Deportiva",
        price: 1800,
        image: "/images/gorra-deportiva.jpg",
        quantity: 0,
        sizes: ["Única"],
        category: "Accesorios",
      },
      {
        id: 8,
        name: "Bolso Tote",
        price: 3200,
        image: "/images/bolso-tote.jpg",
        quantity: 0,
        sizes: ["Única"],
        category: "Accesorios",
      },
      {
        id: 9,
        name: "Zapatillas Deportivas",
        price: 9500,
        image: "/images/zapatillas-deportivas.jpg",
        quantity: 0,
        sizes: ["38", "39", "40", "41", "42"],
        category: "Zapatillas",
      },
    ],
    [],
  )

  // Obtener todos los talles disponibles para el filtro
  const allSizes = useMemo(() => {
    const sizesSet = new Set<string>()
    products.forEach((product) => {
      product.sizes.forEach((size) => sizesSet.add(size))
    })
    return Array.from(sizesSet).sort()
  }, [products])

  // Obtener todas las categorías disponibles para el filtro
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>()
    products.forEach((product) => {
      categoriesSet.add(product.category)
    })
    return Array.from(categoriesSet).sort()
  }, [products])

  const handleSizeFilter = (size: string) => {
    if (size === "clear") {
      setSelectedSizes([])
      return
    }

    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const handleCategoryFilter = (category: string) => {
    if (category === "clear") {
      setSelectedCategories([])
      return
    }

    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const addToCart = (product: Product, selectedSize: string) => {
    // Verificar si el producto ya está en el carrito con el mismo talle
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.selectedSize === selectedSize,
    )

    if (existingProductIndex >= 0) {
      // Si ya existe, incrementar la cantidad
      const updatedItems = [...cartItems]
      updatedItems[existingProductIndex].quantity += 1
      setCartItems(updatedItems)
    } else {
      // Si no existe, agregar con cantidad 1 y el talle seleccionado
      setCartItems([...cartItems, { ...product, quantity: 1, selectedSize }])
    }
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={totalItems} toggleCart={toggleCart} />

      {isCartOpen && (
        <Cart
          items={cartItems}
          setItems={setCartItems}
          onClose={() => setIsCartOpen(false)}
          customerInfo={customerInfo}
          onCustomerInfoChange={handleCustomerInfoChange}
        />
      )}

      <Hero />

      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestra Colección</h2>

        <div className="mb-8 space-y-6">
          <CategoryFilter
            availableCategories={allCategories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryFilter}
          />

          <SizeFilter availableSizes={allSizes} selectedSizes={selectedSizes} onSizeChange={handleSizeFilter} />
        </div>

        <ProductGrid
          products={products}
          addToCart={addToCart}
          selectedSizes={selectedSizes}
          selectedCategories={selectedCategories}
        />
      </section>

      <Footer />

      <WhatsAppButton cartItems={cartItems} customerInfo={customerInfo} />
    </main>
  )
}
