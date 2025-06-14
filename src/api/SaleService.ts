import type { BasicPayment } from '@/api/interface/cart.interface'

export async function createSale(paymentData: BasicPayment) {
  try {
    const response = await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error en la venta: ${errorText || response.statusText}`)
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error('Error en createSale:', error)
    throw error
  }
}
