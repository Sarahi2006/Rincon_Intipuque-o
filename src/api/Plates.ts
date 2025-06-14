import data from '@/api/data/plates.json'
import type { Plate } from '@/api/interface/plate.interface.ts'

export const getPlates = async (): Promise<Plate[]> => {
  return await data.data
}
