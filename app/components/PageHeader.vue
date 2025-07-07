<script setup lang="ts">
interface PageHeaderProps {
    title: string;
    description?: string;
}
const props = defineProps<PageHeaderProps>();
</script>
<template>
    <UContainer as="section" class="page-header">
        <h1>
            <slot>{{ props.title }}</slot>
        </h1>
        <p v-if="props.description">
            {{ props.description }}
        </p>
    </UContainer>
</template>