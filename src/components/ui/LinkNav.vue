<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    :to="props.link"
    class="px-4 py-2 bg-white border-2 rounded-full border-gray-700 hover:bg-gray-200 transition"
    >{{ props.text }}</RouterLink
  >
</template>

<style scoped></style>
