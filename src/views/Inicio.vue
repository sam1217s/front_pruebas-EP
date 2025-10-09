<template>
  <div class="center">
    <div class="grid">
      <Card v-if="role === 'ETAPA PRODUCTIVA VIRTUAL' || 'ETAPA PRODUCTIVA PRESENCIAL' " title="SGVA"
        subtitle="Consulta, Registro y Visualización de empresas" imgSrc="/src/assets/Monitoria.jpg" route="/vista"
        color="#5db82f" textColor="white" />
      <Card v-if="role === 'ETAPA PRODUCTIVA VIRTAL' || 'ETAPA PRODUCTIVA PRESENCIAL'" title="Vista de Documentos"
        subtitle="Consulta y Visualización" imgSrc="/src/assets/Almacenamiento.jpg" route="/vista" color="#5db82f"
        textColor="white" />
      <Card v-if="role === 'ETAPA PRODUCTIVA VIRTAL' || 'ETAPA PRODUCTIVA PRESENCIAL'" title="Instructores"
        subtitle="Consulta Instructores" imgSrc="/src/assets/Pasantia_ONG.jpg" route="/vista" color="#5db82f"
        textColor="white" />
      <Card v-if="role === 'ETAPA PRODUCTIVA VIRTAL' || 'ETAPA PRODUCTIVA PRESENCIAL'" title="Aprendices"
        subtitle="Consulta y Visualización" imgSrc="/src/assets/pyme.jpg" route="/vista" color="#5db82f"
        textColor="white" />
      <Card v-if="role === 'ETAPA PRODUCTIVA VIRTAL' || 'ETAPA PRODUCTIVA PRESENCIAL'" title="Parametros"
        subtitle="Consulta Parametros" imgSrc="/src/assets/Pasantia_ONG.jpg" route="/vista" color="#5db82f"
        textColor="white" />
      <Card v-if="role === 'ETAPA PRODUCTIVA VIRTAL' || 'ETAPA PRODUCTIVA PRESENCIAL'" title="Reportes"
        subtitle="Consulta y Visualización de Reportes" imgSrc="/src/assets/pyme.jpg" route="/vista" color="#5db82f"
        textColor="white" />
      <Card v-if="role === 'INSTRUCTOR'" title="Informe Personal" subtitle="Consultar mi informacion y Horas"
        imgSrc="/src/assets/Monitoria.jpg" route="/vista" color="#5db82f" textColor="white" />
      <Card v-if="role === 'INSTRUCTOR'" title="Seguimientos" subtitle="Proceso de documentos de seguimiento"
        imgSrc="/src/assets/Almacenamiento.jpg" route="/vista" color="#5db82f" textColor="white" />
      <Card v-if="role === 'INSTRUCTOR'" title="Bitácoras" subtitle="Procedimiento de subida de documentos de bitácoras"
        imgSrc="/src/assets/Pasantia_ONG.jpg" route="/vista" color="#5db82f" textColor="white" />
      <Card v-if="role === 'INSTRUCTOR'" title="Lista de Aprendices" subtitle="Consultar mis aprendices asignados"
        imgSrc="/src/assets/pyme.jpg" route="/vista" color="#5db82f" textColor="white" />
      <Card v-if="role === 'INSTRUCTOR'" title="Historial" subtitle="Consultar mi actividad en el sitio"
        imgSrc="/src/assets/Pasantia_ONG.jpg" route="/vista" color="#5db82f" textColor="white" />
      <Card v-if="role === 'INSTRUCTOR'" title="Novedades" subtitle="Procesos Disciplinarios"
        imgSrc="/src/assets/pyme.jpg" route="/vista" color="#5db82f" textColor="white" />
    </div>
  </div>
</template>
<script setup>
import Card from '../components/cards/MenuCard.vue';
import { ref, onMounted } from 'vue'

const role = ref('')

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    return null
  }
}

onMounted(() => {
  try {
    const storedUserRole = JSON.parse(localStorage.getItem("auth")).role
    console.log('[dashboard] storedUserRole:', storedUserRole)
    if (storedUserRole) {
      role.value = String(storedUserRole).toUpperCase()
      console.log('[dashboard] role from localStorage userRole:', role.value)
      return
    }

    const rawUser = localStorage.getItem('user')
    console.log('[dashboard] rawUser:', rawUser)
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser)
        const candidate = u.role || u.rol || u.roleName || u.role_type || u.type || u.firstRole
        if (candidate) {
          role.value = String(candidate).toUpperCase()
          console.log('[dashboard] role from user object:', role.value)
          return
        }
      } catch (e) {
        console.warn('[dashboard] user parse error', e)
      }
    }

    const token = localStorage.getItem('token')
    console.log('[dashboard] token present:', !!token)
    if (token) {
      const payload = parseJwt(token)
      console.log('[dashboard] token payload:', payload)
      if (payload) {
        const candidate =
          payload.role ||
          payload.rol ||
          (payload.uid && (payload.uid.role || payload.uid.rol)) ||
          (payload.user && (payload.user.role || payload.user.rol))
        if (candidate) {
          role.value = String(candidate).toUpperCase()
          console.log('[dashboard] role from token:', role.value)
          return
        }
      }
    }

    role.value = ''
    console.log('[dashboard] role fallback empty')
  } catch (err) {
    console.error('Error obteniendo rol:', err)
  }
})
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0px;
  justify-items: center;
  align-items: center;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
}
</style>