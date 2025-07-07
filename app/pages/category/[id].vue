<script setup lang="ts">
import { useCategoryService } from '~/services/CategoryService';
import { useProductService } from '~/services/ProductService';
import type { Category } from '~/types/category';
import type { ProductListDTO } from '~/types/product';

const route = useRoute()
const service = useCategoryService()
const serviceProduct = useProductService()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? null

const page = ref(1)
const limit = ref(8) 

const { data: category, pending:loadingCategory ,error: errorCategory } = useAsyncData<Category>(
  'category',
  async () => service.getBySlug(id)
)
const categoryId = computed(() => category.value?.id ?? null)

const {
  data: categoryProducts,
  pending: loadingCategoryProductsProduct,
  error: errorCategoryProduct
} = useAsyncData<ProductListDTO>(
  'categoryProducts',
  () => {
    if (!categoryId.value) return Promise.resolve({ product: [], pagination: { page: 1, limit: 10, total: 0, lastPage: 1 } })
    return serviceProduct.list(page.value, limit.value, categoryId.value)
  },
  {
    watch: [page, limit, categoryId],
    immediate: true
  }
)
</script>

<template>
    <PageHeader title="Categoria" description="Lista de todos os produtos disponíveis nesta categoria" />
    <PageHeader v-if="!category" title="404" description="Categoria não encontrada" />
    <PageContent>
        <!-- erros e laoding da categoria -->
        <section v-if="errorCategory || loadingCategory" class="text-center w-full h-full m-auto">
            <UAlert v-if="errorCategory" title="Erro ao carregar categorias!" :description="errorCategory.message ?? 'Erro inesperado'" icon="i-lucide-triangle-alert" color="error" />
            <div v-if="loadingCategory" class="w-full h-auto text-center m-auto">
                <LoadingSpinner />
            </div>
        </section> 
        <!-- erros e loading de produtos -->
        <section v-if="errorCategoryProduct || loadingCategoryProductsProduct" class="text-center w-full h-full m-auto">
            <UAlert v-if="errorCategoryProduct" title="Erro ao carregar categorias!" :description="errorCategoryProduct.message ?? 'Erro inesperado'" icon="i-lucide-triangle-alert" color="error" />
            <div v-if="loadingCategoryProductsProduct" class="w-full h-auto text-center m-auto">
                <LoadingSpinner />
            </div>
        </section>
        <!-- conteudo categoria -->
        <section v-if="category" class="product-content product-content-spacing mx-auto my-auto ">
            <h1 class="font-bold tracking-wide text-xl text-tertiary dark:text-tertiary-100 text-shadow-sm ">
                {{ category.name }}
            </h1>
            <p class="font-light tracking-tight text-xl text-tertiary-400  mb-6">{{ category.description }}</p>
            
            <USeparator icon="lucide:ship-wheel" type="solid" />
            <div v-if="categoryProducts?.product"  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto my-4">
                <ProductCard v-for="product in categoryProducts.product" 
                    v-bind:images="product.images ?? []"
                    :key="product.id" 
                    :product="product" 
                    :skus="product?.skus" 
                    :carousel="{delay: 2000}"  />
            </div>
                
            <div v-else-if="categoryProducts?.pagination" class="w-full h-auto mt-6 mb-0 p-2 justify-items-center">
                <UPagination v-model:page="page" :total="categoryProducts.pagination.total" class="mx-auto" />
            </div>
            <p v-else class="mx-auto my-4">Nenhum produto encontrado</p>
        </section>
        <section>
            <BackButton />
        </section>
    </PageContent>
</template>