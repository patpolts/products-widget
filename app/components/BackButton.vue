<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
    <UButton @click="goBack" color="secondary" size="md" variant="soft" icon="lucide:circle-arrow-left">
       Voltar
    </UButton>
</template>