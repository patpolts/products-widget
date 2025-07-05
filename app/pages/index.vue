<template>
  <PageContent>
    <PageHeader title="Produtos" description="Lista de todos os produtos disponíveis em nosso catálogo" />
    <UAlert v-if="error" title="Erro ao carregar produtos!" :description="error.message ?? 'Erro inesperado'" icon="i-lucide-triangle-alert" />
    <div v-else-if="loading" class="w-full h-auto text-center m-auto">
      <LoadingSpinner />
    </div>
    <section v-else-if="products && products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </section>
    <p v-else class="text-info text-center">Nenhum produto encontrado</p>
  </PageContent>
</template>

<script setup lang="ts">
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import { useProductService } from '~/services/ProductService'
import type { Product } from '~/view-models/product';

const service = useProductService()

const { data: products, pending: loading, error } = useAsyncData<Product[]>(
  'products',
  () => service.list()
)
</script>
