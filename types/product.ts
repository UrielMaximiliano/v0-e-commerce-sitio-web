export interface Product {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  specs: {
    colors?: string[]
    storage?: string[]
    processor?: string[]
    size?: string[]
    capacity?: string[]
    gpu?: string[]
    efficiency?: string[]
    power?: string[]
    features?: string[]
  }
  selectedSpec?: string
  category: string
  subcategory?: string
  discount?: number
  rating?: number
  featured?: boolean
  new?: boolean
  description: string
  detailedSpecs: {
    [key: string]: string | string[]
  }
}
