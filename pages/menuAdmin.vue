<template>
  <v-app>
    <AdminNavbar />

    <v-main class="d-flex">
      <!-- Sidebar -->
      <AdminSidebar />

      <!-- Contenido principal del dashboard -->
      <v-container fluid class="pa-6" style="flex:1;">
        <h1 class="mb-4">Panel de administración</h1>
        <p>Bienvenido al dashboard, aquí puedes gestionar los datos.</p>

        <!-- Métricas rápidas -->
        <v-row class="mb-4" align="stretch">
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <div class="text-subtitle-1">Usuarios</div>
              <div class="display-1 font-weight-bold">123</div>
              <div class="text-caption text--muted">Nuevos últimos 7 días: 12</div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <div class="text-subtitle-1">Afiliados</div>
              <div class="display-1 font-weight-bold">42</div>
              <div class="text-caption text--muted">Activos: 37</div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <div class="text-subtitle-1">Estado Bot</div>
              <div class="display-1 font-weight-bold">OK</div>
              <div class="text-caption text--muted">Último check: hace 5 min</div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Lista de usuarios con búsqueda y paginación -->
        <section>
          <h2 class="h5 mb-3">Lista de usuarios</h2>
          <p class="text--muted">Aquí puedes buscar y filtrar los usuarios, y verlos paginados.</p>

          <!-- Filtros / búsqueda -->
          <v-row class="mb-4" align="center">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="searchName"
                label="Buscar por nombre"
                dense
                outlined
                clearable
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="searchEmail"
                label="Buscar por email"
                dense
                outlined
                clearable
              />
            </v-col>
          </v-row>

          <!-- Cards de usuarios -->
          <v-row dense>
            <v-col
              v-for="user in filteredUsers"
              :key="user.id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card class="pa-4 mb-3">
                <div class="text-subtitle-1 font-weight-medium">{{ user.name }}</div>
                <div class="text-body-2 text--muted">{{ user.email }}</div>
                <div class="text-caption text--muted">ID: {{ user.id }}</div>
              </v-card>
            </v-col>
          </v-row>

          <!-- Paginación -->
          <v-row justify="center" class="mt-4">
            <v-pagination
              v-model="page"
              :length="totalPages"
              color="primary"
            />
          </v-row>
        </section>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminNavbar from '~/components/AdminNavbar.vue'
import AdminSidebar from '~/components/admin/AdminSidebar.vue'

definePageMeta({ layout: 'admin' })

// Datos de ejemplo (luego vendrán de la API)
const users = ref([
  { id: 1, name: 'Juan Pérez', email: 'juan@email.com' },
  { id: 2, name: 'Ana Gómez', email: 'ana@email.com' },
  { id: 3, name: 'Luis Martínez', email: 'luis@email.com' },
  // ...más usuarios
])

// Búsqueda
const searchName = ref('')
const searchEmail = ref('')

// Paginación
const page = ref(1)
const itemsPerPage = 6

const filteredUsers = computed(() => {
  const filtered = users.value.filter(u =>
    u.name.toLowerCase().includes(searchName.value.toLowerCase()) &&
    u.email.toLowerCase().includes(searchEmail.value.toLowerCase())
  )
  return filtered.slice((page.value - 1) * itemsPerPage, page.value * itemsPerPage)
})

const totalPages = computed(() => Math.ceil(users.value.filter(u =>
  u.name.toLowerCase().includes(searchName.value.toLowerCase()) &&
  u.email.toLowerCase().includes(searchEmail.value.toLowerCase())
).length / itemsPerPage))
</script>

<style scoped>
/* Cards blancas con sombra y bordes redondeados */
.v-card {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(124, 77, 255, 0.06);
  background: #ffffff;
}

/* Aseguramos que el main ocupe el alto restante entre navbar y footer */
.v-main {
  flex: 1;
  min-height: calc(100vh - 80px - 60px); /* navbar + footer aprox */
  background: #f8fafc;
}
</style>



