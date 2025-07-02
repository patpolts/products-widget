<template>
    <div class="card bg-base-100  shadow-sm">
        <figure class="relative w-30 h-48 overflow-hidden">
            <img v-if="featuredImage" :src="featuredImage.url" :alt="featuredImage.altText || product.name"
                class="w-full h-full object-cover" loading="lazy" />
            <img v-else src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Image placeholder" class="w-full h-full object-cover" loading="lazy" />
        </figure>
        <div class="card-body p-6">
            <div class="flex justify-between">
                <h2 class="card-title">{{ product.name }}</h2>
                <span v-if="product.skus.length" class="text-xl">{{ formatPrice(product.skus[0].price) }}</span>
            </div>
            <p>{{ product.description }}</p>
            <div class="card-actions justify-end">

                <NuxtLink :to="`/product/${product.id}`" class="btn btn-primary">
                    Ver produto
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/type/product';

const props = defineProps<{ product: Product }>();

const featuredImage = computed(() =>
    props.product.images.find((img) => img.featured) ?? props.product.images[0]
);

const { formatPrice } = useFormat();
</script>
