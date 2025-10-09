<template>
  <q-dialog v-model="show">
    <q-card class="modal-card">
      <div class="text-center text-h5 q-pt-md">
        <slot name="title">Título del Modal</slot>
      </div>
      <q-card-section class="q-pt-md">
        <slot></slot>
      </q-card-section>
      <q-card-actions align="center" class="q-mt-xl q-gutter-md">
        <slot name="actions">
          <ModalButton
            type="cancel"
            label="Cancelar"
            @click="closeModal"
          />
          <ModalButton
            type="confirm"
            label="Confirmar"
            :loading="loading"
            @click="handleSubmit"
          />
        </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'
import ModalButton from './ModalButton.vue'

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean
})

const emit = defineEmits(['update:modelValue', 'submit'])

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleSubmit = () => {
  emit('submit')
}

const closeModal = () => {
  show.value = false
}
</script>

<style scoped>
.modal-card {
  width: 1000px;
  max-width: 90vw;
  border-radius: 12px;
  padding: 20px;
}
</style>
             