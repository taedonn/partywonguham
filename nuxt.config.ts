// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true, // 페이지 라우팅 가능하게
  css: ['~/assets/tailwind.css'],
  postcss: { // tailwind css
    plugins: {
      tailwindcss: {
        cssPath: './assets/tailwind.css',
        configPath: 'tailwind.config',
        exposeConfig: false,
        exposeLevel: 2,
        config: {},
        injectPosition: 'first',
        viewer: true,
      },
      autoprefixer: {},
    },
  },

  // modules: ['@nuxtjs/tailwindcss'],

})
