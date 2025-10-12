<template>
  <v-app>
    <!-- Navbar existente (tu AdminNavbar) -->
    <AdminNavbar />

    <v-main>
      <v-container fluid class="pa-0" style="display:flex; gap:0;">
        <!-- Sidebar -->
    

        <!-- Contenido principal -->
        <div class="admin-content" style="flex:1;">
          <!-- margen superior para dejar espacio al navbar fixed-top -->
          <div class="content-inner pa-6">
            <NuxtPage />
          </div>
        </div>
      </v-container>
    </v-main>

    <!-- Footer existente -->
    <AppFooter />
  </v-app>
</template>

<script setup>
import AdminNavbar from '~/components/AdminNavbar.vue'

import AppFooter from '~/components/AppFooter.vue'
</script>

<style scoped>
/* Ajustes para que el contenido no quede detrás del navbar fixed */
.admin-content {
  padding-top: 80px; /* ajusta si tu navbar tiene otra altura */
  min-height: calc(100vh - 140px);
  background: #f8fafc;
}

.content-inner {
  background: #fff;
  border-radius: 12px;
  margin: 16px;
  box-shadow: 0 6px 18px rgba(124,77,255,0.06);
}
@media (max-width: 960px) {
  .content-inner { margin: 10px; padding: 12px; }
}
</style>
