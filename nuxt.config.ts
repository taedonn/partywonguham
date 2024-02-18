// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true, // 서버 사이드 렌더링 *SPA 말고 페이지별로 따로 HTML 파일이 빌드 된다.
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
  },
  nitro: {
    output: {
        dir: '.output',
        serverDir: '.output/server',
        publicDir: '.output/public'
    }
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
      firebaseMeasurementId: '',
    }
  }
})