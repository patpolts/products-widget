<script setup lang="ts">
import { ref, computed } from 'vue'
import LoadingSpinner from '~/components/LoadingSpinner.vue'
import { useCategoryService } from '~/services/CategoryService'
import { useProductService } from '~/services/ProductService'
import type { Category } from '~/types/category'
import type { Product, ProductListDTO, ProductPagination } from '~/types/product'

const service = useProductService()
const serviceCategory = useCategoryService()
const page = ref(1)
const limit = ref(8)
const selectedCategory = ref<string | undefined>(undefined)
const order = ref<'asc' | 'desc'>('desc')
const { data: productList, pending, error } = useAsyncData<ProductListDTO>(
  'productList',
  () => service.list(page.value, limit.value,selectedCategory.value ?? undefined,order.value),{
    watch: [page, limit,selectedCategory, order],
    immediate: true
  }
)
const { data: categories, pending: loadingCategories, error: errorCategories } = useAsyncData<Category[]>(
  'categories',
  () => serviceCategory.list()
)
const products = computed<Product[]>(() => productList.value?.product ?? [])

const categoryOptions = computed(() =>
  (categories.value ?? []).map(category => ({
    label: category.name,
    value: category.id
  }))
)
const pagination = computed<ProductPagination>(() => productList.value?.pagination ?? { 
  page: 1, 
  limit: 8, 
  total: 0, 
  lastPage: 1 
})

</script>

<template>
  <PageHeader title="Produtos" description="Lista de todos os produtos disponíveis em nosso catálogo" />
  <PageContent>
    <section v-if="products && products.length > 0" class="mx-auto my-4 p-2">
      <UButton color="primary" variant="outline" @click="order = order === 'asc' ? 'desc' : 'asc'" class="mr-4 ml-auto cursor-pointer">
        Ordenar: {{ order === 'asc' ? 'Mais antigos' : 'Mais recentes' }}
      </UButton>
       <USelect v-model="selectedCategory" :items="categoryOptions" class="w-48" color="primary" variant="subtle" placeholder="Selecione uma categoria" />
    </section> 
    <UAlert v-if="error" title="Erro ao carregar produtos!" :description="error.message ?? 'Erro inesperado'" icon="i-lucide-triangle-alert" color="error" />
    <div v-else-if="pending" class="w-full h-auto text-center m-auto">
      <LoadingSpinner />
    </div>
    <section v-else-if="products && products.length > 0" >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-auto">
        <ProductCard v-for="product in products" 
          v-bind:images="product.images ?? []"
          :key="product.id" 
          :product="product" 
          :skus="product?.skus" 
          :carousel="{delay: 2000}"  />
        </div>
        
        <div class="w-full h-auto mt-6 mb-0 p-2 justify-items-center">
           <UPagination v-model:page="page" :total="pagination.total" class="mx-auto" />
        </div>
    </section>
    <section v-else class="mx-auto my-4">
        <p  class="text-info text-center">
          Nenhum produto encontrado
        </p>
    </section>
    
      <section>
          <BackButton />
      </section>
  </PageContent>
</template>