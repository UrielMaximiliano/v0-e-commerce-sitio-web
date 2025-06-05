import { MessageCircle } from "lucide-react"
import type { Product } from "@/types/product"
import { formatWhatsAppMessage } from "@/utils/format"

interface CustomerInfo {
  name: string
  phone: string
  address: string
}

interface WhatsAppButtonProps {
  cartItems: Product[]
  customerInfo: CustomerInfo
}

export default function WhatsAppButton({ cartItems, customerInfo }: WhatsAppButtonProps) {
  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.discount ? (item.price - (item.price * item.discount) / 100) * item.quantity : item.price * item.quantity),
    0,
  )

  // Número en formato internacional sin espacios ni guiones
  const whatsappNumber = "5493624554385"
  const message = formatWhatsAppMessage(cartItems, total, customerInfo)
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-50 flex items-center justify-center transform hover:scale-110 hover:shadow-xl animate-bounce focus:outline-none focus:ring-2 focus:ring-green-400"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
