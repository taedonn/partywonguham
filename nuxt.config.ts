// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true, // 페이지 라우팅 가능하게
  postcss: { // tailwind css
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/main.css'],
})
