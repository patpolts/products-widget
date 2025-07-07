<template>
    <ClientOnly v-if="!colorMode?.forced">
        <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" 
            :aria-label="buttonColorModeDescription"
            :title="buttonColorModeDescription"
            color="neutral" 
            variant="ghost"
            @click="isDark = !isDark" 
            class="cursor-pointer">
            Tema {{ isDark ? 'Escuro' : 'Claro' }}
        </UButton>  

        <template #fallback>
            <div class="size-8" />
        </template>
    </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set(_isDark) {
        colorMode.preference = _isDark ? 'dark' : 'light'
    }
})
const buttonColorModeDescription = computed(() =>  isDark.value ? 'Alternar tema para modo claro' : 'Alternar tema para modo escuro')
</script>
