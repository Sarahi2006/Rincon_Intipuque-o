<script setup lang="ts">
import { defineProps } from 'vue'
import LinkNav from '@/components/LinkNav.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <header class="bg-base-600 p-5 border-b-2 border-gray-200">
    <!-- Contenedor para centrar el contenido -->
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo y Título -->
      <div class="flex items-center">
        <!-- Logo del restaurante -->
        <img src="../../public/img/logo.jpeg" alt="Logo del Restaurante Rincón Intipuqueño" class="w-24 h-16 object-cover rounded-full ">
        <h1 class="text-3xl font-bold ml-4 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl">{{ props.title }}</h1>
      </div>
      <!-- Navegación -->
      <nav class="flex space-x-4 hidden sm:flex">
        <link-nav text="Inicio" link="/"/>
        <link-nav text="Eventos" link="/event"/>
        <link-nav text="Sobre Nosotros" link="/about"/>
        <link-nav text="Servicios" link="/services"/>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>
