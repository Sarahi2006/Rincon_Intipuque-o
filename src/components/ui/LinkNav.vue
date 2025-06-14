<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 0,
  },
})
</script>



<template>
  <RouterLink
    :to="props.link"
    class="relative px-4 py-2 bg-white border-2 rounded-full border-gray-700 hover:bg-gray-200 transition flex items-center space-x-2"
  >
    <!-- Ícono del carrito (opcional) -->
    <svg
      v-if="icon"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-gray-800"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.45h12.1"
      />
    </svg>

    <span>{{ props.text }}</span>
    <span
      v-if="icon && count > 0"
      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
    >
      {{ count }}
    </span>
  </RouterLink>
</template>

<style scoped></style>
