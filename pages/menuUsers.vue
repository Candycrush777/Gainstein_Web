<template>
  <v-app>
    <AdminNavbar />
    <v-main class="d-flex">
      <UserSidebar />
      <v-container fluid class="pa-6" style="flex:1;">
        <h1 class="mb-4">Panel de usuario</h1>
        <p>Resumen rápido de tu cuenta.</p>

        <v-row class="mb-4" align="stretch">
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <div class="text-subtitle-1">Estado</div>
              <div class="display-1 font-weight-bold">{{ dashboard.status }}</div>
              <div class="text-caption text--muted">Último acceso: {{ dashboard.lastLogin }}</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <div class="text-subtitle-1">Suscripción</div>
              <div class="display-1 font-weight-bold">{{ subscription.planName }}</div>
              <div class="text-caption text--muted">Renovación: {{ subscription.renewalDate }}</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <div class="text-subtitle-1">Uso del bot</div>
              <div class="display-1 font-weight-bold">{{ dashboard.botCalls }}</div>
              <div class="text-caption text--muted">Llamadas este mes</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import AdminNavbar from '~/components/AdminNavbar.vue'
import UserSidebar from '~/components/user/UserSidebar.vue'
definePageMeta({ layout: 'admin' })

const dashboard = ref({ status: 'Activo', lastLogin: 'hoy 10:14', botCalls: 42 })
const subscription = ref({ planName: 'Pro', renewalDate: '10/11/2025' })
</script>

<style scoped>
.v-card { border-radius: 12px; box-shadow: 0 8px 24px rgba(124,77,255,0.06); background: #fff; }
.v-main { flex:1; min-height: calc(100vh - 80px - 60px); background: #f8fafc; }
</style>



