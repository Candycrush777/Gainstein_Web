<template>
  <v-app>
    <AdminNavbar />
    <v-main class="d-flex">
      <UserSidebar />
      <v-container fluid class="pa-6" style="flex:1;">
        <h1 class="mb-4">Actividad</h1>
        <v-card class="pa-2">
          <v-list density="comfortable">
            <v-list-item v-for="(a,i) in activity" :key="i" :title="a.title" :subtitle="a.when" prepend-icon="mdi-history" />
          </v-list>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AdminNavbar from '~/components/AdminNavbar.vue'
import UserSidebar from '~/components/user/UserSidebar.vue'
definePageMeta({ layout: 'admin' })

const activity = ref([
  { title: 'Inicio de sesión desde Madrid', when: 'Hoy, 10:14' },
  { title: 'Cambio de contraseña', when: 'Ayer, 19:03' }
])
</script>

<style scoped>
.v-card { border-radius: 12px; box-shadow: 0 8px 24px rgba(124,77,255,0.06); background: #fff; }
.v-main { flex:1; min-height: calc(100vh - 80px - 60px); background: #f8fafc; }
</style>
