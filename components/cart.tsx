"use client"

import type React from "react"

import { X, Trash2, ShoppingBag } from "lucide-react"
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
  const total = items.reduce(
    (sum, item) =>
      sum +
      (item.discount ? (item.price - (item.price * item.discount) / 100) * item.quantity : item.price * item.quantity),
    0,
  )

  const removeItem = (id: number, selectedSpec?: string) => {
    setItems(items.filter((item) => !(item.id === id && item.selectedSpec === selectedSpec)))
  }

  const updateQuantity = (id: number, selectedSpec: string | undefined, newQuantity: number) => {
    if (newQuantity < 1) return

    setItems(
      items.map((item) =>
        item.id === id && item.selectedSpec === selectedSpec ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const whatsappNumber = "5491112345678" // Reemplazar con número real
  const message = formatWhatsAppMessage(items, total, customerInfo)
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-xl animate-in slide-in-from-right duration-500">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Tu Carrito
            </h2>
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-xl font-medium text-gray-700 mb-2">Tu carrito está vacío</p>
              <p className="text-gray-500 mb-6">Agrega productos para comenzar tu compra</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <>
              <ul className="divide-y">
                {items.map((item, index) => {
                  const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price

                  return (
                    <li key={`${item.id}-${item.selectedSpec}-${index}`} className="py-4 flex">
                      <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                        <div className="flex justify-between">
                          <p className="text-blue-600 font-medium">${itemPrice.toLocaleString()}</p>
                          {item.discount && (
                            <p className="text-gray-500 text-sm line-through">${item.price.toLocaleString()}</p>
                          )}
                        </div>
                        {item.selectedSpec && <p className="text-gray-500 text-sm">{item.selectedSpec}</p>}
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSpec, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border rounded-l bg-gray-50 transition-all duration-200 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center border-t border-b bg-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSpec, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border rounded-r bg-gray-50 transition-all duration-200 hover:bg-gray-100"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id, item.selectedSpec)}
                            className="ml-auto text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between text-lg mb-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Envío:</span>
                  <span>Calculado en el siguiente paso</span>
                </div>
                <div className="flex justify-between text-xl font-bold mb-6 pb-4 border-b">
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
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tu dirección"
                      />
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-md hover:bg-green-700 transition-colors transform hover:scale-105 hover:shadow-lg"
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
