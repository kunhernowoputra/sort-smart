// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/fonts'
  ],
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 700, 800, 900] }
    ]
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
