<script setup lang="ts">
import BaseLink from '~/components/ui/BaseLink.vue';
</script>

<template>
    <UContainer class="relative h-screen flex flex-col  ">
        <header class="text-primary font-semibold text-2xl md:text-4xl font-bold-700 tracking-wide flex flex-row flex-items-center justify-between">
            <NuxtLink to="/">
                Widget Produtos
            </NuxtLink>
            <ColorModeButton />
        </header>
        <main>
            <slot />
        </main>
        <footer class="w-full max-w-screen gap-2 text-center my-2 md:my-4 lg:my-6">
            <p class="text-sm text-neutral">
                &copy; {{ new Date().getFullYear() }} 
                <BaseLink to="https://www.poltts.com.br/" target="_blank">poltts</BaseLink> -
                Todos os direitos reservados
            </p>
        </footer>
    </UContainer>
</template>
