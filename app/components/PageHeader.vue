<script setup lang="ts">
interface PageHeaderProps {
    title: string;
    description?: string;
}
const props = defineProps<PageHeaderProps>();
</script>
<template>
    <UContainer as="section" class="mx-auto my-0">
        <h1 class="text-secondary text-3xl">
            <slot>{{ props.title }}</slot>
        </h1>
        <p v-if="props.description" class="text-sm text-neutral">
            <slot>{{ props.description }}</slot>
        </p>
    </UContainer>
</template>