<template>
  <div>
    <div class="full-background">
      <div class="background-image"/>
      <AppNavbar />
      <div class="centered-button">
        <h1 class="button-text">Empieza a ganar dinero YA</h1>
        <img 
          src="/gainstein.png" 
          alt="Botón" 
          class="button-image" 
          @click="showForm = true"
        >
      </div>
    </div>

    <AppFooter />

    <!-- Modal Form -->
    <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center w-100">Registro</h5>
          <button type="button" class="btn-close" @click="showForm = false">X</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">Nombre</label>
              <input id="name" v-model="formData.name" type="text" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input id="email" v-model="formData.email" type="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input id="password" v-model="formData.password" type="password" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Repite Contraseña</label>
              <input id="confirmPassword" v-model="formData.confirmPassword" type="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100 mb-2">Registrarse</button>
            <button type="button" class="btn btn-danger w-100" @click="registerWithGoogle">
              <i class="bi bi-google"/> Registrarse con Google
            </button>
          </form>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import AppNavbar from './AppNavbar.vue'
import AppFooter from './AppFooter.vue'
import { ref } from 'vue'

const showForm = ref(false)
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const submitForm = () => {
  if(formData.value.password !== formData.value.confirmPassword){
    alert("Las contraseñas no coinciden")
    return
  }
  console.log('Formulario enviado:', formData.value)
  alert("Formulario enviado correctamente. Mira la consola")
  showForm.value = false
  formData.value = { name: '', email: '', password: '', confirmPassword: '' }
}

const registerWithGoogle = () => {
  alert("Aquí se integraría el registro con Google")
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.full-background {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/btc.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4; 
  z-index: 0;
}

.centered-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  margin: 0;
}

.button-text {
  color: rgb(8, 8, 8);
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.button-image {
  width: 350px;
  cursor: pointer;
  z-index: 1;
  border-radius: 20px;
  display: block;
  margin: 0 auto;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal box */
.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>









