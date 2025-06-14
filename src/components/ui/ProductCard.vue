<script setup lang="ts">
import AddToCartButton from '@/components/ui/AddToCartButton.vue'
import type { Product } from '@/api/interface/plate.interface'

const props = defineProps<{ product: Product }>()
const product = props.product

const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()

function handleAddToCart(product: Product) {
  emit('add-to-cart', product)
}
</script>


<template>
  <div
    class="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto"
  >
    <img
      :src="product.image"
      :alt="product.description"
      class="rounded-lg object-cover w-full sm:w-40 h-32 sm:h-40 flex-shrink-0"
      loading="lazy"
    />

    <div class="flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
      <p class="text-gray-600 mt-1 flex-grow">{{ product.description }}</p>

      <div class="mt-3 flex items-center justify-between">
        <p class="text-red-600 font-bold text-lg">${{ product.price }}</p>
        <AddToCartButton :product="product" @add-to-cart="handleAddToCart" />
      </div>
    </div>
  </div>
</template>
