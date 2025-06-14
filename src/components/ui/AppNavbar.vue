<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import LinkNav from '@/components/ui/LinkNav.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadFromLocalStorage()
})

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
          src="/img/logo.png"
          alt="Logo del Restaurante Rincón Intipuqueño"
          class="w-20 h-20 object-cover rounded-full"
        />
        <h1 class="text-3xl font-bold ml-4 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          {{ props.title }}
        </h1>
      </div>

      <!-- Navegación -->
      <nav class="flex items-center space-x-4 hidden sm:flex">
        <LinkNav text="Inicio" link="/" />
        <LinkNav text="Eventos" link="/event" />
        <LinkNav text="Sobre Nosotros" link="/about" />
        <LinkNav text="Servicios" link="/services" />
        <LinkNav text="Carrito" link="/cart" :icon="true" :count="cartStore.totalQuantity" />


        <!-- Botón de logout -->
        <button
          @click="logout"
          class="p-2 rounded-full hover:bg-gray-700 transition flex items-center justify-center"
          title="Cerrar sesión"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </nav>

      <!-- Menú móvil -->
      <div class="sm:hidden">
        <button class="text-white focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
