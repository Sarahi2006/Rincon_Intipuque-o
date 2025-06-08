<script setup lang="ts">
import { defineProps } from 'vue'
import LinkNav from '@/components/ui/LinkNav.vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <header class="bg-base-600 p-5 border-b-2 border-gray-200">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo y Título -->
      <div class="flex items-center">
        <img
          src="../../assets/img/logo.png"
          alt="Logo del Restaurante Rincón Intipuqueño"
          class="w-20 h-20 object-cover rounded-full"
        >
        <h1 class="text-3xl font-bold ml-4 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          {{ props.title }}
        </h1>
      </div>

      <!-- Navegación alineada -->
      <nav class="flex items-center space-x-4 hidden sm:flex">
        <link-nav text="Inicio" link="/" />
        <link-nav text="Eventos" link="/event" />
        <link-nav text="Sobre Nosotros" link="/about" />
        <link-nav text="Servicios" link="/services" />

        <RouterLink
          to="/register"
          class="p-1 rounded-full hover:bg-gray-700 transition flex items-center justify-center"
        >
          <img
            src="@/assets/img/user-icon.png"
            alt="Registro"
            class="w-10 h-10 object-cover"
          >
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
