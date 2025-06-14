import type { Product } from './plate.interface'

export interface CartItem {
  product: Product
  quantity: number
}

export interface BasicPayment {
  orderNumber: string  // número de orden generado automáticamente
  customerName: string
  items: CartItem[]
  subTotal: number
  total: number
}
