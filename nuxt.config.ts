// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  

  modules: [

    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
         'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],

  build: {
    transpile: ['bootstrap', 'vuetify'] 
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
