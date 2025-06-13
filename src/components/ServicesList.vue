<script setup lang="ts">
import { ref, computed } from 'vue'

const services = ref([
  {
    id: 1,
    name: 'Catering para Eventos',
    description: 'Servicio de catering para bodas y fiestas.',
    price: 500.0,
    type: 'catering',
  },
  {
    id: 2,
    name: 'Delivery de Comida',
    description: 'Entrega de comida a domicilio.',
    price: 10.0,
    type: 'delivery',
  },
  {
    id: 3,
    name: 'Comida para Eventos',
    description: 'Preparación de comida especial para grandes eventos.',
    price: 800.0,
    type: 'eventos',
  },
  {
    id: 4,
    name: 'Catering Corporativo',
    description: 'Servicio de catering para reuniones de empresa.',
    price: 300.0,
    type: 'catering',
  },
  {
    id: 5,
    name: 'Delivery de Almuerzos',
    description: 'Servicio de entrega de almuerzos frescos.',
    price: 15.0,
    type: 'delivery',
  },
])

// Filtro de tipo de servicio
const serviceFilter = ref('all')

// Propiedad computada para filtrar los servicios según el tipo seleccionado
const filteredServices = computed(() => {
  if (serviceFilter.value === 'all') {
    return services.value
  }
  return services.value.filter((service) => service.type === serviceFilter.value)
})
</script>

<template>
  <section class="py-10 px-6 bg-white text-gray-800">
    <h2 class="text-3xl font-bold text-center mb-6">Nuestros Servicios</h2>

    <div class="mb-6 text-center">
      <label for="serviceFilter" class="text-lg font-semibold">Filtrar por tipo de servicio:</label>
      <select id="serviceFilter" v-model="serviceFilter" class="border rounded p-2">
        <option value="all">Todos</option>
        <option value="catering">Catering</option>
        <option value="delivery">Delivery</option>
        <option value="eventos">Comida para Eventos</option>
      </select>
    </div>

    <div class="flex flex-wrap justify-center gap-6">
      <div
        v-for="(service, index) in filteredServices"
        :key="index"
        class="flex flex-col bg-gray-100 p-6 rounded-lg shadow-md w-80"
      >
        <h3 class="text-2xl font-semibold mb-2">{{ service.name }}</h3>
        <p class="text-gray-600 mb-4">{{ service.description }}</p>
        <p class="font-bold text-xl text-center">${{ service.price.toFixed(2) }}</p>
      </div>
    </div>
  </section>
</template>
