<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white custom-header">
      <div class="header-container">
        <q-avatar size="90px" class="header-avatar">
          <img src="/logo-sena.png" alt="logo" />
        </q-avatar>
        <span class="header-title">REPFORA EP</span>
        <div class="header-action-btn">
          <q-btn fab color="white" size="lg" @click="showMorph = !showMorph" unelevated>
            <span style="font-weight:bold; color:#39a900;">{{ userInitials }}</span>
          </q-btn>
        </div>
      </div>
    </q-header>

    <!-- Card flotante con info del usuario -->
    <transition name="fade">
      <div v-if="showMorph" class="morph-float-card">
        <q-card class="user-card">
          <q-card-section class="text-h6">
            ¡Hola, <strong>{{ displayRole }}</strong>!
            <div class="text-subtitle2 q-mt-xs">
              {{ displayName }}
            </div>
          </q-card-section>
          
          <q-separator />
          
          <q-card-actions align="right" class="q-px-md q-pb-md">
            <q-btn 
              flat 
              label="Cerrar Sesión" 
              color="negative" 
              icon="logout" 
              @click="handleLogout"
            />
          </q-card-actions>
        </q-card>
      </div>
    </transition>

    <!-- Contenedor principal -->
    <q-page-container style="max-width: 100% !important;">
      <router-view />

      <!-- Panel de notificaciones -->
      <div class="notification-container" aria-hidden="false">
        <transition name="fade">
          <q-card v-if="showNotifications" class="notification-panel shadow-5">
            <div class="notification-header row items-center justify-between q-pa-md">
              <div>
                <div class="text-h6">Notificaciones</div>
                <div class="text-caption">{{ unreadCount }} sin leer</div>
              </div>
              <div class="row items-center q-gutter-xs">
                <q-btn 
                  flat 
                  dense 
                  round 
                  icon="done_all" 
                  title="Marcar todas" 
                  @click="markAllAsRead" 
                />
                <q-btn 
                  flat 
                  dense 
                  round 
                  icon="close" 
                  title="Cerrar" 
                  @click="showNotifications = false" 
                />
              </div>
            </div>

            <q-separator />

            <q-scroll-area style="height: 300px;">
              <q-list padding>
                <q-item 
                  v-for="note in notifications" 
                  :key="note.id" 
                  clickable 
                  :class="{ 'unread-notification': !note.read }"
                  @click="markAsRead(note)"
                >
                  <q-item-section avatar>
                    <q-avatar color="primary" text-color="white" icon="notifications" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-weight-bold">{{ note.title }}</q-item-label>
                    <q-item-label caption lines="2">{{ note.description }}</q-item-label>
                    <q-item-label caption class="text-grey-6">{{ note.time }}</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-btn 
                      flat 
                      dense 
                      round 
                      icon="close" 
                      color="grey-7" 
                      size="sm" 
                      @click.stop="deleteNotification(note.id)"
                    />
                  </q-item-section>
                </q-item>

                <q-item v-if="notifications.length === 0">
                  <q-item-section class="text-center text-grey">
                    No hay notificaciones
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>

            <q-separator />

            <div class="notification-footer row items-center justify-between q-pa-sm">
              <q-btn 
                flat 
                label="Limpiar todas" 
                color="negative" 
                size="sm"
                @click="clearAll" 
                :disable="notifications.length === 0" 
              />
            </div>
          </q-card>
        </transition>

        <!-- Botón flotante de notificaciones -->
        <q-btn
          round
          color="primary"
          icon="notifications"
          size="lg"
          class="notifications-btn"
          @click="toggleNotifications"
        >
          <q-badge v-if="unreadCount > 0" floating color="red" :label="unreadCount" />
        </q-btn>
      </div>
    </q-page-container>

    <!-- Footer -->
    <q-footer reveal class="bg-grey-5 text-black custom-footer">
      <q-toolbar>
        <q-toolbar-title>
          <div class="footer-text">REPFORA - Sena 2025 © Todos los derechos reservados</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/authStore.js'
import { useNotifications } from '../composables/useNotifications.js'
import { apiClient } from '../plugins/pluginAxios.js'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()
const { success, info } = useNotifications()

// Estados
const showMorph = ref(false)
const showNotifications = ref(false)

