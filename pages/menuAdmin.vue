<template>
  <v-app>
    <AdminNavbar />

    <v-main class="d-flex">
      <AdminSidebar />

      <v-container fluid class="pa-6" style="flex:1;">
        <h1 class="mb-4">Panel de administración</h1>
        <p>Bienvenido al dashboard, aquí puedes gestionar los datos.</p>

        <!-- Métricas rápidas -->
        <v-row class="mb-4" align="stretch">
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <div class="text-subtitle-1">Usuarios</div>
              <div class="display-1 font-weight-bold">{{ totalUsers }}</div>
              <div class="text-caption text--muted">Nuevos últimos 7 días: {{ newUsers7d }}</div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <div class="text-subtitle-1">Afiliados</div>
              <div class="display-1 font-weight-bold">{{ totalAffiliates }}</div>
              <div class="text-caption text--muted">Activos: {{ activeAffiliates }}</div>
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

        <!-- Lista de usuarios -->
        <section>
          <h1 class="mb-5 text-center">Lista de usuarios</h1>

          <!-- Inputs de búsqueda -->
          <v-row class="mb-3" dense>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="searchId"
                label="Buscar por ID"
                outlined
                dense
                clearable
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="searchName"
                label="Buscar por Nombre"
                outlined
                dense
                clearable
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="searchEmail"
                label="Buscar por Email"
                outlined
                dense
                clearable
              />
            </v-col>
          </v-row>

          <!-- Cabecera tipo tabla (v-card morado) -->
          <v-card class="pa-3 mb-2" color="#8b5cf6" outlined>
            <v-row>
              <v-col cols="2"><strong>ID</strong></v-col>
              <v-col cols="5"><strong>Nombre</strong></v-col>
              <v-col cols="5"><strong>Email</strong></v-col>
            </v-row>
          </v-card>

          <!-- Cards de usuario -->
          <div>
            <v-card
              v-for="user in filteredUsers"
              :key="user.id"
              class="pa-3 mb-2"
              outlined
              elevation="1"
            >
              <v-row>
                <v-col cols="2">{{ user.id }}</v-col>
                <v-col cols="5">{{ user.name }}</v-col>
                <v-col cols="5">{{ user.email }}</v-col>
              </v-row>
            </v-card>
          </div>

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

// Paginación
const page = ref(1)
const itemsPerPage = 6

// Búsqueda
const searchId = ref('')
const searchName = ref('')
const searchEmail = ref('')

// Datos de usuarios
const users = ref([])

// Fetch desde API
const fetchUsers = async () => {
  try {
    const { data, error } = await useFetch('/api/list', {
      method: 'GET',
      params: { limit: 100 }
    })

    if (error.value) throw error.value
    if (data.value?.success) {
      users.value = data.value.data.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email
      }))
    }
  } catch (err) {
    console.error('Error al traer usuarios:', err)
  }
}

// Ejecutar fetch al montar
fetchUsers()

// Computed para paginación (igual que antes)
const filteredUsers = computed(() => {
  const filtered = users.value.filter(u =>
    u.name.toLowerCase().includes(searchName.value.toLowerCase()) &&
    u.email.toLowerCase().includes(searchEmail.value.toLowerCase())
  )
  return filtered.slice((page.value - 1) * itemsPerPage, page.value * itemsPerPage)
})

const totalPages = computed(() =>
  Math.ceil(users.value.filter(u =>
    u.name.toLowerCase().includes(searchName.value.toLowerCase()) &&
    u.email.toLowerCase().includes(searchEmail.value.toLowerCase())
  ).length / itemsPerPage)
)

// Métricas
const totalUsers = computed(() => users.value.length)
const newUsers7d = ref(0)
const totalAffiliates = ref(42)
const activeAffiliates = ref(37)
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(124, 77, 255, 0.06);
  background: #ffffff;
}

.v-main {
  flex: 1;
  min-height: calc(100vh - 80px - 60px);
  background: #f8fafc;
}
</style>

