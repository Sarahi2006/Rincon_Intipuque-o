<script setup lang="ts">
import ProductCard from '@/components/ui/ProductCard.vue'
import type { Product } from '@/api/interface/product.ts'
import { onMounted, ref } from 'vue'
import { getProducts, url } from '@/api/Product.ts'

const products = ref<Product[]>([])

onMounted(async () => {
  const data = await  getProducts()
  products.value = data.data
})
</script>

<template>
  <section class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-6">Nuestro Menú</h2>

    <div class="grid auto-cols-1 gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      <div v-for="product in products" :key="product._id">
        <ProductCard
          :title="product.name"
          :price="product.price"
          :description="product.description"
          :image="url + product.image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
