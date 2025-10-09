<template>
  <q-dialog v-model="showModal">
    <q-card class="confirm-modal" style="width: 500px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6">
          <q-icon name="help" size="2rem" color="warning" class="q-mr-sm" />
          Confirmar Cambios
        </div>
      </q-card-section>

      <q-card-section>
        <p class="text-subtitle1 q-mb-md">¿Estás de acuerdo con la edición de los cambios realizados?</p>
        <div class="text-subtitle2 q-mb-sm">Cambios detectados:</div>
        <div v-for="change in changes" :key="change.label" class="q-mb-sm">
          <div class="row items-center">
            <div class="col">{{ change.label }}:</div>
            <div class="col text-red" style="text-decoration: line-through;">{{ change.old }}</div>
            <div class="col-auto q-px-sm">----></div>
            <div class="col text-green">{{ change.new }}</div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white q-pa-md">
        <ModalButton
          type="cancel"
          label="Cancelar"
          @click="$emit('cancel')"
        />
        <ModalButton
          type="confirm"
          label="Guardar Cambios"
          @click="$emit('confirm')"
          class="q-ml-sm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue';
import ModalButton from './ModalButton.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  changes: {
    type: Array,
    required: true,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const showModal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<style scoped>
.text-red {
  color: #ff0000;
}
.text-green {
  color: #39a900;
}

.confirm-modal {
  border-radius: 12px;
 
}

.confirm-modal :deep(.q-card__section) {
  padding: 24px;
}
</style>