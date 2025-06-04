import type { Product } from "@/types/product"

interface CustomerInfo {
  name: string
  phone: string
  address: string
}

export function formatWhatsAppMessage(items: Product[], total: number, customerInfo?: CustomerInfo): string {
  if (items.length === 0) return "Hola, me gustaría hacer una consulta sobre sus productos."

  let message = "Hola, quiero confirmar la siguiente compra en LA ROCKA SHOP:\n\n"

  // Detalles de los productos
  items.forEach((item) => {
    const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price

    message += `- ${item.name} ${item.selectedSpec ? `(${item.selectedSpec})` : ""} x${item.quantity} = $${(itemPrice * item.quantity).toLocaleString()}\n`
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
