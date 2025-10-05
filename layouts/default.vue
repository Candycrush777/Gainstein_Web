<template>
  <div class="app-layout">
    <!-- Aquí se muestra el contenido de cada página -->
    <NuxtPage />

    <!-- Footer global -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from '~/components/AppFooter.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-layout > :first-child {
  flex: 1;
}
</style>

