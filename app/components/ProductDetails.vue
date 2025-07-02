<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <img
        :src="featuredImage?.url"
        :alt="featuredImage?.altText || product.name"
        class="rounded-lg w-full h-auto object-cover border"
      />
      <div class="flex gap-2 mt-4 overflow-x-auto">
        <img
          v-for="img in product.images"
          :key="img.id"
          :src="img.url"
          :alt="img.altText || product.name"
          :class="[
            'w-20 h-20 object-cover rounded border cursor-pointer',
            img.id === featuredImage?.id ? 'ring-2 ring-primary' : ''
          ]"
          @click="selectImage(img)"
        />
      </div>
    </div>
    <div>
      <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
      <p class="text-gray-600 mb-4">{{ product.description }}</p>

      <div v-if="product.skus.length" class="space-y-2">
        <div>
          <strong>Preço:</strong> R$ {{ (product.skus[0].price / 100).toFixed(2) }}
        </div>
        <div><strong>Estoque:</strong> {{ product.skus[0].stock }} unidades</div>
        <div v-if="product.skus[0].dimensions">
          <strong>Dimensões:</strong> {{ product.skus[0].dimensions }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/type/product'
import type { ProductImage } from '~/type/product-image'
import { ref, watch } from 'vue'

const props = defineProps<{ product: Product }>()

const featuredImage = ref<ProductImage | null>(null)

watch(
  () => props.product,
  (newProduct) => {
    featuredImage.value =
      newProduct.images.find((img) => img.featured) || newProduct.images[0] || null
  },
  { immediate: true }
)

function selectImage(img: ProductImage) {
  featuredImage.value = img
}
</script>
