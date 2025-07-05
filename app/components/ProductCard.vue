<template>
    <UCard variant="outline" class="h-full w-full text-center rounded-md">
        <template #header>
            <figure class="h-48 w-full p-0">
                <img :src="featuredImage?.url || '/placeholder.jpg'" :alt="product.name"
                    class="w-full h-full object-cover " />
            </figure>
        </template>
        <div class="text-left tracking-tight">
            <h3 class="text-lg font-bold text-stone-800 ">
                {{ product.name}}
            </h3>
            <p class="font-light text-base text-gray-500 line-clamp-2">
                {{ product.description }}
            </p>

        </div>
        <template #footer class="flex flex-col justify-items-center">
            <p class="text-2xl text-info font-bold">{{formatPrice(product.skus[0]?.price)}}</p>
            <NuxtLink :to="`/product/${product.id}`">
                <DefaultButton label="ver" 
                    trailing-icon="i-lucide-circle-chevron-right"
                    size="lg" />
            </NuxtLink>
        </template>
    </UCard>
</template>

<script setup lang="ts">
import type { Product, ProductImage } from '~/view-models/product';
import DefaultButton from './ui/DefaultButton.vue';

const props = defineProps<{
    product: Product
}>()

const featuredImage = computed(() =>
    props.product.images.find((img: ProductImage) => img.featured) ?? props.product.images[0]
)
const { formatPrice } = useFormat();
</script>
