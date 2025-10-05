<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- Navbar -->     
  <!-- Modal Login -->
   <div >
    
    <App-navbar/>
  <div v-if="showLogin" class="modal-overlay" @click.self="showLogin = false">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-center w-100">Login</h5>
        <button type="button" class="btn-close" @click="showLogin = false">X</button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="loginEmail" class="form-label">Email</label>
            <input id="loginEmail" type="email" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="loginPassword" class="form-label">Contraseña</label>
            <input id="loginPassword" type="password" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
        </form>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showLogin = ref(true); // cambiar a false para abrir con un botón
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

