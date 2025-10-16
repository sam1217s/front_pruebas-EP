<template>
  <div class="novedades-container">
    <!-- Título -->
    <div class="header-container">
      <header class="text-h2 text-weight-bold text-center">NOVEDADES</header>
    </div>

    <!-- Stats Cards -->
    <div class="stats-container">
      <div class="stats-grid">
        <StatsCard
          v-for="(stat, index) in stats"
          :key="index"
          :title="stat.title"
          :value="stat.value"
          class="stat-card"
        />
      </div>
    </div>

    <!-- Vista condicional -->
    <div v-if="!mostrarTabla" class="urgent-cards-container">
      <CardNovedades
        :novedades="novedadesUrgentes"
        :loading="loading"
        @mostrar-tabla="mostrarTabla = true"
      />
    </div>
    
    <div v-else>
      <!-- Barra de búsqueda -->
      <div class="search-container">
        <q-input
          v-model="search"
          placeholder="Buscar..."
          outlined
          dense
          class="search-input"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <Button1 label="Filtrar" size="sm" class="filter-button" />
      </div>

      <!-- Tabla -->
      <q-table
        :rows="novedades"
        :columns="columns"
        row-key="id"
        :loading="loading"
        flat
        bordered
        :pagination="{ rowsPerPage: 10 }"
      >
        <template v-slot:body-cell-acciones="props">
          <q-td :props="props">
            <q-btn
              flat
              round
              color="primary"
              icon="visibility"
              size="sm"
              @click="verDetalle(props.row)"
            />
          </q-td>
        </template>
      </q-table>

      <!-- Diálogo de detalles -->
      <q-dialog v-model="mostrarDetalles" persistent>
        <q-card class="detail-card">
          <q-card-section class="header-section">
            <div class="text-h6">Detalles de la Novedad</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-separator />

          <q-card-section v-if="novedadSeleccionada" class="detail-content">
            <div class="row q-col-gutter-md">
              <!-- Información del Aprendiz -->
              <div class="col-12 col-md-6">
                <q-card flat bordered class="detail-section">
                  <q-card-section>
                    <div class="text-subtitle1 text-weight-bold">Información del Aprendiz</div>
                    <div class="q-mt-sm">
                      <div class="text-subtitle2">Nombre</div>
                      <div>{{ novedadSeleccionada.aprendiz }}</div>
                      <div class="text-caption">{{ novedadSeleccionada.documento }}</div>
                    </div>
                    <div class="q-mt-md">
                      <div class="text-subtitle2">Ficha/Programa</div>
                      <div>{{ novedadSeleccionada.ficha }}</div>
                      <div class="text-caption">{{ novedadSeleccionada.programa }}</div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <!-- Detalles de la Novedad -->
              <div class="col-12 col-md-6">
                <q-card flat bordered class="detail-section">
                  <q-card-section>
                    <div class="text-subtitle1 text-weight-bold">Estado de la Novedad</div>
                    <div class="q-mt-sm row items-center q-gutter-x-md">
                      <div>
                        <div class="text-subtitle2">Estado</div>
                        <q-badge :color="getEstadoColor(novedadSeleccionada.estado)">
                          {{ novedadSeleccionada.estado }}
                        </q-badge>
                      </div>
                      <div>
                        <div class="text-subtitle2">Gravedad</div>
                        <q-badge :color="getBadgeColor(novedadSeleccionada.gravedad)">
                          {{ novedadSeleccionada.gravedad }}
                        </q-badge>
                      </div>
                    </div>
                    <div class="q-mt-md">
                      <div class="text-subtitle2">Fecha de Creación</div>
                      <div>{{ novedadSeleccionada.fecha }}</div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <!-- Descripción y Causa -->
              <div class="col-12">
                <q-card flat bordered class="detail-section">
                  <q-card-section>
                    <div class="text-subtitle1 text-weight-bold">Descripción</div>
                    <div class="q-mt-sm">{{ novedadSeleccionada.descripcion }}</div>
                  </q-card-section>
                </q-card>
              </div>

              <!-- Respuestas -->
              <div v-if="novedadSeleccionada.respuestas?.length" class="col-12">
                <q-card flat bordered class="detail-section">
                  <q-card-section>
                    <div class="text-subtitle1 text-weight-bold">Seguimiento</div>
                    <q-timeline color="primary">
                      <q-timeline-entry
                        v-for="(respuesta, index) in novedadSeleccionada.respuestas"
                        :key="index"
                        :title="new Date(respuesta.date).toLocaleDateString()"
                        icon="comment"
                      >
                        <div>{{ respuesta.data }}</div>
                      </q-timeline-entry>
                    </q-timeline>
                  </q-card-section>
                </q-card>
              </div>

              <!-- Evidencias -->
              <div v-if="novedadSeleccionada.imagenes" class="col-12">
                <q-card flat bordered class="detail-section">
                  <q-card-section>
                    <div class="text-subtitle1 text-weight-bold">Evidencias</div>
                    <div class="q-mt-sm">
                      <q-img
                        :src="novedadSeleccionada.imagenes.url"
                        style="max-width: 300px"
                        class="rounded-borders"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>

          <q-separator />
          <div class="dialog-buttons q-pa-md">
            <div class="row justify-end buttons-row">
              <Button1
                label="Ver"
                color="positive"
                icon="visibility"
                style="width: 150px"
                @click="verCompleto(novedadSeleccionada)"
              />
              <Button1
                label="Cancelar"
                color="grey-7"
                icon="close"
                style="width: 150px"
                @click="mostrarDetalles = false"
              />
            </div>
          </div>
        </q-card>
      </q-dialog>

      <!-- Agregar el Modal después del diálogo de detalles -->
      <ModalNew
        v-model="mostrarModalNew"
        :novedad="novedadSeleccionada"
      />

      <!-- Botón volver -->
      <div class="row justify-center q-mt-lg">
        <Button1
          label="Volver a novedades urgentes"
          @click="mostrarTabla = false"
          class="button-wide"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { apiClient } from '@/plugins/pluginAxios.js'
