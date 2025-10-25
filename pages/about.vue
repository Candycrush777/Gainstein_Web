<!-- pages/about.vue -->
<template>
  <!-- Esta página se renderiza dentro de layouts/default.vue,
       que ya pone el footer global al final. -->
  <div class="about-page">
    <AppNavbar />

    <div class="container py-15 mt-15" style="max-width: 1100px;">
      <!-- Hero -->
      <div class="card shadow-sm mb-4 border-0">
        <div class="card-body p-4 p-md-5 about-hero">
          <div class="d-flex flex-column flex-md-row align-items-md-center gap-3">
            <div class="flex-grow-1">
              <h1 class="mb-2">Gainstein Bot</h1>
              <p class="text-muted mb-0">
                Automatiza tu operativa en Binance con control y seguridad. Tú decides cuándo activar, pausar y con qué límites operar.
              </p>
            </div>
            <div class="mt-2 mt-md-0">
              <NuxtLink to="/#registro" class="btn btn-primary">Empieza ahora</NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Cómo funciona -->
      <div class="card shadow-sm mb-4 border-0">
        <div class="card-body p-4 p-md-5">
          <h2 class="h4 mb-3">Cómo funciona</h2>
          <div class="row">
            <div class="col-md-6">
              <ul class="about-list">
                <li><strong>Conecta tu API de Binance</strong> (solo permisos de trading; sin retiros).</li>
                <li><strong>Elige tu plan</strong> y la estrategia básica (conservadora / estándar).</li>
                <li><strong>Ajusta tus límites</strong>: pérdida diaria, tamaño de posición, símbolos.</li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul class="about-list">
                <li><strong>Activa el bot</strong> y monitoriza en tiempo real desde tu panel.</li>
                <li><strong>Pausa cuando quieras</strong>; el bot deja de ejecutar nuevas órdenes al instante.</li>
                <li><strong>Revisa el historial</strong> de operaciones y métricas en tu dashboard.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Qué hacemos / Qué no hacemos -->
      <div class="row">
        <div class="col-md-6">
          <div class="card shadow-sm mb-4 border-0">
            <div class="card-body p-4 p-md-5">
              <h3 class="h5 mb-3">Qué hacemos</h3>
              <ul class="about-list">
                <li>Automatizamos la ejecución de <strong>órdenes spot/futuros</strong> según tus ajustes.</li>
                <li>Aplicamos un <strong>límite de pérdida diaria</strong> configurable para proteger tu cuenta.</li>
                <li>Te damos <strong>visibilidad</strong> del rendimiento, operaciones y estado del bot.</li>
                <li>Soporte para <strong>pausar/reanudar</strong> con un clic desde tu panel.</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card shadow-sm mb-4 border-0">
            <div class="card-body p-4 p-md-5">
              <h3 class="h5 mb-3">Qué NO hacemos</h3>
              <ul class="about-list">
                <li><strong>No custodiamos fondos.</strong> Tus criptos <u>permanecen en tu Binance</u>.</li>
                <li><strong>No podemos retirar</strong> dinero: la API que configuras <u>no</u> tiene permisos de retiro.</li>
                <li><strong>No garantizamos rentabilidad</strong> ni damos asesoramiento financiero.</li>
                <li><strong>No operamos sin tu control:</strong> puedes pausar o revocar acceso cuando quieras.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Seguridad y control -->
      <div class="card shadow-sm mb-4 border-0">
        <div class="card-body p-4 p-md-5">
          <h2 class="h4 mb-4">Seguridad y control</h2>
          <div class="row g-3">
            <div class="col-md-6">
              <div class="about-item">
                <span class="about-icon">🔐</span>
                <div>
                  <div class="fw-semibold">Tus fondos están en Binance</div>
                  <div class="text-muted small">
                    Nos conectamos por API de lectura/operación. <strong>No</strong> custodiamos ni podemos retirar.
                  </div>
                </div>
              </div>

              <div class="about-item">
                <span class="about-icon">⏸️</span>
                <div>
                  <div class="fw-semibold">Puedes pausar el bot cuando quieras</div>
                  <div class="text-muted small">
                    La pausa detiene nuevas órdenes; las posiciones abiertas se gestionan según tu ajuste (mantener/cerrar).
                  </div>
                </div>
              </div>

              <div class="about-item">
                <span class="about-icon">📉</span>
                <div>
                  <div class="fw-semibold">Límite de pérdida diaria</div>
                  <div class="text-muted small">
                    Configura un tope diario. Al alcanzarse, el bot deja de abrir nuevas posiciones.
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="about-item">
                <span class="about-icon">🔑</span>
                <div>
                  <div class="fw-semibold">Revoca nuestra API cuando quieras</div>
                  <div class="text-muted small">
                    Desde Binance puedes desactivar o borrar la API. El acceso se anula al instante.
                  </div>
                </div>
              </div>

              <div class="about-item">
                <span class="about-icon">✅</span>
                <div>
                  <div class="fw-semibold">Permisos mínimos</div>
                  <div class="text-muted small">
                    Claves con permisos de trading (sin retiros). Recomendado restringir por IP si tu plan lo admite.
                  </div>
                </div>
              </div>

              <div class="about-item">
                <span class="about-icon">🧾</span>
                <div>
                  <div class="fw-semibold">Trazabilidad</div>
                  <div class="text-muted small">
                    Registro de cada orden para auditoría y soporte.
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>

      <!-- Requisitos -->
      <div class="card shadow-sm mb-4 border-0">
        <div class="card-body p-4 p-md-5">
          <h2 class="h4 mb-3">Requisitos</h2>
          <ul class="about-list">
            <li>Cuenta activa en <strong>Binance</strong> con verificación KYC.</li>
            <li>Crear una <strong>API Key</strong> con permisos de trading (sin retiros) y conectarla en tu panel.</li>
            <li>Saldo en Binance para operar (según plan y tamaño de posición).</li>
          </ul>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center pb-3">
        <NuxtLink to="/" class="btn btn-primary me-2">Empezar</NuxtLink>
        <NuxtLink to="/about#faq" class="btn btn-outline-primary">Saber más</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '~/components/AppNavbar.vue'
definePageMeta({ layout: 'default' }) // usa tu layout con footer fijo al final
</script>

<style scoped>
.about-hero {
  border-left: 6px solid #8b5cf6;
}

.about-list {
  margin: 0;
  padding-left: 1.1rem;
}
.about-list li { margin-bottom: .6rem; }

.about-item {
  display: flex;
  gap: .75rem;
  align-items: flex-start;
  padding: .5rem 0;
}
.about-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-grid;
  place-items: center;
  font-size: 18px;
  background: rgba(139, 92, 246, 0.08); /* morado suave */
  color: #8b5cf6;
}

/* Acento morado coherente con tu UI */
.btn-primary {
  background-color: #8b5cf6;
  border-color: #8b5cf6;
}
.btn-outline-primary {
  color: #8b5cf6;
  border-color: #8b5cf6;
}
.btn-outline-primary:hover {
  background-color: #8b5cf6;
  border-color: #8b5cf6;
  color: #fff;
}
</style>
