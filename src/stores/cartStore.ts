import { defineStore } from 'pinia'
import type { CartItem } from '@/api/interface/cart.interface'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalQuantity: (state) =>
      state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
  },
  actions: {
    addItem(product: CartItem['product']) {
      const existing = this.items.find(item => item.product._id === product._id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },
    removeItem(productId: string) {
      this.items = this.items.filter(item => item.product._id !== productId)
    },
    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(item => item.product._id === productId)
      if (!item) return

      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
      }
    },
    increaseQuantity(productId: string) {
      const item = this.items.find(item => item.product._id === productId)
      if (item) item.quantity++
    },
    decreaseQuantity(productId: string) {
      const item = this.items.find(item => item.product._id === productId)
      if (item) {
        item.quantity--
        if (item.quantity <= 0) this.removeItem(productId)
      }
    },
    loadFromLocalStorage() {
      try {
        this.items = JSON.parse(localStorage.getItem('cart') || '[]')
      } catch {
        this.items = []
      }
    },
    clearCart() {
      this.items = []
    },
  },
})
