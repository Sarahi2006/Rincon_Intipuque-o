<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="relative min-h-[calc(100vh-4rem)] flex items-center">
    <img
      src="/src/assets/img/3533.jpg"
      alt="Platillo típico"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="relative z-10 text-center max-w-4xl mx-auto bg-black/70 p-6 rounded-xl">
      <h2 class="text-4xl font-semibold mb-4 text-white">
        "Bienvenidos a nuestro rincón gastronómico, donde cada platillo cuenta una historia."
      </h2>
      <p class="text-lg text-white mb-6 font-semibold">
        Consulta nuestro calendario de eventos especiales.
      </p>
      <RouterLink
        to="/event"
        class="rounded-full bg-gradient-to-r from-sky-400 to-sky-600 px-8 py-3 text-lg font-semibold text-white hover:brightness-110 transition"
        >Ver Más</RouterLink
      >
    </div>
  </section>
</template>

<style scoped></style>
