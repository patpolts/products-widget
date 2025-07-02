// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http:localhost:3000'
    }
  },
  devServer:{
    port: 3001,
  },
  css: ['@/assets/css/tailwind.css'],
  modules: [],
})
