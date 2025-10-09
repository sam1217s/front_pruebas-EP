<template>
  <q-table
    :rows="rows"
    :columns="columns"
    :row-key="rowKey"
    :loading="loading"
    flat
    bordered
  >
    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <q-badge
          :color="props.row.status === 0 ? 'green' : 'red'"
          :label="props.row.status === 0 ? 'Activo' : 'Inactivo'"
          class="text-weight-bold"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-acciones="props">
      <slot name="acciones" :row="props.row" />
    </template>
    <!-- Puedes agregar más slots personalizados aquí si lo necesitas -->
  </q-table>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  rowKey: {
    type: String,
    default: '_id'
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>