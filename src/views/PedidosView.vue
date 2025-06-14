<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'
import PedidosList from '@/components/PedidosList.vue'
</script>

<template>
  <Navbar title="Pedidos" />
  <main>
    <PedidosList />
  </main>
  <Footer />
</template>
