<script setup lang="ts">
import AppNavbar from '@/components/ui/AppNavbar.vue'
import Footer from '@/components/ui/Footer.vue'
import CartList from '@/components/ui/CartList.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavbar title="Carrito de Compras" />
    <main class="flex-1 p-6 bg-gray-50">
      <CartList />
    </main>
    <Footer />
  </div>
</template>

