"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react"
import { useCallback } from "react"
import { scrollManager, easingFunctions } from "@/utils/scroll"

export default function Footer() {
  const smoothScrollTo = useCallback(async (elementId: string) => {
    await scrollManager.smoothScrollTo(elementId, {
      duration: 1000,
      easing: easingFunctions.easeOutQuart,
      offset: -80,
    })
  }, [])

  return (
    <footer id="contacto" className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Información */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">La Rocka Shop</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Tu tienda de tecnología y electrodomésticos favorita, con los mejores precios y la mayor variedad de productos.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">Youtube</span>
              </a>
            </div>
            {/* Créditos de desarrollo */}
            <div className="mt-8 flex flex-col items-center">
              <div className="w-32 border-t border-gray-700 mb-2"></div>
              <div className="flex items-center gap-2 text-sm text-blue-400 font-semibold italic">
                <span>💻</span>
                <span>
                  Web desarrollada por <span className="text-white">Uriel Sabugo</span> & <span className="text-white">Nicolas Médula</span>
                </span>
              </div>
            </div>
          </div>

          {/* Columna 3: Categorías */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => smoothScrollTo("productos")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Celulares y Notebooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("productos")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Heladeras
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("productos")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Lavarropas y Secarropas
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("productos")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("productos")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Aires Acondicionados
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("productos")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Electrodomésticos
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo("productos")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Bicicletas
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span className="text-gray-400">La Leonesa, Chaco</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-400">+54 9 362 455-4385</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-400">info@larockashop.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-400">Lun-Sab: 8:00 - 12:00 y 17:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} La Rocka Shop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
