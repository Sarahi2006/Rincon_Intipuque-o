<script setup lang="ts">
import { defineProps } from 'vue'
import LinkNav from '@/components/ui/LinkNav.vue'
import { RouterLink, useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const router = useRouter()

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>

<template>
  <header class="bg-base-600 p-5 border-b-2 border-gray-200">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo y Título -->
      <div class="flex items-center">
        <img
          src="@/assets/img/logo.png"
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

        <!-- Botón de logout con icono SVG -->
        <button
          @click="logout"
          class="p-2 rounded-full hover:bg-gray-700 transition flex items-center justify-center "
          title="Cerrar sesión"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>

        <!-- Alternativa: Si prefieres usar el icono de usuario existente -->
        <!--
        <button
          @click="logout"
          class="p-1 rounded-full hover:bg-gray-700 transition flex items-center justify-center"
          title="Cerrar sesión"
        >
          <img
            src="@/assets/img/user-icon.png"
            alt="Cerrar sesión"
            class="w-10 h-10 object-cover"
          >
        </button>
        -->
      </nav>

      <!-- Menú móvil (opcional) -->
      <div class="sm:hidden">
        <button class="text-white focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
