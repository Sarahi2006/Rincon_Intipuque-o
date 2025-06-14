<script setup lang="ts">
import { ref, computed } from 'vue'

const clientes = ref([
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', fechaRegistro: '2025-05-01' },
  { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com', fechaRegistro: '2025-05-10' },
  { id: 3, nombre: 'Carlos Ruiz', email: 'carlos@example.com', fechaRegistro: '2025-05-20' },
])

const busqueda = ref('')
const pagina = ref(1)
const porPagina = 5

const resultados = computed(() => {
  const filtrados = clientes.value.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
    c.email.toLowerCase().includes(busqueda.value.toLowerCase())
  )
  return filtrados.slice((pagina.value - 1) * porPagina, pagina.value * porPagina)
})

function editarCliente(id: number) {
  alert(`Editar cliente con ID ${id}`)
}

function eliminarCliente(id: number) {
  const confirmado = confirm('¿Seguro que deseas eliminar este cliente?')
  if (confirmado) {
    clientes.value = clientes.value.filter(c => c.id !== id)
  }
}
</script>

<template>
  <section class="py-10 px-4 md:px-10 bg-white text-gray-800">
    <h2 class="text-3xl font-bold text-center mb-6">Clientes Registrados</h2>

    <input
      v-model="busqueda"
      type="text"
      placeholder="Buscar por nombre o correo..."
      class="mb-4 p-2 border rounded w-full max-w-md mx-auto block"
    />

    <div class="overflow-x-auto">
      <table class="w-full bg-white border table-auto">
        <thead class="bg-gray-100">
        <tr>
          <th class="p-4 text-left">Nombre</th>
          <th class="p-4 text-left">Correo</th>
          <th class="p-4 text-left">Registrado</th>
          <th class="p-4 text-left w-[160px]">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cliente in resultados" :key="cliente.id" class="border-t">
          <td class="p-4">{{ cliente.nombre }}</td>
          <td class="p-4">{{ cliente.email }}</td>
          <td class="p-4">{{ cliente.fechaRegistro }}</td>
          <td class="p-4">
            <div class="flex gap-2">
              <button @click="editarCliente(cliente.id)" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Editar
              </button>
              <button @click="eliminarCliente(cliente.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Eliminar
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center gap-2 mt-4">
      <button @click="pagina--" :disabled="pagina === 1" class="px-4 py-1 bg-gray-200 rounded">Anterior</button>
      <button @click="pagina++" :disabled="pagina * porPagina >= clientes.length" class="px-4 py-1 bg-gray-200 rounded">Siguiente</button>
    </div>
  </section>
</template>
