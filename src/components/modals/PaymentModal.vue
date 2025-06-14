<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CartItem } from '@/api/interface/cart.interface'

const { show, items, total } = defineProps<{
  show: boolean
  items: CartItem[]
  total: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', customerName: string): void
}>()

const customerName = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)

function resetForm() {
  customerName.value = ''
  error.value = null
}

watch(() => show, (val) => {
  if (val) resetForm()
})

function closeModal() {
  emit('close')
  resetForm()
}

function submitPayment() {
  if (!customerName.value.trim()) {
    error.value = 'Por favor, ingresa tu nombre.'
    return
  }
  error.value = null
  isLoading.value = true

  setTimeout(() => {
    emit('submit', customerName.value.trim())
    isLoading.value = false
    closeModal()
  }, 1000)
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="absolute inset-0" @click.self="closeModal"></div>

    <form
      @submit.prevent="submitPayment"
      class="relative bg-white rounded-lg p-6 w-full max-w-md z-10 shadow-lg"
    >
      <h3 class="text-xl font-bold mb-4">Confirmar Pago</h3>
      <p class="mb-2 font-semibold">Productos:</p>
      <ul class="mb-4 max-h-40 overflow-auto text-sm">
        <li
          v-for="item in items"
          :key="item.product._id"
          class="flex justify-between mb-1"
        >
          <span>{{ item.product.name }} x {{ item.quantity }}</span>
          <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
        </li>
      </ul>

      <p class="font-semibold mb-4 text-right">Total: ${{ total.toFixed(2) }}</p>

      <label class="block mb-2 font-semibold" for="customerName"
      >Nombre del Cliente</label
      >
      <input
        id="customerName"
        v-model="customerName"
        type="text"
        placeholder="Ingresa tu nombre"
        class="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring focus:border-blue-300"
        :disabled="isLoading"
        autofocus
      />
      <p v-if="error" class="text-red-600 text-sm mb-2">{{ error }}</p>

      <div class="flex justify-end gap-2 mt-4">
        <button
          type="button"
          class="px-4 py-2 border border-gray-500 rounded hover:bg-gray-100 disabled:opacity-50"
          @click="closeModal"
          :disabled="isLoading"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center"
          :disabled="isLoading"
        >
          <span
            v-if="isLoading"
            class="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
          ></span>
          Pagar
        </button>
      </div>
    </form>
  </div>
</template>
