<script setup lang="ts">
import AppNavbar from '@/components/ui/AppNavbar.vue'
import Footer from '@/components/ui/Footer.vue'
import Hero from '@/components/Hero.vue'
import MenuProducts from '@/components/Layout/MenuProducts.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavbar title="RINCÓN INTIPUQUEÑO" />
    <main class="flex-1">
      <Hero />
      <MenuProducts />
    </main>
    <Footer />
  </div>
</template>
