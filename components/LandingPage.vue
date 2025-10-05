<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <div class="full-background">
      <div class="background-image"></div>
     
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

    <!-- Card con carousel -->
    <div class="container my-5">
      <div class="card shadow">
        <div class="card-body p-0">
          <ClientOnly>
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="/card01.jpeg" class="d-block w-100 carousel-img" alt="Imagen 1">
                </div>
                <div class="carousel-item">
                  <img src="/card2.jpeg" class="d-block w-100 carousel-img" alt="Imagen 2">
                </div>
                <div class="carousel-item">
                  <img src="/card3.jpeg" class="d-block w-100 carousel-img" alt="Imagen 3">
                </div>
              </div>

              <!-- Flechas -->
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <template #fallback>
              <div class="text-center p-4">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>

  

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
              <i class="bi bi-google"></i> Registrarse con Google
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'

const showForm = ref(false)
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const submitForm = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Las contraseñas no coinciden')
    return
  }
  console.log('Formulario enviado:', formData.value)
  alert('Formulario enviado correctamente. Mira la consola')
  showForm.value = false
  formData.value = { name: '', email: '', password: '', confirmPassword: '' }
}

const registerWithGoogle = () => {
  alert('Aquí se integraría el registro con Google')
}

// Inicializar carousel solo en el cliente
onMounted(() => {
  // Esperar a que Bootstrap esté disponible
  const initCarousel = () => {
    if (typeof window !== 'undefined' && window.bootstrap) {
      const carouselElement = document.querySelector('#carouselExample')
      if (carouselElement) {
        new window.bootstrap.Carousel(carouselElement, {
          interval: 5000
        })
      }
    } else {
      // Reintentar después de un tiempo si Bootstrap no está disponible
      setTimeout(initCarousel, 500)
    }
  }
  
  // Dar tiempo para que se carguen los scripts
  setTimeout(initCarousel, 1000)
})
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

.container {
  max-width: 1200px;
}

.card {
  border-radius: 15px;
  overflow: hidden;
}

.carousel-img {
   border-radius: 15px;
  overflow: hidden;
  padding: 30px; /* padding del card */
  box-sizing: border-box; /* para que el padding no haga crecer la card */
}

.carousel-item {
  transition: transform 0.6s ease-in-out;
}

/* Flechas visibles sobre la imagen */
.carousel-control-prev,
.carousel-control-next {
  width: 5%;
  opacity: 1;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  color: white; /* color de la flecha */
  font-size: 2rem;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Quitar los iconos por defecto */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  display: none;
}

/* Agregar flechas con contenido */
.carousel-control-prev::before {
  content: '‹';
}

.carousel-control-next::before {
  content: '›';
}

/* Hover más visible */
.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
  text-decoration: none;
}

/* Indicadores */
.carousel-indicators {
  bottom: 15px;
}

.carousel-indicators [data-bs-target] {
  background-color: rgba(255, 255, 255, 0.8);
}

.carousel-indicators .active {
  background-color: #fff;
}



</style>










