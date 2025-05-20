import type { Product } from "@/types/product"

interface CustomerInfo {
  name: string
  phone: string
  address: string
}

export function formatWhatsAppMessage(items: Product[], total: number, customerInfo?: CustomerInfo): string {
  if (items.length === 0) return "Hola, me gustaría hacer una consulta."

  let message = "Hola, quiero confirmar la siguiente compra:\n\n"

  // Detalles de los productos
  items.forEach((item) => {
    message += `- ${item.name} ${item.selectedSize ? `(Talle: ${item.selectedSize})` : ""} x${item.quantity} = $${(item.price * item.quantity).toLocaleString()}\n`
  })

  message += `\nTotal: $${total.toLocaleString()}`

  // Información del cliente
  if (customerInfo) {
    message += "\n\nDatos para la entrega:"

    if (customerInfo.name) {
      message += `\nNombre: ${customerInfo.name}`
    }

    if (customerInfo.phone) {
      message += `\nTeléfono: ${customerInfo.phone}`
    }

    if (customerInfo.address) {
      message += `\nDirección: ${customerInfo.address}`
    }
  }

  return message
}
