<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'
import Hero from '@/components/Hero.vue'
import MenuProducts from '@/components/Layout/MenuProducts.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar title="RINCÓN INTIPUQUEÑO" />
    <main class="flex-1">
      <Hero />
      <MenuProducts />
    </main>
    <Footer />
  </div>
</template>
