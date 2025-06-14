<script setup lang="ts">
import { ref, computed } from 'vue'

const pedidos = ref([
  { id: 1, cliente: 'Juan Pérez', fecha: '2025-06-01', total: 35.5, estado: 'Pendiente' },
  { id: 2, cliente: 'Ana Gómez', fecha: '2025-06-10', total: 50.0, estado: 'Enviado' },
  { id: 3, cliente: 'Carlos Ruiz', fecha: '2025-06-12', total: 28.0, estado: 'Entregado' },
])

const busqueda = ref('')
const pagina = ref(1)
const porPagina = 5

const resultados = computed(() => {
  const filtrados = pedidos.value.filter(p =>
    p.cliente.toLowerCase().includes(busqueda.value.toLowerCase()) ||
    p.id.toString().includes(busqueda.value)
  )
  return filtrados.slice((pagina.value - 1) * porPagina, pagina.value * porPagina)
})

function editarPedido(id: number) {
  alert(`Editar pedido con ID ${id}`)
}

function eliminarPedido(id: number) {
  const confirmado = confirm('¿Seguro que deseas eliminar este pedido?')
  if (confirmado) {
    pedidos.value = pedidos.value.filter(p => p.id !== id)
  }
}
</script>

<template>
  <section class="py-10 px-4 md:px-10 bg-white text-gray-800">
    <h2 class="text-3xl font-bold text-center mb-6">Lista de Pedidos</h2>

    <input
      v-model="busqueda"
      type="text"
      placeholder="Buscar por cliente o ID..."
      class="mb-4 p-2 border rounded w-full max-w-md mx-auto block"
    />

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border">
        <thead class="bg-gray-100">
        <tr>
          <th class="p-4 text-left">ID</th>
          <th class="p-4 text-left">Cliente</th>
          <th class="p-4 text-left">Fecha</th>
          <th class="p-4 text-left">Total</th>
          <th class="p-4 text-left">Estado</th>
          <th class="p-4 text-left">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pedido in resultados" :key="pedido.id" class="border-t">
          <td class="p-4 align-middle">{{ pedido.id }}</td>
          <td class="p-4 align-middle">{{ pedido.cliente }}</td>
          <td class="p-4 align-middle">{{ pedido.fecha }}</td>
          <td class="p-4 align-middle">${{ pedido.total.toFixed(2) }}</td>
          <td class="p-4 align-middle">
              <span
                :class="{
                  'text-yellow-600': pedido.estado === 'Pendiente',
                  'text-blue-600': pedido.estado === 'Enviado',
                  'text-green-600': pedido.estado === 'Entregado'
                }"
              >
                {{ pedido.estado }}
              </span>
          </td>
          <td class="p-4 align-middle space-x-2">
            <button
              @click="editarPedido(pedido.id)"
              class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Editar
            </button>
            <button
              @click="eliminarPedido(pedido.id)"
              class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center gap-2 mt-4">
      <button @click="pagina--" :disabled="pagina === 1" class="px-4 py-1 bg-gray-200 rounded">Anterior</button>
      <button @click="pagina++" :disabled="pagina * porPagina >= pedidos.length" class="px-4 py-1 bg-gray-200 rounded">Siguiente</button>
    </div>
  </section>
</template>
