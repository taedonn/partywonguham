// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true, // 페이지 라우팅
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  modules: [
    ['@nuxtjs/robots', { configPath: '~/config/robots.config' }],
    '@nuxtjs/sitemap',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@oku-ui/motion-nuxt',
    '@pinia/nuxt'
  ],
  css: [
    '~/assets/tailwind.css',
  ],
  pinia: { // pinia store 경로
    storesDirs: ['./stores/**']
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ko'
      },
      meta: [
        {
          name: 'naver-site-verification',
          content: '7a2dc0fff377a5d96fc033a03dc2d609de64cdec'
        }
      ],
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