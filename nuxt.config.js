// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark',
  },
  app: {
    head: {
      title: 'SortSmart AI - Waste Management Platform',
      meta: [
        { name: 'description', content: 'AI-powered waste management platform for Indonesia.' }
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    // Private keys
    apiProxyUrl: '',
    public: {
      // Public keys
      apiBase: '/api'
    }
  },
  devtools: { enabled: true }
})
