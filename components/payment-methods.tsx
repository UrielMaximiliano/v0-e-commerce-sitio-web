"use client"

import { CreditCard, Shield, Clock, Award } from "lucide-react"
import { useCallback } from "react"

export default function PaymentMethods() {
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
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Métodos de Pago y Beneficios</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Métodos de pago */}
          <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            <div className="bg-blue-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8" />
            </div>
            <h3 className="font-semibold mb-2">Todas las Tarjetas</h3>
            <p className="text-sm text-gray-600">Visa, Mastercard, American Express, Cabal, Naranja, Mercado Pago</p>
            <p className="text-xs text-blue-600 mt-2">Hasta 12 cuotas sin interés</p>
          </div>

          {/* Calidad */}
          <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            <div className="bg-green-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="font-semibold mb-2">Productos de Calidad</h3>
            <p className="text-sm text-gray-600">Solo trabajamos con las mejores marcas del mercado</p>
            <p className="text-xs text-green-600 mt-2">Calidad garantizada</p>
          </div>

          {/* Garantía */}
          <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            <div className="bg-purple-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="font-semibold mb-2">Garantía Oficial</h3>
            <p className="text-sm text-gray-600">Todos nuestros productos tienen garantía oficial de fábrica</p>
            <p className="text-xs text-purple-600 mt-2">12 meses mínimo</p>
          </div>

          {/* Soporte */}
          <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            <div className="bg-orange-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="font-semibold mb-2">Soporte 24/7</h3>
            <p className="text-sm text-gray-600">Atención al cliente por WhatsApp, email y teléfono</p>
            <p className="text-xs text-orange-600 mt-2">Respuesta inmediata</p>
          </div>
        </div>

        {/* Tarjetas aceptadas */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Aceptamos Todas las Tarjetas de Crédito y Débito</h3>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <span className="text-blue-600 font-bold">VISA</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <span className="text-red-600 font-bold">MASTERCARD</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <span className="text-blue-800 font-bold">AMERICAN EXPRESS</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <span className="text-orange-600 font-bold">CABAL</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <span className="text-orange-500 font-bold">NARANJA</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <span className="text-blue-500 font-bold">MERCADO PAGO</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">💳 Aceptamos todas las tarjetas de crédito y débito</p>
        </div>
      </div>
    </section>
  )
}
