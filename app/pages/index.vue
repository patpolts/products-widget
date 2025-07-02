<template>
  <main>
    <div class="p-6 max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Produtos</h1>

      <div v-if="pending" class="text-center">Carregando...</div>
      <div v-else-if="error" class="text-red-600 text-center">{{ error.message }}</div>

      <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard v-for="product in productList" :key="product.id" :product="product" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProducts, type ProductsResponse } from '~/composables/useProducts';
import ProductCard from '~/components/ProductCard.vue';
import type { Product } from '~/type/product';

const { fetchProducts } = useProducts();
const { data, pending, error } = await useAsyncData('products', () =>
  fetchProducts()
)

const productList = computed(() => data.value?.product ?? []);
const loading = ref(true);

</script>
