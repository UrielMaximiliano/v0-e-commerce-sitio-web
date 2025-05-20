export interface Product {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  sizes: string[]
  selectedSize?: string
  category: string
}
