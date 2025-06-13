import data from '@/api/data/events.json'
import type { EventInterface } from '@/api/interface/event.interface.ts'

export const getEvents = async (): Promise<EventInterface[]> => {
  return await data.data
}
