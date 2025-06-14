<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import PaymentModal from '@/components/modals/PaymentModal.vue'
import { createSale } from '@/api/SaleService'

const cartStore = useCartStore()
const showPaymentModal = ref(false)

const total = computed(() =>
  cartStore.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
)

function increaseQuantity(itemId: string) {
  cartStore.increaseQuantity(itemId)
}

function decreaseQuantity(itemId: string) {
  cartStore.decreaseQuantity(itemId)
}

function removeItem(itemId: string) {
  cartStore.removeItem(itemId)
}

function openModal() {
  showPaymentModal.value = true
}

function closeModal() {
  showPaymentModal.value = false
}


async function handlePayment(customerName: string) {
  const orderNumber = `ORD-${Date.now()}`
  const paymentData = {
    orderNumber,
    customerName,
    items: cartStore.items.map(item => ({
      _id: item.product._id,
      quantity: item.quantity,
    })),
    subTotal: total.value,
    total: total.value,
  }

  console.log('Enviando datos:', JSON.stringify(paymentData, null, 2))

  try {
    const result = await createSale(paymentData)
    console.log('Respuesta backend:', result)
    cartStore.clearCart()
    alert('Venta realizada con éxito!')
  } catch (error) {
    console.error('Error al realizar la venta:', error)
    alert('Error al realizar la venta.')
  }

  showPaymentModal.value = false
}
</script>


<template>
  <section class="max-w-4xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-6">Tu Carrito</h2>

    <div v-if="cartStore.items.length === 0" class="text-center text-gray-600">
      Tu carrito está vacío.
    </div>

    <table v-else class="w-full table-auto border-collapse border border-gray-300">
      <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 p-2 text-left">Producto</th>
        <th class="border border-gray-300 p-2">Precio</th>
        <th class="border border-gray-300 p-2">Cantidad</th>
        <th class="border border-gray-300 p-2">Subtotal</th>
        <th class="border border-gray-300 p-2">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in cartStore.items"
        :key="item.product._id"
        class="border-b border-gray-300"
      >
        <td class="p-2 flex items-center space-x-4">
          <img
            :src="item.product.image || '/img/default-product.png'"
            alt="Producto"
            class="w-16 h-16 object-cover rounded"
          />
          <span>{{ item.product.name }}</span>
        </td>
        <td class="p-2 text-center">${{ item.product.price.toFixed(2) }}</td>
        <td class="p-2 text-center">
          <button
            class="border border-blue-500 text-blue-500 rounded px-2 py-1 mx-1 hover:bg-blue-100 transition"
            @click="decreaseQuantity(item.product._id)"
          >
            -
          </button>
          <span class="px-3">{{ item.quantity }}</span>
          <button
            class="border border-blue-500 text-blue-500 rounded px-2 py-1 mx-1 hover:bg-blue-100 transition"
            @click="increaseQuantity(item.product._id)"
          >
            +
          </button>
        </td>
        <td class="p-2 text-center">
          ${{ (item.product.price * item.quantity).toFixed(2) }}
        </td>
        <td class="p-2 text-center">
          <button
            @click="removeItem(item.product._id)"
            class="mx-1 px-3 py-1 rounded-full border-2 border-red-600 text-red-600 font-bold shadow-sm hover:bg-red-600 hover:text-white transition duration-200 ease-in-out select-none"
            title="Eliminar producto"
          >
            ✕
          </button>
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr class="font-bold text-lg">
        <td colspan="3" class="p-2 text-right">Total:</td>
        <td colspan="2" class="p-2 text-center">${{ total.toFixed(2) }}</td>
      </tr>
      </tfoot>
    </table>

    <div class="mt-6 flex justify-end space-x-4">
      <router-link to="/" class="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">
        Seguir Comprando
      </router-link>

      <button
        class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="cartStore.items.length === 0"
        @click="openModal"
      >
        Proceder al Pago
      </button>
    </div>

    <PaymentModal
      :show="showPaymentModal"
      :items="cartStore.items"
      :total="total"
      @close="closeModal"
      @submit="handlePayment"
    />
  </section>
</template>

