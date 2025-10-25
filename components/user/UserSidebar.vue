<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :permanent="isDesktop"
    :temporary="!isDesktop"
    class="admin-sidebar"
  >
    <!-- Logo / User icon -->
    <div class="sidebar-top px-4 py-4 d-flex align-center">
      <v-icon size="48" color="#8b5cf6" class="me-3">mdi-account</v-icon>
      <div>
        <div class="h5 mb-0">Gainstein</div>
        <small class="text-muted">Usuario</small>
      </div>
    </div>

    <v-divider />

    <!-- Lista de links -->
    <v-list nav dense>
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        class="sidebar-link"
      >
        <v-list-item class="sidebar-item">
          <v-icon color="#8b5cf6" size="28">{{ item.icon }}</v-icon>
          <span class="sidebar-item-title">{{ item.title }}</span>
        </v-list-item>
      </NuxtLink>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const drawer = ref(true)

let isDesktop = computed(() => true)
try {
  const { display } = useDisplay()
  isDesktop = computed(() => display?.lgAndUp ?? true)
} catch { /* noop */ }

const items = [
  { title: 'Dashboard',        to: '/menuUsers',             icon: 'mdi-view-dashboard' },
  { title: 'Datos personales', to: '/menuUserPersonal',     icon: 'mdi-account-circle' },
  { title: 'Suscripción',      to: '/menuUserSubscription', icon: 'mdi-crown' },
  { title: 'Seguridad',        to: '/menuUserSecurity',     icon: 'mdi-shield-lock' },
  { title: 'Actividad',        to: '/menuUserActivity',     icon: 'mdi-history' },
  { title: 'Soporte',          to: '/menuUserSupport',      icon: 'mdi-lifebuoy' },
]

</script>

<style scoped>
.admin-sidebar {
  background: #ffffff;
  border-right: 1px solid rgba(0, 0, 0, 0.04);
}
/* Links */
.sidebar-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 16px;
}
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 30px;
  height: 60px;
  font-size: 1.2rem;
  cursor: pointer;
}
.sidebar-item-title {
  font-weight: 500;
  margin-left: 16px;
}
/* Acento */
:root { --accent-500: #8b5cf6; }
</style>
