// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  pages: true, // 페이지 라우팅 가능하게
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  css: [
    '~/assets/tailwind.css',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt',
  ],
  pinia: { // pinia store 경로
    storesDirs: ['./stores/**']
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
        }
      ]
    }
  },
  routeRules: { // https://github.com/danielroe/nuxt-vercel-isr
    '/**': { isr: 60 },
  },
  runtimeConfig: {
    public: {
      firebaseServiceAccountKey: '',
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
      firebaseMeasurementId: '',
      emailId: '',
      emailPassword: '',
    }
  }
})