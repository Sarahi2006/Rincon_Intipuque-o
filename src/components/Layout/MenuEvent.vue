<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { EventInterface } from '@/api/interface/event.interface.ts'
import { getEvents } from '@/api/Event.ts'
import EventCard from '@/components/ui/EventCard.vue'

const events = ref<EventInterface[]>([])

onMounted(async () => {
  events.value = await getEvents()
})
</script>

<template>
  <section class="container mx-auto py-16 min-h-[calc(100vh-4rem)]">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="event in events" :key="event.id">
        <EventCard :title="event.title" :description="event.description" :time="event.time" :date="event.date" :img="event.image" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
