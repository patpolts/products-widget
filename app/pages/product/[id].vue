<template>
    <div class="w-full p-4">
        <div v-if="pending" class="text-center text-lg">Carregando produto...</div>
        <div v-else-if="error" class="text-red-600 text-center font-semibold">{{ error.message || error }}</div>
        <div v-else-if="product" class="max-w-4xl mx-auto">
            <h1 class="text-4xl font-extrabold mb-4 text-center">{{ product.name }}</h1>
            <p class="mb-6 text-gray-600 text-center max-w-xl mx-auto">{{ product.description }}</p>

            <div
                class="relative mx-auto max-w-full max-h-[400px] rounded-xl overflow-hidden shadow-lg select-none flex justify-center items-center">
                <img v-if="currentImage" :src="currentImage.url" :alt="currentImage.altText || 'Imagem do produto'"
                    class="max-w-full max-h-[400px] object-contain transition duration-300" />

            </div>
            <div>
                <button v-if="product.images.length > 1" @click="prevImage" aria-label="Imagem anterior"
                    class="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                <button v-if="product.images.length > 1" @click="nextImage" aria-label="Próxima imagem"
                    class="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>

            <div v-if="product.images.length > 1"
                class="text-center mt-2 text-gray-500 text-sm font-medium select-text max-w-lg mx-auto">
                {{ currentIndex + 1 }} / {{ product.images.length }}
            </div>

            <div class="space-y-5 mt-8">
                <h2 class="text-2xl font-semibold mb-3">Variações disponíveis:</h2>
                <div v-for="sku in product.skus" :key="sku.id"
                    class="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
                    <div><strong>Código:</strong> {{ sku.code }}</div>
                    <div><strong>Preço:</strong> {{ formatPrice(sku.price) }}</div>
                    <div><strong>Estoque:</strong> {{ sku.stock }}</div>
                    <div v-if="sku.dimensions"><strong>Dimensões:</strong> {{ sku.dimensions }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '~/composables/useProducts'
import { useFormat } from '~/composables/useFormat'

const route = useRoute()
const { fetchProductById } = useProducts()
const { formatPrice } = useFormat()

const { data, pending, error } = await useAsyncData('product', () =>
    fetchProductById(route.params.id as string)
)

const product = computed(() => data.value?.product ?? null)
const currentIndex = ref(0)

const currentImage = computed(() => {
    if (!product.value || !product.value.images.length) return null
    return product.value.images[currentIndex.value]
})

function prevImage() {
    if (!product.value) return
    currentIndex.value = (currentIndex.value - 1 + product.value.images.length) % product.value.images.length
}

function nextImage() {
    if (!product.value) return
    currentIndex.value = (currentIndex.value + 1) % product.value.images.length
}
</script>
