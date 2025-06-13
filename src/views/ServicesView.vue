<script setup lang="ts">
import ServicesList from '@/components/ServicesList.vue'
import Navbar from '@/components/ui/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'
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
