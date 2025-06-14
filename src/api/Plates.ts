import type { Product } from './interface/plate.interface'

export const getPlates = async (): Promise<Product[]> => {
  const response = await fetch('/src/api/data/plates.json')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const json = await response.json()
  return json.data as Product[]
}
