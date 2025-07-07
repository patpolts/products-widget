<script setup lang="ts">
import type { CarouselAutoplayOptions, CarouselProps } from '~/types/carousel';
import type { ProductImage } from '~/types/product';

interface ImagesProps {
    images: ProductImage[];
    alt?: string;
    width?: string;
    height?: string;
    class?: string;
    provider?: string;
    quality?: number;
    format?: string;
}
const carousel = useTemplateRef<any>('carousel')
const activeIndex = ref(0)
const refCarousel = ref('carousel')

function onClickPrev() {
    activeIndex.value--
}
function onClickNext() {
    activeIndex.value++
}
function onSelect(index: number) {
    activeIndex.value = index
}

function select(index: number) {
    activeIndex.value = index

    carousel.value?.emblaApi?.scrollTo(index)
}
const props = withDefaults(defineProps<CarouselProps & ImagesProps>(), {
    orientation: 'horizontal',
    fade: true,
    loop: true,
    dots: true,
    autoplay: true,
    loading: 'lazy',
    fit: 'cover',
    delay: 2000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
    format: 'webp',
    width: "300",
    height: "300"
})

const carouselOptions = computed(() => ({
    orientation: props.orientation,
    fade: props.fade,
    loop: props.loop,
    dots: props.dots,
    arrows: props.arrows,
    prev: props.prev ? { onClick: onClickPrev } : undefined,
    next: props.next ? { onClick: onClickNext } : undefined,
    autoplay: props.autoplay ? ({ delay: props.delay, stopOnMouseEnter: props.stopOnMouseEnter, stopOnInteraction: props.stopOnInteraction } as CarouselAutoplayOptions) : false
}))

const imagesOptions = computed(() => ({
    loading: props.loading,
    alt: props.alt,
    provider: props.provider,
    fit: props.fit,
    width: props.width,
    height: props.height,
    format: props.format,
    quality: props.quality
}))

</script>

<template>
    <UCarousel  v-bind="carouselOptions" :items="props.images"
        @select="props.select ? onSelect : undefined"
        :class="props.carouselClass ? props.carouselClass : 'w-full h-fit max-h-dvh max-w-dvw mx-auto mb-4'">
        <template #default="{ item }">
            <figure :class="props.figureClass ? props.figureClass : 'w-full max-w-dvw h-48 overflow-hidden'">
                <NuxtImg preload :src="item.url" v-bind="imagesOptions"
                    :class="props.imageClass ? props.imageClass : 'w-full h-full'" 
                    :width="props.width" :height="props.height" />
            </figure>

        </template>
    </UCarousel>
    <div v-if="props.thumbnails && props.images" class="flex gap-1 justify-between pt-4 max-w-xs mx-auto">
        <div v-for="(item, index) in props.images" :key="index"
            class="size-16 opacity-25 hover:opacity-100 transition-opacity"
            :class="{ 'opacity-100': activeIndex === index }" @click="select(index)">
                <NuxtImg :src="item.url" width="60" height="60" class="rounded-sm cursor-pointer" /> 
        </div>
    </div>
</template>