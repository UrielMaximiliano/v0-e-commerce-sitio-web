"use client"

import type React from "react"

import { X } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/types/product"
import { formatWhatsAppMessage } from "@/utils/format"

interface CustomerInfo {
  name: string
  phone: string
  address: string
}

interface CartProps {
  items: Product[]
  setItems: React.Dispatch<React.SetStateAction<Product[]>>
  onClose: () => void
  customerInfo: CustomerInfo
  onCustomerInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Cart({ items, setItems, onClose, customerInfo, onCustomerInfoChange }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const removeItem = (id: number, selectedSize?: string) => {
    setItems(items.filter((item) => !(item.id === id && item.selectedSize === selectedSize)))
  }

  const updateQuantity = (id: number, selectedSize: string | undefined, newQuantity: number) => {
    if (newQuantity < 1) return

    setItems(
      items.map((item) =>
        item.id === id && item.selectedSize === selectedSize ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const whatsappNumber = "5491112345678" // Reemplazar con número real
  const message = formatWhatsAppMessage(items, total, customerInfo)
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-xl">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Tu Carrito</h2>
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-center py-8 text-gray-500">Tu carrito está vacío</p>
          ) : (
            <>
              <ul className="divide-y">
                {items.map((item, index) => (
                  <li key={`${item.id}-${item.selectedSize}-${index}`} className="py-4 flex">
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toLocaleString()}</p>
                      {item.selectedSize && <p className="text-gray-500 text-sm">Talle: {item.selectedSize}</p>}
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-l"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center border-t border-b">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded-r"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize)}
                          className="ml-auto text-red-500 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Información de contacto</h3>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={onCustomerInfoChange}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={onCustomerInfoChange}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Tu número de teléfono"
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm text-gray-600 mb-1">
                        Dirección
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={onCustomerInfoChange}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Tu dirección"
                      />
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 text-white text-center py-3 rounded-md hover:bg-green-600"
                >
                  Enviar pedido por WhatsApp
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
