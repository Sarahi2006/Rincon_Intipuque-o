<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-lg min-h-full border-2 border-gray-200">
    <img :src="image" :alt="description" class="rounded-lg mb-4 w-full h-48 object-cover" />
    <h3 class="text-xl font-bold">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
    <p class="text-red-500 font-bold mt-2">${{ price }}</p>
  </div>
</template>

<style scoped></style>
