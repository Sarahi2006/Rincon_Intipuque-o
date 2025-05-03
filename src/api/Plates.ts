import data from "@/api/Platillos.json"
import type { Plate } from '@/api/plate.interface.ts'

export const getPlates = async (): Promise<Plate[]> => {
  return await data.data
}
