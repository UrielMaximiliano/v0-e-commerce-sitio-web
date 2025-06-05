import { useMemo } from "react"

/**
 * Hook para calcular el precio final de un producto con descuento.
 * Cumple con SRP y facilita la reutilización.
 */
export function useFinalPrice(price: number, discount?: number): number {
  return useMemo(() => {
    if (!discount) return price
    return Math.round(price * (1 - discount / 100))
  }, [price, discount])
} 