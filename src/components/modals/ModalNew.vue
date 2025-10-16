<template>
  <q-dialog v-model="show">
    <q-card class="modal-card">
      <q-card-section>
        <div class="text-h5 q-mb-md">Información General</div>
        
        <!-- Información principal -->
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <div class="info-group">
              <div class="label">Aprendiz</div>
              <div class="value">{{ novedad?.aprendiz }}</div>
            </div>
          </div>
          <div class="col-6">
            <div class="info-group">
              <div class="label">Tipo</div>
              <div class="value">{{ novedad?.tipo }}</div>
            </div>
          </div>
        </div>

        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-6">
            <div class="info-group">
              <div class="label">Estado</div>
              <div class="status">
                <q-badge :color="getStatusColor(novedad?.estado)">
                  {{ novedad?.estado || 'Pendiente' }}
                </q-badge>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="info-group">
              <div class="label">Gravedad</div>
              <div class="severity">
                <q-badge :color="getSeverityColor(novedad?.gravedad)">
                  {{ novedad?.gravedad || 'Alta' }}
                </q-badge>
              </div>
            </div>
          </div>
        </div>

        <!-- Reporte del instructor -->
        <div class="q-mt-lg">
          <div class="text-h6">Reporte del instructor</div>
          <p class="description q-mt-md">{{ novedad?.descripcion }}</p>

          <div class="attempts q-mt-md" v-if="novedad?.respuestas?.length">
            <div class="label">Intentos:</div>
            <div class="attempt-list">
              Llamadas: {{ getAttemptCount('llamada') }}, 
              Correos: {{ getAttemptCount('correo') }}, 
              WhatsApp: {{ getAttemptCount('whatsapp') }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-mt-md">
        <Button1
          label="Actualizar estado"
          color="positive"
          style="width: 250px"
          @click="closeModal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'
import Button1 from '@/components/button-1.vue'

const props = defineProps({
  modelValue: Boolean,
  novedad: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const closeModal = () => {
  show.value = false
}

const getStatusColor = (status) => {
  const colors = {
    'Pendiente': 'warning',
    'En proceso': 'info',
    'Completado': 'positive'
  }
  return colors[status] || 'warning'
}

const getSeverityColor = (severity) => {
  return severity === 'Alta' ? 'negative' : 'warning'
}

const getAttemptCount = (type) => {
  return props.novedad?.respuestas?.filter(r => r.tipo === type).length || 0
}
</script>

<style scoped>
.modal-card {
  width: 600px;
  max-width: 90vw;
  border-radius: 8px;
}

.info-group {
  margin-bottom: 12px;
}

.label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
}

.value {
  font-size: 1.1rem;
  font-weight: 500;
}

.description {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin: 8px 0;
}

.attempts {
  display: flex;
  gap: 8px;
  align-items: center;
  color: #666;
}

.attempt-list {
  font-size: 0.9rem;
}
</style>
