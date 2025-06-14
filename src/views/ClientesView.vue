<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'
import ClientesList from '@/components/ClientesList.vue'
</script>

<template>
  <Navbar title="Clientes" />
  <main>
    <ClientesList />
  </main>
  <Footer />
</template>