import CardNovedades from '@/components/CardNovedades.vue'
import StatsCard from '@/components/cards/StatsCard.vue'
import Button1 from '@/components/button-1.vue'
import ModalNew from '@/components/modals/ModalNew.vue'


const loading = ref(false)
const error = ref(null)
const stats = ref([
  { title: 'TOTAL NOVEDADES ACTIVAS', value: 0 },
  { title: 'PENDIENTES DE ATENCIÓN', value: 0 },
  { title: 'EN PROCESO', value: 0 },
  { title: 'RESUELTAS ESTE MES', value: 0 },
  { title: 'CRÍTICAS SIN ATENDER >3 DÍAS', value: 0 }
])
const novedades = ref([])

// Estado para controlar la vista
const mostrarTabla = ref(false)
const search = ref('')
const mostrarDetalles = ref(false)
const novedadSeleccionada = ref(null)
const mostrarModalNew = ref(false)

// Columnas para la tabla
const columns = [
  { 
    name: 'fecha', 
    align: 'left', 
    label: 'Fecha', 
    field: 'fecha', 
    sortable: true 
  },
  { 
    name: 'aprendiz', 
    align: 'left', 
    label: 'Aprendiz', 
    field: row => `${row.aprendiz}\nCC ${row.documento}`,
    format: val => val.split('\n').join('<br>'),
    style: 'width: 150px'
  },
  { 
    name: 'ficha', 
    align: 'left', 
    label: 'Ficha/Programa', 
    field: row => `${row.ficha}\n${row.programa}`,
    format: val => val.split('\n').join('<br>')
  },
  { 
    name: 'tipo', 
    align: 'left', 
    label: 'Tipo', 
    field: 'tipo'
  },
  { 
    name: 'gravedad', 
    align: 'center', 
    label: 'Gravedad', 
    field: 'gravedad'
  },
  { 
    name: 'estado', 
    align: 'center', 
    label: 'Estado', 
    field: 'estado'
  },
  { 
    name: 'instructor', 
    align: 'left', 
    label: 'Instructor', 
    field: 'instructor'
  },
  { 
    name: 'tiempo', 
    align: 'center', 
    label: 'Tiempo', 
    field: row => tiempoTranscurrido(row.fecha)
  },
  { 
    name: 'acciones', 
    align: 'center', 
    label: 'Acciones',
    field: 'acciones'
  }
]

// Computed property para filtrar novedades urgentes
const novedadesUrgentes = computed(() => {
  return novedades.value.filter(n => n.prioridad === 'urgente' || n.prioridad === 'critica')
})

function getDays(fecha) {
  return Math.floor((Date.now() - new Date(fecha).getTime()) / (1000 * 60 * 60 * 24))
}

// Función para calcular tiempo transcurrido
function tiempoTranscurrido(fecha) {
  const dias = Math.floor((Date.now() - new Date(fecha).getTime()) / (1000 * 60 * 60 * 24))
  return dias <= 0 ? 'Hoy' : `Hace ${dias} días`
}

