<script setup lang="ts">
import type { Product, ProductImage,PlaceHolderImage, ProductSku } from '~/types/product';
import DefaultButton from './ui/DefaultButton.vue';
import Carousel from './Carousel.vue';
import type { CarouselProps } from '~/types/carousel';
import { useFormat } from '~/composables/useFormat';

interface ProductCardProps{
    product: Product;
    images: ProductImage[];
    skus?: ProductSku[];
    skuImages?: ProductImage[]; 
    carousel?: CarouselProps;
}

const props = defineProps<ProductCardProps>()
const { formatPrice } = useFormat();

</script>
<template>
    <UCard variant="subtle">
        <template #header>
            <Carousel :images="props.images" :delay="6000" />
        </template>
        <div class="text-left tracking-tight h-28">
            <h3 class="text-base font-bold text-tertiary-800 dark:text-tertiary-200 truncate tracking-wide mb-1">
                {{ product.name}}
            </h3>
            <p class="font-light text-base text-tertiary-500 dark:text-tertiary-300 line-clamp-3">
                {{ product.description }}
            </p>

        </div>
        <template #footer >
            <p v-if="product.skus && product.skus.length > 0" 
                class="text-3xl text-primary-600 dark:text-info-50 font-bold basis-3xs">
                {{formatPrice(product.skus[0]?.price)}}
            </p>
            <div class="w-auto">
                <NuxtLink :to="`/product/${product.slug}`">
                    <DefaultButton label="ver" 
                        trailing-icon="i-lucide-circle-chevron-right"
                        size="lg"
                        color="secondary" />
                </NuxtLink>
            </div>
        </template>
    </UCard>
</template>