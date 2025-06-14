<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { getPlates } from '@/api/Plates'
import type { Product } from '@/api/interface/plate.interface'
import { useCartStore } from '@/stores/cartStore'

const plates = ref<Product[]>([])
const cartStore = useCartStore()

function addToCart(product: Product) {
  cartStore.addItem(product)
}

onMounted(async () => {
  plates.value = await getPlates()
})
</script>

<template>
  <section>
    <h2 class="text-3xl font-semibold text-center mb-6 mt-8">
      Nuestro Menú
    </h2>
    <div class="grid grid-cols-3 gap-4">
      <ProductCard
        v-for="plate in plates"
        :key="plate._id"
        :product="plate"
        @add-to-cart="addToCart"
      />
    </div>
  </section>
</template>
