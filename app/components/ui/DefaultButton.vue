<script setup lang="ts">
type ButtonColorTypes = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
type ButtonSizeTypes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariantTypes = "link" | "solid" | "outline" | "soft" | "subtle" | "ghost" | undefined;
type ButtonTypes = 'button' | 'submit' | 'reset';

interface DefaultButtonProps {
    label:string;
    color?: ButtonColorTypes;
    size?: ButtonSizeTypes;
    rounded?: boolean;
    variant?: ButtonVariantTypes;
    disabled?: boolean;
    loading?: boolean;
    type?: ButtonTypes;
    class?: string;
    icon?: string;
    trailingIcon?: string;
}

const props = withDefaults(defineProps<DefaultButtonProps>(), {
    color: 'primary',
    size: 'md',
    rounded: false,
    disabled: false,
    loading: false,
    type: 'button',
    class: '',
    variant: undefined,
    icon: undefined,
    trailingIcon: undefined

})

</script>
<template>
    <UButton :color="color" :size="size" :variant="variant" :rounded="rounded" :disabled="disabled" :loading="loading" :icon="icon" :trailing-icon="trailingIcon" :type="type" :class="class">
       <slot>{{label }}</slot>
    </UButton>
</template>