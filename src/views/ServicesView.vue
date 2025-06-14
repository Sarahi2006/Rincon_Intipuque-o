<script setup lang="ts">
import ServicesList from '@/components/ServicesList.vue'
import AppNavbar from '@/components/ui/AppNavbar.vue'
import Footer from '@/components/ui/Footer.vue'
</script>

<template>
  <AppNavbar title="Servicios" />
  <main>
    <ServicesList />
  </main>
  <Footer />
</template>

<style scoped></style>
