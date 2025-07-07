<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFormat } from '~/composables/useFormat'
import { useCategoryService } from '~/services/CategoryService'
import { useProductService } from '~/services/ProductService'
import type { Category } from '~/types/category'
import type { Product } from '~/types/product'

const route = useRoute()
const service = useProductService()
const serviceCategory = useCategoryService()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? null

const { data: product, pending: loading, error } = useAsyncData<Product>(
    'product', async () => service.getBySlug(id)
)
const categoryId = computed(() => product.value?.category ?? null)
const { data: category, pending: loadingCategory, error: errorCategory } = useAsyncData(
  'category',
  () => serviceCategory.getById(categoryId.value),
)
const { formatPrice } = useFormat()

</script>

<template>
    <PageHeader title="Produto" description="Exibindo detalhes do produto" />
    <PageHeader v-if="!product" title="404" description="Erro inesperado" />
    <PageContent>
        <UAlert v-if="error" title="Erro ao carregar produtos!" :description="error.message ?? 'Erro inesperado'"
            icon="i-lucide-triangle-alert" />
        <div v-else-if="loading" class="w-full h-auto text-center m-auto ">
            <LoadingSpinner />
        </div>
        <section v-else-if="product" class="product-content m-auto p-0">
            <Carousel v-if="product?.images && product.images.length > 0" carousel-class="product-content-carousel"
                figure-class="m-auto w-full h-auto" :images="product.images" :loop="false" :autoplay="false"
                :dots="false" :arrows="true" :prev="true" :next="true" :select="true" :thumbnails="true"
                next-icon="lucide:circle-chevron-right" prev-icon="lucide:circle-chevron-left" />

        </section>
        <section v-if="product" class="product-content product-content-spacing mx-auto my-4 ">
            <USeparator icon="lucide:ship-wheel" type="solid" />
            <h1 class="font-bold tracking-wide text-xl text-tertiary dark:text-tertiary-100 text-shadow-sm mt-6">
                {{ product.name }}
            </h1>
            <small><UBadge color="neutral" class="cursor-crosshair">{{product.id}}</UBadge></small>
            <p class="font-light tracking-tight text-xl text-tertiary-400  mb-6">{{ product.description }}</p>
            <div v-if="loadingCategory" class="w-full h-auto text-center m-auto ">
                <LoadingSpinner />
            </div>
            <NuxtLink v-if="category" :to="`/category/${category.slug}`" target="_blank">
                <UBadge icon="lucide:tags" size="xl" color="primary" variant="soft">
                    {{ category.name }}
                </UBadge> 
            </NuxtLink>
            <div v-else>
                <p class="text-base p-2">Nanhuma categoria associada</p>
            </div>
            <h2 v-if="product.skus && product.skus.length > 0" class="font-semibold tracking-wide text-lg text-shadow-sm  text-tertiary dark:text-tertiary-50 my-6">Variações do produto</h2>
            <h2 v-else class="font-semibold tracking-wide text-lg text-shadow-sm  text-tertiary dark:text-tertiary-50 my-6">Nenhuma variação para o produto encontrada</h2>
            <div v-if="product.skus && product.skus.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UCard variant="subtle" class="rounded-md bg-gray-100 dark:bg-secondary-700 inset-shadow-sm dark:shadow-gray"
                    v-if="product.skus && product.skus.length > 0" v-for="sku in product.skus">
                    <div class="p-2">
                        <p class="text-left text-lg">
                            <strong>SKU ID: </strong>
                            {{ sku.id }}
                        </p>
                        <p class="text-left text-lg">
                            <strong>SKU Code: </strong>
                            {{ sku.code }}
                        </p>
                        <p class="text-left text-lg">
                            <strong>Preço: </strong>
                            {{ formatPrice(sku.price) }}
                        </p>
                        <p class="text-left text-lg" :class="sku.stock > 10 && 'text-danger'">
                            <strong>Estoque: </strong>
                            {{ sku.stock}}
                        </p>
                        <p v-if="sku.color" class="text-left text-lg">
                            <strong>Cor: </strong>
                            {{ sku.color }}
                        </p>
                        <p v-if="sku.size" class="text-left text-lg">
                            <strong>Tamanho: </strong>
                            {{ sku.size }}
                        </p>
                        <p v-if="sku.dimensions" class="text-left text-lg">
                            <strong>Dimensões: </strong>
                            {{ sku.dimensions }}
                        </p>
                    </div>
                </UCard>
                <!-- <UCard :key="sku.id" variant="solid" class="rounded-md bg-secondary-200 w-full"> -->

                <!--
                        
                            <UBadge icon="lucide:circle-dollar-sign" size="xl" color="primary" 
                                variant="outline" class="text-sm font-medium" >
                                {{ formatPrice(sku.price) }}
                            </UBadge>   
                            <UBadge icon="lucide:boxes" size="lg" color="primary" 
                                variant="outline"
                            class="text-sm font-medium"  >
                                {{ sku.stock }}
                            </UBadge>
                            <UBadge v-if="sku.color" icon="lucide:palette" size="lg"
                                    color="primary" variant="outline" class="text-sm font-medium" >
                                {{ sku.color }}
                            </UBadge>
                            <UBadge icon="lucide:ticket" size="lg" color="primary"
                                variant="outline" v-if="sku.size" class="text-sm font-medium" >
                                {{ sku.size }}
                            </UBadge>
                            <UBadge v-if="sku.dimensions" icon="lucide:pencil-ruler" size="lg" 
                                color="primary" variant="outline" class="text-sm font-medium"  >
                                {{ sku.dimensions }}
                            </UBadge> -->
                <!-- </template>
                </UCard> -->

            </div>
        </section>
        <section v-else class="p-4 text-center">
            <p class="text-lg text-info-900"> Produto não encontrado</p>
        </section>
        <section>
            <BackButton />
        </section>
    </PageContent>
</template>
