<template>
  <div class="urgent-section q-pa-md">
    <div class="text-weight-bold">Novedades Urgentes</div>

    <div v-if="loading" class="text-center q-pa-md">
      <SpinnerButton label="Cargando..." :loading="true" />
    </div>

    <div v-else-if="novedades.length" class="q-pa-sm">
      <div v-for="(novedad, idx) in novedades" :key="idx" class="novedad-item q-mb-md">
        <div class="novedad-content">
          <div class="text-h6">{{ novedad.tipo }}</div>
          <div class="text-subtitle1">{{ novedad.aprendiz }}</div>
          <div class="text-caption">Ficha: {{ novedad.ficha }}</div>
        </div>
        <div class="text-right text-caption text-grey-7 q-mt-xs">
          {{ tiempoTranscurrido(novedad.fecha) }}
        </div>
      </div>
    </div>

    <div v-else class="text-center q-pa-md text-grey-7">
      No hay novedades urgentes
    </div>

    <div class="row justify-center q-mt-lg">
      <Button1
        label="Ver todas las novedades"
        @click="$emit('mostrar-tabla')"
        class="button-wide"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import Button1 from '@/components/button-1.vue'
import SpinnerButton from '@/components/SpinnerButton.vue'

defineProps({
  novedades: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['mostrar-tabla'])

function tiempoTranscurrido(fecha) {
  const dias = Math.floor((Date.now() - new Date(fecha).getTime()) / (1000 * 60 * 60 * 24))
  return dias <= 0 ? 'Hoy' : `Hace ${dias} días`
}
</script>

<style scoped>
.urgent-section {
  background: #FFF3E0;
  border-radius: 8px;
}

.button-wide {
  width: 400px;
  max-width: 90%;
}

.novedad-item {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.novedad-content {
  padding: 8px 0;
}

.text-h6 {
  font-weight: 600;
  margin-bottom: 4px;
}

.text-subtitle1 {
  color: #666;
  margin-bottom: 2px;
}
</style>
