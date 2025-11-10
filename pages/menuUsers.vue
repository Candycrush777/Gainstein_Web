<template>
  <v-app>
    <AdminNavbar />

    <v-main class="d-flex">
      <UserSidebar />

      <v-container fluid class="pa-6" style="flex:1;">
        <!-- Loader mientras verificamos la sesión -->
        <div v-if="pageLoading" class="d-flex align-center justify-center" style="min-height: 200px;">
          <v-progress-circular indeterminate size="32" />
        </div>

        <!-- Contenido del panel cuando hay sesión -->
        <div v-else>
          <h1 class="mb-1">Panel de usuario</h1>
          <p class="mb-6">
            Bienvenido,
            <strong>{{ me?.first_name || me?.email }}</strong>
          </p>

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
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AdminNavbar from '~/components/AdminNavbar.vue'
import UserSidebar from '~/components/user/UserSidebar.vue'
import { useAuth } from '~/composables/useAuth'
definePageMeta({ layout: 'admin' })

// Auth composable
const { user, fetchMe } = useAuth()
const me = computed(() => user.value)

// Estado de carga de la página (solo para la primera verificación)
const pageLoading = ref(true)

// Dummy data (tu UI actual)
const dashboard = ref({ status: 'Activo', lastLogin: 'hoy 10:14', botCalls: 42 })
const subscription = ref({ planName: 'Pro', renewalDate: '10/11/2025' })

// Verificar sesión al entrar (sin middleware)
onMounted(async () => {
  await fetchMe()               
  if (!me.value) {
    // si no hay sesión, te lleva a login
    return navigateTo('/login')
  }
  pageLoading.value = false
})
</script>

<style scoped>
.v-card { border-radius: 12px; box-shadow: 0 8px 24px rgba(124,77,255,0.06); background: #fff; }
.v-main { flex:1; min-height: calc(100vh - 80px - 60px); background: #f8fafc; }
</style>




