<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- Navbar -->
  <!-- Modal Login -->
  <div>
    <App-navbar/>

    <div v-if="showLogin" class="modal-overlay" @click.self="showLogin = false">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center w-100">Login</h5>
          <button type="button" class="btn-close" @click="showLogin = false">X</button>
        </div>

        <div class="modal-body">
          <!-- solo añado @submit.prevent y v-model -->
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="loginEmail" class="form-label">Email</label>
              <input
                id="loginEmail"
                v-model.trim="email"
                type="email"
                class="form-control"
                required
                autocomplete="email"
              >
            </div>

            <div class="mb-3">
              <label for="loginPassword" class="form-label">Contraseña</label>
              <input
                id="loginPassword"
                v-model="password"
                type="password"
                class="form-control"
                required
                autocomplete="current-password"
              >
            </div>

            <button :disabled="loading" type="submit" class="btn btn-primary w-100">
              <span v-if="!loading">Iniciar sesión</span>
              <span v-else>Accediendo...</span>
            </button>

            <p v-if="errorMsg" class="text-danger mt-3 mb-0">{{ errorMsg }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

// composable de auth (auto-import en Nuxt 3)
const { login, fetchMe, isLoggedIn, loading } = useAuth()
const router = useRouter()

const showLogin = ref(true) // cambiar a false si luego lo disparas con botón
const email = ref('')
const password = ref('')
const errorMsg = ref('')

// si ya hay sesión válida, entra directo al panel
onMounted(async () => {
  await fetchMe()
  if (isLoggedIn.value) router.replace('/menuUserPersonal')
})

const onSubmit = async () => {
  errorMsg.value = ''
  try {
    await login(email.value.toLowerCase(), password.value)
    router.replace('/menuUserPersonal') // ajusta si tu ruta final cambia
  } catch (e) {
    // mensaje corto y claro
    errorMsg.value = e?.statusMessage || e?.data?.statusMessage || 'Credenciales inválidas o error del servidor'
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
}

.btn-close {
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>


