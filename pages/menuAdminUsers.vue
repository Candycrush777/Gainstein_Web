<template>
  <v-app>
    <AdminNavbar />

    <v-main class="d-flex">
      <AdminSidebar />

      <v-container fluid class="pa-6" style="flex:1;">
        <div class="d-flex align-center justify-space-between mb-4">
          <div>
            <h1 class="mb-1">Usuarios</h1>
            <p class="text--muted mb-0">Gestiona, crea y edita usuarios.</p>
          </div>
          <v-btn color="primary" prepend-icon="mdi-account-plus" @click="openCreate">
            Nuevo usuario
          </v-btn>
        </div>

        <!-- Filtros -->
        <v-row class="mb-3" dense>
          <v-col cols="12" md="3">
            <v-text-field v-model="searchId" label="Filtrar por ID" clearable dense outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="searchName" label="Filtrar por nombre" clearable dense outlined />
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field v-model="searchEmail" label="Filtrar por email" clearable dense outlined />
          </v-col>
        </v-row>

        <!-- Cabecera tipo tabla -->
        <v-card class="pa-3 mb-2" color="#8b5cf6" outlined>
          <v-row class="align-center">
            <v-col cols="2"><strong>ID</strong></v-col>
            <v-col cols="4"><strong>Nombre</strong></v-col>
            <v-col cols="4"><strong>Email</strong></v-col>
            <v-col cols="2" class="text-right"><strong>Acciones</strong></v-col>
          </v-row>
        </v-card>

        <!-- Lista -->
        <div>
          <v-card
            v-for="u in pagedUsers"
            :key="u.id"
            class="pa-3 mb-2"
            outlined
            elevation="1"
          >
            <v-row class="align-center">
              <v-col cols="2">{{ u.id }}</v-col>
              <v-col cols="4">{{ (u.first_name || '') + ' ' + (u.last_name || '') }}</v-col>
              <v-col cols="4">{{ u.email }}</v-col>
              <v-col cols="2" class="d-flex justify-end">
                <v-btn icon="mdi-pencil" variant="text" :title="'Editar ' + u.email" @click="openEdit(u)" />
                <v-btn icon="mdi-delete" variant="text" color="error" :title="'Borrar ' + u.email" @click="openDelete(u)" />
              </v-col>
            </v-row>
          </v-card>

          <v-alert v-if="!loading && pagedUsers.length === 0" type="info" variant="tonal" class="mt-3">
            No hay usuarios que cumplan el filtro.
          </v-alert>
        </div>

        <!-- Paginación -->
        <v-row justify="center" class="mt-4">
          <v-pagination v-model="page" :length="totalPages" />
        </v-row>
      </v-container>
    </v-main>

    <!-- Diálogo Crear / Editar -->
    <v-dialog v-model="showEditDialog" max-width="520">
      <v-card>
        <v-card-title class="text-h6">
          {{ editMode === 'create' ? 'Crear usuario' : 'Editar usuario' }}
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.first_name" label="Nombre" dense outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.last_name" label="Apellidos" dense outlined />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.email" label="Email" dense outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-switch v-model="form.is_active" :true-value="1" :false-value="0" inset label="Activo" />
            </v-col>

            <!-- Solo al crear permitimos poner contraseña rápida -->
            <v-col v-if="editMode === 'create'" cols="12" md="6">
              <v-text-field
                v-model="form.password"
                label="Contraseña (opcional)"
                type="password"
                dense
                outlined
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="closeEdit">Cancelar</v-btn>
          <v-btn color="primary" :loading="saving" @click="saveUser">
            {{ editMode === 'create' ? 'Crear' : 'Guardar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo Borrar -->
    <v-dialog v-model="showDeleteDialog" max-width="460">
      <v-card>
        <v-card-title class="text-h6">Confirmar borrado</v-card-title>
        <v-card-text>
          ¿Seguro que quieres borrar al usuario
          <strong>{{ selected?.email }}</strong> (ID: {{ selected?.id }})?
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="closeDelete">Cancelar</v-btn>
          <v-btn color="error" :loading="deleting" @click="deleteUser">Borrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snack.show" :timeout="2500">
      {{ snack.text }}
    </v-snackbar>
  </v-app>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminNavbar from '~/components/AdminNavbar.vue'
import AdminSidebar from '~/components/admin/AdminSidebar.vue'

definePageMeta({ layout: 'admin' })

/** --- Estado base --- */
const users = ref([])
const loading = ref(false)

/** --- Filtros --- */
const searchId = ref('')
const searchName = ref('')
const searchEmail = ref('')

/** --- Paginación (client-side simple) --- */
const page = ref(1)
const perPage = 10

/** --- Diálogos y formularios --- */
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editMode = ref('create') // 'create' | 'edit'
const selected = ref(null)
const saving = ref(false)
const deleting = ref(false)
const snack = ref({ show: false, text: '' })

const emptyForm = () => ({
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  is_active: 1,
  password: '' // solo se usa al crear (opcional)
})
const form = ref(emptyForm())

/** --- Carga inicial --- */
onMounted(fetchUsers)

async function fetchUsers () {
  try {
    loading.value = true
    // Usa tu endpoint real de listado
    const res = await $fetch('/api/list', { method: 'GET', params: { limit: 200 } })
    if (res?.success && Array.isArray(res.data)) {
      users.value = res.data
    } else {
      snack.value = { show: true, text: 'No se pudo cargar la lista.' }
    }
  } catch (e) {
    console.error(e)
    snack.value = { show: true, text: 'Error cargando usuarios.' }
  } finally {
    loading.value = false
  }
}

/** --- Filtro + paginado en cliente --- */
const filtered = computed(() => {
  return users.value.filter(u => {
    const fullName = `${u.first_name || ''} ${u.last_name || ''}`.toLowerCase()
    const okId = searchId.value ? String(u.id).includes(searchId.value) : true
    const okName = searchName.value ? fullName.includes(searchName.value.toLowerCase()) : true
    const okEmail = searchEmail.value ? u.email?.toLowerCase().includes(searchEmail.value.toLowerCase()) : true
    return okId && okName && okEmail
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))

const pagedUsers = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

/** --- Crear / Editar / Borrar --- */
function openCreate () {
  editMode.value = 'create'
  form.value = emptyForm()
  showEditDialog.value = true
}
function openEdit (u) {
  editMode.value = 'edit'
  form.value = {
    id: u.id,
    first_name: u.first_name || '',
    last_name: u.last_name || '',
    email: u.email || '',
    is_active: u.is_active ?? 1,
    password: ''
  }
  showEditDialog.value = true
}
function closeEdit () {
  showEditDialog.value = false
}

async function saveUser () {
  try {
    saving.value = true

    if (editMode.value === 'create') {
      // ⚠️ Implementa este endpoint en tu backend
      const res = await $fetch('/api/users/create', {
        method: 'POST',
        body: {
          email: form.value.email,
          first_name: form.value.first_name,
          last_name: form.value.last_name,
          is_active: form.value.is_active,
          password: form.value.password || undefined
        }
      })
      if (res?.success) {
        snack.value = { show: true, text: 'Usuario creado' }
        await fetchUsers()
        closeEdit()
      } else {
        snack.value = { show: true, text: res?.message || 'No se pudo crear' }
      }
    } else {
      // ⚠️ Implementa este endpoint en tu backend
      const res = await $fetch('/api/users/update', {
        method: 'PUT',
        body: {
          id: form.value.id,
          email: form.value.email,
          first_name: form.value.first_name,
          last_name: form.value.last_name,
          is_active: form.value.is_active
        }
      })
      if (res?.success) {
        snack.value = { show: true, text: 'Usuario actualizado' }
        await fetchUsers()
        closeEdit()
      } else {
        snack.value = { show: true, text: res?.message || 'No se pudo actualizar' }
      }
    }
  } catch (e) {
    console.error(e)
    snack.value = { show: true, text: 'Error guardando usuario' }
  } finally {
    saving.value = false
  }
}

function openDelete (u) {
  selected.value = u
  showDeleteDialog.value = true
}
function closeDelete () {
  showDeleteDialog.value = false
  selected.value = null
}
async function deleteUser () {
  if (!selected.value) return
  try {
    deleting.value = true
    // ⚠️ Implementa este endpoint en tu backend
    const res = await $fetch('/api/users/delete', {
      method: 'DELETE',
      body: { id: selected.value.id }
    })
    if (res?.success) {
      snack.value = { show: true, text: 'Usuario eliminado' }
      await fetchUsers()
      closeDelete()
    } else {
      snack.value = { show: true, text: res?.message || 'No se pudo eliminar' }
    }
  } catch (e) {
    console.error(e)
    snack.value = { show: true, text: 'Error eliminando' }
  } finally {
    deleting.value = false
  }
}

/** --- Métricas decorativas --- */

/* const totalUsers = computed(() => users.value.length)
const newUsers7d = ref(0)
const totalAffiliates = ref(42)
const activeAffiliates = ref(37) */

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
 

