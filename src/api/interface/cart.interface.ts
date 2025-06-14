import type { Product } from './plate.interface'

export interface CartItem {
  product: Product
  quantity: number
}

export interface BasicPayment {
  orderNumber: string
  customerName: string
  items: { _id: string | number; quantity: number }[]
  subTotal: number
  total: number
}
