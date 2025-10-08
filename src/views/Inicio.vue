<template>
  <div class="center">
    <div class="grid">
      <!-- ============================================ -->
      <!-- CARDS PARA ADMINISTRADOR -->
      <!-- ============================================ -->
      <Card
        v-if="role === 'ADMINISTRADOR'"
        title="SGVA"
        subtitle="Consulta, Registro y Visualización de empresas"
        imgSrc="/Monitoria.jpg"
        route="/admin/empresas"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'ADMINISTRADOR'"
        title="Vista de Documentos"
        subtitle="Consulta y Visualización"
        imgSrc="/Almacenamiento.jpg"
        route="/admin/documentos"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'ADMINISTRADOR'"
        title="Instructores"
        subtitle="Consulta Instructores"
        imgSrc="/Pasantia_ONG.jpg"
        route="/admin/instructores"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'ADMINISTRADOR'"
        title="Aprendices"
        subtitle="Consulta y Visualización"
        imgSrc="/pyme.jpg"
        route="/admin/aprendices"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'ADMINISTRADOR'"
        title="Modalidades"
        subtitle="Consulta Modalidades"
        imgSrc="/Pasantia_ONG.jpg"
        route="/admin/modalidades"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'ADMINISTRADOR'"
        title="Validar Solicitudes"
        subtitle="Validación de solicitudes de EP"
        imgSrc="/pyme.jpg"
        route="/admin/validar-solicitudes"
        color="#5db82f"
        textColor="white"
      />

      <!-- ============================================ -->
      <!-- CARDS PARA INSTRUCTOR -->
      <!-- ============================================ -->
      <Card
        v-if="role === 'INSTRUCTOR'"
        title="Mis Aprendices"
        subtitle="Consultar mis aprendices asignados"
        imgSrc="/Monitoria.jpg"
        route="/instructor/mis-aprendices"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'INSTRUCTOR'"
        title="Seguimientos"
        subtitle="Proceso de documentos de seguimiento"
        imgSrc="/Almacenamiento.jpg"
        route="/instructor/seguimientos"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'INSTRUCTOR'"
        title="Bitácoras"
        subtitle="Procedimiento de subida de documentos de bitácoras"
        imgSrc="/Pasantia_ONG.jpg"
        route="/instructor/bitacoras"
        color="#5db82f"
        textColor="white"
      />

      <!-- ============================================ -->
      <!-- CARDS PARA APRENDIZ -->
      <!-- ============================================ -->
      <Card
        v-if="role === 'APRENDIZ'"
        title="Registro EP"
        subtitle="Registrar Etapa Productiva"
        imgSrc="/Monitoria.jpg"
        route="/aprendiz/registro"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'APRENDIZ'"
        title="Mis Registros"
        subtitle="Consultar mis registros de EP"
        imgSrc="/Almacenamiento.jpg"
        route="/aprendiz/mis-registros"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'APRENDIZ'"
        title="Seguimiento"
        subtitle="Ver mi seguimiento"
        imgSrc="/Pasantia_ONG.jpg"
        route="/aprendiz/seguimiento"
        color="#5db82f"
        textColor="white"
      />
      <Card
        v-if="role === 'APRENDIZ'"
        title="Documentos"
        subtitle="Mis documentos cargados"
        imgSrc="/pyme.jpg"
        route="/aprendiz/documentos"
        color="#5db82f"
        textColor="white"
      />
    </div>

    <!-- Mensaje si no hay rol -->
    <div v-if="!role" class="no-role-message">
      <q-icon name="warning" size="48px" color="warning" />
      <div class="text-h6 q-mt-md">No se pudo identificar tu rol</div>
      <q-btn 
        color="primary" 
        label="Ir al Login" 
        class="q-mt-md"
        @click="$router.push('/login')"
      />
    </div>
  </div>
</template>

<script setup>
import Card from '../components/card.vue'
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Usar el rol del store directamente
const role = computed(() => authStore.role)

onMounted(() => {
  console.log('[Inicio.vue] Rol del usuario:', role.value)
  console.log('[Inicio.vue] Usuario autenticado:', authStore.isAuthenticated)
  
  // Si no hay rol, redirigir al login después de 2 segundos
  if (!role.value) {
    console.warn('[Inicio.vue] No se encontró rol, redirigiendo al login...')
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
  align-items: center;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 180px);
  overflow-y: auto;
  padding: 20px;
}

.no-role-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

/* Responsive para tablets */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
  }
  
  .center {
    padding: 12px;
  }
}
</style>