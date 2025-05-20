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
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const whatsappNumber = "5491112345678" // Reemplazar con número real
  const message = formatWhatsAppMessage(cartItems, total, customerInfo)
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-40"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