// Notificaciones de ejemplo
const notifications = ref([
  { 
    id: 1, 
    title: 'Bienvenida', 
    description: 'Tu cuenta se configuró correctamente.', 
    time: 'Hace 2 horas', 
    read: false 
  },
  { 
    id: 2, 
    title: 'Nuevo mensaje', 
    description: 'Tienes un nuevo mensaje del coordinador.', 
    time: 'Hace 5 horas', 
    read: false 
  },
  { 
    id: 3, 
    title: 'Actualización', 
    description: 'Se actualizó tu perfil correctamente.', 
    time: 'Ayer', 
    read: true 
  }
])

// Computeds
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const displayName = computed(() => {
  if (authStore.user) {
    const firstName = authStore.user.firstName || authStore.user.name || ''
    const lastName = authStore.user.lastName || ''
    return `${firstName} ${lastName}`.trim() || 'Usuario'
  }
  return 'Usuario'
})

const displayRole = computed(() => {
  return authStore.role || 'Usuario'
})

const userInitials = computed(() => {
  if (authStore.user) {
    const firstName = authStore.user.firstName || authStore.user.name || 'U'
    const lastName = authStore.user.lastName || ''
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }
  return 'U'
})

// Funciones de notificaciones
function toggleNotifications() {
  showNotifications.value = !showNotifications.value
}

function markAsRead(note) {
  note.read = true
}

function markAllAsRead() {
  notifications.value.forEach(n => { n.read = true })
  info('Todas las notificaciones marcadas como leídas')
}

function deleteNotification(id) {
  const idx = notifications.value.findIndex(n => n.id === id)
  if (idx !== -1) {
    notifications.value.splice(idx, 1)
    info('Notificación eliminada')
  }
}

function clearAll() {
  $q.dialog({
    title: 'Confirmar',
    message: '¿Deseas limpiar todas las notificaciones?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    notifications.value = []
    info('Notificaciones limpiadas')
  })
}

// ✅ FUNCIÓN DE LOGOUT ACTUALIZADA
function handleLogout() {
  $q.dialog({
    title: 'Cerrar Sesión',
    message: '¿Estás seguro que deseas cerrar sesión?',
    cancel: {
      label: 'Cancelar',
      color: 'grey',
      flat: true
    },
    ok: {
      label: 'Cerrar Sesión',
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
    // PASO 1: Limpiar localStorage (clave correcta 'pruebas')
    localStorage.removeItem('pruebas')
    
    // PASO 2: Limpiar otros posibles datos en localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
    
    // PASO 3: Limpiar headers de axios
    delete apiClient.defaults.headers['x-token']
    
    // PASO 4: Limpiar el authStore
    authStore.clearAuth()
    
    // PASO 5: Ocultar el card flotante
    showMorph.value = false
    
    // PASO 6: Mostrar notificación
    success('Sesión cerrada', 'Has cerrado sesión correctamente')
    
    // PASO 7: Redirigir al login
    setTimeout(() => {
      router.push('/login')
    }, 500)
  })
}

// Ciclo de vida
onMounted(() => {
  console.log('MainLayout montado')
  console.log('Usuario:', authStore.user)
  console.log('Rol:', authStore.role)
  console.log('Autenticado:', authStore.isAuthenticated)
})
</script>

<style scoped>
/* Header */
.custom-header {
  background-color: #39a900;
  height: 90px;
}

.header-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  padding: 0 32px;
}

.header-avatar {
  background: transparent;
}

.header-avatar img {
  width: auto;
  height: 90px;
}

.header-title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

/* Card flotante del usuario */
.morph-float-card {
  position: fixed;
  top: 110px;
  right: 32px;
  z-index: 9999;
}

.user-card {
  width: 320px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.user-card .q-card__section {
  background: linear-gradient(135deg, #39a900 0%, #5ccb5f 100%);
  color: white;
}

/* Notificaciones */
.notification-container {
  position: fixed;
  right: 24px;
  bottom: 80px;
  z-index: 14000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
}

.notification-container > * {
  pointer-events: auto;
}

.notification-panel {
  margin-bottom: 16px;
  width: 380px;
  max-width: 90vw;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.unread-notification {
  background-color: #f0f9ff;
}

.notifications-btn {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Footer */
.custom-footer {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
}

.footer-text {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .header-title {
    font-size: 2rem;
  }
  
  .morph-float-card {
    right: 16px;
    top: 100px;
  }
  
  .user-card {
    width: calc(100vw - 32px);
    max-width: 320px;
  }
  
  .notification-panel {
    width: calc(100vw - 32px);
  }
}
</style>