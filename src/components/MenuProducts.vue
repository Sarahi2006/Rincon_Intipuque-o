<script setup lang="ts">
import CardProduct from '@/components/CardProduct.vue'
import type { Plate } from '@/api/plate.interface.ts'
import { getPlates } from '@/api/Plates.ts'
import { onMounted, ref } from 'vue'

const plates = ref<Plate[]>([])

onMounted(async () => {
  const data = await getPlates()
  plates.value = data
})

</script>

<template>
  <section class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-6">Nuestro Menú</h2>

    <div class="grid auto-cols-1 gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      <div v-for="plate in plates" :key="plate.id" >
        <CardProduct :title="plate.name" :price="plate.price" :description="plate.description" :img="plate.img"/>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
