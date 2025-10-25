<template>
  <v-app>
    <AdminNavbar />
    <v-main class="d-flex">
      <UserSidebar />
      <v-container fluid class="pa-6" style="flex:1;">
        <h1 class="mb-4">Datos personales</h1>
        <v-card class="pa-4">
          <v-form v-model="formValid">
            <v-row dense>
              <v-col cols="12" md="6"><v-text-field v-model="form.first_name" label="Nombre" outlined dense /></v-col>
              <v-col cols="12" md="6"><v-text-field v-model="form.last_name"  label="Apellidos" outlined dense /></v-col>
              <v-col cols="12" md="6"><v-text-field v-model="form.username"   label="Usuario" outlined dense /></v-col>
              <v-col cols="12" md="6"><v-text-field v-model="form.email" type="email" label="Email" outlined dense /></v-col>
              <v-col cols="12" md="6"><v-text-field v-model="form.phone"     label="Teléfono" outlined dense /></v-col>
              <v-col cols="12" md="6"><v-text-field v-model="form.country"   label="País" outlined dense /></v-col>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn :disabled="!formValid" color="primary" @click="save">Guardar cambios</v-btn>
              </v-col>
            </v-row>
          </v-form>
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

const formValid = ref(true)
const form = ref({ first_name:'Usuario', last_name:'Demo', username:'usuario', email:'user@mail.com', phone:'', country:'' })
const save = async () => { /* await $fetch('/api/users/me', { method:'PUT', body: form.value }) */ }
</script>

<style scoped>
.v-card { border-radius: 12px; box-shadow: 0 8px 24px rgba(124,77,255,0.06); background: #fff; }
.v-main { flex:1; min-height: calc(100vh - 80px - 60px); background: #f8fafc; }
</style>
