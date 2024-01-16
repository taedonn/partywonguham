// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true, // 페이지 라우팅 가능하게
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
        }
      ]
    }
  }
})