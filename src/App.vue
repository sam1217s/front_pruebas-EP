<template>
  <q-app>
    <router-view />
  </q-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore.js'
import { apiClient } from './plugins/pluginAxios.js'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  // Verificar si hay un token guardado al iniciar la app
  const tokenData = JSON.parse(localStorage.getItem('pruebas') || '{}')
  
  if (tokenData.token) {
    // Actualizar el header de axios con el token
    apiClient.defaults.headers['x-token'] = tokenData.token
    
    // Actualizar el store si no está ya actualizado
    if (!authStore.isAuthenticated) {
      authStore.setToken(tokenData.token)
    }
    
    // Si está en la ruta raíz o login, redirigir al inicio
    if (router.currentRoute.value.path === '/' || router.currentRoute.value.path === '/login') {
      router.push('/inicio')
    }
  } else {
    // No hay token, redirigir al login si no está ya ahí
    if (router.currentRoute.value.path !== '/login') {
      router.push('/login')
    }
  }
})
</script>

<style>
/* Estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>