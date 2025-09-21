// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'mdb-ui-kit/css/mdb.min.css' 
  ],

  build: {
    transpile: ['bootstrap', 'mdb-ui-kit'] 
  },

  app: {
    head: {
      script: [
        { src: 'mdb-ui-kit/js/mdb.min.js', type: 'text/javascript' } 
      ]
    }
  }
})
