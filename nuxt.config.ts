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
        // Cargar Bootstrap desde CDN para asegurar compatibilidad
        { 
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', 
          type: 'text/javascript',
          defer: true
        }
      ]
    }
  }
})
