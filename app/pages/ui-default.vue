<template>
  <PageHeader title="UI Tema Default" description="Página de referência do sistema de design aplicados pelo tema atual utilizando Nuxt UI (v3) e Talwind (v4)" />
  <PageContent>
    <UContainer as="section">
      <h1 class="font-sans text-xl font-medium tracking-tight border-b-2 pb-2 ">Tipografia</h1>
      <h2 class="font-sans text-lg tracking-tight p-2" >Fonte</h2>
      <section>
      </section>
    </UContainer>
    <UContainer as="section">
      <h1 class="font-sans text-xl font-medium tracking-wide border-b-2 pb-2 ">Cores</h1>
      <section class="m-auto grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
        <div>
          <p class="mx-auto my-2 text-primary">
            Primary
          </p>
          <p class="bg-primary w-2.5 h-2.5 p-4">&nbsp;</p>
        </div>
        <div>
          <p class="mx-auto my-2 text-secondary">
            Secondary
          </p>
          <p class="bg-secondary w-2.5 h-2.5 p-4">&nbsp;</p>
        </div>
        <div>
          <p class="mx-auto my-2 text-tertiary">
            Tertiary
          </p>
          <p class="bg-tertiary w-2.5 h-2.5 p-4">&nbsp;</p>
        </div>
        <div>
          <p class="mx-auto my-2 text-success">
            Success
          </p>
          <p class="bg-success w-2.5 h-2.5 p-4">&nbsp;</p>
        </div>
        <div>
          <p class="mx-auto my-2 text-info">
            Info
          </p>
          <p class="bg-info w-2.5 h-2.5 p-4">&nbsp;</p>
        </div>
        <div>
          <p class="mx-auto my-2 text-warning">
            Warning
          </p>
          <p class="bg-warning w-2.5 h-2.5 p-4">&nbsp;</p>
        </div>
        <div>
          <p class="mx-auto my-2 text-error" >
            Error
          </p>
          <p class="bg-error w-2.5 h-2.5 p-4">&nbsp;</p>
        </div>
        <div>
          <p class="mx-auto my-2 text-neutral">
            Neutral
          </p>
          <p class="bg-neutral w-2.5 h-2.5 p-4">&nbsp;</p>
        </div>
      </section>
    </UContainer>
  </PageContent>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
