<script setup lang="ts">
  import { ref, computed } from 'vue'
  
  const values = [
    { icon: '🍽️', title: 'Comida Tradicional', description: 'Recetas auténticas con ingredientes frescos.' },
    { icon: '🏡', title: 'Ambiente Familiar', description: 'Espacio cálido y acogedor para todos.' },
    { icon: '🧑‍🍳', title: 'Pasión por Servir', description: 'Atención al cliente con dedicación y respeto.' }
  ]
  
  const totalValues = computed(() => values.length)
  
  const isOpen = true // booleano true o false
  
  const visitorName = ref('')
  </script>



<template>
    <section class="py-10 px-6 bg-white text-gray-800">
      <h2 class="text-3xl font-bold text-center mb-6">Sobre Nosotros</h2>
  
      <div class="max-w-4xl mx-auto text-lg leading-relaxed">
        <p class="mb-4">
          Bienvenidos a <strong>El Rincón de Intipucá</strong>, un espacio creado con amor para la comida tradicional salvadoreña.
          Nuestro objetivo es ofrecer sabores auténticos en un ambiente familiar y acogedor.
        </p>
        <p class="mb-4">
          Ubicados en el corazón de Intipucá, nos enorgullece presentar platillos caseros como pupusas, yuca frita
          y chilate, preparados con ingredientes frescos y un toque de tradición.
        </p>
        <p>
          Ya sea que estés celebrando una ocasión especial o simplemente buscando una buena comida,
          estamos aquí para que tu experiencia sea inolvidable. ¡Ven y prueba la tradición!
        </p>
      </div>
  
      <!-- Sección de valores del restaurante -->
      <div class="max-w-5xl mx-auto mt-10">
        <h3 class="text-2xl font-semibold text-center mb-4">Nuestros Valores</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="bg-gray-100 p-6 rounded-lg shadow text-center"
          >
            <div class="text-4xl mb-2">{{ value.icon }}</div>
            <h4 class="text-xl font-semibold mb-1">{{ value.title }}</h4>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
        <p class="mt-4 text-sm text-gray-500 text-center">Total de valores: {{ totalValues }}</p>
      </div>
  
      <!-- Sección condicional -->
      <div class="mt-10 text-center">
        <p v-if="isOpen" class="text-green-700 font-medium">
          ¡Estamos abiertos! Horario: 8:00 AM - 8:00 PM
        </p>
        <p v-else class="text-red-600 font-medium">
          Cerrado por hoy, ¡te esperamos mañana!
        </p>
      </div>
  
      <!-- Formulario oara el nomnbre -->
      <div class="mt-10 max-w-md mx-auto text-center">
        <label class="block mb-2 text-sm font-medium text-gray-700">¿Cómo te llamas?</label>
        <input
          v-model="visitorName"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Escribe tu nombre"
        />
        <p v-if="visitorName" class="mt-2 text-yellow-700 font-medium">
          ¡Gracias por visitarnos, {{ visitorName }}!
        </p>
      </div>
    </section>
  </template>
  
  