async function fetchStats() {
  loading.value = true
  try {
    const response = await apiClient.get('/news/listNews')
    const novedadesArray = response.data.msg || []
    
    if (Array.isArray(novedadesArray)) {
      // Actualizar estadísticas directamente con los datos del backend
      stats.value = [
        { 
          title: 'TOTAL NOVEDADES ACTIVAS', 
          value: novedadesArray.length 
        },
        { 
          title: 'PENDIENTES DE ATENCIÓN', 
          value: novedadesArray.filter(n => n.state === "").length 
        },
        { 
          title: 'EN PROCESO', 
          value: novedadesArray.filter(n => n.state === "APROBADA").length 
        },
        { 
          title: 'RESUELTAS ESTE MES', 
          value: novedadesArray.filter(n => n.processed).length 
        },
        { 
          title: 'CRÍTICAS SIN ATENDER >3 DÍAS', 
          value: novedadesArray.filter(n => {
            const dias = getDays(n.createdAt);
            return !n.processed && dias > 3;
          }).length 
        }
      ]

      // Procesar los datos para la tabla
      novedades.value = novedadesArray.map(novedad => ({
        id: novedad._id,
        fecha: new Date(novedad.createdAt).toLocaleDateString(),
        aprendiz: novedad.name,
        documento: `${novedad.tpdocument} ${novedad.document}`,
        ficha: novedad.fiche || 'Pendiente',
        programa: novedad.coordination || 'Pendiente',
        tipo: novedad.tpnew,
        gravedad: novedad.status === 0 ? 'Alta' : 'Baja',
        estado: novedad.state || 'PENDIENTE',
        instructor: novedad.nameInstructor || 'Pendiente',
        prioridad: novedad.processed ? 'normal' : 'urgente',
        descripcion: novedad.cause,
        respuestas: novedad.answers || [],
        imagenes: novedad.img || null
      }))

      console.log('Estadísticas calculadas:', stats.value)
      console.log('Novedades procesadas:', novedades.value)
    }
  } catch (error) {
    console.error('Error al cargar las novedades:', error)
    error.value = 'Error al cargar las novedades'
  } finally {
    loading.value = false
  }
}

// Actualizar la función verDetalle para mostrar más información
function verDetalle(novedad) {
  novedadSeleccionada.value = novedad
  mostrarDetalles.value = true
}

// Función para ver la novedad completa
function verCompleto(novedad) {
  mostrarModalNew.value = true
  // La novedad ya está en novedadSeleccionada.value
}

// Actualizar los colores de los badges
function getBadgeColor(gravedad) {
  const colors = {
    'Alta': 'red',
    'Media': 'orange',
    'Baja': 'green',
    'Pendiente': 'grey'
  }
  return colors[gravedad] || 'grey'
}

function getEstadoColor(estado) {
  const colors = {
    'PENDIENTE': 'warning',
    'EN PROCESO': 'info',
    'APROBADA': 'positive',
    'RECHAZADA': 'negative'
  }
  return colors[estado] || 'grey'
}

onMounted(fetchStats)
</script>

<style scoped>


.urgent-section {
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
}

.text-weight-bold {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.button-wide {
  width: 400px;
}

/* Reset margins */
* {
  margin: 0;
  padding: 0;
}

.stats-container {
  padding: 20px;
  width: 100%;
  margin-bottom: 40px;
  border-radius: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
  align-items: stretch;
}

.stat-card {
  width: 100%;
  height: 100%;
  min-height: 120px;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.novedades-container {
  padding: 10px 16px 16px 16px;
}

.header-container {
  margin-top: -20px;
  margin-bottom: 24px;
}

.text-h2 {
  font-size: 3rem !important;
  letter-spacing: 1px;
}

.urgent-cards-container {
  margin-top: 48px;
  padding: 24px;
  background-color: #fff3e0;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* Estilos para la tabla */
:deep(.q-table) {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

:deep(.q-table th) {
  font-weight: bold;
  background: #39A900 !important;
  color: white !important;
}

:deep(.q-table tr:nth-child(even)) {
  background: #f9f9f9;
}

:deep(.q-table td) {
  padding: 8px 16px;
}

:deep(.q-badge) {
  padding: 4px 8px;
  font-size: 0.8em;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.search-input {
  width: 250px;
}

.filter-button {
  margin-left: 4px;
}

.text-subtitle1 {
  color: #1976d2;
}

.text-subtitle2 {
  color: #666;
  margin-bottom: 4px;
}

.detail-card {
  width: 900px;
  max-width: 90vw;
  max-height: 90vh;
}

.header-section {
  background: #f5f5f5;
  padding: 12px 20px;
}

.detail-content {
  padding: 20px;
  overflow-y: auto;
}

.detail-section {
  height: 100%;
  background: #ffffff;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dialog-buttons {
  background: #f5f5f5;
  border-radius: 0 0 8px 8px;
  padding: 16px 24px;
}

.buttons-row {
  gap: 24px;
}

.dialog-buttons :deep(.q-btn) {
  padding: 8px 0;
}
</style>