<script setup lang="ts">
import type { Product } from '@/api/interface/plate.interface'

const props = defineProps<{ product: Product }>()

const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()

function addToCart() {
  emit('add-to-cart', props.product)
}
</script>

<template>
  <button
    @click="addToCart"
    type="button"
    class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none transition"
  >
    Agregar al carrito
  </button>
</template>
