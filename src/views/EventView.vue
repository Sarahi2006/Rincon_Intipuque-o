<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'
import MenuEvent from '@/components/Layout/MenuEvent.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar title="Eventos Especiales"/>
    <main class="flex-1">
      <MenuEvent/>
    </main>
    <Footer/>
  </div>

</template>

<style scoped>

</style>
