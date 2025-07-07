<script setup lang="ts">
import BaseLink from '~/components/ui/BaseLink.vue';
</script>

<template>
    <UContainer class="relative h-screen flex flex-col  ">
        <header class="flex flex-row flex-items-center justify-between">
            <h1>
                <NuxtLink to="/" aria-label="Ir para a home">
                    Widget Produtos
                </NuxtLink>
            </h1>
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
