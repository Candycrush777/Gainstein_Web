<template>
  <v-app>
    <AdminNavbar />
    <v-main class="d-flex">
      <UserSidebar />
      <v-container fluid class="pa-6" style="flex:1;">
        <h1 class="mb-4">Suscripción</h1>
        <v-card class="pa-4">
          <div class="mb-3">
            Plan actual: <strong>{{ sub.planName }}</strong> ·
            Renovación: <strong>{{ sub.renewalDate }}</strong> ·
            Estado: <strong>{{ sub.status }}</strong>
          </div>
          <v-radio-group v-model="selected" inline>
            <v-radio label="Básico" value="basic" />
            <v-radio label="Pro" value="pro" />
            <v-radio label="Premium" value="premium" />
          </v-radio-group>
          <div class="d-flex justify-end">
            <v-btn color="primary" class="mt-2" @click="updatePlan">Actualizar plan</v-btn>
          </div>
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

const sub = ref({ planName:'Pro', renewalDate:'10/11/2025', status:'activa' })
const selected = ref('pro')
const updatePlan = async () => { /* await $fetch('/api/subscription', { method:'PUT', body:{ plan: selected.value } }) */ }
</script>

<style scoped>
.v-card { border-radius: 12px; box-shadow: 0 8px 24px rgba(124,77,255,0.06); background: #fff; }
.v-main { flex:1; min-height: calc(100vh - 80px - 60px); background: #f8fafc; }
</style>
