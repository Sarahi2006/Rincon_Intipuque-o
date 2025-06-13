<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-lg min-h-full border-2 border-gray-200">
    <img :src="img" :alt="description" class="w-full h-48 object-cover rounded-md" />
    <h3 class="text-2xl font-bold text-gray-800 mt-4">{{ title }}</h3>
    <p class="text-sm text-gray-500 mb-4">{{ date }} | {{ time }}</p>
    <p class="text-gray-600 mb-4">{{ description }}</p>
    <a
      href="#"
      class="px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-700 transition"
    >
      Más información
    </a>
  </div>
</template>

<style scoped></style>
