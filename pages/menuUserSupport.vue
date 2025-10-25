<template>
  <v-app>
    <AdminNavbar />
    <v-main class="d-flex">
      <UserSidebar />
      <v-container fluid class="pa-6" style="flex:1;">
        <h1 class="mb-4">Soporte</h1>
        <v-card class="pa-2">
          <v-list>
            <v-list-item title="FAQ"         subtitle="Preguntas frecuentes" prepend-icon="mdi-help-circle-outline" />
            <v-list-item title="Abrir ticket" subtitle="Contacto con soporte"  prepend-icon="mdi-lifebuoy" />
          </v-list>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AdminNavbar from '~/components/AdminNavbar.vue'
import UserSidebar from '~/components/user/UserSidebar.vue'
definePageMeta({ layout: 'admin' })
</script>

<style scoped>
.v-card { border-radius: 12px; box-shadow: 0 8px 24px rgba(124,77,255,0.06); background: #fff; }
.v-main { flex:1; min-height: calc(100vh - 80px - 60px); background: #f8fafc; }
</style>
