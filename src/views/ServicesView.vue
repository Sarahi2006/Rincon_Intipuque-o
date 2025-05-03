<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ServicesList from '@/components/ServicesList.vue' 
</script>

<template>
  <Navbar title="Servicios" />
  <main>
    <ServicesList />
  </main>
  <Footer />
</template>

<style scoped>
</style>
